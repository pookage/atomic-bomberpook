import { CONFIG } from "./";

const MovementControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// ---------------------------------
	init(){

		// scope binding
		this.updateMovement = this.updateMovement.bind(this);

		// state
		this.goRight    = false;
		this.goLeft     = false;
		this.goUp       = false;
		this.goDown     = false;
		this.directionX = new THREE.Vector3();
		this.directionY = new THREE.Vector3();
		this.direction  = new THREE.Vector3();

		// helpers
		this.timeScalar; // (number) multiplier to apply to any calculations in tick()
		this.step;       // (number) amount of movement to be applied this tick



		// add listeners
		window.addEventListener("keydown", this.updateMovement);
		window.addEventListener("keyup", this.updateMovement);
	},// init

	tick(time, deltaTime){

		this.timeScalar = CONFIG.targetFPS / deltaTime;
		this.step       = CONFIG.speed * this.timeScalar;

		// horizontal movement
		if(this.goRight)      this.el.object3D.position.x += this.step;
		else if (this.goLeft) this.el.object3D.position.x -= this.step;

		// vertical movement
		if(this.goUp)        this.el.object3D.position.z -= this.step;
		else if(this.goDown) this.el.object3D.position.z += this.step;

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
		const zeroVector = new THREE.Vector3();

		switch(key){
			case "ArrowRight":
			case "d":
			case "D": {
				this.goRight    = pressed;
				this.directionX = pressed ? new THREE.Vector3(1, 0, 0) : zeroVector;
				break;
			}

			case "ArrowLeft":
			case "a":
			case "A": {
				this.goLeft     = pressed;
				this.directionX = pressed ? new THREE.Vector3(-1, 0, 0) : zeroVector;
				break;
			}

			case "ArrowUp":
			case "w":
			case "W": {
				this.goUp       = pressed;
				this.directionY = pressed ? new THREE.Vector3(0, 0, -1) : zeroVector;
				break;
			}

			case "ArrowDown":
			case "s":
			case "S": {
				this.goDown     = pressed;
				this.directionY = pressed ? new THREE.Vector3(0, 0, 1) : zeroVector;
				break;
			}
		}

		this.direction = zeroVector.clone().add(this.directionX).add(this.directionY);

		// console.log

		this.el.setAttribute("raycaster", "direction", this.direction)
		
	}, // updateMovement



	// UTILS
	// ----------------------------------
};

export default MovementControls;