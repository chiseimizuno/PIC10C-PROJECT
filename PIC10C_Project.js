function init()
{
	//Creating Divs
	divBall1 = document.getElementById("ball1");
	divGame = document.getElementById("game");
	divPlayer = document.getElementById("player");
	divPlayerIMG = document.getElementById("playerIMG");
	divPlay = document.getElementById("playGame");
	divPlay2 = document.getElementById("playGame2");
	divCountDown = document.getElementById("countDown");
	divClock = document.getElementById("clock");
	divTimer = document.getElementById("timeLeft");
	divDebug = document.getElementById("debug");
	divDescription = document.getElementById("description");
	//divMusic = document.getElementById("music");
	//divMusic.innerHTML = '<embed src="bgm1.mp3" autostart="true" loop="true" hidden="true">';

	//Initialization
	pop1 = new sound("pop1.mp3");
	pop2 = new sound("pop2.mp3");
	clickSound = new sound("clicked.mp3");
	monkeySound = new sound("ouch.mp3");
	lostSound = new sound("lost.mp3");
	wonSound = new sound("won1.mp3");
	originalGameHTML = divGame.innerHTML;
	divPlay2.onclick = continue_game;
	divPlay.onclick = start;
	level = 1;
	lives = 5;
	
	//Click Event
	document.onmousemove = moveMouse;

	//Width and Height 
	gameLeft = divGame.offsetLeft;
	gameWidth = divGame.offsetWidth;
	gameRight = gameLeft+gameWidth;
	gameTop = divGame.offsetTop;
	gameHeight = divGame.offsetHeight;
	gameBottom = gameTop+gameHeight;
	timerWidth = divTimer.offsetWidth;

	//Get keystrokes
	//keyPressed();
}

//For restarting variables and levels
function start()
{
	if (level == 1)
		clickSound.play();
	//Initialization
	divGame.style.cursor = "default";
	divPlay2.style.cursor = "pointer";
	divDescription.innerHTML = "";
	divPlay.style.display = "none";
	playerWidth = divPlayer.offsetWidth;
	playerHeight = divPlayer.offsetHeight;
	
	//Set location of player
	divPlayerIMG.src = "p1.png";
	divPlayerIMG.style.width = "72px";
	divPlayer.style.left = gameLeft + gameWidth/2 - playerWidth/2  + "px";
	divPlayer.style.top = gameTop + 440 + "px";
	divPlayer.style.top = gameTop + 410 + "px"; //REAL	

	//Variable Initialization
	gameActive = false;
	mouseActive = false;
	isGameOver = false;
	timerSpeed = 10;
	isHit = false;
	canShoot = true;
	angle = 0;
	counter = 0;
	countDownCounter = 4;
	points = 0;
	playerAnimation = 0;
	playerAnimationOn = true;
	prevX = divPlayer.offsetLeft;
	

	//Make ball
	b1 = new animatedObject(divBall1,-5000,-5000);
	b1Active = false;

	start_game();
}

//Choosing number of monsters per level
function start_game(){
	divPlay2.style.display = "block";

	//Different monsters for different levels
	if (level == 1){
		divDescription.innerHTML = "Just click to shoot it down! Easy as pie :)"
		numEnemy=1;
		numEnemyL=0;
		numEnemyXL=0;
		timeSeconds = 10;
	}
	if (level == 2){
		divDescription.innerHTML = "Good, now can you take down more?"
		numEnemy= 3;
		numEnemyL = 0;
		numEnemyXL = 0;
		timeSeconds = 15;
	}
	if (level == 3){
		divDescription.innerHTML = "This one splits into two smaller ones!"
		numEnemy=0;
		numEnemyL = 1;
		numEnemyXL = 0;
		timeSeconds = 20;
	}
	if (level == 4){
		divDescription.innerHTML = "Good, can you take down 2 big monsters?"
		numEnemy= 0;
		numEnemyL = 2;
		numEnemyXL = 0;
		timeSeconds = 30;
	}
	if (level == 5){
		divDescription.innerHTML = "Wait... Even bigger monsters? "
		numEnemy= 0;
		numEnemyL = 0;
		numEnemyXL = 1;
		timeSeconds = 30;
	}
	if (level == 6){
		divDescription.innerHTML = "One of each? How cute..."
		numEnemy= 1;
		numEnemyL = 1;
		numEnemyXL = 1;
		timeSeconds = 40;
	}
	if (level == 6){
		divDescription.innerHTML = "Is this even possible?"
		numEnemy= 0;
		numEnemyL = 0;
		numEnemyXL = 2;
		timeSeconds = 50;
	}
	if (level == 7){
		divDescription.innerHTML = "Good luck."
		numEnemy= 0;
		numEnemyL = 0;
		numEnemyXL = 3;
		timeSeconds = 60;
	}
	if (level == 8){
		divDescription.innerHTML = "Die."
		numEnemy= 100;
		numEnemyL = 0;
		numEnemyXL = 0;
		timeSeconds = 30;
	}

	//Normal enemy
	e1 = new Array(numEnemy);
	for (var i = 0; i < numEnemy; i++)
		e1[i] = create_enemy("foe",i);
	//Large Enemy
	e1L = new Array(numEnemyL);
	for (var i = 0; i < numEnemyL; i++)
		e1L[i] = create_enemy("foeL",i);
	//XLarge Enemy
	e1XL = new Array(numEnemyXL);
	for (var i = 0; i < numEnemyXL; i++)
		e1XL[i] = create_enemy("foeXL",i);
}

