import { CONFIG, template } from "./";

/*

	NOTE: 
		I dig this as an aesthetic - might be worth taking a look at...
		https://github.com/jeromeetienne/threex.laser/blob/master/threex.laserbeam.js
		https://github.com/jeromeetienne/threex.laser/blob/master/examples/demo.html
		https://github.com/jeromeetienne/threex.laser/blob/master/threex.lasercooked.js

		1. adds a point light at the opint of intersection
*/


const BombExplosion = {
	schema: {
		radius: {
			default: 1
		}
	},

	// LIFECYCLE JAZZ
	// -------------------------------
	init(){

		const {
			el
		} = this;

		// scope binding
		this.generateFlames = this.generateFlames.bind(this);
		this.endOnLast      = this.endOnLast.bind(this);
		this.destroy        = this.destroy.bind(this);

		// state
		this.flamedOut = 0;

		// dom stuff
		const contents = document.importNode(template.content, true);
		const flames   = this.generateFlames(CONFIG.directions);

		contents.appendChild(flames);
		el.appendChild(contents);

		// event listeners
		this.el.addEventListener("flame__end", this.endOnLast);
	}, // init


	// EVENT HANDLING
	// ------------------------------
	endOnLast(){
		this.flamedOut++;

		if(this.flamedOut === CONFIG.directions.length){

			this.destroy();
		}
	},//endOnLast


	// UTILS
	// ------------------------------
	generateFlames(directions){
		const {
			radius
		} = this.data;

		console.log({ radius })

		const flames = document.createDocumentFragment();
		const range  = radius + 0.5; // add half a tile

		for(let direction of directions){
			const flame = document.createElement("a-bomb-explosion-flame");
			flame.setAttribute("direction", direction);
			flame.setAttribute("range", range);
			flames.appendChild(flame);
		}

		return flames;
	},// generateFlames

	destroy(){
		this.el.emit("explosion__end");
		this.el.parentElement.removeChild(this.el);
	}// destroy

}; // BombExplosion

export default BombExplosion;