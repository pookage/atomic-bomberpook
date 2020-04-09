const IndestructableBox = {
	schema: {},
	init(){
		const {
			el,
		} = this;

		// mark this box as one that prevents explosions from progressing further
		el.classList.add("explosion__blocking");
	},// init
};

export default IndestructableBox;