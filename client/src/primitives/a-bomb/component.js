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

		// calculate how big the explosion will be in each direction
		this.explosion = this.generateExplosion(explosionRadius);

		// add template to the element
		const contents  = document.importNode(template.content, true);
		this.explosive  = contents.querySelector(".bomb__explosive");
		this.el.appendChild(contents);

		// add listeners
		this.el.addEventListener("raycaster-intersection", this.updateRadiusData);

		// helpers
		// this.detonationDelay = setTimeout(this.explode, lifespan);
	}, // init
	play(){
		
	}, // play


	// EVENT HANDLING
	// --------------------------
	updateRadiusData(event){
		const { intersections } = event.detail;
		const [ intersection ]  = intersections;

		console.log(...intersections)

		const {
			object: { el },
			distance
		} = intersection;

		if(el.classList.contains("explosion__destructable")){
			el.emit("explosion__destroyed");
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
		})
	},// generateExplosion
	explode(){
		this.generateExplosion();


		this.explosive.setAttribute("scale", "0 0 0");
		this.el.emit("bomb__explode");
		this.el.remove(this.explosive);
	},// explode

};

export default Bomb;