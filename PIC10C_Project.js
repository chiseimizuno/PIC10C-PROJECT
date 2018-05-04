function init()
{
	divGame = document.getElementById("game");
	divPlay = document.getElementById("playGame");
	divClock = document.getElementById("clock");
	divScore = document.getElementById("score");
	divPlay.onclick = start;

}

function start()
{
	divPlay.style.display="none";
	counter = 0;
	Clock();
}


function Clock()
{
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

