import CONFIG from "./config.json";
import template from "./template.js";
import primitiveDefinition from "./primitive.js";
import componentDefintion from "./component.js";

import BombExplosionFlame, { component as BombExplosionFlameComponent } from "./a-bomb-explosion-flame";

const component = { "bomb-explosion" : componentDefintion };
const primitive = { "a-bomb-explosion" : primitiveDefinition };

export {
	CONFIG, template, 
	component, primitive,
	BombExplosionFlame, BombExplosionFlameComponent 
};
export default primitive;