//Create new Node and return animatedObject enemy 
function create_enemy(name, num, x = locRand(10,700), y = locRand(40,100))
{
	var nameID = name+num;
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id",nameID);
	newDiv.setAttribute("class",name);
	var newImg = document.createElement("img");
	newImg.setAttribute("src",name+".png");
	newImg.setAttribute("alt",name);
	newImg.setAttribute("width","100%");
	newDiv.appendChild(newImg);
	divGame.appendChild(newDiv);
	var newEnemy = new animatedObject(newDiv,name,x,y);
	while (newEnemy.dx < 1)
		newEnemy.dx = -6 + Math.floor(Math.random()*13);
	if (newEnemy.dx > 0) //Make Enemy Face Right Object
			newEnemy.flipObject();
	return newEnemy;
}

//Deleting all enemies
function delete_all_enemy()
{
	var numDel = e1.length;
	//Delete Foe
	for (var i = 0; i < numDel; i++)
		delete_enemy("foe",i);
	//Delete FoeL
	numDel = e1L.length;
	for (var i = 0; i < numDel; i++)
		delete_enemy("foeL",i);
	numDel = e1XL.length;
	//Delete FoeXL
	for (var i = 0; i < numDel; i++)
		delete_enemy("foeXL",i);
}

//Helper function to delete
function delete_enemy(name, num)
{
	var nodeToDelete = document.getElementById(name+num);
	divGame.removeChild(nodeToDelete);
}

function level_init()
{
	//Preparation
	numEnemyLeft=numEnemy + numEnemyL + numEnemyXL;
	gameActive = true;
	divPlay2.style.display = "none";
	//Timer Initialize
	counter=(1000/timerSpeed)*timeSeconds;
 	timeSubtract = divTimer.offsetWidth/counter;
	//Levels
	level_repeat();
}

function level_repeat()
{
	//Debug
	//divDebug.innerHTML = e1.length + "\n\n" + e1L.length + "\n" + e1XL.length + "\n" + numEnemyLeft;
	if(!gameActive)
		return;
	for (var i = 0; i < e1.length; i++)
		animate_enemy(e1[i]);
	for (var i = 0; i < e1L.length; i++)
		animate_enemy(e1L[i]);
	for (var i = 0; i < e1XL.length; i++)
		animate_enemy(e1XL[i]);
	setTimeout("level_repeat()",6);
}

//When level clears
function level_clear(){
	delete_all_enemy();
	reset_lives();
	wonSound.play();
	//Reset variables
	level++;
	divTimer.style.width = timerWidth + "px";
	divPlayer.style.transform = "rotate(0deg)";
	var playerLeftCurrent = divPlayer.offsetLeft;
	divPlay2.innerHTML = "Level " + level;
	divPlay2.style.display = "block";
	gameActive = false;
	start();
	//Change Player Position to Original
	divPlayer.style.left = playerLeftCurrent + "px";
	divPlayerIMG.style.width = "73px";
	divPlayerIMG.src = "happy1.png";
}

