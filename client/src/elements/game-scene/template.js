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

		<a-player
			position="-3 0.5 -3"
		></a-player>

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