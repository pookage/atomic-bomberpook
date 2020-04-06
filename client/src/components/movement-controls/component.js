import { CONFIG } from "./";

const MovementControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// ---------------------------------
	init(){

		// scope binding
		this.updateMovement = this.updateMovement.bind(this);

		// state
		this.xVelocity = 0;
		this.zVelocity = 0;

		// helpers
		this.timeScalar;    // (number) multiplier to apply to any calculations in tick()

		// add listeners
		window.addEventListener("keydown", this.updateMovement);
		window.addEventListener("keyup", this.updateMovement);
	},// init

	tick(time, deltaTime){
		this.timeScalar = CONFIG.targetFPS / deltaTime;
		if(this.el.body){
			// set the motion of the object in a given direction vector
			this.el.body.velocity.set(
				this.xVelocity * this.timeScalar, 
				0, 
				this.zVelocity * this.timeScalar
			);
		}
	}, // tick

	remove(){

		// remove listeners
		window.removeEventListener("keydown", this.updateMovement);
		window.removeEventListener("keyup", this.updateMovement);
	},// remove


	// EVENT HANDLING
	// -----------------------------------
	updateMovement(event){
		const {
			key, // (string) identifier for the key that was pressed
			type // (string)[keyup, keydown] which event was fired
		} = event;

		const pressed = type === "keydown";
		
		switch(key){
			case "ArrowRight":
			case "d":
			case "D": {
				this.xVelocity = pressed ? CONFIG.velocity : 0;
				break;
			}

			case "ArrowLeft":
			case "a":
			case "A": {
				this.xVelocity = pressed ? -CONFIG.velocity : 0;
				break;
			}

			case "ArrowUp":
			case "w":
			case "W": {
				this.zVelocity = pressed ? -CONFIG.velocity : 0;
				break;
			}

			case "ArrowDown":
			case "s":
			case "S": {
				this.zVelocity = pressed ? CONFIG.velocity : 0;
				break;
			}
		}
	}, // updateMovement
};

export default MovementControls;