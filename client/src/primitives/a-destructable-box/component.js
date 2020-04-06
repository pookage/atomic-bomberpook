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
		console.log("destructable box destroyed!")
	}// destroy
};

export default DestructableBox;