import { Point } from './units/point';
import { World } from './world';
import { Config } from './config';
import { Injector } from './injector';

(function(doc){
	
	var canvas = <HTMLCanvasElement> doc.createElement('canvas');
	
	var width: number = doc.body.scrollWidth;
	var height: number = doc.body.scrollHeight;
	
	canvas.width = width;
	canvas.height = height;
	
	doc.body.appendChild(canvas);
	
	var center: Point = new Point(width / 2, height / 2);
	var bounds: Point = new Point(width, height);
	
	var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
	
	var injector: Injector = new Injector(bounds, center);
	var world: World = new World(ctx, bounds, injector);
	
	world.start(Config.renderTimeout);
	
}(document))