import Cell, { component as CellComponent } from "./a-cell/";
import DestructableBox, { component as DestructableBoxComponent } from "./a-destructable-box/";
import IndestructableBox, { component as IndestructableBoxComponent } from "./a-indestructable-box/";
import Player, { component as PlayerComponent } from "./a-player/";
import { 
	primitive as Bomb,
	component as BombComponent,
	BombExplosion, BombExplosionComponent
} from "./a-bomb/";
// import Explosion, { component as ExplosionComponent } from "./a-explosion/";

const components = [
	CellComponent,
	DestructableBoxComponent,
	IndestructableBoxComponent,
	PlayerComponent,
	BombComponent,
	BombExplosionComponent
];

const primitives = [
	Cell,
	DestructableBox,
	IndestructableBox,
	Player,
	Bomb,
	BombExplosion
];

export { components, primitives };
export default primitives;