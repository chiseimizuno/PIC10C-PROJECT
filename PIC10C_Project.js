function init()
{
	divBall1 = document.getElementById("ball1");
	divBall2 = document.getElementById("ball2");
	divBall3 = document.getElementById("ball3");
	divBall4 = document.getElementById("ball4");
	divBall5 = document.getElementById("ball5");
	divGame = document.getElementById("game");
	divPlayer = document.getElementById("player");
	divPlay = document.getElementById("playGame");
	divCountDown = document.getElementById("countDown");
	divClock = document.getElementById("clock");
	divScore = document.getElementById("score");
	divPlay.onclick = start;
}

function start()
{
	//Click Event
	//document.onmousemove = moveMouse;
	divPlay.style.display = "none";
	divGame.style.cursor = "none";

	//Width and Height 
	ballWidth = divBall1.offsetWidth;
	ballHeight = divBall1.offsetHeight;
	gameLeft = divGame.offsetLeft;
	gameWidth = divGame.offsetWidth;
	gameRight = gameLeft+gameWidth;
	gameTop = divGame.offsetTop;
	gameHeight = divGame.offsetHeight;
	gameBottom = gameTop+gameHeight;
	playerWidth = divPlayer.offsetWidth;
	playerHeight = divPlayer.offsetHeight;

	//Set location of player
	divPlayer.style.left = gameLeft + 700 + "px";
	divPlayer.style.top = gameTop + 450 + "px";

	//Ball Location
	enemy1 = new enemy(divBall1,locRand(10,700),locRand(10,200));
	enemy2 = new enemy(divBall2,locRand(10,700),locRand(10,200));
	enemy3 = new enemy(divBall3,locRand(10,700),locRand(10,200));
	enemy4 = new enemy(divBall4,locRand(10,700),locRand(10,200));
	enemy5 = new enemy(divBall5,locRand(10,700),locRand(10,200));

	//Variable Initialization
	counter = 0;
	points = 0;

	//Get keystrokes
	keyPressed = 0;
	document.addEventListener("keydown",function(e){
		if (e.which == 65){
			divPlayer.style.left = parseInt(divPlayer.style.left)-25+"px";
		}
		if (e.which == 68){
			divPlayer.style.left = parseInt(divPlayer.style.left)+25+"px";
		}
	});


	move_it();
	Clock();
}

function move_it()
{
	//Current player position
	playerLeft = divPlayer.offsetLeft;
	playerRight = playerLeft+playerWidth;

	animate_enemy(enemy1);
	animate_enemy(enemy2);
	animate_enemy(enemy3);
	animate_enemy(enemy4);
	animate_enemy(enemy5);

	setTimeout("move_it()",10); 
}

function animate_enemy(en)
{
	//Calculate Horizontal Movement
	en.changeX();
	en.addEnergyLossX(0.005);
	en.addEnergyLossY(0.1);

	//Calculate Vertical Movement
	en.accelerateY(0.5);  //Gravity
	en.changeY();
	
	//Horizontal wall collison detection
	if(en.xLoc<gameLeft || en.xLoc+ballWidth>gameRight)
	{	
		en.reverseX();
	}

	//Vertical collision detection
	if(en.yLoc+ballHeight>gameBottom)
	{
		en.fixVerticalLocation();
		en.reverseY();
		en.addEnergyLossY(0.3);
	}
}

function enemy(ball, xLoc, yLoc) {
	//Initalization
	this.xLoc = gameLeft + xLoc;
	this.yLoc = gameTop + yLoc;
	//this.dx = Math.round(Math.random())*(-6) + 3; //Either -3 or 3
	this.dx = -6 + Math.floor(Math.random()*13); //Between -3 to 3
	this.dy = 0.0;
	this.ball = ball;
	this.acceleration = 0.5;
	//Initial position
	ball.style.left =  this.xLoc + "px";
	ball.style.top = this.yLoc + "px";
	//Mutator
	this.changeX = function() {
		this.xLoc = this.xLoc + this.dx;
		ball.style.left = this.xLoc + "px";
	};
	this.changeY = function() {
		this.yLoc = this.yLoc + this.dy;
		ball.style.top = this.yLoc + "px";
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
	this.fixVerticalLocation = function() {
		this.yLoc = gameBottom-20;
		ball.style.top = this.yLoc + "px";
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
	prevY = divPlayer.offsetTop;
	x=e.pageX;
	y=e.pageY;

	//Move horizontal within border
	if (x > gameLeft+ 10 && x < gameRight-10)
		divPlayer.style.left = x - (playerWidth/2) + "px";
	else if (x < gameLeft + 5)
		divPlayer.style.left = gameLeft + 5 + "px";
	else if (x > gameRight-10)
		divPlayer.style.left = gameRight - 20 + "px";
}

