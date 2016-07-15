import { Point } from './units/point';
import { RenderElement } from './entities/renderElement';
import { Injector } from './injector';

export class World{	

	constructor(
		private canvas: CanvasRenderingContext2D, 
		private bounds: Point,
		private injector: Injector,
		private dragForce: number = 0.08,
		private dragThreshold = 0.03){
		console.log('I\'m alive!');
	}
	
	private clear(){
		this.canvas.fillStyle = 'black';
		this.canvas.fillRect(0, 0, this.bounds.x, this.bounds.y);	
	}
	
	private live(){
		
		this.clear();
		
		var that = this;
		
		this.injector.elements.forEach(function(e: RenderElement){
			e.render(that.canvas);
			that.drag(that, e);
		});
	}
	
	private drag(world: World, e: RenderElement){
		
		if(Math.abs(e.velocity.x) < world.dragThreshold){
			e.velocity.x = 0;
		}
		
		if(Math.abs(e.velocity.y) < world.dragThreshold){
			e.velocity.y = 0;
		}
		
		if(e.velocity.x != 0){
			e.velocity.x = e.velocity.x > 0
				? e.velocity.x - world.dragForce
				: e.velocity.x + world.dragForce;
		}
		
		if(e.velocity.y != 0){
			e.velocity.y = e.velocity.y > 0
				? e.velocity.y - world.dragForce
				: e.velocity.y + world.dragForce;
		}			
	}
	
	start(timeout: number){
		
		var handle = setInterval(() => {
			try{
				this.live();
			}
			catch(error){
				clearInterval(handle);	
				console.log('I\'m stopped due to ' + error);
			}
		}, timeout);
		
	}
}