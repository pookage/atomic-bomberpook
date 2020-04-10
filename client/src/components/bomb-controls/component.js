import { CONFIG } from "./";

const BombControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// --------------------------------
	init(){

		const {
			el
		} = this;

		// scope binding
		this.parseInput        = this.parseInput.bind(this);
		this.dropBomb          = this.dropBomb.bind(this);
		this.updateCurrentTile = this.updateCurrentTile.bind(this);
		this.exploded          = this.exploded.bind(this);
		this.applyPowerup = this.applyPowerup.bind(this);

		// config
		this.limit       = CONFIG.limit;
		this.lifespan    = CONFIG.lifespan;
		this.blastRadius = CONFIG.blastRadius;

		// state
		this.count = 0; // (number) of bombs that have been currently dropped

		// helpers
		this.currentTile; // (HTMLElement) reference to the tile that the bomb will be placed on

		// handle any user-input
		window.addEventListener("keydown", this.parseInput);

		// update internal ref for current tile whenever the player moves onto a new one
		el.addEventListener("raycaster-intersection", this.updateCurrentTile);

		// apply the effects of any collected powerup
		el.addEventListener("powerup__collect", this.applyPowerup);
	}, // remove
	remove(){

		window.removeEventListener("keydown", this.parseInput);
	}, // remove

	// EVENT HANDLING
	// --------------------------------
	parseInput(event){
		const { 
			key // (string) key that fired the keyboard input
		} = event;

		switch(key){
			case " ": {
				this.dropBomb();
				break;
			}
		}
	}, // parseInput
	updateCurrentTile(event){
		// get the tile that we walked on
		const [ intersection ] = event.detail.intersections;
		const { el: tile }     = intersection.object;
		
		// update our internal ref 
		this.currentTile = tile;
	}, // updateCurrentTile
	exploded(event){
		const { 
			target: bomb // (HTMLElement) the bomb entity that exploded
		} = event;

		// remove the listener we added
		bomb.removeEventListener("bomb__explode", this.exploded);

		// clear-up space for another bomb
		this.count--;
	},// exploded
	applyPowerup(event){
		const { 
			type
		} = event.detail;

		switch(type){
			case "extra-bomb":
				this.limit = Math.min(this.limit + 1, CONFIG.maxLimit);
				break;
			case "max-bomb":
				this.limit = CONFIG.maxLimit;
				break;

			case "extra-flame":
				this.blastRadius = Math.min(this.blastRadius + 1, CONFIG.maxBlastRadius);
				break;

			case "max-flame":
				this.blastRadius = CONFIG.maxBlastRadius;
				break;
		}
	},// applyPowerup

	// UTILS
	// ------------------------------
	dropBomb(){
		const {
			count,       // (number) of bombs we've already dropped
			limit,       // (number) of bombs we're allowed to drop
			lifespan,    // (number) ms until the bomb detonates by itself
			blastRadius, // (number) of tiles the bomb's explosion will travel
			exploded,    // (function) callback to fire when the bomb explodes
			currentTile  // (HTMLElement) the tile the player is currently standing on
		} = this;

		// drop it if we still have any bombs left
		if(count < limit){
			const bomb   = document.createElement("a-bomb");
			const radius = 0.4; // radius of the bomb geometry
			
			// offset bomb so that it's on the surface not under it
			bomb.setAttribute("position", `0 ${radius} 0`);
			// apply bomb configuration
			bomb.setAttribute("lifespan", lifespan);
			bomb.setAttribute("blast-radius", blastRadius);		
			// when the bomb explodes, mark it as removed so we can drop another one
			bomb.addEventListener("bomb__explode", exploded);

			// add the bomb to the tile we're currently on
			currentTile.parentElement.appendChild(bomb);

			// mark bomb as placed so we can't drop the same one again
			this.count++;
		}
	}// dropBomb
};

export default BombControls;