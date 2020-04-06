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
		this.explode = this.explode.bind(this);

		// dom
		const contents  = document.importNode(template.content, true);
		this.explosive  = contents.querySelector(".bomb__explosive");

		this.el.appendChild(contents);

		// helpers
		this.detonationDelay = setTimeout(this.explode, lifespan);
	}, // init


	// UTILS
	// --------------------------
	explode(){
		this.explosive.setAttribute("scale", "0 0 0");
		this.el.emit("bomb__explode");
		this.el.remove(this.explosive);
	}// explode
};

export default Bomb;