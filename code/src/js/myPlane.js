var myPlane = {
	//
	ele:null,
	fireInterval:300,//子弹发射间隔，游戏困难程度
	//初始化
	init:function(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = "myplane";
		this.ele.style.left = (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2+"px";
		this.ele.style.top = gameEngine.ele.offsetHeight-this.ele.offsetHeight+"px";
		return this;
	},
	//我的飞机移动
	move:function(){
		console.log("我的飞机移动");
		this.ele.onmousedown = function(e){
			e=e || event;
			var disx = e.offsetX;
			var disy = e.offsetY;
			document.onmousemove = function(e){
				e=e || event;
				e.preventDefault();
				var x = e.pageX-gameEngine.ele.offsetLeft-disx;
				if(x<0){
					x = 0;
				}
				else if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
					x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
				}
				myPlane.ele.style.left = x+"px";
				myPlane.ele.style.top = e.pageY-gameEngine.ele.offsetTop-disy+"px";
			}
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
	},
	//发射子弹
	fireBullet:function(){
		setInterval(function(){
			var bullet = new Bullet();
			bullet.init().move();
		},this.fireInterval)
	},
	//爆炸
	boom:function(callback){
		clearInterval(this.timer);
		//动画
		var dieImgs = ["images2/me_die1.png", "images2/me_die2.png","images2/me_die3.png","images2/me_die4.png"];
		var i = 0;
		var dietimer = setInterval(function(){
			if(i >= dieImgs.length){
				clearInterval(dietimer);
				gameEngine.ele.removeChild(myPlane.ele);
				callback();
			}
			else{
				myPlane.ele.style.backgroundImage = "url("+dieImgs[i++]+")";
			}
		},200);
	}
}
