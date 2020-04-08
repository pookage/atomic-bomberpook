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

		// helpers
		this.blocked = false; // whether the explosion has hit a hard surface

		// dom
		const contents  = document.importNode(template.content, true);
		const wrapper   = contents.querySelector(".explosion__wrapper");
		const flame = this.flame = contents.querySelector(".explosion__flame");
		const rotation  = this.directionToRotation(direction);

		wrapper.setAttribute("rotation", rotation);
		
		el.appendChild(contents)

		// create the raycaster to determine what gets hit
		el.setAttribute("raycaster", {
			showLine: true,
			objects: hits,
			far: range,
			direction
		});

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
		const {
			duration
		} = this.data;

		this.removalTimeout = setTimeout(this.destroy, duration);
	}, // play
	remove(){
		this.el.emit("explosion__end");
		// clearTimeout(this.removalTimeout);
	}, // remove

	// EVENT HANDLING
	// --------------------------
	destroyIntersected(event){
		const { 
			hits,
			direction,
			destroys, 
			blocks, 
			range 
		} = this.data;

		const { intersections }           = event.detail;
		const [ intersection ]            = intersections;
		const destructable         = destroys.replace(".", "");
		const blocking             = blocks.replace(".", "");

		for(let { object: { el }, distance } of intersections){

			// fire a destroyed event on anything destructable
			if(el.classList.contains(destructable)) el.emit("explosion__destroyed");
			// don't continue if we hit something blocking
			if(el.classList.contains(blocking)){
				clearTimeout(this.defaultTimeout)
				this.flame.setAttribute("position", `${distance / 2} 0 0`);
				this.flame.setAttribute("width", distance);
				this.flame.setAttribute("animation__scale", {
					property: "scale",
					from: "0 0 0",
					to: "1 1 1",
					dur: 100
				})
				this.el.setAttribute("raycaster", {
					showLine: true,
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
	directionToRotation(direction){
		switch(direction){
			case "1 0 0":  return "0 0 0";
			case "0 0 1":  return "0 -90 0";
			case "-1 0 0": return "0 180 0";
			case "0 0 -1": return "0 90 0";
		}
	}, // directionToRotation
	destroy(){
		this.el.parentEl.removeChild(this.el);
	}// destroy
};

export default Flame;