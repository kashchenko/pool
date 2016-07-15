import { Point } from '../units/point';

export class RenderElement{
	
	velocity: Point;
	
	acceleration: Point;
	
	avgWidth: number;
	
	constructor(public center: Point){
		
		this.velocity = new Point();
		this.acceleration = new Point();
	}
		
	render(canvas: CanvasRenderingContext2D): void {
		this.center.x -= this.velocity.x;
		this.center.y -= this.velocity.y;
	}
}