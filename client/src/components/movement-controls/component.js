import { CONFIG } from "./";

const MovementControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// ---------------------------------
	init(){
		// scope binding
		this.updateMovement = this.updateMovement.bind(this);

		// state
		this.goUp      = false;
		this.goRight   = false;
		this.goDown    = false;
		this.goLeft    = false;
		this.xVelocity = 0;
		this.zVelocity = 0;

		// helpers
		this.timeScalar; // (number) multiplier to apply to any calculations in tick()

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
				this.goRight   = pressed;
				this.xVelocity = pressed ? CONFIG.velocity : (
					this.goLeft ? -CONFIG.velocity : 0
				);
				break;
			}

			case "ArrowLeft":
			case "a":
			case "A": {
				this.goLeft    = pressed;
				this.xVelocity = pressed ? -CONFIG.velocity : (
					this.goRight ? CONFIG.velocity : 0
				);
				break;
			}

			case "ArrowUp":
			case "w":
			case "W": {
				this.goUp      = pressed;
				this.zVelocity = pressed ? -CONFIG.velocity : (
					this.goDown ? CONFIG.velocity : 0
				);
				break;
			}

			case "ArrowDown":
			case "s":
			case "S": {
				this.goDown    = pressed;
				this.zVelocity = pressed ? CONFIG.velocity : (
					this.goUp ? -CONFIG.velocity : 0
				);
				break;
			}
		}
	}, // updateMovement
};

export default MovementControls;