import { Pool, Plant, Creature, RenderElement } from './entities/index'
import { Point } from './units/point';

export class Injector{
	
	elements: RenderElement[];
	private pool: Pool;
	
	constructor(private bounds: Point, private center: Point, private poolSize: number = bounds.y  / 2 - 50){
		
		this.pool = new Pool(this.center, this.poolSize);
		this.elements = [this.pool];

		this.habitate();
		//this.habitatePlant();
	}

	private habitatePlant(){
		var plant = new Plant(this.randomPoint());
			
		this.elements.push(plant);
		this.pool.include(plant);	
	}
	
	private habitate(){
		
		var plantsCount = Math.floor(Math.random() * 5);
		var creaturesCount = Math.floor(Math.random() * 7);
		
		for(var i = 0; i < plantsCount; i++){
			var plant = new Plant(this.randomPoint());
			
			this.elements.push(plant);
			this.pool.include(plant);	
		}
		
		for(var i = 0; i < creaturesCount; i++){
			var creature = new Creature(this.randomPoint(), Math.random() * Math.PI * 2);
			
			this.elements.push(creature);
			this.pool.include(creature);
		}
	}
	
	private randomPoint(){
		
		var poolHalf = this.poolSize / 2;
		
		return new Point(
			Math.random() * poolHalf - poolHalf / 2 + this.center.x, 
			Math.random() * poolHalf - poolHalf / 2 + this.center.y);
	}
}