//游戏引擎: 对象
//加载游戏
//创建我的飞机
//创建敌机
//碰撞检测
//...


var gameEngine = {
	//属性
	ele:null,
	allBullets:[],//页面上所有子弹
	allEnemys:[],//页面上所以敌机
	totalScore:0,
	//方法
	//初始化
	init:function(){
		this.ele = document.getElementById("main");
		return this;
	},
	//开始游戏
	start:function(){
		console.log("开始游戏");
		//加载游戏
		this.loadding(function(){
			console.log("正式开始游戏");
			//创建myPlane
			myPlane.init().move();//拖拽
			gameEngine.listenKeybord();//键盘移动
			myPlane.fireBullet();//发射子弹
			//创建enemy
			gameEngine.createEnemy();
			//碰撞检测
			gameEngine.crash();
			//移动背景图
			gameEngine.movebackground();
		});
	},
	//加载游戏
	loadding:function(callback){
		console.log("开始加载游戏");
		//logo
		var logo = document.createElement("div");
		this.ele.appendChild(logo);
		logo.className = "logo";
		//load
		var load = document.createElement("div");
		this.ele.appendChild(load);
		load.className = "load";
		var i = 1;
		var timer=setInterval(()=>{
			++i;
			if(i>=8){
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				callback();
				
			}
			else{
				load.style.background = `url(images2/loading${i%4}.png) no-repeat`;
			}
		},300)
	},
	//监听键盘
	listenKeybord:function(){
		var xspeed = 0;
		var yspeed = 0;
		onkeydown = function(e){
			e=e || event;
			//判断方向
			if(e.keyCode == 37){//左
				xspeed = -10;
			}
			else if(e.keyCode == 38){//上
				yspeed = -10;
			}
			else if(e.keyCode == 39){//右
				xspeed = 10;
			}
			else if(e.keyCode == 40){//下
				yspeed = 10;
			}
			//左右边界
//			var x = myPlane.ele.offsetLeft + xspeed;
//			if(x<0){
//				x = 0;
//			}
//			if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
//				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
//			}
//			myPlane.ele.style.left = x + "px";
//			myPlane.ele.style.top = myPlane.ele.offsetTop + yspeed + "px";
		}
		onkeyup = function(e){
			e=e || event;
			if(e.keyCode == 37 || e.keyCode == 39){
				xspeed = 0;
			}
			else if(e.keyCode == 38 || e.keyCode == 40){
				yspeed = 0;
			}
		}
		setInterval(function(){
			var x = myPlane.ele.offsetLeft + xspeed;
			if(x<0){
				x = 0;
			}
			if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = myPlane.ele.offsetTop + yspeed + "px";
		},30)
	},
	//创建敌机
	createEnemy:function(){
		//大
		setInterval(function(){
			var flag = Math.random()>0.5?true:false;
			if(flag){
				var enemy = new Enemy(3);
				enemy.init().move();
			}
		},6000);
		//中
		setInterval(function(){
			var flag = Math.random()>0.4?true:false;
			if(flag){
				var enemy = new Enemy(2);
				enemy.init().move();
			}
		},3000);
		//小
		setInterval(function(){
			var flag = Math.random()>0.3?true:false;
			if(flag){
				var enemy = new Enemy(1);
				enemy.init().move();
			}
		},1000);
	},
	crash:function(){
		var timer = setInterval(function(){
			for(var i=0; i<gameEngine.allEnemys.length; i++){
				for(var j=0; j<gameEngine.allBullets.length; j++){
					//子弹与敌机碰撞
					if( isCrash( gameEngine.allEnemys[i].ele,gameEngine.allBullets[j].ele) ){
						//这个子弹爆炸,数组中移出
						gameEngine.allBullets[j].boom();
						gameEngine.allBullets.splice(j,1);
						
						//敌机受一点伤害
						gameEngine.allEnemys[i].hurt();
					}
				}
				//敌机与我是否碰撞
				if(isCrash( gameEngine.allEnemys[i].ele,myPlane.ele)){
					myPlane.boom(function(){
						var myName = prompt("请留下您的大名，您的当前分数是："+gameEngine.totalScore,"");
						console.log(gameEngine.totalScore)
						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name: myName,score: gameEngine.totalScore},
							success: function(data){
								console.log("提交成功: " + data);
								//进入排行榜
								location.href = "rand.html";
							}
						})
					});
					break;
				}
			}
		},20);
	},
	movebackground:function(){
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		},30);
	}
}



