import { fragment, vertex } from "./";

const shader = {
	schema: {
		color: {
			type: 'color', 
			is: 'uniform'
		},
		timeMsec: {
			type: "time",
			is: "uniform"
		}
	},
	fragmentShader: fragment,
	vertexShader: vertex
};

export default shader;