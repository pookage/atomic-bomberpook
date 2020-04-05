import { s } from "./";

const template = document.createElement("template");

template.innerHTML = `
	<a-scene 
		class="${s.scene}"
		physics="debug: true; gravity: 0;"
	>
		<a-assets>
			<img src="assets/3d/textures/crate.jpg" alt="Destructable block texture." id="texture__destructable__crate" />
			<img src="assets/3d/textures/rock.jpg" alt="Indestructable block texture." id="texture__indestructable__rock" />
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

		<a-entity>
		</a-entity>

		<a-entity
			position="0 0 0"
			grid-layout="rows: 9; columns: 9;"
		>

			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			
			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>

			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>

			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>

			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>

			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>

			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>

			<a-cell destructable="false"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell empty="true"></a-cell>
			<a-cell destructable="false"></a-cell>

			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>
			<a-cell destructable="false"></a-cell>

		</a-entity>
	</a-scene>
`;

export default template;