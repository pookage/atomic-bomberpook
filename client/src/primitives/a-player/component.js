import { template } from "./";

const Player = {
	schema: {},
	init(){
		const {
			el,
			data
		} = this;

		// scope binding
		this.destruct = this.destruct.bind(this);

		const contents = document.importNode(template.content, true);

		el.appendChild(contents);
		el.classList.add("explosion__destructable");

		el.addEventListener("explosion__destroyed", this.destruct);
	},// init

	// UTILS
	// --------------------------
	destruct(){
		const { el } = this;

		// remove from the physics system
		if(el.body && el.body.world) {
			el.body.world.removeBody(el.body);
		}

		el.parentEl.removeChild(el);
		// still leaves behind a physics thing, maybe?
	}// destruct
};

export default Player;