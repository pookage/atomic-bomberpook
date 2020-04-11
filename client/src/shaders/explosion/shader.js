import { fragment, vertex } from "./";

const shader = {
	schema: {
		tExplosion: {
			type: "map",
			is: "uniform"
		},
		time: {
			type: "time",
			is: "uniform"
		}
	},
	vertexShader: vertex,
	fragmentShader: fragment,
};

export default shader;