const Bomb = {
	schema: {
		lifespan: { type: "number" }
	},

	// LIFECYCLE JAZZ
	// ---------------------------
	init(){
		const {
			el, 
			data
		} = this;

		const {
			lifespan
		} = data;

		// scope binding
		this.explode = this.explode.bind(this);

		// helpers
		this.detonationDelay = setTimeout(this.explode, lifespan);
	}, // init


	// UTILS
	// --------------------------
	explode(){
		this.el.emit("bomb__explode");
		console.log("boom!")
	}// explode
};

export default Bomb;