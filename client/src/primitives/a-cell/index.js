import template from "./template.js";
import componentDefinition from "./component.js";
import primitiveDefinition from "./primitive.js";

const component = { "cell" : componentDefinition };
const primitive = { "a-cell" : primitiveDefinition };

export { template, component };
export default primitive;
