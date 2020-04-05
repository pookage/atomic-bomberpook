import { CONFIG } from "./";

const MovementControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// ---------------------------------
	init(){

		// scope binding
		this.updateMovement = this.updateMovement.bind(this);

		// state
		this.goRight     = false;
		this.goLeft      = false;
		this.goUp        = false;
		this.goDown      = false;

		// helpers
		this.timeScalar;    // (number) multiplier to apply to any calculations in tick()
		this.step;          // (number) amount of movement to be applied this tick
		this.velocity = 5;

		// add listeners
		window.addEventListener("keydown", this.updateMovement);
		window.addEventListener("keyup", this.updateMovement);

	},// init

	tick(time, deltaTime){

		this.timeScalar = CONFIG.targetFPS / deltaTime;
		this.step       = CONFIG.speed * this.timeScalar;


		this.el.body.quaternion.set(0, 0, 0, 1);

		// horizontal movement
		let xVelocity = 0;
		let zVelocity = 0;
		if(this.goRight)      xVelocity = this.velocity;
		else if (this.goLeft) xVelocity = -this.velocity;

		// vertical movement
		if(this.goUp)        zVelocity = -this.velocity;
		else if(this.goDown) zVelocity = this.velocity;

		this.el.body.velocity.set(xVelocity, 0, zVelocity);
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
			key,
			type
		} = event;

		const pressed    = type === "keydown";
		
		switch(key){
			case "ArrowRight":
			case "d":
			case "D": {
				this.goRight    = pressed;
				break;
			}

			case "ArrowLeft":
			case "a":
			case "A": {
				this.goLeft     = pressed;
				break;
			}

			case "ArrowUp":
			case "w":
			case "W": {
				this.goUp       = pressed;
				break;
			}

			case "ArrowDown":
			case "s":
			case "S": {
				this.goDown     = pressed;
				break;
			}
		}
	}, // updateMovement
};

export default MovementControls;