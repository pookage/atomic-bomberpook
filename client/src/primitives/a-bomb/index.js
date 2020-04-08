import template from "./template.js"
import primitiveDefinition from "./primitive.js";
import componentDefinition from "./component.js";

import { 
	primitive as BombExplosion,
	component as BombExplosionComponent,
	BombExplosionFlame,
	BombExplosionFlameComponent
} from "./a-bomb-explosion/";

const component = { "bomb" : componentDefinition };
const primitive = { "a-bomb" : primitiveDefinition };

export { 
	component, primitive, template,
	BombExplosion, BombExplosionComponent,
	BombExplosionFlame, BombExplosionFlameComponent
};
export default primitive;