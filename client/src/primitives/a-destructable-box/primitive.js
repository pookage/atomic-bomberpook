const primitive = {
	defaultComponents: {
		geometry: {
			primitive: "box",
			height: 0.9,
			width: 0.9,
			depth: 0.9
		},
		material: {
			src: "#texture__destructable__crate"
		},
		scale: "1 1 1",
		position: "0 0.5 0",
		"destructable-box": {},
		body: {
			type: "static",
			shape: "none"
		},
		shape: {
			shape: "box",
			halfExtents: "0.5 0.5 0.5"
		}
	}
};
export default primitive;
