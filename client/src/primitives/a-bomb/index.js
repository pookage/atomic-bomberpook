import template from "./template.js"
import primitiveDefinition from "./primitive.js";
import componentDefinition from "./component.js";

import BombExplosion, { component as BombExplosionComponent } from "./a-bomb-explosion/";

const component = { "bomb" : componentDefinition };
const primitive = { "a-bomb" : primitiveDefinition };

export { 
	component, primitive, template,
	BombExplosion, BombExplosionComponent
};
export default primitive;