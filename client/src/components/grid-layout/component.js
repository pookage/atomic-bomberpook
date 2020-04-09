import { CONFIG } from "./";

const GridLayout = {
	schema: {
		rows: {     default: CONFIG.rows },
		columns: {  default: CONFIG.columns },
		cellsize: { default: CONFIG.cellsize }
	},
	init(){
		const {
			el: { 
				children // (HTMLCollection) of entities to lay-out in a grid
			},
			data: {
				rows,    // (number) rows in the grid - aka the height
				columns, // (number) columns in the grid - aka the width
				cellsize // (number) width of a single cell
			}
		} = this;

		// calculate the size of the offset to place cells relative to the center of the grid
		const xCenter    = (columns / 2) * cellsize;
		const yCenter    = (rows / 2) * cellsize;
		const cellCenter = cellsize / 2;

		// counters used in the loop
		let tileIndex = 0;
		let x, y;

		// ...for every cell in the grid...
		for(let row = 0; row < rows; row++){
			for(let column = 0; column < columns; column++){
				if(children[tileIndex]){

					// calculate the position of the cell
					x = (cellsize * column) - xCenter + cellCenter;
					y = (cellsize * row) - yCenter + cellCenter;

					// set the position of the cell
					children[tileIndex].setAttribute("position", `${x} 0 ${-y}`);
					children[tileIndex].setAttribute("data-tile", tileIndex)
					if(cellsize !== 1) children[tileIndex].setAttribute("scale", `${cellsize} ${cellsize} ${cellsize}`);

					// this can probably be derived from the row / column, but this is easier
					tileIndex++;
				} else break;
			}
		}
	},
}

export default GridLayout;