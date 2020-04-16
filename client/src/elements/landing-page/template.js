import { s, COPY } from "./";

const template = document.createElement("template");

template.innerHTML = `
	<form 
		class="${s.wrapper}"
		aria-hidden="false"
	>
		<h1 class="${s.title}">
			${COPY.title}
		</h1>
		<div class="${s.hosts}">
			<input
				id="landing_page__input__host"
				class="${s.input}" 
				placeholder="eg. www.pookage.dev/bomberman:8081"
				name="host__ip_address"
				list="landing_page__hosts"
				aria-controls="landing_page__input__start landing_page__input__watch"
			/>
			<label
				class="${s.label}"
				for="landing_page__input__host"
			>
				${COPY.labels.host}
			</label>
			<datalist id="landing_page__hosts">
				<option value="localhost:8081" />
				<option value="monkey-test-host" />
				<option value="www.google.com" />
			</datalist>
		</div>

		<button 
			id="landing_page__input__start"
			class="${s.button}"
			disabled
		>
			${COPY.buttons.host}
		</button>
		<button
			id="landing_page__input__watch"
			class="${s.button}"
			aria-hidden="true"
			disabled
		>
			${COPY.buttons.watch}
		</button>
	</form>
`;

export default template;
