import { CONFIG, template } from "./";

const BombExplosion = {
	schema: {
		radius: {
			type: "number",
			default: 1
		}
	},

	// LIFECYCLE JAZZ
	// --------------------------------------
	init(){

		// follow this tutorial for a cool effect later
		//https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

		const {
			el,              // (HTMLElement) the entity this component is attached to
			data: { radius } // (number) how many tiles each flame will expand
		} = this;

		// scope binding
		this.generateExplosion = this.generateExplosion.bind(this);
		this.destroy           = this.destroy.bind(this);

		// generate the explosion ball and flames 
		const contents  = document.importNode(template.content, true);
		const explosion = this.generateExplosion(CONFIG.directions, radius);
		const ball      = contents.querySelector(`.explosion__ball`);

		// add'em to thie parent entity
		contents.appendChild(explosion);
		el.appendChild(contents);

		// remove the explosion once the first flame has burned out
		el.addEventListener("flame__end", this.destroy);
	}, // init


	// UTILS
	// ---------------------------
	generateExplosion(directions, radius){

		const flames = document.createDocumentFragment();
		const range  = radius + 0.5; // add half a tile to compensate for the bomb location

		// create a flame entity in every direction
		// for(let direction of directions){
		// 	const explosion = document.createElement("a-bomb-explosion-flame");
		// 	explosion.setAttribute("direction", direction);
		// 	explosion.setAttribute("range", range);
		// 	flames.appendChild(explosion);
		// }

		return flames;
	},// generateExplosion
	destroy(){
		const { el } = this;

		// stop listening to any more flame-outs
		el.removeEventListener("flame__end", this.destroy);
		// let the bomb know this explosion is done
		el.emit("explosion__end");
		// remove the entity and all components
		el.parentEl.removeChild(el);
	}// destroy
}; // BombExplosion

export default BombExplosion;