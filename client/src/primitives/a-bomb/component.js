import { template } from "./";

const Bomb = {
	schema: {
		lifespan: { type: "number" },
		explosion: { type: "number"}
	},

	// LIFECYCLE JAZZ
	// ---------------------------
	init(){
		const {
			el, 
			data
		} = this;

		const {
			lifespan,
			explosion: explosionRadius
		} = data;

		// scope binding
		this.explode            = this.explode.bind(this);
		this.generateExplosion  = this.generateExplosion.bind(this);
		this.destroyIntersected = this.destroyIntersected.bind(this);

		// config
		this.impassable = ["A-DESTRUCTABLE-BOX", "A-INDESTRUCTABLE-BOX"];
	
		// add template to the element
		const contents  = document.importNode(template.content, true);
		this.explosive  = contents.querySelector(".bomb__explosive");
		this.el.appendChild(contents);

		// add listeners
		this.el.addEventListener("raycaster-intersection", this.destroyIntersected);

		// helpers
		this.detonationDelay = setTimeout(this.explode, lifespan);
	}, // init

	// EVENT HANDLING
	// --------------------------
	destroyIntersected(event){
		const { intersections } = event.detail;
		const [ intersection ]  = intersections;

		for(let { object: { el }, distance } of intersections){
			// fire a destroyed event on anything destructable
			if(el.classList.contains("explosion__destructable")){
				el.emit("explosion__destroyed");
			}
			// don't continue if we hit something impassable
			if(this.impassable.indexOf(el.tagName) > -1) break;
		}
	}, // destroyIntersected

	// UTILS
	// --------------------------
	generateExplosion(){

		// define parameters of each raycaster
		const raycasterConfig = {
			showLine: true,
			objects: ".explosion__destructable, .explosion__containing",
			far: this.data.explosion,
		};

		// create a raycaster in every direction
		this.el.setAttribute("raycaster__top", {
			...raycasterConfig,
			direction: "0 0 -1"
		});
		this.el.setAttribute("raycaster__right", {
			...raycasterConfig,
			direction: "1 0 0"
		});
		this.el.setAttribute("raycaster__bottom", {
			...raycasterConfig,
			direction: "0 0 1"
		});
		this.el.setAttribute("raycaster__left", {
			...raycasterConfig,
			direction: "-1 0 0"
		});

		
		// remove itself after a short delay to give time for intersections to fire
		setTimeout(() => {
			this.el.removeAttribute("raycaster__top");
			this.el.removeAttribute("raycaster__right");
			this.el.removeAttribute("raycaster__bottom");
			this.el.removeAttribute("raycaster__left");

			this.el.parentElement.remove(this.el);
		}, 100);
	},// generateExplosion
	explode(){

		/*

			NOTE: 
				I dig this as an aesthetic - might be worth taking a look at...
				https://github.com/jeromeetienne/threex.laser/blob/master/threex.laserbeam.js
				https://github.com/jeromeetienne/threex.laser/blob/master/examples/demo.html
				https://github.com/jeromeetienne/threex.laser/blob/master/threex.lasercooked.js
	
				1. adds a point light at the opint of intersection
				2. creates a simple plane geometry with a gradient texture
				3. plane-geometry follows the camera
		*/

		// create an explosion of raycasters
		this.generateExplosion();

		// remove the bomb
		this.explosive.setAttribute("scale", "0 0 0");
		this.el.emit("bomb__explode");
		this.el.remove(this.explosive);
	},// explode

};

export default Bomb;