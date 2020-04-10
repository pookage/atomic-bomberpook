import CONFIG from "./config.json";
import template from "./template.js";

import componentDefinition from "./component.js";
import primitiveDefinition from "./primitive.js";

const component = { "powerup" : componentDefinition };
const primitive = { "a-powerup" : primitiveDefinition };

export { CONFIG, template, component, primitive };
export default primitive;