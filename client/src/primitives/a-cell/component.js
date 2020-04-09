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
				destructable, // (bool) whether or not the box this tile contains is destructable
				empty         // (bool) whether or not this cell should begin empty
			}
		} = this;

		// import the default contents of the cell
		const contents = document.importNode(template.content, true);

		// add a box to the tile if it's not empty
		if(!empty){
			const boxType = destructable ? "a-destructable-box" : "a-indestructable-box";
			const box     = document.createElement(boxType);

			contents.appendChild(box);
		}

		el.appendChild(contents);
	}// init
};

export default Cell;