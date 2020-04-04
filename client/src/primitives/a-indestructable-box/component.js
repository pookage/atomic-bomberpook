import { template } from "./";

const IndestructableBox = {
	schema: {},
	init(){
		const {
			el,
			data
		} = this;

		// dom
		const clone = document.importNode(template.content, true);

		// add template to the dom
		this.el.appendChild(clone);
	}// init
};

export default IndestructableBox;