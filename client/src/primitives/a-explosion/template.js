const template = document.createElement("template");

template.innerHTML = `
	<a-entity class="explosion__wrapper">
		<a-plane
			class="explosion__flame"
			rotation="-90 0 0"
			color="red"
			width="3"
		></a-plane>
	</a-entity>
`;

export default template;