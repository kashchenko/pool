import { RenderElement } from '../entities/renderElement';

export class Intersection{
	
	private pairs: Array<[RenderElement, RenderElement]>;
	
	constructor(elements: RenderElement[]){
		
		this.pairs = [];
		
		for(var i: number = 0; i< elements.length; i++){
			for(let k = i; k < elements.length; k++){
				this.pairs.push([elements[i], elements[k]]);
			}
		}
	}
	
	watch(){
		
		var that = this;
		that.pairs.forEach((p) => {
			
		})
	}
	
}