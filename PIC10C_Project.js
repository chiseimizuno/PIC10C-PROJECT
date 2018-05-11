function init()
{
	divBall = document.getElementById("ball");
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
	//Width and Height 
	ballWidth = divBall.offsetWidth;
	ballHeight = divBall.offsetHeight;
	gameLeft = divGame.offsetLeft;
	gameWidth = divGame.offsetWidth;
	gameRight = gameLeft+gameWidth;
	gameTop = divGame.offsetTop;
	gameHeight = divGame.offsetHeight;
	gameBottom = gameTop+gameHeight;
	playerWidth = divPlayer.offsetWidth;
	playerHeight = divPlayer.offsetHeight;

	//Set locations of icons
	divPlayer.style.left = gameLeft + 700 + "px";
	divPlayer.style.top = gameTop + 450 + "px";
	divBall.style.left = divGame.offsetLeft+200+"px";
	divBall.style.top = divGame.offsetTop+100+"px";

	//Click
	document.onmousemove = moveMouse;
	divPlay.style.display = "none";
	divGame.style.cursor = "none";

	//Variable Initialization
	speedLeft = 3.0;
	speedTop = 0.0;
	counter = 0;
	points = 0;
	dx = speedLeft;
	dy = speedTop;
	acceleration = 0.5;
	accCounter = 0;
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


function move_it()
{
	
	//Calculate Horizontal Movement
	playerLeft = divPlayer.offsetLeft;
	xPlayer = parseInt(divBall.style.left) + dx + "px";
	divBall.style.left = xPlayer;

	//Calculate Vertical Movement
	//acceleration=0.5;
	playerTop = divPlayer.offsetTop;
	dy = dy + acceleration; 
	yPlayer = parseInt(divBall.style.top) + dy + "px";
	divScore.innerHTML = dy;
	divBall.style.top = yPlayer;
	

	//Left wall collison detection
	if(parseInt(xPlayer)<gameLeft)
	{	
		dx = dx*-1;	
	}
	//Right wall collison detection
	else if (parseInt(xPlayer)+ballWidth>gameRight)
	{
		dx = dx*-1;
	}
	//Vertical collision detection
	if(parseInt(yPlayer)+ballHeight>gameBottom)
	{
		divBall.style.top = gameBottom-20+"px";
		dy = dy*-1;
		dy+=1;
	}

	setTimeout("move_it()",16); 
}
