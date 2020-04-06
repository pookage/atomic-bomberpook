const primitive = {
	defaultComponents: {
		bomb: {},
		geometry: {
			primitive: "sphere",
			radius: 0.35
		},
		animation: {
			property: "scale",
			from: "1 1 1",
			to: "1.2 1.2 1.2",
			dir: "alternate",
			dur: 250,
			loop: true
		},
		material: {
			color: "#111"
		}
	},
	mappings: {
		lifespan: "bomb.lifespan"
	}
};

export default primitive;