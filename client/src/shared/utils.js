export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}// randomInt

export function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}// clamp

export function debounce(callback, ...args){

	clearTimeout(this.debounceCallback);
	const delay = 1000;
	this.debounceCallback = setTimeout(() => callback(...args), delay);
}// debounce

export function shallowEquals(obj1, obj2){
	// if this has been called on the same object, just skip and return true
	if(obj1 === obj2) return true;

	// if one of the objects is actually null or undefined, skip and say false
	else if(!obj1 || !obj2) return false;

	// otherwise compare'em
	else {
		return (
			Object.keys(obj1).length === Object.keys(obj2).length &&
			Object.keys(obj1).every(
				key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
			)
		);
	}
}// shallowEquals

export function resolve(path, obj){
	return path.split('.').reduce(
		(parent, child) => parent && parent[child] || null, 
		obj
	);
}// resolve
