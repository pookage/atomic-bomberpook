import { s } from "./";

const template = document.createElement("template");

template.innerHTML = `
	<a-scene class="${s.scene}">
		<a-assets>
			<!-- assets and MSS go in here later -->
		</a-assets>
		<a-entity
			position="0 0 0"
			grid-layout="rows: 3; columns: 3;"
		>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>
			<a-entity>
				<a-box 
					color="red"
					scale="0.5 0.5 0.5"
				></a-box>
			</a-entity>

		</a-entity>
	</a-scene>
`;

export default template;