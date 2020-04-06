import template from "./template.js"
import primitiveDefinition from "./primitive.js";
import componentDefinition from "./component.js";

const component = { "bomb" : componentDefinition };
const primitive = { "a-bomb" : primitiveDefinition };

export { component, primitive, template };
export default primitive;