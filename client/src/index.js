import io from "socket.io-client";

import "SHARED/styles/reset.scss";
import "SHARED/styles/global.scss";

import { CONFIG } from "SHARED/";

import elements from "./elements/";
import components from "./components/";

// register all of the custom elements
for(let element of elements){
	for(let [ name, Defintion ] of Object.entries(element)){
		window.customElements.define(name, Defintion);
	}
}

// regsiter all of the a-frame components
for(let component of components){
	for(let [ name, Defintion] of Object.entries(component)){
		AFRAME.registerComponent(name, Defintion);
	}
}

// connect to the web socket
const socket = io(CONFIG.server);

