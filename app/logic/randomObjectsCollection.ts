export class RandomObjectCollection<T>{
	private elements: T[];
	
	constructor(maxElements: number, createElement: (count: number) => T){
		
		this.elements = [];
		
		var count: number = Math.floor(Math.random() * maxElements) + 1;
		
		while(this.elements.length < count){
			this.elements.push(createElement(count));
		}
	}
	
	length(){
		return this.elements.length;
	}
	
	all(): T[]{
		return this.elements.slice();
	}
	
	get(): T{
		var randomElement = Math.floor(Math.random() * (this.elements.length));
		return this.elements[randomElement];
	}
}