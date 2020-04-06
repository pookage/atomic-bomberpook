import { template } from "./";

const Player = {
	schema: {},
	init(){
		const {
			el,
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

		el.parentEl.removeChild(el);
	}// destruct
};

export default Player;