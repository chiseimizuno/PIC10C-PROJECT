# PIC10C Final Project

Welcome, this github repo contains my progress and documentation of my PIC10C Final Project! 
[Link to Working Website Version of Game](http://pic.ucla.edu/~cmizuno/PIC10C/PIC10C-PROJECT/PIC10C_Project.html)

## Introduction

The Idea of this project actually started back when I took PIC40A (Introduction to Programming for the Internet) last quarter. We were introduced very elementary websites using HTML/CSS/Javascript, and while I had fun making an interactive website for the PIC40A final project, I really wanted to go above and beyond by making a complete game.  Playing video games has always been a passion of mine, and I saw the potential in making a game through HTML/CSS/Javascript. When Professor Salazar gave us the option to freely create our own program, I knew I had to use this opportunity to create a fully functional, addictive video game! 

### Goals

Before starting the production of this game, I had a few goals in mind when making my game:
- It had to look smooth (i.e. the frames per second, or FPS, had to be high)
- The game had to look polished (i.e. major attention to minor details)
- A simple game with a deep mechanic (Simple premise, but good physics, animation, interactivity, etc...)

In other words, I wanted a game that looked like it belonged in the "free to download" section of the iOS/Android app store. A game that is simple, addictive, easy to play, but looks very refined and polished.  

### Game Inspiration

The idea for this game came from the fact that I wanted to create a shooting game, but unlike any other.  I wanted to stand out from the crowd.  I knew I wanted some character to shoot an enemy. While I knew how to make objects go in a particular direction (with x and y velocity) and bounce off either the left, top, bottom, or right with collision detection, I wanted something that seemed more "lively" which adheres to my aforementioned goals. Thus, I decided to create a bouncing ball which has gravity, so it can be bouncing.  Also I decided to add a mechanic where bigger balls/enemies will split into two smaller ones when hit (something that is inspired from some enemies from my favorite video game: Legend of Zelda). Therefore, I came up with a game where a monkey is running around, trying to get rid of random bouncing mushrooms. By using these cute sprites, I thought I could make the game super lively and polished.  

### Research 

While it is impossible to list all the websites I used to help me complete this project, here are some major ones:
- [PIC40A Lecture Materials (Courtesy of Dr.Virtanen)](http://www.math.ucla.edu/~virtanen/40a.1.18s/schedule/schedule.php)
- [w3School](https://www.w3schools.com/jS/default.asp)
- [How to make a javascript class - resource 1](https://www.phpied.com/3-ways-to-define-a-javascript-class/)
- [How to make a javascript class - resource 2](https://www.hacksparrow.com/how-to-create-class-in-javascript.html)
- [Array: Stack/Heap RAII?](https://stackoverflow.com/questions/11193421/stack-vs-heap-in-javascript-maximum-call-stack-size-exceeded)
- [How to add sound to HTML](https://tutorialehtml.com/en/html-tutorial-embed-audio/)
- [Simple bouncing ball physics](http://physicscodes.com/simple-physics-simulation-example-a-bouncing-ball/)
- [How to detect key presses](https://stackoverflow.com/questions/1846599/how-to-find-out-what-character-key-is-pressed)
- [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
- [Data Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [Foreach](https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead)
- [Prototype](https://hackernoon.com/prototypes-in-javascript-5bba2990e04b?gi=61fe4a0e7b0c)

## Progress

The progress for the game, in large part, came very smoothly.  I worked a step at a time, working on one function or mechanic at a time, and making sure it works 100% and was generalizable.  

### Major steps in completing the game
- At the beginning of the game, I wanted to make sure I can get the bouncing ball mechanic right.  I had help from physicscodes.com, which showed the basics of creating a bouncing ball.  However, I wanted a deep mechanic, so I also added left and right movement like the game Space Invader.  I also decided to add air friction speed loss in my ball class as well.  In fact, not only do balls bounce lower and lower, the balls also stop moving left and right at one pointing, meaning it'll bounce in place. 
- Animation was done using the setTimeout method, which takes in two parameters: the function to run, and how many milliseconds later to run it.  For the enemy animation, I set the time to 10 milliseconds, so that there are essentially 100 frames per second, leading to a very smooth game. Howver, I soon realized that if I did not make the code efficient, there was no realistic way I could get 100 frames per second if some functions took long.  Thus, I kept programming with effiency in mind.  
- The next challenge came in making a generalized bouncing object class.  I did not know if classes existed, and how versatile they were, so I had help from multiple resources listed above.  What I've learned through research is that though Javascript is technically an Object Oriented Program, making classes is somewhat non-trivial, as we declare classes using function just like a normal function.
- Next, I wanted to create a container to store all the enemies. There were 3 different types of monster, all of which had its own container.  After researching the types of container offered, I decided to go with Array because they worked just like vectors in C++ in that they have internal array length, push, pop, and other features.  I simply had to store enemies then show them on the screen, so I had no use using associative, non-associative, or container adaptor.
- Next, I had to make user iteraction with the console. When the user interacted with a button, or simply clicked on the screen, function pointers came in handy because I was able to attach the memory location of the function with a specific type of action on the screen.  This also meant that I could change which function was associated with which button during the execution of the program.  For example, while the "Play button" was first associated with the function start(), it was later reused to point to the function "reset_game". Reusing code this way definitely helps save memory and codes.  For bigger applications, I assume this would be more important.
- Collion Detection was a tough code to implement. However, all it required was some simple yet rather logically difficult code. Every time the enemy moved, there was an if statement to see if enemy's x and y were within the player or the ball's x and y, which would result in the respective functions running.
- Graphics were first added as images inside divs.  When there is an movement animation, then I simply swapped the image with the next image, then on to the next, then back to the first image, and so on (e.g. player/monkey walking animation).
- At the beginning, I hardcodeed all the enemies (e.g. copy and pasted an enemy div 30 times). However, with my programming experience in 10A-C, I knew there had to be a more effient way.  Through much research using mainly [w3school](w3schools.com), I was able to dynamically create new enemy divs.  I didn't have to hard code any enemies, they just appeared when I need them, and disappeared when I was done with them. This also means that if I want to, I can have 100 enemies appear at once (which is actually the final level of this game, if you can get that far that is).  
- By creating a generalizable class object, I was able to make levels by simply writing down the number of small, big, and extra large enemies to appear on the screen.  
- BGM, background image, and sound effects were all added at the end to create a more full experience.  This made the game look much livlier.  
- By the end, I truly understood that by making a great foundation at the beginning, the later parts become much quicker to implement and much more efficient. 

### Attention to small details
To fully accomplish my goal of making a polished game, I had to add simple yet important details to make my game look lively and fluid. Here are some of the few worthy mentions:
- Timers are coded as diminishing bar, rather than a simple clock
- Lives are seen as hearts, rather than a life-count
- Enemy speed, x, and y locations are always random.    
- When damage is taken, one of the heart turns into a sad image, the player's face becomes mad, and you can hear a monkey scream sound effect
- When the small monsters die, they make a sad face and fall straight down
- When the player dies, all the enemies face you, and the smaller one makes a mocking face
- The enemy and player is always facing the direction of their movement
- Enemies horizontal movement becomes slower until they come to a complete stop, and their bounce height also becomes lower (but always higher than the player's height)
- There is a ~0.5 second intangibility when the player is hit. 
- When the player wins, the monkey is happy.  
- When the player dies, the monkey is sad and dead.
- Without these attention to detail, the game would not have looked as polished.  

### Notes: 
- Templates were not necessary because Javascript is a dynamically-typed langauge, meaning instead of declaring int, bool, or objectType, you can simply use "var" to declare any variable.  
- While generic algorithm did not necessarily exist in Javascript, its equivalent was implemented in all of its classes! Turns out, all classes inhert from a parent class called "prototype", which among all other things, implements member functions that are close to the generic algorithm found in C++.  Functions such as sort can be found in this protype!  In addition, lambda's could be used in conjunction to make the code cleaner.  For example, the function to disable visibly of all my monster
  ```
  for (var i = 0; i < numEnemy; i++)
		  enemyArray[i].disableVisibility();
  ```
- Could have been implemented as 
  ```
  enemyArray.foreach( (element) => element.disableVisibility());
  //(element) => element.disableVisibility() is the lambda function in javascript
  //(element) is the function parameter
  //=> element.disableVisibility(); is the function body
  ```
- Which is equivalent to the C++ expression
  ```
  for_each(enemyArray.begin(), enemyArray.end(), [](element){element.disableVisibility();};
  //Here, enemyArray is assumed to be a vector.  std::begin(enemyArray) would be used if it was an array.
  ```
- Under the hood of the javascript foreach function, the iterator pointing to the first element inside enemyArray is dereferenced and passed into this lambda function. While I could have programmed this way, foreach is said to be 95% slower than the for function used above. Therefore, I opted against the use, though the program would look a lot cleaner.  
- I also learned that while inheritance is possible through javascript (albeit less intuitive than C++/Java), I had no use in inheritance because I was not making any new class of objects through it. All ball and enemy came from this generalized bouncing object class. 
- Through the javascript memory management website, I learned that while all primitive variables are stored in the stack, all objects are dynamically allocated on the heap.  Fotunately, I did not have to worry about RAII (Resource Acquisition is Initialization) because the unreferenced memory are automatically deleted through garbage collector.  Thus, the word "delete" did not have to be used. 
- Furthermore, I did not have to define a way to deep copy the object in javascript because I had no dynamic variables inside the class.  However, if I did want to deep copy, there is a function that could deep copy the object:
  ```
  var clone = Object.assign({}, obj);
  ```
  
## Moving Forward

Some improvements I would like to add to this game in the future is:
- More levels with a final boss 
- Survival mode: simply running away as enemies become more numerous
- Better Enemy animation
- Point system with a leaderboard
- More background story onto the characters
  
## Acknowledgement
  
* I would like to thank Dr.Salazar for allowing me to freely express my creativity.  I had a blast making this game!  
* I would like to thank Dr.Virtanen for introducing me to into to programming for the internet. 
* Sprites were taken from the computer game [Maplestory](Maplestory.com). 
* Most sound effects came from [Zapsplat](Zapsplat.com).

  
  ## Author
  Chisei Mizuno
