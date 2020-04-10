const Powerup = {
	schema: {
		type: {
			type: "string",
			default: "extra-bomb"
		},
		value: {
			type: "number",
			default: 1
		}
	},

	// LIFECYCLE JAZZ
	// ----------------------------
	init(){
		const {
			el,
			data: {
				type
			}
		} = this;

		// scope binding
		this.pickup  = this.pickup.bind(this);
		this.destroy = this.destroy.bind(this);

		el.addEventListener("collide", this.pickup);
	}, // init


	// EVENT HANDLING
	// ---------------------------
	pickup(event){
		const { 
			el,
			data: {
				type,
				value
			}
		} = this;
		const { el: player } = event.detail.body;
		const details        = {
			type, value
		};

		el.removeEventListener("collide", this.pickup);

		player.emit("powerup__collect", details);
		this.destroy();
	},// pickup

	// UTILS
	// --------------------------
	destroy(){
		const { el } = this;
		el.parentElement.removeChild(el);
	}// destroy	
};

export default Powerup;
