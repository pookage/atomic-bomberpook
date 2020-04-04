import Cell, { component as CellComponent } from "./a-cell/";
import DestructableBox, { component as DestructableBoxComponent } from "./a-destructable-box/";
import IndestructableBox, { component as IndestructableBoxComponent } from "./a-indestructable-box/";

const components = [
	CellComponent,
	DestructableBoxComponent,
	IndestructableBoxComponent
];

const primitives = [
	Cell,
	DestructableBox,
	IndestructableBox
];

export { components, primitives };
export default primitives;