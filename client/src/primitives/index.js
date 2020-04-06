import Cell, { component as CellComponent } from "./a-cell/";
import DestructableBox, { component as DestructableBoxComponent } from "./a-destructable-box/";
import IndestructableBox, { component as IndestructableBoxComponent } from "./a-indestructable-box/";
import Player, { component as PlayerComponent } from "./a-player/";
import Bomb, { component as BombComponent } from "./a-bomb/";

const components = [
	CellComponent,
	DestructableBoxComponent,
	IndestructableBoxComponent,
	PlayerComponent,
	BombComponent
];

const primitives = [
	Cell,
	DestructableBox,
	IndestructableBox,
	Player,
	Bomb
];

export { components, primitives };
export default primitives;