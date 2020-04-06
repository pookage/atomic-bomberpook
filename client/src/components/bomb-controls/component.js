const BombControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// --------------------------------
	init(){
		// scope binding
		this.parseInput = this.parseInput.bind(this);
		this.dropBomb   = this.dropBomb.bind(this);

		window.addEventListener("keyup", this.parseInput);
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


	// UTILS
	// ------------------------------
	dropBomb(){
		console.log("dropping zee bomb!");
	}// dropBomb
};

export default BombControls;