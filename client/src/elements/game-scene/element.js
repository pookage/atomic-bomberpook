import { s, template } from "./";

export default class GameScene extends HTMLElement {

	// dom
	#ELEMENT;
	#SCENE;


	// LIFECYCLE JAZZ
	// ---------------------------
	constructor(){
		super();

		// dom
		const clone = this.#ELEMENT = document.importNode(template.content, true);
		const scene = this.#SCENE   = clone.querySelector(`.${s.scene}`);
	}// constructor

	connectedCallback(){

		this.appendChild(this.#ELEMENT);
	}// connectedCallback

}; // GameScene