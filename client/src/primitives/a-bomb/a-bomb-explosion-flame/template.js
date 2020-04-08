const template = document.createElement("template");

template.innerHTML = `
	<a-entity class="explosion__wrapper">
		<a-plane
			class="explosion__flame"
			rotation="-90 0 0"
			material="src: #texture__flame__red; transparent: true;"
			width="0"
			height="0.5"
			scale="0 0 0"
		></a-plane>
	</a-entity>
`;

export default template;