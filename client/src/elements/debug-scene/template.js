import { s } from "./";

const template = document.createElement("template");

template.innerHTML = `
	<a-scene
		class="${s.scene}"
	>
		<a-sphere
			position="0 0 -5"
			material="shader: tutorial-shader"
		></a-shere>
	</a-scene>
`;

export default template;