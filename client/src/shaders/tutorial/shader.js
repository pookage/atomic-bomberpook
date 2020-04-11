import { fragment, vertex } from "./";

const shader = {
	schema: {
		time: {
			type: "time",
			is: "uniform"
		}
	},
	fragmentShader: fragment,
	vertexShader: vertex
};

export default shader;