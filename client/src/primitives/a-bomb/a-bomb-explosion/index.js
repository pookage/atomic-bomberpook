import CONFIG from "./config.json";
import template from "./template.js";
import primitiveDefintion from "./primitive.js";
import componentDefinition from "./component.js";

const primitive = { "a-bomb-explosion" : primitiveDefintion };
const component = { "bomb-explosion" : componentDefinition };

export default primitive;
export { CONFIG, template, component, primitive };