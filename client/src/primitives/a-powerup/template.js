const template = document.createElement("template");

template.innerHTML = `
	<a-box 
		class="pickup__entity explosion__destructable explosion__blocking"
		scale="0.5 0.5 0.5"
		rotation="45 0 45"
		position="0 0.5 0"
		animation="
			property: rotation;
			from: 45 0 45;
			to: 45 360 45;
			easing: linear;
			dur: 5000;
			loop: true;
		"
	></a-box>
`;

export default template;