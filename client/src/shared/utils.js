export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}// randomInt

export function debounce(callback, delay=500){
	clearTimeout(this.debounceCallback);
	this.debounceCallback = setTimeout(callback, delay);
}// debounce