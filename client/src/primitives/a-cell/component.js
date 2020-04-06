import { template } from "./";

const Cell = {
	schema: {
		destructable: {
			default: true
		},
		empty: {
			default: false
		}
	},
	init(){
		const {
			el,
			data: {
				destructable,
				empty
			}
		} = this;

		const contents = document.importNode(template.content, true);

		this.el.classList.add("cell__wrapper");

		if(!empty){
			// create the contents of the tile
			const boxType = destructable ? "a-destructable-box" : "a-indestructable-box";
			const box     = document.createElement(boxType);

			el.appendChild(box);
		}

		el.appendChild(contents);
	}// init
};

export default Cell;