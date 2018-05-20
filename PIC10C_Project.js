function init()
{
	divBall1 = document.getElementById("ball1");
	divBall2 = document.getElementById("ball2");
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
	document.onmousemove = moveMouse;
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

	//Set location of balls
	/*
	divBall1.style.left = gameLeft+200+"px";
	divBall1.style.top = gameTop+100+"px";
	divBall2.style.left = gameLeft+400+"px";
	divBall2.style.top = gameTop+100+"px";
	*/
	enemy1 = new enemy(divBall1,200,100);
	enemy2 = new enemy(divBall2,400,100);

	//Variable Initialization
	counter = 0;
	points = 0;

	move_it();
	Clock();
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

function enemy(divBall, xLoc, yLoc) {
	//Initalization
	this.xLoc = xLoc;
	this.yLoc = yLoc;
	this.divBall = divBall;
	this.acceleration = 0.5;
	this.dx = 3;
	this.dy = 0;
	//Initial position
	divBall.style.left = gameLeft + xLoc + "px";
	divBall.style.top = gameTop + yLoc + "px";
	//Mutator
	this.changeX = function(newX) {
		xLoc = newX;
		divBall.style.left = newX + "px";
	}
	this.changeY = function(newY) {
		yLoc = newY;
		divBall.style.top = newY + "px";
	}

}

function move_it()
{
	//Current player position
	playerLeft = divPlayer.offsetLeft;
	playerRight = playerLeft+playerWidth;

	//animate_ball(divBall1, dx1, dy1);
	//animate_ball(divBall2, dx2, dy2);

	setTimeout("move_it()",20); 
}

function animate_ball(ballObj)
{
	//Calculate Horizontal Movement
	xBall = parseInt(ballObj.style.left) + dx + "px";
	ballObj.style.left = xBall;

	//Calculate Vertical Movement
	dy = dy + acceleration;  //Gravity
	yBall = parseInt(ballObj.style.top) + dy + "px";
	divScore.innerHTML = dy;
	ballObj.style.top = yBall;
	

	//Left wall collison detection
	if(parseInt(xBall)<gameLeft)
	{	
		dx = dx*-1;	
	}
	//Right wall collison detection
	else if (parseInt(xBall)+ballWidth>gameRight)
	{
		dx = dx*-1;
	}
	//Vertical collision detection
	if(parseInt(yBall)+ballHeight>gameBottom)
	{
		ballObj.style.top = gameBottom-20+"px";
		dy = dy*-1; 
		dy+=1; //Basically Inertia
	}
}