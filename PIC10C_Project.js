function init()
{
	divBall1 = document.getElementById("ball1");
	divFoe1 = document.getElementById("foe1");
	divFoe2 = document.getElementById("foe2");
	divFoe3 = document.getElementById("foe3");
	divFoe4 = document.getElementById("foe4");
	divFoe5 = document.getElementById("foe5");
	divGame = document.getElementById("game");
	divPlayer = document.getElementById("player");
	divPlay = document.getElementById("playGame");
	divPlay2 = document.getElementById("playGame2");
	divCountDown = document.getElementById("countDown");
	divClock = document.getElementById("clock");
	divScore = document.getElementById("score");
	gameActive = false;
	mouseActive = false;
	divPlay2.onclick = continue_game;
	divPlay.onclick = start;
}

function start()
{
	divPlay.style.display = "none";

	//Click Event
	document.onmousemove = moveMouse;

	//Width and Height 
	ballWidth = divBall1.offsetWidth;
	ballHeight = divBall1.offsetHeight;
	foeWidth = divFoe1.offsetWidth;
	foeHeight = divFoe1.offsetHeight;
	gameLeft = divGame.offsetLeft;
	gameWidth = divGame.offsetWidth;
	gameRight = gameLeft+gameWidth;
	gameTop = divGame.offsetTop;
	gameHeight = divGame.offsetHeight;
	gameBottom = gameTop+gameHeight;
	playerWidth = divPlayer.offsetWidth;
	playerHeight = divPlayer.offsetHeight;


	//Set location of player
	divPlayer.style.left = gameLeft + gameWidth/2 - playerWidth/2  + "px";
	divPlayer.style.top = gameTop + 440 + "px";

	//Variable Initialization
	canShoot = true;
	angle = 0;
	level = 1;
	counter = 0;
	countDownCounter = 4;
	points = 0;

	//Get keystrokes
	keyPressed = 0;
	document.addEventListener("keydown",function(e){
		if (e.which == 65 && angle > -3){
			 angle--;
			 rotateAngle = angle*5;
			 divPlayer.style.transform = "rotate("+rotateAngle+"deg)";
		}
		if (e.which == 68 && angle < 3){
			angle++;
			rotateAngle = angle*5;
			divPlayer.style.transform = "rotate("+rotateAngle+"deg)";
		}
		divScore.innerHTML = angle;
	});

	//Make balls
	b1 = new animatedObject(divBall1,-5000,-5000);
	b1Active = false;
	start_game();
}

function start_game(){
	divPlay2.style.display = "block";
	if (level = 1){
		//Enemy location
		enemy1 = new animatedObject(divFoe1,locRand(10,700),locRand(10,200));
		enemy2 = new animatedObject(divFoe2,locRand(10,700),locRand(10,200));
		enemy3 = new animatedObject(divFoe3,locRand(10,700),locRand(10,200));
		enemy1.dx = -6 + Math.floor(Math.random()*13);
		enemy2.dx = -6 + Math.floor(Math.random()*13);
		enemy3.dx = -6 + Math.floor(Math.random()*13);
	}
}

function level_init()
{
	gameActive = true;
	divPlay2.style.display = "none";
	
	//Levels
	if (level == 1){
		level1();
	}
	
}

function level1()
{
	if (!gameActive)
		return;

	animate_enemy(enemy1);
	animate_enemy(enemy2);
	animate_enemy(enemy3);
	
	setTimeout("level1()",10);
}

function clearScreen()
{

}

function shoot()
{
	if(gameActive && canShoot){
		canShoot = false;
		setTimeout(function(){canShoot=true;},600);
		//Current player position
		playerLeft = divPlayer.offsetLeft;
		playerRight = playerLeft+20;
		b1.xLoc = playerLeft+playerWidth/4;
		b1.yLoc = divPlayer.offsetTop;
		b1.dy = -18;
		b1.dx = angle*3;
		//Move Ball
		if (!b1Active)
		{
			animate_ball(b1);
			b1Active = true;
		}
		
	}
		
}


function animate_ball(b)
{
	if(!gameActive)
		return;
	b.changeX();
	b.addEnergyLossX(0.01);
	b.addEnergyLossY(0.3);

	//Calculate Vertical Movement
	b.accelerateY(0.1);  //Gravity
	b.changeY();
		

	//Horizontal wall collison detection
	if(b.xLoc<gameLeft || b.xLoc+foeWidth>gameRight)
	{	
		b.reverseX();
	}

	//Vertical collision detection
	if(b.yLoc+foeHeight>gameBottom)
	{
		b.fixVerticalLocation(25);
		b.reverseY();
		b.addEnergyLossY(2);
	}
	setTimeout("animate_ball(b1)",10);


}

