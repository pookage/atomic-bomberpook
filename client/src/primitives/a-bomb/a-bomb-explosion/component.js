import { CONFIG } from "./";

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

		const {
			el,
			data: { radius }
		} = this;

		// scope binding
		this.generateExplosion = this.generateExplosion.bind(this);

		const explosion = this.generateExplosion(CONFIG.directions, radius);

		el.appendChild(explosion);

	}, // init


	// UTILS
	// ---------------------------
	generateExplosion(directions, radius){

		const flames = document.createDocumentFragment();
		const range  = radius + 0.5; // add half a tile

		for(let direction of directions){
			const explosion = document.createElement("a-bomb-explosion-flame");
			explosion.setAttribute("direction", direction);
			explosion.setAttribute("range", range);
			flames.appendChild(explosion);
		}

		return flames;
	}// generateExplosion
}; // BombExplosion

export default BombExplosion;