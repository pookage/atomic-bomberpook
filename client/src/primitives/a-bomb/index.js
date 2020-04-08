import template from "./template.js"
import primitiveDefinition from "./primitive.js";
import componentDefinition from "./component.js";

import BombExplosionFlame, { component as BombExplosionFlameComponent } from "./a-bomb-explosion-flame/";

const component = { "bomb" : componentDefinition };
const primitive = { "a-bomb" : primitiveDefinition };

export { 
	component, primitive, template,
	BombExplosionFlame, BombExplosionFlameComponent
};
export default primitive;