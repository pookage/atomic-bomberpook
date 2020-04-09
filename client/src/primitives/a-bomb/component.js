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
			data: {
				lifespan,   // (number) ms until the bomb explodes of its own accord
				blastRadius // (number) of tiles that the bomb will explode in each direction
			}
		} = this;

		// scope binding
		this.explode            = this.explode.bind(this);
		this.generateExplosion  = this.generateExplosion.bind(this);
		this.destroy            = this.destroy.bind(this);
	
		// add the bomb geometry to the entity
		const contents  = document.importNode(template.content, true);
		this.EXPLOSIVE  = contents.querySelector(".bomb__explosive");
		el.appendChild(contents);

		// remove the bomb once the explosion is over
		el.addEventListener("explosion__end", this.destroy);
		// explode the bomb if it gets hit by an explosion
		el.addEventListener("explosion__destroyed", this.explode);
	}, // init

	play(){
		const { 
			lifespan // (number) ms until the bomb explodes of its own accord
		} = this.data;

		// explode after a delay
		this.detonationDelay = setTimeout(this.explode, lifespan);
	},//play

	remove(){

		clearTimeout(this.detonationDelay);
	}, // remove


	// UTILS
	// --------------------------
	generateExplosion(){
		const {
			blastRadius // (number) of tiles that the bomb will explode in each direction
		} = this.data;

		const explosion = document.createElement("a-bomb-explosion");
		explosion.setAttribute("radius", blastRadius);

		return explosion;
	},// generateExplosion
	explode(){
		const { 
			el // (HTMLElement) that this component is attached to
		} = this;

		// prevent the bomb from auto-exploding if it hasn't already
		clearTimeout(this.detonationDelay);

		// prevent this bomb from being exploded multiple times
		el.removeEventListener("explosion__destroyed", this.explode);

		// create an explosion of raycasters
		const explosion = this.generateExplosion();
		el.appendChild(explosion);
		
		// let the player know that this bomb has detonated
		el.emit("bomb__explode");

		// remove the bomb
		this.EXPLOSIVE.setAttribute("scale", "0 0 0");
		el.remove(this.EXPLOSIVE);
	},// explode

	destroy(){
		const { el } = this;
		el.parentEl.removeChild(el);
	},// destroy
};

export default Bomb;