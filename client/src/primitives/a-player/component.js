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
		const { el } = this;

		// remove from the physics system
		if(el.body.world) {
			el.body.world.remove(el.body);
		}
		// remove from the scene
		el.parentNode.remove(el);

		// still leaves behind a physics thing, maybe?
	}// destroy
};

export default Player;