import { s } from "./";

const template = document.createElement("template");

template.innerHTML = `
	<a-scene class="${s.scene}">
		<a-assets>
			<!-- assets and MSS go in here later -->
		</a-assets>
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