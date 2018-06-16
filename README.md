# PIC10C Final Project

Welcome, this github repo contains my progress and documentation of my PIC10C Final Project! 
[Link to Working Website Version of Game](http://pic.ucla.edu/~cmizuno/PIC10C/PIC10C-PROJECT/PIC10C_Project.html)

## Introduction

The Idea of this project actually started while taking PIC40A (Introduction to Programming for the Internet) last quarter. We were introduced very elementary websites using HTML/CSS/Javascript, and while I had fun making an interactive website for the PIC40A final project, I really wanted to go above and beyond by making a complete game.  Playing video games has always been a passion of mine, and I saw the potential in making a game through HTML/CSS/Javascript. When Professor Salaar gave us the option to freely create our own game, I knew I had to use this opportunity to create a fully functional, addictive video game! 

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

## Progress

The progress for the game, in large part, came very smoothly.  I worked a step at a time, working on one function or mechanic at a time, and making sure it works 100% and was generalizable.  

###Steps I took to complete the game:
- At the beginning of the game, I wanted to make sure I can get the bouncing ball mechanic right.  
