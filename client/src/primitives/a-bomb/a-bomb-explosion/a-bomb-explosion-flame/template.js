const template = document.createElement("template");

template.innerHTML = `
	<a-entity class="flame__wrapper">
		<a-plane
			class="flame__body"
			rotation="-90 0 0"
			width="0"
			height="0.5"
			scale="0 0 0"
			animation__scale="
				property: scale;
				from: 0 0 0;
				to: 1 1 1;
				dur: 100;
				startEvents: flame__expand;
			"
		></a-plane>
	</a-entity>
`;

export default template;