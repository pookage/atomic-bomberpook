import io from "socket.io-client";

import "SHARED/styles/reset.scss";
import "SHARED/styles/global.scss";

import { CONFIG } from "SHARED/";

import elements from "./elements/";

// register all of the custom elements
for(let element of elements){
	for(let [ name, Defintion ] of Object.entries(element)){
		window.customElements.define(name, Defintion);
	}
}

// connect to the web socket
const socket = io(CONFIG.server);