function animate_enemy(en)
{
	if(!gameActive)
		return;
	//Calculate Horizontal Movement
	en.changeX();
	en.addEnergyLossX(0.005);
	en.addEnergyLossY(0.1);

	//Calculate Vertical Movement
	en.accelerateY(0.05);  //Gravity
	en.changeY();
	
	//Horizontal wall collison detection
	if(en.xLoc<gameLeft || en.xLoc+foeWidth>gameRight)
	{	
		en.reverseX();
	}

	//Vertical collision detection
	if(en.yLoc+foeHeight>gameBottom)
	{
		en.fixVerticalLocation(27);
		en.reverseY();
		en.addEnergyLossY(0.3);
	}
	//Ball collision detection
	if(en.yLoc+foeHeight> b1.yLoc && en.yLoc < b1.yLoc+ballHeight
		&& en.xLoc+foeWidth> b1.xLoc && en.xLoc < b1.xLoc+ballWidth)
	{
		ballHit();
	}


}

function animatedObject(item, xLoc, yLoc) {
	//Initalization
	this.xLoc = gameLeft + xLoc;
	this.yLoc = gameTop + yLoc;
	//this.dx = Math.round(Math.random())*(-6) + 3; //Either -3 or 3
	this.dx = 0.0; //Between -3 to 3
	this.dy = 0.0;
	this.item = item;
	this.acceleration = 0.5;
	//Initial position
	item.style.left =  this.xLoc + "px";
	item.style.top = this.yLoc + "px";
	//Mutator
	this.changeX = function() {
		this.xLoc = this.xLoc + this.dx;
		item.style.left = this.xLoc + "px";
	};
	this.changeY = function() {
		this.yLoc = this.yLoc + this.dy;
		item.style.top = this.yLoc + "px";
	};
	this.reverseX = function() {
		this.dx = this.dx*-1;
	};
	this.reverseY = function() {
		this.dy = this.dy*-1;
	};
	this.accelerateY = function(acc) {
		this.dy = this.dy + acc;
	};
	this.fixVerticalLocation = function(fix) {
		this.yLoc = gameBottom-fix;
		item.style.top = this.yLoc + "px";
	};
	this.addEnergyLossY = function(loss) {
		this.dy = this.dy + loss;
	};
	this.addEnergyLossX = function(loss) {
		if (this.dx-loss < 0)
			loss = loss*-1;
		if (Math.abs(this.dx) < 0.1) //prevent movement
		{
			this.dx = 0;
			loss = 0;
		}
		this.dx = this.dx - loss;
	};	
}


//AUXILIARY FUNCTIONS________________________________________________
function locRand(pos, range){
	return pos + Math.floor((Math.random() * range));
}

function Clock()
{
	divCountDown.innerHTML = "";
	counter++;
	minutes = Math.floor(counter/60);
	seconds = (counter%60);
	if (minutes < 10)
		minutes = "0" + minutes;
	if (seconds < 10)
		seconds = "0" + seconds;
	divClock.innerHTML = minutes + ":" + seconds;
	setTimeout("Clock()",1000);
}

function moveMouse(e){
	if (!mouseActive)
		return;
	prevY = divPlayer.offsetTop;
	x=e.pageX;
	y=e.pageY;

	//Move horizontal within border
	if (x > gameLeft + playerWidth/2 && x < gameRight - playerWidth/2)
		divPlayer.style.left = x - (playerWidth/2) + "px";
	else if (x < gameLeft + playerWidth)
		divPlayer.style.left = gameLeft + 5 + "px";
	else if (x > gameRight - playerWidth)
		divPlayer.style.left = gameRight - playerWidth + "px";
}

function continue_game() {
	divGame.style.cursor = "none";
	divPlay2.style.display = "none";
	mouseActive = true;
	countDown();
}

function countDown()
{
	countDownCounter--;
	if (countDownCounter== 0)
	{
		divCountDown.innerHTML = "";
		setTimeout("Clock()",1000);
		level_init();
	}
	else{
		divCountDown.innerHTML = countDownCounter;
		setTimeout("countDown()",300);
	}
}
