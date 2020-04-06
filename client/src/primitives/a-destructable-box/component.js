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
		// remove from the physics system
		this.el.body.world.remove(this.el.body);
		// remove from the scene
		this.el.parentElement.remove(this.el);
	}// destroy
};

export default DestructableBox;