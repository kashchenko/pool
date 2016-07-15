export class Point{
	
	constructor(
		public x: number = 0, 
		public y: number = 0) {
	}
	
	add(point: Point){
		return new Point(
			this.x + point.x,
			this.y + point.y
		)
	}
		
	substract(point: Point){
		return new Point(
			this.x - point.x,
			this.y - point.y
		);
	}
	
	dot(point: Point){
		return this.x * point.x + this.y * point.y;
	}
	
	multiply(scalar: number){
		return new Point(
			this.x * scalar,
			this.y * scalar
		);
	}
	
	magnitude(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	
	angle(){
		return Math.asin(this.normalize().x);
	}
	
	normalize(){
		
		var magnitude = this.magnitude();
		
		return new Point(
			this.x / magnitude,
			this.y / magnitude
		);
	}
	
	reflect(normal: Point){
	
		var dn = normal.multiply(this.dot(normal) * 2);
		
		return this.substract(dn);
	}
}