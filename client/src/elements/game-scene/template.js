import { s } from "./";

const template = document.createElement("template");

template.innerHTML = `
	<a-scene class="${s.scene}">
		<a-assets>
			<!-- assets and MSS go in here later -->
		</a-assets>
		<a-box
			color="red"
			position="0 0 -5"
		></a-box>
	</a-scene>
`;

export default template;