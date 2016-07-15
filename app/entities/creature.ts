import { RenderElement, Tail } from './index';
import { Point } from '../units/point';
import { Connection } from '../constraints/connection';

export class Creature extends RenderElement {
	
	private width: number;
	private height: number;
	private angle: number;
	private tail: Tail;
	private tailConnection: Connection
	
	constructor(center: Point, angle: number, size: number = 20){
		super(center);
		
		this.angle = angle;
			
		this.width = size;
		this.height = size * 0.4;
		
		this.avgWidth = (this.width + this.height) / 2;
		
		var tailLength: number = size * 2;
		this.tail = new Tail(tailLength);
		
		this.tail.move();
		
		this.tailConnection = new Connection(this);
		this.tailConnection.connect(this.tail);
				
		this.rotateChaotic();
	}

	private rotateChaotic(){
		var that = this;
		var degreeRadian = (Math.PI) / 90;
		
		setInterval(() => {
			 that.angle += (Math.random() * 0.3) - 0.15;
		}, 100);
	}
	
	private drawBody(canvas: CanvasRenderingContext2D){
		canvas.strokeStyle = 'yellow';
		
		canvas.beginPath();
		
		canvas.ellipse(this.center.x, this.center.y, this.height, 
			this.width, - this.angle, 0, 2 * Math.PI);
			
		canvas.stroke();	
	}
	
	private drawTail(canvas: CanvasRenderingContext2D){
		
		var tailBase: Point = new Point(
			this.center.x + Math.sin(this.angle) * this.width,
			this.center.y + Math.cos(this.angle) * this.width
		);
		
		this.tail.draw(canvas,this.angle, tailBase);
	}
	
	render(canvas: CanvasRenderingContext2D) {
		super.render(canvas);
		
		this.drawBody(canvas);
		this.drawTail(canvas);
		
		//this.debugInfo(canvas);
	}
	
	debugInfo(canvas: CanvasRenderingContext2D){
		
		canvas.strokeStyle = 'green';
		canvas.beginPath();
		canvas.moveTo(this.center.x, this.center.y);
		canvas.lineTo(this.center.x - this.velocity.x * 5, this.center.y - this.velocity.y * 5);
		canvas.stroke();
	}
}