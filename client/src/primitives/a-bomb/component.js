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
			el,
			data: {
				blastRadius: radius
			}
		} = this;

		const explosion = document.createElement("a-bomb-explosion");
		explosion.setAttribute("radius", radius);

		this.el.appendChild(explosion);
	},// generateExplosion
	explode(){
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