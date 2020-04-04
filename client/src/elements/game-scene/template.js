import { s } from "./";

const template = document.createElement("template");

template.innerHTML = `
	<a-scene class="${s.scene}">
		<a-assets>
			<!-- assets and MSS go in here later -->
		</a-assets>

		<a-camera
			position="0 10 0.0"
			rotation="-90 0 0"
			fov="60"
			look-controls="enabled: false"
			wasd-controls="enabled: false"
		></a-camera>

		<a-cone
			color="green"
			radius-top="0"
			radius-bottom="0.5"
			segments-radial="4"
			position="-3 0.5 -3"
			rotation="0 45 0"
		></a-cone>

		<a-entity
			position="0 0 0"
			grid-layout="rows: 7; columns: 7;"
		>
			
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>

			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>

			<a-cell empty="true"></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell empty="true"></a-cell>

			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>

			<a-cell empty="true"></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell empty="true"></a-cell>

			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>

			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>

		</a-entity>
	</a-scene>
`;

export default template;