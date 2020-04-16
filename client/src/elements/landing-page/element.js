import { UTILS } from "SHARED/";
import { COPY, template, s } from "./";

export default class LandingPage extends HTMLElement {

	// dom
	#ELEMENT;
	#WRAPPER;
	#INPUT__HOST;
	#DATALIST__HOSTS;
	#BUTTON__START;
	#BUTTON__WATCH;

	// config


	// LIFECYCLE JAZZ
	// -----------------------------------
	constructor(){
		super();

		// scope binding
		this.updateHost   = UTILS.debounce.bind(this, this.updateHost.bind(this));

		// dom
		const clone       = this.#ELEMENT         = document.importNode(template.content, true);
		const wrapper     = this.#WRAPPER         = clone.querySelector(`.${s.wrapper}`);
		const hostInput   = this.#INPUT__HOST     = clone.querySelector("#landing_page__input__host");
		const hostOptions = this.#DATALIST__HOSTS = clone.querySelector("#landing_page__hosts");
		const startButton = this.#BUTTON__START   = clone.querySelector("#landing_page__input__start");
		const watchButton = this.#BUTTON__WATCH   = clone.querySelector("#landing_page__input__watch");

		hostInput.addEventListener("keyup", this.updateHost)

	}// constructor

	connectedCallback(){

		this.appendChild(this.#ELEMENT);
	}// connectedCallback


	// EVENT HANDLING
	// ---------------------------------
	updateHost(event){
		console.log(event)
	}
}; // LandingPage