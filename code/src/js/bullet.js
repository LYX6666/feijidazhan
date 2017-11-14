//子弹
class Bullet{
	//属性
	constructor(){
		this.ele = null;
	}
	//方法
	//初始化
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		//将所有子弹添加到数组中
		gameEngine.allBullets.push(this);
		
		this.ele.className = "bullet";
		this.ele.style.left = myPlane.ele.offsetLeft+(myPlane.ele.offsetWidth-this.ele.offsetWidth)/2+1+"px";
		this.ele.style.top = myPlane.ele.offsetTop-this.ele.offsetHeight+"px";
		return this;
	}
	//子弹动画移动
	move(){
		let that = this;
		this.timer=setInterval(()=>{
			if(that.ele.offsetTop<-18){
				clearInterval(that.timer);
				gameEngine.ele.removeChild(that.ele);
				//数组中移出消失的子弹
				gameEngine.allBullets.splice(gameEngine.allBullets.indexOf(that),1);
			}
			that.ele.style.top = that.ele.offsetTop-10+"px";
		},30)
		return this;
	}
	//爆炸
	boom(){
		clearInterval(this.timer);
		this.ele.className = "bularr-die";
		//动画
		let dieImgs = ["images2/die1.png", "images2/die2.png"];
		let i = 0;
		let that = this;
		let dietimer = setInterval(()=>{
			if(i>=dieImgs.length-1){
				clearInterval(dietimer);
				gameEngine.ele.removeChild(that.ele);
			}
			else{
				that.ele.style.backgroundImage = url(dieImgs[++i]+"");
			}
		},200);
	}
}
