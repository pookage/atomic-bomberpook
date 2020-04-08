import CONFIG from "./config.json";
import primitiveDefintion from "./primitive.js";
import componentDefinition from "./component.js";

const primitive = { "a-bomb-explosion" : primitiveDefintion };
const component = { "bomb-explosion" : componentDefinition };

export default primitive;
export { CONFIG, component, primitive };