import { CONFIG } from "./";

const BombControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// --------------------------------
	init(){
		// scope binding
		this.parseInput        = this.parseInput.bind(this);
		this.dropBomb          = this.dropBomb.bind(this);
		this.updateCurrentTile = this.updateCurrentTile.bind(this);
		this.exploded          = this.exploded.bind(this);

		// state
		this.limit    = CONFIG.limit;
		this.lifespan = CONFIG.lifespan;
		this.count    = 0;

		console.log(this.lifespan)

		// helpers
		this.currentTile; // (HTMLElement) reference to the current tile being stood on

		// event listeners
		window.addEventListener("keyup", this.parseInput);
		this.el.addEventListener("raycaster-intersection", this.updateCurrentTile);
	}, // remove
	remove(){

	}, // remove

	// EVENT HANDLING
	// --------------------------------
	parseInput(event){
		const { key } = event;

		switch(key){
			case " ": {
				this.dropBomb();
				break;
			}
		}
	}, // parseInput
	updateCurrentTile(event){
		const [ intersection ] = event.detail.intersections;
		const { el: tile }     = intersection.object;
		
		this.currentTile = tile;
	}, // updateCurrentTile
	exploded(event){
		const { target: bomb } = event;

		// remove the listener we added
		bomb.removeEventListener("bomb__explode", this.exploded);

		this.count--;
	},// exploded

	// UTILS
	// ------------------------------
	dropBomb(){
		if(this.count < this.limit){
			const { x, z }   = this.el.object3D.position;
			const bomb       = document.createElement("a-bomb");
			const radius     = 0.4;
			
			// configure new bomb
			bomb.setAttribute("position", `0 ${radius} 0`);
			bomb.setAttribute("lifespan", this.lifespan);
			bomb.addEventListener("bomb__explode", this.exploded);

			this.currentTile.parentElement.appendChild(bomb);
			this.count++;
		}
	}// dropBomb
};

export default BombControls;