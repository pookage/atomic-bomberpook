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
		this.explode           = this.explode.bind(this);
		this.generateExplosion = this.generateExplosion.bind(this);
		this.updateRadiusData  = this.updateRadiusData.bind(this);

		// state
		this.readyForRemoval = false;
	
		// add template to the element
		const contents  = document.importNode(template.content, true);
		this.explosive  = contents.querySelector(".bomb__explosive");
		this.el.appendChild(contents);

		// add listeners
		this.el.addEventListener("raycaster-intersection", this.updateRadiusData);

		// helpers
		this.detonationDelay = setTimeout(this.explode, lifespan);
	}, // init

	// EVENT HANDLING
	// --------------------------
	updateRadiusData(event){
		const { intersections } = event.detail;
		const [ intersection ]  = intersections;


		for(let { object: { el }, distance } of intersections){
			if(el.classList.contains("explosion__destructable")){
				el.emit("explosion__destroyed");
				if(el.tagName === "a-destructable-box"){
					// stop at the first destructable box
					break;
				}
			}
		}
	}, // updateRadiusData

	// UTILS
	// --------------------------
	generateExplosion(){
		this.el.setAttribute("raycaster", {
			showLine: true,
			objects: ".explosion__destructable, .explosion__containing",
			far: this.data.explosion,
			direction: "1 0 0"
		});

		// remove itself after a short delay to give time for intersections to fire
		setTimeout(() => {
			this.el.removeAttribute("raycaster");
			this.el.parentElement.remove(this.el);
		}, 100);
	},// generateExplosion
	explode(){
		this.generateExplosion();


		this.explosive.setAttribute("scale", "0 0 0");
		this.el.emit("bomb__explode");
		this.el.remove(this.explosive);
	},// explode

};

export default Bomb;