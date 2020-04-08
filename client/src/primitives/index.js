import Cell, { component as CellComponent } from "./a-cell/";
import DestructableBox, { component as DestructableBoxComponent } from "./a-destructable-box/";
import IndestructableBox, { component as IndestructableBoxComponent } from "./a-indestructable-box/";
import Player, { component as PlayerComponent } from "./a-player/";
import {
	primitive as Bomb,
	component as BombComponent ,
	BombExplosion, BombExplosionComponent,
	BombExplosionFlame, BombExplosionFlameComponent
} from "./a-bomb/";
// import Flame, { component as FlameComponent } from "./a-flame/";

const components = [
	CellComponent,
	DestructableBoxComponent,
	IndestructableBoxComponent,
	PlayerComponent,
	BombComponent, BombExplosionComponent, BombExplosionFlameComponent
];

const primitives = [
	Cell,
	DestructableBox,
	IndestructableBox,
	Player,
	Bomb, BombExplosion, BombExplosionFlame
];

export { components, primitives };
export default primitives;