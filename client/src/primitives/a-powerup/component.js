import { UTILS } from "SHARED/";
import { CONFIG } from "./";

const Powerup = {
	schema: {
		type: {
			type: "string"
		},
	},

	// LIFECYCLE JAZZ
	// ----------------------------
	init(){
		const {
			el,
			data: {
				type: definedType
			}
		} = this;

		// scope binding
		this.pickup             = this.pickup.bind(this);
		this.destroy            = this.destroy.bind(this);
		this.generateRandomType = this.generateRandomType.bind(this);

		const { name, material } = this.generateRandomType(CONFIG.types);

		// update the type if we had to add it ourselves
		if(!definedType) el.setAttribute("type", name);

		// apply a texture to match the given type
		el.setAttribute("material", `color: ${material}`);

		// pick-up this powerup when you walk into it
		el.addEventListener("collide", this.pickup);
	}, // init

	// EVENT HANDLING
	// ---------------------------
	pickup(event){
		const { 
			el,
			data: {
				type
			}
		} = this;
		const { el: player } = event.detail.body;
		const details = {
			type  // (string) the type of powerup that was collected
		};

		el.removeEventListener("collide", this.pickup);

		player.emit("powerup__collect", details);
		this.destroy();
	},// pickup

	// UTILS
	// --------------------------
	generateRandomType(types){
		const index     = UTILS.randomInt(0, types.length-1);
		const powerup   = types[index];

		let type = powerup;

		// if there's a 'max' variant to the powerup, roll for it
		if(powerup.max){
			const { chance } = powerup.max;
			const bonusRoll = Math.random();

			if(bonusRoll < chance){
				type = powerup.max;
			}
		}
		return type;
	},// generateRandomType
	destroy(){
		const { el } = this;
		el.parentElement.removeChild(el);
	}// destroy	
};

export default Powerup;
