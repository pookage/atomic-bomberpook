import { COPY, template, s } from "./";

export default class LandingPage extends HTMLElement {

	// dom
	#ELEMENT;
	#WRAPPER;
	#INPUT__HOST;
	#DATALIST__HOSTS;
	#BUTTON__START;
	#BUTTON__WATCH;


	// LIFECYCLE JAZZ
	// -----------------------------------
	constructor(){
		super();

		// scope binding

		// dom
		const clone       = this.#ELEMENT         = document.importNode(template.content, true);
		const wrapper     = this.#WRAPPER         = clone.querySelector(`.${s.wrapper}`);
		const hostInput   = this.#INPUT__HOST     = clone.querySelector("#landing_page__input__host");
		const hostOptions = this.#DATALIST__HOSTS = clone.querySelector("#landing_page__hosts");
		const startButton = this.#BUTTON__START   = clone.querySelector("#landing_page__input__start");
		const watchButton = this.#BUTTON__WATCH   = clone.querySelector("#landing_page__input__watch");

	}// constructor

	connectedCallback(){

		this.appendChild(this.#ELEMENT);
	}// connectedCallback
}; // LandingPage