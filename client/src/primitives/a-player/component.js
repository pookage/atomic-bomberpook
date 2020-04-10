import { template } from "./";

const Player = {
	schema: {},
	init(){
		const {
			el, // (HTMLElement) The entity this component is attached to
		} = this;

		// scope binding
		this.destruct = this.destruct.bind(this);
		this.applyPowerup = this.applyPowerup.bind(this);

		// add the player model to the entity
		const contents = document.importNode(template.content, true);
		el.appendChild(contents);

		// remove this entity when it's hit by an explosion
		// NOTE: the model is destructable, the wrapper isn't
		el.addEventListener("explosion__destroyed", this.destruct);

		// apply the effects of any collected powerup
		el.addEventListener("powerup__collect", this.applyPowerup);
	},// init

	// EVENT HANDLING
	// --------------------------
	destruct(event){
		const { el } = this;

		el.parentEl.removeChild(el);
	},// destruct

	applyPowerup(event){
		console.log({ event });
	}// applyPowerup
};

export default Player;