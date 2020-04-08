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

		const {
			el,
			data: { radius }
		} = this;

		// scope binding
		this.generateExplosion = this.generateExplosion.bind(this);
		this.destroy           = this.destroy.bind(this);

		// dom
		const contents  = document.importNode(template.content, true);
		const explosion = this.generateExplosion(CONFIG.directions, radius);
		contents.appendChild(explosion);
		el.appendChild(contents);

		// event listeners
		el.addEventListener("flame__end", this.destroy);
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
	},// generateExplosion
	destroy(){
		this.el.emit("explosion__end");
		this.el.parentEl.removeChild(this.el);
	}// destroy
}; // BombExplosion

export default BombExplosion;