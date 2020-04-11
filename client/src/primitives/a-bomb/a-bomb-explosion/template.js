const template = document.createElement("template");

template.innerHTML = `
	<a-sphere
		radius="0.7"
		color="#fff"
		position="0 0 0"
		material="src: #texture__flame__red; transparent: false; shader: flat;"
		animation__scale="
			property: scale;
			from: 0.8 0.8 0.8;
			to: 1 1 1;
			dir: alternate;
			loop: 1;
			dur: 500;
			easing: easeOutQuint;
		"
	></a-sphere>
`;

export default template;