function game_over()
{
	//Resetting stuff
	divDescription.innerHTML = "Awww... You can do it! Try Again?"
	divPlay.innerHTML = "Play Again";
	divPlay.onclick = reset;
	divPlay.style.display = "block";
	mouseActive = false;
	divPlayer.style.transform = "rotate(0deg)";
	isGameOver = true;//IMPORTANT
	//Dead Player
	lostSound.play();
	divPlayerIMG.style.width = "77px";
	divPlayerIMG.src = "dead.png";
	divPlayer.style.top = gameBottom-125 + "px";
	b1.disableVisibility();
	//Annoying Enemies
	for (var i = 0; i < e1.length; i++){
		if (player.offsetLeft > e1[i].xLoc)
			e1[i].item.style.transform = "scale(-1,1)";
		else
			e1[i].item.style.transform = "scale(1,1)";
		e1[i].item.firstChild.src = "foeWon.png";
		e1[i].baseFriction = 1;
		e1[i].dx = 0;
		e1[i].dy = 0;
	}
	for (var i = 0; i < e1L.length; i++){
		if (player.offsetLeft > e1L[i].xLoc)
			e1L[i].item.style.transform = "scale(-1,1)";
		else
			e1L[i].item.style.transform = "scale(1,1)";
		e1L[i].baseFriction = 1;
		e1L[i].dx = 0;
		e1L[i].dy = 0;
	}
	for (var i = 0; i < e1XL.length; i++){
		if (player.offsetLeft > e1XL[i].xLoc)
			e1XL[i].item.style.transform = "scale(-1,1)";
		else
			e1XL[i].item.style.transform = "scale(1,1)";
		e1XL[i].baseFriction = 1;
		e1XL[i].dx = 0;
		e1XL[i].dy = 0;
	}
}

function reset()
{
	//Reset Initializations
	delete_all_enemy();
	reset_lives();
	gameActive=false;
	level = 1;
	divPlay2.innerHTML = "Level " + level;
	divTimer.style.width = timerWidth + "px";
	//Make enemies disappear
	for (var i = 0; i < numEnemy; i++)
	{
		e1[i].item.innerHTML = '<img src="foe.png" alt="foe"/>';
		e1[i].disableVisibility();
	}
	for (var i = 0; i < numEnemyL; i++)
		e1[i].disableVisibility();
	for (var i = 0; i < numEnemyXL; i++)
		e1XL[i].disableVisibility();
	
	start();
}

function reset_lives()
{
	//Reset Lives
	lives = 5;
	for (var i = 0; i < lives; i++)
		document.getElementById("life" + (i+1)).src = "l1.png";
}

function animate_ball(b)
{
	if(!gameActive || isGameOver)
		return;
	b.changeX();
	b.addEnergyLossX(0.01);
	b.addEnergyLossY(0.3);

	//Calculate Vertical Movement
	b.accelerateY(0.1);  //Gravity
	b.changeY();
		
	//Horizontal wall collison detection
	if(b.xLoc<gameLeft+1 || b.xLoc+b.width>gameRight-1)
	{	
		b.reverseX();
	}

	//Vertical collision detection
	if(b.yLoc+b.height>gameBottom)
	{
		b.fixVerticalLocation();
		b.reverseY();
		b.addFrictionLoss(2);
	}
	setTimeout("animate_ball(b1)",10);
}

