import { template } from "./";

const Bomb = {
	schema: {
		lifespan: { type: "number" },
		blastRadius: { type: "number"}
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
			blastRadius
		} = data;

		// scope binding
		this.explode            = this.explode.bind(this);
		this.generateExplosion  = this.generateExplosion.bind(this);
		this.destroy            = this.destroy.bind(this);

		// config
		this.impassable = ["A-DESTRUCTABLE-BOX", "A-INDESTRUCTABLE-BOX"];
	
		// add template to the element
		const contents  = document.importNode(template.content, true);
		this.explosive  = contents.querySelector(".bomb__explosive");
		this.el.appendChild(contents);		

		// explode after a delay
		this.detonationDelay = setTimeout(this.explode, lifespan);

		// event handling
		this.el.addEventListener("explosion__end", this.destroy);
	}, // init



	// UTILS
	// --------------------------
	generateExplosion(){

		const {
			blastRadius
		} = this.data;

		const directions = [
			"0 0 -1",
			"1 0 0",
			"0 0 1",
			"-1 0 0"
		];
		const fragment = document.createDocumentFragment();
		const range    = blastRadius + 0.5; // add half a tile

		for(let direction of directions){
			const explosion = document.createElement("a-explosion");
			explosion.setAttribute("direction", direction);
			explosion.setAttribute("range", range);
			fragment.appendChild(explosion);
		}

		this.el.appendChild(fragment);
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

	destroy(){
		this.el.parentEl.removeChild(this.el);
	},// destroy

};

export default Bomb;