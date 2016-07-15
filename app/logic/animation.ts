export class Animation{
	
	private handle;
	
	constructor(private callback: () => void){}
	
	start(speed: number){
		
		let that = this;
		
		this.handle = setInterval(() => {
			
			this.callback();	
					
		}, speed);
	}
	
	stop(){
		clearInterval(this.handle);
	}
}