import CONFIG from "./config.json";
import template from "./template.js";
import componentDefinition from "./component.js";
import primitiveDefinition from "./primitive.js";

const component = { "bomb-explosion-flame"   : componentDefinition };
const primitive = { "a-bomb-explosion-flame" : primitiveDefinition };

export { component, primitive, template, CONFIG };
export default primitive;