import { RenderElement } from './renderElement';
import { Point } from '../units/point';

export class LiveObject extends RenderElement{
	
	age: number;
	private liveHandle;
	
	constructor(center: Point){
		super(center);
		this.age = 0;
		
		var that = this;
		
		this.liveHandle = setInterval(() => {that.grow();}, 200);
	}
	
	protected grow(){
		this.age++;
	}
	
	protected die(){
		clearInterval(this.liveHandle);
	}
}