//敌机
class Enemy{
	//属性
	constructor(type){
		this.ele = null;
		this.hp = 1;
		this.speed = 10;
		this.dieImgs = [];
		this.score = 0;
		this.type = type;
	}
	//方法
	//初始化
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		//将所有敌机添加到数组中
		gameEngine.allEnemys.push(this);
		
		switch(this.type){
			//daxing
			case this.Enemy_Type_Large:
				this.ele.className = "enemy-large";
				this.speed = this.Enemy_Speed_Large;
				this.hp = this.Enemy_Hp_Large;
				this.dieImgs = ["images2/plane3_die1.png","images2/plane3_die2.png","images2/plane3_die3.png","images2/plane3_die4.png","images2/plane3_die5.png","images2/plane3_die6.png"];
				this.score = 30;
				break;
			case this.Enemy_Type_Middle:
				this.ele.className = "enemy-middle";
				this.speed = this.Enemy_Speed_Middle;
				this.hp = this.Enemy_Hp_Middle;
				this.dieImgs = ["images2/plane2_die1.png","images2/plane2_die2.png","images2/plane3_die3.png","images2/plane2_die4.png"];
				this.score = 20;
				break;
			case this.Enemy_Type_Small:
				this.ele.className = "enemy-small";
				this.speed = this.Enemy_Speed_Small;
				this.hp = this.Enemy_Hp_Small;
				this.dieImgs = ["images2/plane1_die1.png","images2/plane1_die2.png","images2/plane1_die3.png"];
				this.score = 10;
				break;
			default:
				alert("没有该敌机");
		}
		//位置
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth))+"px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		return this;
	}
	//动画
	move(){
		let that = this;
		this.timer = setInterval(()=>{
			if(that.ele.offsetTop > gameEngine.ele.offsetHeight){
				clearInterval(this.timer);
				gameEngine.ele.removeChild(that.ele);
				//数组中移出消失的敌机
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(that),1);
			}
			else{
				that.ele.style.top = that.ele.offsetTop + that.speed + "px";
			}
		},30);
	}
	//受伤
	hurt(){
		this.hp--;
		if(this.hp == 0){
			this.boom();
			gameEngine.totalScore +=this.score;
		}
	}
	//爆炸
	boom(){
		clearInterval(this.timer);
		//动画
		let i = 0;
		let that = this;
		let dietimer = setInterval(()=>{
			if(i>=that.dieImgs.length){
				clearInterval(dietimer);
				gameEngine.ele.removeChild(that.ele);
			}
			else{
				that.ele.style.backgroundImage = `url(${that.dieImgs[i++]})`;
			}
		},200);
	} 
}
	Enemy.prototype.Enemy_Type_Large=3;
	Enemy.prototype.Enemy_Type_Middle=2;
	Enemy.prototype.Enemy_Type_Small=1;
	
	Enemy.prototype.Enemy_Speed_Large=2;
	Enemy.prototype.Enemy_Speed_Middle=3;
	Enemy.prototype.Enemy_Speed_Small=6;
	
	Enemy.prototype.Enemy_Hp_Large=3;
	Enemy.prototype.Enemy_Hp_Middle=2;
	Enemy.prototype.Enemy_Hp_Small=1;

