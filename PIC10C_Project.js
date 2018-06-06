function init()
{
	divBall1 = document.getElementById("ball1");
	divGame = document.getElementById("game");
	divPlayer = document.getElementById("player");
	divPlayerIMG = document.getElementById("playerIMG");
	divPlay = document.getElementById("playGame");
	divPlay2 = document.getElementById("playGame2");
	divCountDown = document.getElementById("countDown");
	divClock = document.getElementById("clock");
	//divScore = document.getElementById("score");
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
	divPlayer.style.top = gameTop + 410 + "px"; //REAL	

	//Variable Initialization
	isHit = false;
	canShoot = true;
	angle = 0;
	level = 1;
	counter = 0;
	countDownCounter = 4;
	points = 0;
	playerAnimation = 0;
	playerAnimationOn = true;
	lives=3;

	//Get keystrokes
	keyPressed();

	//Make ball
	b1 = new animatedObject(divBall1,-5000,-5000);
	b1Active = false;

	start_game();
}

function start_game(){
	divPlay2.style.display = "block";

	if (level == 1){
		numEnemy=6;
	}
	//Enemy location
	e1 = new Array(numEnemy);
	for (var i = 0; i < numEnemy; i++){
		e1[i] = new animatedObject(document.getElementById("foeXL"+(i+1)),locRand(10,700),locRand(10,100));
		e1[i].dx = -6 + Math.floor(Math.random()*13);
	}
	//BOSS
	//e1[0] = new animatedObject(document.getElementById("foeXXL"+(i+1)),300,300);
}

function level_init()
{
	numEnemyLeft=numEnemy;
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
	for (var i = 0; i < numEnemy; i++)
	{
		animate_enemy(e1[i]);
	}	
	//Boss
	//animate_enemy(e1[0],1,0,0,0);

	setTimeout("level1()",5);
}

function level_clear(){
	alert(1);
}

function clearScreen()
{
	//gameActive = false;
	for (var i = 0; i < e1.length; i++){
		//e1[i].xLoc = -1000;
		//e1[i].changeX();
		e1[i].item.innerHTML = '<img src="foeWon.png" alt="foe" />';
		e1[i].dx = 0;
	}
}

function game_over()
{
	//isHit = false;
	clearScreen();
	//alert("GAME OVER");
	divPlayerIMG.src = "dead.png";
	divPlayer.style.top = divPlayer.offsetTop - 32 + "px";
	//divPlayerIMG.style.width = 70 + "px";

	mouseActive = false;
}

function shoot()
{
	if (!mouseActive)
		return;
	if(gameActive && canShoot){
		b1.enableVisibility();
		canShoot = false;
		setTimeout(function(){canShoot=true;},400);
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
	if(b.xLoc<gameLeft || b.xLoc+b.width>gameRight)
	{	
		b.reverseX();
	}

	//Vertical collision detection
	if(b.yLoc+b.height>gameBottom)
	{
		b.fixVerticalLocation();
		b.reverseY();
		b.addEnergyLossY(2);
	}
	setTimeout("animate_ball(b1)",10);
}

function animate_enemy(en, acc = 0.05,lossX = 0.001, lossY=0.05, lossY2=0.3)
{
	if(!gameActive || !en.isVisible)
		return;
	//Calculate Horizontal Movement
	en.changeX();
	en.addEnergyLossX(lossX);
	
	//Calculate Vertical Movement
	en.accelerateY(acc);  //Gravity
	en.addEnergyLossY(lossY);
	en.changeY();
	
	//Horizontal wall collison detection
	if(en.xLoc<gameLeft+2 || en.xLoc+en.width>gameRight-2)
	{	
		en.reverseX();
	}

	//Vertical collision detection
	if(en.yLoc+en.height>gameBottom)
	{
		en.fixVerticalLocation();
		en.reverseY();
		en.addEnergyLossY(lossY2);
	}
	//Ball Collision Detection
	if(en.yLoc+en.height> b1.yLoc && en.yLoc < b1.yLoc+b1.height
		&& en.xLoc+en.width> b1.xLoc && en.xLoc < b1.xLoc+b1.width)
	{
		ball_hit(en);
	}
	//Player Collision Detection
	if(en.yLoc+en.height > divPlayer.offsetTop + 50
		&& en.xLoc+en.width > divPlayer.offsetLeft+15 && en.xLoc < divPlayer.offsetLeft+divPlayer.offsetWidth-15)
		player_hit();
}

function player_hit()
{
	if (isHit)
		return;
	lives--;
	if (lives >= 0)
		isHit = true;
		divPlayerIMG.src = "hit.png";
		divPlayerIMG.style.width = "77px";
		document.getElementById("life"+(lives+1)).src = "l2.png";
	if (lives == 0){
		game_over();
		return;
	}
	if (lives < 0)
		return;
	setTimeout(function(){isHit=false;},1000);
}

function ball_hit(en)
{
	b1.disableVisibility();
	en.disableVisibility();
	numEnemyLeft--;
	if (numEnemyLeft == 0)
		level_clear();
}

function animatedObject(item, xLoc, yLoc) {
	//Initalization
	this.xLoc = gameLeft + xLoc;
	this.yLoc = gameTop + yLoc;
	this.height = item.offsetHeight;
	this.width = item.offsetWidth;
	this.isVisible = true;
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
		this.item.style.left = this.xLoc + "px";
	};
	this.changeY = function() {
		this.yLoc = this.yLoc + this.dy;
		this.item.style.top = this.yLoc + "px";
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
		this.yLoc = gameBottom-this.height;
		this.item.style.top = this.yLoc + "px";
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
	this.disableVisibility = function() {
			this.xLoc = -5000;
			this.isVisible = false;
			this.item.style.display = "none";
	};
	this.enableVisibility = function() {
			this.isVisible = true;
			this.item.style.display = "block";
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
	if (x > gameLeft + playerWidth/2 && x < gameRight - playerWidth/2 - 10)
		divPlayer.style.left = x - (playerWidth/2) + "px";
	else if (x < gameLeft + playerWidth)
		divPlayer.style.left = gameLeft + 5 + "px";
	else if (x > gameRight - playerWidth - 50)
		divPlayer.style.left = gameRight - playerWidth - 10 + "px";

	//Player Animation
	if (playerAnimationOn && !isHit)
	{
		divPlayerIMG.style.width = "72px"
		playerAnimationOn=false;
		setTimeout(function(){playerAnimationOn=true;},40);
		playerAnimation++;
		if(playerAnimation%2 == 0)
			divPlayerIMG.src = "p1.png";
		else
			divPlayerIMG.src = "p2.png";
	}
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

function keyPressed(){
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
}