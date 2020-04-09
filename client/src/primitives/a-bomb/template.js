const template = document.createElement("template");

template.innerHTML = `
	<a-sphere 
		class="bomb__explosive explosion__destructable"
		radius="0.35"
		color="#111"
		animation="
			property: scale; 
			from: 1 1 1; 
			to: 1.2 1.2 1.2;
			dir: alternate;
			dur: 250;
			loop: true;
		"
	></a-sphere>
`;

export default template;