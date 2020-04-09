import { template } from "./";

const DestructableBox = {
	schema: {},
	init(){
		const {
			el,
		} = this;

		// scope binding
		this.destruct = this.destruct.bind(this);

		// mark this box as destructable
		el.classList.add("explosion__destructable");
		// mark this box as one that will prevent explosions from passing it
		el.classList.add("explosion__blocking");

		// remove the box when it is hit by an explosion
		el.addEventListener("explosion__destroyed", this.destruct);
	},// init

	// UTILS
	// --------------------------
	destruct(){
		const { el } = this;
		// remove from the scene
		el.parentElement.removeChild(el);
	}// destruct
};

export default DestructableBox;