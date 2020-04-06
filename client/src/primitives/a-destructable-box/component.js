import { template } from "./";

const DestructableBox = {
	schema: {},
	init(){
		const {
			el,
			data
		} = this;

		// scope binding
		this.destruct = this.destruct.bind(this);

		el.classList.add("explosion__destructable");
		el.addEventListener("explosion__destroyed", this.destruct);
	},// init

	// UTILS
	// --------------------------
	destruct(){

		const { el } = this;

		// remove from the physics system
		if(el.body.world) el.body.world.remove(el.body);
		// remove from the scene
		el.parentElement.removeChild(el);
	}// destruct
};

export default DestructableBox;