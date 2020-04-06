import { template } from "./";

const Player = {
	schema: {},
	init(){
		const {
			el,
			data
		} = this;

		// scope binding
		this.destroy = this.destroy.bind(this);

		const contents = document.importNode(template.content, true);

		el.appendChild(contents);
		el.classList.add("explosion__destructable");

		el.addEventListener("explosion__destroyed", this.destroy);
	},// init

	// UTILS
	// --------------------------
	destroy(){
		console.log("killed the player!");
	}// destroy
};

export default Player;