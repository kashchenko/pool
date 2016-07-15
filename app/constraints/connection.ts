import { RenderElement } from '../entities/renderElement';

export class Connection{
	
	private elements: RenderElement[];
	private handle;
	
	constructor(private connector1: RenderElement){	
		this.elements = [connector1];
	}
	
	connect(connector2: RenderElement){
		var connected = this.elements;
		connected.push(connector2);
				
		this.handle = setInterval(() => {
			var total = connected
			.map((e) => { return {x: e.acceleration.x, y: e.acceleration.y}; })
			.reduce((total, a) => {
				return {
					x: total.x + a.x,
					y: total.y + a.y
				};
			});
			
			connected.forEach((c) => {
				c.velocity.x += total.x;
				c.velocity.y += total.y;
			});
			
		}, 40);
	}
}