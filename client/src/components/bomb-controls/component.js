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
		const { x, z }   = this.el.object3D.position;
		const bomb       = document.createElement("a-bomb");
		const radius     = 0.4;
		bomb.setAttribute("position", `${x} ${radius} ${z}`);

		this.el.sceneEl.appendChild(bomb);

		console.log(bomb.components.geometry)

	}// dropBomb
};

export default BombControls;