//Original: en, acc = 0.05,lossX = 0.001, lossY=0.05, lossY2=0.3
function animate_enemy(en, acc = 0.005,lossX = 0.001, lossY=0.05, lossY2=0.3)
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
	//en.item.innerHTML = en.dy;
	
	//Horizontal wall collison detection
	if(en.xLoc<gameLeft+5 || en.xLoc+en.width>gameRight-5)
	{	
		en.reverseX();
		en.flipObject();
	}

	//Vertical collision detection
	if(en.yLoc+en.height>gameBottom)
	{
		if (en.isDead)
			en.disableVisibility();
		if (en.dy < 4.5){
			en.dy = 4.5;
			lossY = 0;
			lossY2 = 0;
			acc = 0;
		}
		en.fixVerticalLocation();
		en.reverseY();
		en.addFrictionLoss(lossY2);

	}
	//No ball or player collision detection
	if (en.isDead)
		return;
	//Ball Collision Detection
	if(en.yLoc+en.height-3> b1.yLoc && en.yLoc+3 < b1.yLoc+b1.height
		&& en.xLoc+en.width-3> b1.xLoc && en.xLoc+3 < b1.xLoc+b1.width)
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
	if (isHit || !gameActive || isGameOver)
		return;
	monkeySound.play();
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
	if(!gameActive || isGameOver)
		return;
	//Is Dead
	if (!en.isDead){
		numEnemyLeft--;
		b1.disableVisibility();	
	}
	var enemyName = en.typeM; 
	//If foe hit
	if (enemyName == "foe")
	{
		pop2.play();
		en.dx = 0;
		en.dy = 0;
		en.item.style.transform = "scale(1,-1)";
		en.item.innerHTML = '<img src="foeDead.png" alt="foe" />';
		en.isDead = true;
	}
	//If foeL hit
	else if(enemyName == "foeL" || enemyName == "foeXL")
	{
		pop1.play();
		var e1copy;
		var newEnemyName;
		var newEnemyWidth;
		if (enemyName == "foeL")
		{
			e1copy = e1;
			newEnemyName = "foe";
			newEnemyWidth = 68;
		}
		else
		{
			e1copy = e1L;
			newEnemyName = "foeL";
			newEnemyWidth = 30;
		}
		numEnemyLeft+=2;
		newX1 = en.xLoc+en.width/2 - newEnemyWidth/2;
		newX2 = en.xLoc+en.width/2 - newEnemyWidth/2;
		newY1 = en.yLoc;
		newY2 = en.yLoc;
		var newEnemy1 = create_enemy(newEnemyName,e1copy.length,newX1,newY1);
		var newEnemy2 = create_enemy(newEnemyName,e1copy.length+1,newX2,newY2);
		newEnemy1.dx = Math.abs(newEnemy1.dx);
		newEnemy2.dx = -1*newEnemy1.dx;
		newEnemy1.dy = -4.5;
		newEnemy2.dy = -4.5;
		newEnemy1.faceRight();
		newEnemy2.faceLeft();
		
		e1copy.push(newEnemy1);
		e1copy.push(newEnemy2);

		en.disableVisibility();
	} 
	if (numEnemyLeft == 0)
		level_clear();
}

function shoot()
{
	if (!gameActive || isGameOver){
		return;
	}
	if(canShoot){
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

//CLASS________________________________________________

function animatedObject(item, typeM, xLoc, yLoc) {
	//Initalization
	this.item = item;
	this.typeM = typeM;
	this.item.style.display="block";
	this.item.style.transform = "scale(1,1)";
	this.xLoc = gameLeft + xLoc;
	this.yLoc = gameTop + yLoc;
	this.height = item.offsetHeight;
	this.width = item.offsetWidth;
	this.isVisible = true;
	this.isDead = false;
	//this.dx = Math.round(Math.random())*(-6) + 3; //Either -3 or 3
	this.dx = 0.0; //Between -3 to 3
	this.dy = 0.0;
	this.baseFriction = 0.0;
	var scale = 1;
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
	this.addFrictionLoss = function(loss) {
		this.dy = this.dy + loss + this.baseFriction;
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
	this.flipObject = function() {
		scale = scale*-1;
		this.item.style.transform = "scale("+scale+",1)";
	};
	this.faceLeft = function() {
		scale = 1;
		this.item.style.transform = "scale(1,1)";
	};
	this.faceRight = function() {
		scale = -1;
		this.item.style.transform = "scale(-1,1)";
	};
}


//AUXILIARY FUNCTIONS________________________________________________
function locRand(pos, range){
	return pos + Math.floor((Math.random() * range));
}

function Clock()
{
	if (!gameActive || isGameOver)
		return;
	counter--;
	divTimer.style.width = counter*timeSubtract + "px";
	if (counter == 0)
		game_over();

	setTimeout("Clock()",timerSpeed);
}

function moveMouse(e){
	if (!mouseActive)
		return;
	//Change direction
	currentX = divPlayer.offsetLeft;
	if (currentX > prevX)
		divPlayerIMG.style.transform = "scale(-1,1)";
	else
		divPlayerIMG.style.transform = "scale(1,1)";


	prevX = divPlayer.offsetLeft;


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
	clickSound.play();
	divDescription.innerHTML = "";
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
		setTimeout("Clock()",100);
		level_init();
	}
	else{
		divCountDown.innerHTML = countDownCounter;
		setTimeout("countDown()",500);
	}
}

function keyPressed(){
document.addEventListener("keydown",function(e){
		if (!gameActive || isGameOver)
			return;
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

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}