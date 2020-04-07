import { template } from "./";

const DestructableBox = {
	schema: {},
	init(){
		const {
			el,
		} = this;

		// scope binding
		this.destruct = this.destruct.bind(this);

		el.classList.add("explosion__destructable");
		el.classList.add("explosion__blocking");
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