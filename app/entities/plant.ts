import { RenderElement } from './index';
import { LiveObject } from './liveObject';
import { Point } from '../units/point';
import { PlantRay } from './index';
import { RandomObjectCollection } from '../logic/randomObjectsCollection';

export class Plant extends LiveObject {
	
	private rays: RandomObjectCollection<PlantRay>;
	
	constructor(center: Point){
		super(center);
		this.createRays();	
	}
	
	private createRays(){
		var rayCount = 7;
		var rayAngle = 2 * Math.PI / (rayCount - 1);
		var angle = Math.random() * Math.PI;
		
		var that = this;
		
		this.rays = new RandomObjectCollection<PlantRay>(rayCount, () =>{
			var ray = new PlantRay(that.center, angle, 0);
			angle += rayAngle;
			return ray;
		});
	}
	
	grow(){
		super.grow();		
		
		if(this.rays.length() > 0){
			this.rays.get().grow();
		}		
	}
	
	private renderBody(canvas: CanvasRenderingContext2D){
		canvas.fillStyle = 'green';
		canvas.beginPath();
		canvas.ellipse(this.center.x, this.center.y, 4, 4, 0, 0, 2* Math.PI);
		canvas.fill();
	}
	
	render(canvas: CanvasRenderingContext2D){
		super.render(canvas);
		this.rays.all().forEach(r => r.draw(canvas));
		this.renderBody(canvas);
	}
} 