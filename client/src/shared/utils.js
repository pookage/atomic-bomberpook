export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}// randomInt

export function debounce(callback, ...args){
	clearTimeout(this.debounceCallback);
	const delay = 1000;
	this.debounceCallback = setTimeout(() => callback(...args), delay);
}// debounce