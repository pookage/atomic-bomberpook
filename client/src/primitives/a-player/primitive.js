const primitive = {
	defaultComponents: {
		"geometry": {
			primitive: "cone",
			radiusTop: 0,
			radiusBottom: 0.5,
			segmentsRadial: 4
		},
		"material": {
			color: "green"
		},
		"scale": "1 1 1",
		"rotation": "0 0 0",
		"raycaster": {
			far: 1,
			showLine: true,
			objects: ".cell__block"
		},
		"movement-controls": {},
	},
	mappings: {}
};
export default primitive;
