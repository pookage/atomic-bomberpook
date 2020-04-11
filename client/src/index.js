import io from "socket.io-client";

import "SHARED/styles/reset.scss";
import "SHARED/styles/global.scss";

import { CONFIG } from "SHARED/";

import elements from "./elements/";
import sharedComponents from "./components/";
import shaders from "./shaders/";
import primitives, { components as primitiveComponents } from "./primitives/";

// register all of the custom elements
for(let element of elements){
	for(let [ name, Defintion ] of Object.entries(element)){
		window.customElements.define(name, Defintion);
	}
}

// register all of the a-frame shaders
for(let shader of shaders){
	for(let [ name, Definition ] of Object.entries(shader)){
		AFRAME.registerShader(name, Definition);
	}
}

// register all of the a-frame components
const components = [ ...sharedComponents, ...primitiveComponents ];
for(let component of components){
	for(let [ name, Defintion] of Object.entries(component)){
		AFRAME.registerComponent(name, Defintion);
	}
}

// register all of the a-frame primitives
for(let primitive of primitives){
	for(let [ name, Definition ] of Object.entries(primitive)){
		AFRAME.registerPrimitive(name, Definition);
	}
}


// connect to the web socket
// const socket = io(CONFIG.server);

