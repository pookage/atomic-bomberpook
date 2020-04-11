import { template } from "./";

export default class DebugScene extends HTMLElement {

	#ELEMENT;

	constructor(){
		super();

		const clone = this.#ELEMENT = document.importNode(template.content, true);
	}// constructor

	connectedCallback(){
		this.appendChild(this.#ELEMENT);
	}// connectedCallback
}; // DebugScene