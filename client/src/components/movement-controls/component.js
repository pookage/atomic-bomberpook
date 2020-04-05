import { CONFIG } from "./";

const MovementControls = {
	schema: {},

	// LIFECYCLE JAZZ
	// ---------------------------------
	init(){

		// scope binding
		this.updateMovement = this.updateMovement.bind(this);
		this.updateBlockage = this.updateBlockage.bind(this);

		// state
		this.goRight     = false;
		this.goLeft      = false;
		this.goUp        = false;
		this.goDown      = false;
		this.blockedX    = false;
		this.blockedY    = false;
		this.inputLocked = false;
		this.directionX  = new THREE.Vector3();
		this.directionY  = new THREE.Vector3();
		this.direction   = new THREE.Vector3();

		// helpers
		this.timeScalar;    // (number) multiplier to apply to any calculations in tick()
		this.step;          // (number) amount of movement to be applied this tick
		this.distance;      // (number) length of the raycaster

		// get data from the raycaster
		this.far         = this.el.components.raycaster.data.far;
		this.diagonalFar = Math.sqrt(Math.pow(this.far, 2) * 2);



		// add listeners
		window.addEventListener("keydown", this.updateMovement);
		window.addEventListener("keyup", this.updateMovement);

		this.el.addEventListener("raycaster-intersection", this.updateBlockage);
		this.el.addEventListener("raycaster-intersection-cleared", this.updateBlockage);
	},// init

	tick(time, deltaTime){

		this.timeScalar = CONFIG.targetFPS / deltaTime;
		this.step       = CONFIG.speed * this.timeScalar;

		// horizontal movement
		if(!this.blockedX){
			if(this.goRight)      this.el.object3D.position.x += this.step;
			else if (this.goLeft) this.el.object3D.position.x -= this.step;
		} else {
			if(this.goRight)      this.el.object3D.position.x -= (this.step / 2);
			else if (this.goLeft) this.el.object3D.position.x += (this.step / 2);
		}

		// vertical movement
		if(!this.blockedZ){
			if(this.goUp)        this.el.object3D.position.z -= this.step;
			else if(this.goDown) this.el.object3D.position.z += this.step;
		} else {
			if(this.goUp)        this.el.object3D.position.z += (this.step / 2);
			else if(this.goDown) this.el.object3D.position.z -= (this.step / 2);
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

		// console.log(this.directionX)

		const horizontal = this.goLeft || this.goRight;
		const vertical   = this.goUp || this.goDown;

		// console.log({ horizontal })

		const far = horizontal && vertical ? this.diagonalFar : this.far;

		// 
		this.el.setAttribute("raycaster", "far", far);

		// calculate the direcion we're travelling
		this.direction = zeroVector.clone().add(this.directionX).add(this.directionY);

		// 'look ahead' with the raycaster in the direction of travel
		this.el.setAttribute("raycaster", "direction", this.direction);
	}, // updateMovement

	updateBlockage(event){

		const {
			intersections
		} = event.detail;

		if(intersections){


			const [ intersection ] = intersections;
			const {
				face, 
				distance
			} = intersection;
		
			const { x, z } = face.normal;			
			const xAbs = Math.abs(x);
			const zAbs = Math.abs(z);

			if(xAbs > zAbs){
				this.blockedX = true;
				this.blockedZ = false
			}
			else {
				this.blockedX = false;
				this.blockedZ = true;
			}

			this.inputLocked = true;
			setTimeout(() => {
				this.inputLocked = false;
				this.blockedX    = this.queuedBlockedX;
				this.blockedZ    = this.queuedBlockedY;
			}, 100)

		} else {

			if(!this.inputLocked){
				if(this.blockedX) this.blockedX = false;
				if(this.blockedZ) this.blockedZ = false;
			} else {
				this.queuedBlockedX = false;
				this.queuedBlockedY = false;
			}
		}

		// console.log(!!intersections)
	}, // updateBlockage



	// UTILS
	// ----------------------------------
};

export default MovementControls;