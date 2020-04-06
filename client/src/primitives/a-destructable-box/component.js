import { template } from "./";

const DestructableBox = {
	schema: {},
	init(){
		const {
			el,
			data
		} = this;

		// scope binding
		this.destroy = this.destroy.bind(this);

		el.classList.add("explosion__destructable");
		el.addEventListener("explosion__destroyed", this.destroy);
	},// init

	// UTILS
	// --------------------------
	destroy(){

		const { el } = this;

		// remove from the physics system
		if(el.body.world) el.body.world.remove(el.body);
		// remove from the scene
		el.parentElement.remove(el);
	}// destroy
};

export default DestructableBox;