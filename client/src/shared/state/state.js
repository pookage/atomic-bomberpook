import { CONFIG } from "./";
import { UTILS } from "SHARED/";

const subscriptionHandler = {
	subscriptions: [],
	
	subscribe(key, callback){
		this.subscriptions.push({
			key, callback
		});
	},
	
	unsubscribe(targetKey, targetCallback){
		this.subscriptions = this.subscriptions.filter(({ key, callback }) => (
			key !== targetKey && callback !== targetCallback
		));
	},
	
	set(obj, key, value){
		switch(key){
			// not allowed to change these values     
			case "subscribe":
			case "unsubscribe":
			case "subscriptions":
				// report failure
				return false;
			
			default: {
				// determine if the value of the target has changed	
				const changed = typeof value === "object" 
					? !UTILS.shallowEquals(obj[key], value) 
					: obj[key] !== value;
				
				// only change it if the value changes
				if(changed){
					// change the key
					obj[key] = value;

					// then fire any callbacks related to the changed key
					for(let { key: target, callback } of this.subscriptions){
						if(key === target) callback(key, value)
					}
				}

				// report success
				return true;
			}
		}
	},
	
	get(obj, key){
		switch(key){
			case "subscribe":
				return this.subscribe.bind(this);
			case "unsubscribe":
				return this.unsubscribe.bind(this);
			case "subscriptions":
				return this.subscriptions;
			default:
				return obj[key];
		}
	}
};

const state = new Proxy(
	{ ...CONFIG.initialState }, 
	subscriptionHandler
);

export default state;