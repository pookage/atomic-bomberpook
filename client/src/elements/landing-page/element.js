import { UTILS, STATE } from "SHARED/";
import { COPY, template, s } from "./";

export default class LandingPage extends HTMLElement {

	// dom
	#ELEMENT;
	#WRAPPER;
	#INPUT__HOST;
	#DATALIST__HOSTS;
	#BUTTON__START;
	#BUTTON__WATCH;
	#OUTPUT;


	// LIFECYCLE JAZZ
	// -----------------------------------
	constructor(){
		super();

		// scope binding
		this.updateHost             = UTILS.debounce.bind(this, this.updateHost.bind(this));
		this.updateConnecting       = this.updateConnecting.bind(this);
		this.updateConnected        = this.updateConnected.bind(this);
		this.updateConnectionFailed = this.updateConnectionFailed.bind(this);
		this.createNewGame          = this.createNewGame.bind(this);
		this.updateGameActive       = this.updateGameActive.bind(this);

		// dom
		const clone       = this.#ELEMENT         = document.importNode(template.content, true);
		const wrapper     = this.#WRAPPER         = clone.querySelector(`.${s.wrapper}`);
		const hostInput   = this.#INPUT__HOST     = clone.querySelector("#landing_page__input__host");
		const hostOptions = this.#DATALIST__HOSTS = clone.querySelector("#landing_page__hosts");
		const startButton = this.#BUTTON__START   = clone.querySelector("#landing_page__input__start");
		const watchButton = this.#BUTTON__WATCH   = clone.querySelector("#landing_page__input__watch");
		const output      = this.#OUTPUT          = clone.querySelector(`.${s.result}`);

		// check for host at the typed IP 
		hostInput.addEventListener("keyup", this.updateHost);
		startButton.addEventListener("click", this.createNewGame);

		// update messaging / buttons based on connection state
		STATE.subscribe("socket__connecting", this.updateConnecting);
		STATE.subscribe("socket__connected", this.updateConnected);
		STATE.subscribe("socket__failed", this.updateConnectionFailed);
		STATE.subscribe("game__active", this.updateGameActive);
	}// constructor

	connectedCallback(){

		this.appendChild(this.#ELEMENT);
	}// connectedCallback

	attributeChangedCallback(attribute, prev, next){
		switch(attribute){
			case "connecting": {
				const connecting = next === "true";

				if(connecting) {
					this.setOutputMessage(COPY.output.connecting);
					this.#BUTTON__START.setAttribute("disabled", "");
				}
				break;
			}

			case "connected": {
				const connected = next === "true";

				if(connected){
					this.#BUTTON__START.removeAttribute("disabled");
					this.setOutputMessage(COPY.output.success, s.success);
				}			
				
				break;
			}

			case "connection-failed": {
				const failed = next === "true";

				if(failed) this.setOutputMessage(COPY.output.failure, s.failure);
				break;
			}

			case "game-active": {
				const active = next === "true";
				const label  = active ? COPY.buttons.join : COPY.buttons.host;
				const prevAction = active ? this.createNewGame : this.joinGame;
				const nextAction = active ? this.joinGame : this.createNewGame;

				this.#BUTTON__START.innerText = label;
				this.#BUTTON__START.removeEventListener("click", prevAction);
				this.#BUTTON__START.addEventListener("click", nextAction);
				break;
			}
		}
	}// attributeChangedCallback

	static get observedAttributes(){
		return [ "connecting", "connected", "connection-failed", "game-active", "game-started" ];
	}// get observedAttributes


	// EVENT HANDLING
	// ---------------------------------
	updateHost(event){
		const { value } = this.#INPUT__HOST;

		STATE.socket__host = value;
	}// updateHost

	createNewGame(event){
		event.preventDefault();
		STATE.socket__connection.emit("new_game");
	}// createNewGame

	joinGame(event){
		event.preventDefault();
		STATE.socket__connection.emit("join_game");
	}// joinGame


	// STATE UPDATING
	// ---------------------------------
	updateConnecting(_, connecting){

		this.setAttribute("connecting", connecting);
	}// updateConnecting

	updateConnected(_, connected){

		this.setAttribute("connected", connected);
	}// updateConnected

	updateConnectionFailed(_, failed){

		this.setAttribute("connection-failed", failed);
	}// updateConnectionFailed

	updateGameActive(_, gameActive){

		this.setAttribute("game-active", gameActive);
	}// updateGameActive


	// UTILS
	// -------------------------------
	setOutputMessage(text, className){
		const fadeIn = (event) => {
			if(event.propertyName === "opacity"){
				this.#OUTPUT.removeEventListener("transitionend", fadeIn)
				this.#OUTPUT.setAttribute("aria-hidden", "false");
				this.#OUTPUT.innerText = text;

				if(className) this.#OUTPUT.classList.add(className);
			}
		}// fadeIn

		// hide any existing messaging
		this.#OUTPUT.addEventListener("transitionend", fadeIn);
		this.#OUTPUT.setAttribute("aria-hidden", "true");
		this.#OUTPUT.classList.remove(s.success, s.failure);
	}// setOutputMessage
	
}; // LandingPage