const primitive = {
	defaultComponents: {	
		"player": {},
		"movement-controls": {},
		"body": {
			type: "dynamic", // [static, dynamic] whether it causes or responds to other objects
			shape: "none",   // 
			angularDamping: 1,
		},
		shape: {
			shape: "box",
			halfExtents: "0.4 0.4 0.4",
		},
	},
	mappings: {}
};
export default primitive;
