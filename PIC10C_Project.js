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
	divPlay2.onclick = countDown;
	divPlay.onclick = start;
}

function start()
{
	//Click Event
	//document.onmousemove = moveMouse;
	divPlay.style.display = "none";
	divGame.style.cursor = "none";

	//Width and Height 
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
	divPlayer.style.top = gameTop + 450 + "px";

	//Variable Initialization
	level = 1;
	counter = 0;
	countDownCounter = 4;
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

	start_game();
}

function start_game(){
	divPlay2.style.display = "block";
	if (level = 1){
		//Enemy location
		enemy1 = new enemy(divFoe1,locRand(10,700),locRand(10,200));
		enemy2 = new enemy(divFoe2,locRand(10,700),locRand(10,200));
		enemy3 = new enemy(divFoe3,locRand(10,700),locRand(10,200));
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
	if(gameActive)
		
}

function animate_ball(b)
{
	//Current player position
	playerLeft = divPlayer.offsetLeft;
	playerRight = playerLeft+playerWidth;
}

function animate_enemy(en)
{
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
		en.fixVerticalLocation();
		en.reverseY();
		en.addEnergyLossY(0.2);
	}
}

function enemy(foe, xLoc, yLoc) {
	//Initalization
	this.xLoc = gameLeft + xLoc;
	this.yLoc = gameTop + yLoc;
	//this.dx = Math.round(Math.random())*(-6) + 3; //Either -3 or 3
	this.dx = -6 + Math.floor(Math.random()*13); //Between -3 to 3
	this.dy = 0.0;
	this.foe = foe;
	this.acceleration = 0.5;
	//Initial position
	foe.style.left =  this.xLoc + "px";
	foe.style.top = this.yLoc + "px";
	//Mutator
	this.changeX = function() {
		this.xLoc = this.xLoc + this.dx;
		foe.style.left = this.xLoc + "px";
	};
	this.changeY = function() {
		this.yLoc = this.yLoc + this.dy;
		foe.style.top = this.yLoc + "px";
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
		foe.style.top = this.yLoc + "px";
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

function countDown()
{
	divPlay2.style.display = "none";
	countDownCounter--;
	if (countDownCounter== 0)
	{
		divCountDown.innerHTML = "";
		setTimeout("Clock()",1000);
		level_init();
	}
	else{
		divCountDown.innerHTML = countDownCounter;
		setTimeout("countDown()",1000);
	}
}
