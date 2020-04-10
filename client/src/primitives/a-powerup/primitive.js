const primitive = {
	defaultComponents: {
		powerup: {},
		geometry: {
			primitive: "box",
		},
		scale: "0.5 0.5 0.5",
		material: {
			color: "red"
		},
		rotation: "45 0 45",
		position: "0 0.5 0",
		"static-body": {
			shape: "box"
		},
		animation__spin: {
			property: "rotation",
			from: "45 0 45",
			to: "45 360 45",
			easing: "linear",
			dur: 5000,
			loop: true
		}
	},
	mappings: {
		"type": "powerup.type",
		"value": "powerup.value"
	}
};

export default primitive;