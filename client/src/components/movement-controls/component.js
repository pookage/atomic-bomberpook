import { CONFIG } from "./";

const MovementControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// ---------------------------------
	init(){

		const {
			el
		} = this;

		// scope binding
		this.updateMovement = this.updateMovement.bind(this);
		this.applyPowerup   = this.applyPowerup.bind(this);

		// state
		this.goUp      = false;
		this.goRight   = false;
		this.goDown    = false;
		this.goLeft    = false;
		this.velocity  = CONFIG.velocity;
		this.xVelocity = 0;
		this.zVelocity = 0;

		// helpers
		this.timeScalar; // (number) multiplier to apply to any calculations in tick()

		// add listeners
		window.addEventListener("keydown", this.updateMovement);
		window.addEventListener("keyup", this.updateMovement);

		// apply the effects of any collected powerup
		el.addEventListener("powerup__collect", this.applyPowerup);
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
				this.xVelocity = pressed ? this.velocity : (
					this.goLeft ? -this.velocity : 0
				);
				break;
			}

			case "ArrowLeft":
			case "a":
			case "A": {
				this.goLeft    = pressed;
				this.xVelocity = pressed ? -this.velocity : (
					this.goRight ? this.velocity : 0
				);
				break;
			}

			case "ArrowUp":
			case "w":
			case "W": {
				this.goUp      = pressed;
				this.zVelocity = pressed ? -this.velocity : (
					this.goDown ? this.velocity : 0
				);
				break;
			}

			case "ArrowDown":
			case "s":
			case "S": {
				this.goDown    = pressed;
				this.zVelocity = pressed ? this.velocity : (
					this.goUp ? -this.velocity : 0
				);
				break;
			}
		}
	},// updateMovement
	applyPowerup(event){
		const { 
			type // (string) what kind of powerup was collected
		} = event.detail;

		switch(type){
			case "extra-speed":
				this.velocity = Math.min(this.velocity + 1, CONFIG.maxVelocity);
				break;
			case "max-speed":
				this.velocity = CONFIG.maxVelocity;
				break;
		}
	}// applyPowerup
};

export default MovementControls;