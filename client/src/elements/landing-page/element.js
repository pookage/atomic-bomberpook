import io from "socket.io-client";

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

	// config
	#SOCKET__RETRIES = 5;


	// LIFECYCLE JAZZ
	// -----------------------------------
	constructor(){
		super();

		// scope binding
		this.updateHost   = UTILS.debounce.bind(this, this.updateHost.bind(this));
		this.connect      = this.connect.bind(this);

		// dom
		const clone       = this.#ELEMENT         = document.importNode(template.content, true);
		const wrapper     = this.#WRAPPER         = clone.querySelector(`.${s.wrapper}`);
		const hostInput   = this.#INPUT__HOST     = clone.querySelector("#landing_page__input__host");
		const hostOptions = this.#DATALIST__HOSTS = clone.querySelector("#landing_page__hosts");
		const startButton = this.#BUTTON__START   = clone.querySelector("#landing_page__input__start");
		const watchButton = this.#BUTTON__WATCH   = clone.querySelector("#landing_page__input__watch");

		hostInput.addEventListener("keyup", this.updateHost);

		console.log(STATE)

		STATE.subscribe("socket__host", this.connect);

	}// constructor

	connectedCallback(){

		this.appendChild(this.#ELEMENT);
	}// connectedCallback


	// EVENT HANDLING
	// ---------------------------------
	updateHost(event){
		const { value } = this.#INPUT__HOST;

		console.log("updating host to", value)

		STATE.socket__host = value;
	}// updateHost

	// UTILS
	// ---------------------------------
	connect(){
		const {
			socket__host: host,
			socket__connection: socket
		} = STATE;

		console.log({ socket })

		// close any existing connection
		socket?.close();

		// attempt to connect to the new host address
		STATE.socket__connection = io(`//${host}`);

		console.log(`connecting to : //${host}`);

		// feel like this is a more general 'connection' thing...maye a global app element?
		STATE.socket__connection.on("reconnecting", (failCount) => {
			console.log("failed...", failCount)
			if(failCount >= this.#SOCKET__RETRIES){
				console.log("failed too many times. closing connection.")
				STATE.socket__connection.close();
				STATE.socket__connecting = false;
				STATE.socket__connected  = false;
			}
		});

		STATE.socket__connection.on("connect", (thing) => {
			console.log("connected!")
			STATE.socket__connecting = false;
			STATE.socket__connected  = true;
		})
	}// connect
}; // LandingPage