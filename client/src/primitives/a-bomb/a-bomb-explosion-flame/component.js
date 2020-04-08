import { template } from "./";

const Flame = {
	schema: {
		range: { 
			type: "number",
			default: 2 
		},
		duration: {
			type: "number",
			default: 1000
		},
		destroys: {
			type: "string",
			default: ".explosion__destructable"
		},
		hits: {
			type: "string",
			default: ".explosion__destructable, .explosion__blocking"
		},
		blocks: {
			type: "string",
			default: ".explosion__blocking"
		},
		direction: { 
			type: "string",
			default: "1 0 0"
		},
		color: { default: "#FF0000" }
	},

	// LIFECYCLE JAZZ
	// --------------------------------
	init(){
		const {
			el,
			data: {
				range,
				direction,
				hits,
			}
		} = this;

		console.log({ range })

		// scope binding
		this.destroyIntersected = this.destroyIntersected.bind(this);
		this.destroy            = this.destroy.bind(this);
		this.attachRaycaster    = this.attachRaycaster.bind(this);

		// helpers
		this.blocked     = false; // whether the explosion has hit a hard surface
		this.currPos     = new THREE.Vector3();
		this.worldCenter = new THREE.Vector3();

		// dom
		const contents  = document.importNode(template.content, true);
		const wrapper   = contents.querySelector(".explosion__wrapper");
		const flame = this.flame = contents.querySelector(".explosion__flame");
		const rotation  = this.directionToRotation(direction);

		wrapper.setAttribute("rotation", rotation);
		
		el.appendChild(contents)

		

		// add listeners
		el.addEventListener("raycaster-intersection", this.destroyIntersected);
		this.defaultTimeout = setTimeout(() => {
			flame.setAttribute("width", range);
			flame.setAttribute("position", `${range / 2} 0 0`);

			flame.setAttribute("animation__scale", {
				property: "scale",
				from: "0 0 0",
				to: "1 1 1",
				dur: 100
			})
		}, 0);
	}, // init
	play(){
		
		this.attachRaycaster();	
	}, // play
	remove(){
		clearTimeout(this.defaultTimeout);
		clearTimeout(this.removalTimeout);
	}, // remove

	// EVENT HANDLING
	// --------------------------
	destroyIntersected(event){
		const { 
			el,
			data: {
				hits,
				direction,
				destroys, 
				blocks, 
				range 
			}
		} = this;

		const { intersections }           = event.detail;
		const [ intersection ]            = intersections;
		const destructable         = destroys.replace(".", "");
		const blocking             = blocks.replace(".", "");

		for(let { object: { el: target }, distance } of intersections){

			// fire a destroyed event on anything destructable
			if(target.classList.contains(destructable)) target.emit("explosion__destroyed");
			// don't continue if we hit something blocking
			if(target.classList.contains(blocking)){

				clearTimeout(this.defaultTimeout)
				this.flame.setAttribute("position", `${distance / 2} 0 0`);
				this.flame.setAttribute("width", distance);
				this.flame.setAttribute("animation__scale", {
					property: "scale",
					from: "0 0 0",
					to: "1 1 1",
					dur: 100
				});

				// el.removeEventListener("raycaster-intersection", this.destroyIntersected);
				el.setAttribute("raycaster", {
					showLine: false,
					objects: hits,
					far: distance,
					direction
				});
				break;
			}
		}
	}, // destroyIntersected


	// UTILS
	// -------------------------
	attachRaycaster(){
		const {
			el,          // (HTMLElement) The entity this component is attached to
			currPos,     // (Vector3) The current global position of this entity
			worldCenter, // (Vector3) reference to the center of the world
			data: {
				hits,      // (string) selectors for elements that are detected by this explosion
				range,     // (number) max distance this explosion can travel
				direction, // (string) representing a normalised Vector3 - direction that this raycaster will travel
				duration   
			}
		} = this;

		// update the current global position of the element
		el.object3D.getWorldPosition(currPos);

		// if the element still thinks its spawned in the center of the world, wait until the next frame
		if(currPos.equals(worldCenter)){
			setTimeout(this.attachRaycaster, 1000 / 60);
		} 
		// if the element has finished moving to its destination, attach the raycaster
		else {
			this.removalTimeout = setTimeout(this.destroy, duration);
			el.setAttribute("raycaster", {
				showLine: false,
				objects: hits,
				far: range,
				direction
			});
		}
	}, // attachRaycaster
	directionToRotation(direction){
		switch(direction){
			case "1 0 0":  return "0 0 0";
			case "0 0 1":  return "0 -90 0";
			case "-1 0 0": return "0 180 0";
			case "0 0 -1": return "0 90 0";
		}
	}, // directionToRotation
	destroy(){
		this.el.emit("flame__end");
		this.el.parentEl.removeChild(this.el);
	}// destroy
};

export default Flame;