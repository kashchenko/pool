import { RenderElement } from '../entities/renderElement';
import { Point } from '../units/point';

export class Container{
	
	private elements: RenderElement[];
	
	canvas: CanvasRenderingContext2D;
	
	constructor(private container: RenderElement){
		
		this.elements = [];
		var that = this;
		
		setInterval(() => {
			
			that.elements.forEach((e) => {
				
				var distance = new Point(
					container.center.x - e.center.x,
					container.center.y - e.center.y
				);
				
				var projection: number = e.velocity.dot(distance) / distance.magnitude();
				
				if(
					distance.magnitude() + e.avgWidth >= container.avgWidth - 5 &&
					projection > 0){
					
					e.velocity = e.velocity.reflect(distance.normalize());
				}
			});
		}, 0.1);
	}
	
	include(element: RenderElement){
		this.elements.push(element);
	}
}