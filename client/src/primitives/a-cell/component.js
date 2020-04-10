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

		// scope binding
		this.generatePowerup = this.generatePowerup.bind(this);

		// import the default contents of the cell
		const contents = document.importNode(template.content, true);

		// add a box to the tile if it's not empty
		if(!empty){
			const boxType = destructable ? "a-destructable-box" : "a-indestructable-box";
			const box     = document.createElement(boxType);

			if(destructable){
				box.addEventListener("destructable_box__destroyed", this.generatePowerup);
			}

			contents.appendChild(box);
		}

		el.appendChild(contents);
	},// init

	// EVENT HANDLERS
	// ------------------------------
	generatePowerup(){
		const { el } = this;

		const powerup = document.createElement("a-powerup");
		powerup.setAttribute("type", "extra-bomb");
		powerup.setAttribute("value", 1);

		el.appendChild(powerup);
	}// generatePowerup
};

export default Cell;