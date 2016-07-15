import { Point } from '../units/point';
import { RandomObjectCollection } from '../logic/randomObjectsCollection';

export class PlantRay{
	
	private rays: RandomObjectCollection<PlantRay>;
	private ray: Point;
	private raysCount: number;
	
	constructor(private center: Point, private angle: number, private generation: number){
		this.ray = new Point(Math.sin(angle), Math.cos(angle)).multiply(3.5);
		
		this.rayCount = 3;
	}
	
	private generateRays(){
		var rayAngle = Math.PI / this.rayCount;
		var angle = this.angle - (rayAngle * this.rayCount) / 2;
		
		this.rays = new RandomObjectCollection<PlantRay>(7, (rayCount: number) => {
			var ray = new PlantRay(this.end(), angle, this.generation + 1);
			angle += rayAngle;
			
			return ray;
		});
	}
	
	grow(){
		
		var growRate = 1 + 2 / this.ray.magnitude();
		
		if(growRate < 1.1){
			if(!this.rays){
				this.generateRays();
			}
		
			this.rays.get().grow();
		}else{
			this.ray = this.ray.multiply(growRate);
		}
	}
	
	private end(){
		return this.center.add(this.ray);
	}
	
	draw(canvas: CanvasRenderingContext2D){
		canvas.beginPath();
		canvas.moveTo(this.center.x, this.center.y);
		canvas.lineTo(
			this.center.x + this.ray.x,
			this.center.y + this.ray.y);
			
		canvas.strokeStyle = 'lightGreen';
		canvas.stroke();
		
		if(this.rays){
			this.rays.all().forEach((r:PlantRay) => {r.draw(canvas); });
		}
	}
}