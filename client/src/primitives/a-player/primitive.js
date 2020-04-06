const primitive = {
	defaultComponents: {	
		player: {},
		"movement-controls": {},
		"bomb-controls": {},
		raycaster: {
			direction: "0 -1 0",
			objects: ".cell__floor",
			showLine: true,
			far: 1 
		},
		body: {
			type: "dynamic", // [static, dynamic] whether it causes or responds to other objects
			shape: "box",   // 
			angularDamping: 1,
		},
	},
	mappings: {}
};
export default primitive;
