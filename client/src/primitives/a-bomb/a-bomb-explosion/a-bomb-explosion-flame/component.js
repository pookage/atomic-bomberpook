import { CONFIG, template } from "./";

const Flame = {
	schema: {
		range: { 
			type: "number",
			default: 2 
		},
		duration: {
			type: "number",
			default: CONFIG.duration
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
			el,            // (HTMLElement) The entity this component is attached to
			data: {
				range,     // (number) how far the flame will continue if not blocked
				direction, // (string) relative "x y z" vector that the raycaster will shoot off in
				hits,      // (string) querySelector of everything the flame will intersect with
				color      // (string) hexcode representing the colour of the flame
			}
		} = this;

		// scope binding
		this.destroyIntersected = this.destroyIntersected.bind(this);
		this.expand             = this.expand.bind(this);
		this.destroy            = this.destroy.bind(this);
		this.attachRaycaster    = this.attachRaycaster.bind(this);
		this.lookupColorMaterial = this.lookupColorMaterial.bind(this);

		// helpers
		this.currPos         = new THREE.Vector3();
		this.worldCenter     = new THREE.Vector3();
		this.raycasterConfig = {
			showLine: false, // (bool) whether or not to show a debug line to represent the raycaster
			objects: hits,   
			interval: 100,   // (number) ms how often the raycaster will poll for intersections
			direction        
		};

		// create some additional dom elements for the flame
		const contents = document.importNode(template.content, true);
		const wrapper  = contents.querySelector(".flame__wrapper");
		const flame    = this.FLAME = contents.querySelector(".flame__body");

		// convert the direction to a usable rotation
		const rotation = this.directionToRotation(direction);
		// convert the color to a usable material
		const material = this.lookupColorMaterial(color);

		// rotate the flame to the right direction
		wrapper.setAttribute("rotation", rotation);

		// draw the flame at its max width and correct color
		flame.setAttribute("width", range);
		flame.setAttribute("position", `${range / 2} 0 0`);
		flame.setAttribute("material", material);

		// add the geometry to this element
		el.appendChild(contents);

		// add listeners
		el.addEventListener("raycaster-intersection", this.destroyIntersected);
	}, // init
	play(){
		// add the raycaster once the component is in the scene
		this.attachRaycaster();	
	}, // play
	remove(){
		clearTimeout(this.removalTimeout);
		clearTimeout(this.expandTimeout);
	}, // remove

	// EVENT HANDLING
	// --------------------------
	destroyIntersected(event){
		const { 
			el,            // (HTMLElement) The entity this component is attached to
			data: {
				hits,      // (string) selectors for elements that are detected by this explosion
				direction, // (string) representing a normalised Vector3 - direction that this raycaster will travel
				destroys,  // (string) querySelector of every entity that the flame will destroy
				blocks,    // (string) querySelector of every entity that will block the flames propogation
			}
		} = this;

		// get the entities that were hit
		const { intersections } = event.detail;


		// get the element and distance of everything that the raycaster hit...
		for(let { object: { el: target }, distance } of intersections){

			// convert from querySelector syntax to classList syntax
			const destructable = destroys.replace(".", "");
			const blocking     = blocks.replace(".", "");

			// ...fire a destroyed event on anything destructable...
			if(target.classList.contains(destructable)) target.emit("explosion__destroyed");

			// ...limit the flame's progress if we hit something blocking...
			if(target.classList.contains(blocking)){
				this.FLAME.setAttribute("width", distance);
				this.FLAME.setAttribute("position", `${distance / 2} 0 0`);

				el.setAttribute("raycaster", {
					...this.raycasterConfig,
					far: distance
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
				range,     // (number) max distance this explosion can travel
				duration   // (number) ms until the flame burns out and is removed
			}
		} = this;

		// update the current global position of the element
		el.object3D.getWorldPosition(currPos);

		// if the element still thinks its spawned in the center of the world, wait until the next frame
		if(currPos.equals(worldCenter)) setTimeout(this.attachRaycaster, 1000 / 60);

		// if the element has finished moving to its destination, attach the raycaster
		else {	
			el.setAttribute("raycaster", {
				...this.raycasterConfig,
				far: range,
			});

			// fire the expansion animation on the next tick
			this.expandTimeout = setTimeout(this.expand, 0);
			// remove the flame after its active duration
			this.removalTimeout = setTimeout(this.destroy, duration);
		}
	}, // attachRaycaster
	directionToRotation(direction){
		// convert direction vector into a usable x y z rotation on the wrapper
		switch(direction){
			case "1 0 0":  return "0 0 0";
			case "0 0 1":  return "0 -90 0";
			case "-1 0 0": return "0 180 0";
			case "0 0 -1": return "0 90 0";
		}
	}, // directionToRotation
	lookupColorMaterial(color){
		let src;
		switch(color){
			default:
			case "#FF0000": src = "#texture__flame__red"; break;
		}

		const material = `src: ${src}; transparent: true;`;
		return material;
	},// lookupColorMaterial
	destroy(){
		// let the explosion know this flame has ended
		this.el.emit("flame__end");
		// remove the entity and attached components
		this.el.parentEl.removeChild(this.el);
	},// destroy
	expand(){
		// fire off the expansion animation
		this.FLAME.emit("flame__expand");
	}// expand
	

};

export default Flame;