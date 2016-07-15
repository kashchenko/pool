import { RenderElement } from './renderElement';
import { Point } from '../units/point';
import { Container } from '../constraints/container';

export class Pool extends RenderElement{
	
	private container: Container;
	
	constructor(center: Point, public size: number, private circleAngle = 2 * Math.PI){
		super(center);
		
		this.avgWidth = this.size - 2;
		
		this.container = new Container(this);
	}
	
	render(canvas: CanvasRenderingContext2D){
			
		super.render(canvas);
		
		canvas.strokeStyle = 'lightGray';
		
		canvas.beginPath();
		canvas.arc(this.center.x, this.center.y, this.size, 0, this.circleAngle);
		canvas.stroke();
	}
	
	include(element: RenderElement){
		this.container.include(element);
	}
}