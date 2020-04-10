import CONFIG from "./config.json";

import componentDefinition from "./component.js";
import primitiveDefinition from "./primitive.js";

const component = { "powerup" : componentDefinition };
const primitive = { "a-powerup" : primitiveDefinition };

export { CONFIG, component, primitive };
export default primitive;