import { template } from "./";

const Player = {
	schema: {},
	init(){
		const {
			el,
			data
		} = this;

		const contents = document.importNode(template.content, true);


		console.log({contents})

		this.el.appendChild(contents);
	}// init
};

export default Player;