import { RenderElement } from './index';
import { Point } from '../units/point';

export class Tail extends RenderElement{
	
	private animationKey: number;
	private animationHandle;
	private angle: number;
	private speed: number;
		
	constructor(private length: number){
		super(new Point(0, 0));
		
		this.speed = length / 400;
		this.angle = 0;
	}
	
	move(){
		var that = this;
		var tailAngle: number = 0;
		var degreeRadian = (Math.PI) / 45;
		
		this.animationHandle = setInterval(() => {
			
			that.acceleration.x = Math.sin(that.angle) * that.speed;
			that.acceleration.y = Math.cos(that.angle) * that.speed;
		
			if(tailAngle >= 2 * Math.PI){
				tailAngle = 0;
			}else{
				tailAngle += degreeRadian;
			}
			
			that.animationKey = Math.sin(tailAngle);
		}, 1);
	}
	
	stop(){
		clearInterval(this.animationHandle);
	}
	
	draw(canvas: CanvasRenderingContext2D, angle: number, tailBase: Point){
		
		super.render(canvas);
		
		this.angle = angle;
		
		this.center = tailBase;
		
		canvas.beginPath();
		canvas.fillStyle = 'orange';
			
		canvas.ellipse(tailBase.x, tailBase.y, 3, 3, 0, 0, 2* Math.PI);
		canvas.fill();
		
		var cp1: Point = new Point(
			tailBase.x + Math.sin(angle + this.animationKey) * this.length / 3,
			tailBase.y + Math.cos(angle + this.animationKey) * this.length / 3
		);
		
		var cp2: Point = new Point(
			tailBase.x + Math.sin(angle - this.animationKey) * (3 * this.length) / 4,
			tailBase.y + Math.cos(angle - this.animationKey) * (3 * this.length) / 4
		);
		
		var tailEnd: Point = new Point(
			tailBase.x + Math.sin(angle + this.animationKey / 2) * this.length,
			tailBase.y + Math.cos(angle + this.animationKey / 2) * this.length
		);
		
		canvas.strokeStyle = 'yellow';
		canvas.beginPath();
		canvas.moveTo(tailBase.x, tailBase.y);
	
		canvas.bezierCurveTo(
			cp1.x, cp1.y,
			cp2.x, cp2.y,
			tailEnd.x, tailEnd.y);
			
		canvas.stroke();
	}
}