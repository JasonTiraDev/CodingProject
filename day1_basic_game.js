// ================================================
// 🎮 Mini Survivors - DAY 1: Basic Game Foundation
// ================================================
// Learning Goals for Day 1:
// - Understand what a game loop is
// - Learn about coordinates and positioning
// - Create a player that can move around
// - Draw shapes and text on screen
// - Handle keyboard input
// ================================================

// --- STEP 1: Understanding Variables ---
// Variables are like boxes that store information
// We use 'let' to create a variable that can change

// The player is an "object" - think of it like a character sheet
// It has properties: x position, y position, and radius (size)
let player = { 
  x: 300,  // How far right the player is (pixels from left edge)
  y: 300,  // How far down the player is (pixels from top edge)
  r: 20    // How big the player is (radius in pixels)
};

// Game settings - these control how the game behaves
let speed = 4;           // How fast the player moves (pixels per frame)
let gameStarted = false; // Has the player started the game yet? (true/false)

// --- STEP 2: The setup() Function ---
// This function runs ONCE when the game starts
// It's like setting up a board game before you play
function setup() {
  // createCanvas creates our game window
  // 600 pixels wide, 600 pixels tall
  createCanvas(600, 600);
  
  // textSize sets how big our text will be
  textSize(18);
  
  // Let's tell the console we're ready!
  console.log("Game setup complete!");
}

// --- STEP 3: The draw() Function ---
// This is the HEART of our game!
// It runs over and over, about 60 times per second
// Each time it runs is called a "frame"
function draw() {
  // ALWAYS start by clearing the screen
  // background() fills the entire canvas with a color
  // 15 is a dark gray (0 = black, 255 = white)
  background(15);
  
  // --- STEP 4: Game States ---
  // We use "if statements" to control what the game shows
  if (!gameStarted) {
    // If the game hasn't started, show the start screen
    drawStartScreen();
    return; // "return" stops the function here
  }
  
  // If we get here, the game has started!
  
  // --- STEP 5: Player Movement ---
  // keyIsDown() checks if a key is being held down RIGHT NOW
  // We check all four arrow keys
  
  if (keyIsDown(LEFT_ARROW)) {
    player.x = player.x - speed; // Move left by subtracting from x
    console.log("Moving left! Player x is now: " + player.x);
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    player.x = player.x + speed; // Move right by adding to x
    console.log("Moving right! Player x is now: " + player.x);
  }
  
  if (keyIsDown(UP_ARROW)) {
    player.y = player.y - speed; // Move up by subtracting from y
    console.log("Moving up! Player y is now: " + player.y);
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    player.y = player.y + speed; // Move down by adding to y
    console.log("Moving down! Player y is now: " + player.y);
  }
  
  // --- STEP 6: Boundary Checking ---
  // We don't want the player to go off the screen!
  // constrain() keeps a number between a minimum and maximum
  
  // Keep player.x between player.r (left edge) and width-player.r (right edge)
  player.x = constrain(player.x, player.r, width - player.r);
  
  // Keep player.y between player.r (top edge) and height-player.r (bottom edge)
  player.y = constrain(player.y, player.r, height - player.r);
  
  // --- STEP 7: Drawing the Player ---
  // fill() sets the color for the next shape we draw
  // 'cyan' is a light blue color (you can also use numbers like 255, 0, 0 for red)
  fill('cyan');
  
  // circle() draws a circle
  // Parameters: x position, y position, diameter
  // diameter = radius * 2 (distance across the circle)
  circle(player.x, player.y, player.r * 2);
  
  // --- STEP 8: Drawing Game Information ---
  // fill() with white color for text
  fill(255); // 255 = white
  
  // text() draws words on screen
  // Parameters: what to write, x position, y position
  text('Player Position: (' + player.x + ', ' + player.y + ')', 10, 25);
  text('Use ARROW KEYS to move around!', 10, 50);
  text('Speed: ' + speed + ' pixels per frame', 10, 75);
  
  // Let's show how many frames have passed
  // frameCount is a special p5.js variable that counts frames
  text('Frames: ' + frameCount, 10, 100);
  text('Seconds: ' + Math.floor(frameCount / 60), 10, 125); // 60 frames = 1 second
}

// --- STEP 9: The Start Screen ---
// This function draws our start screen
function drawStartScreen() {
  // textAlign(CENTER) makes text center itself on the x coordinate we give
  textAlign(CENTER);
  
  // Draw the game title
  fill('white');
  textSize(32); // Make the title bigger
  text('🎮 MINI SURVIVORS - DAY 1 🎮', width / 2, height / 2 - 100);
  
  // Draw instructions
  textSize(18); // Back to normal size
  text('Today we learn: Player Movement!', width / 2, height / 2 - 50);
  text('Press ENTER to start', width / 2, height / 2);
  text('Then use ARROW KEYS to move', width / 2, height / 2 + 30);
  
  // textAlign(LEFT) puts text alignment back to normal
  textAlign(LEFT);
  
  // Let's add some fun decorations!
  // Draw some colorful circles for decoration
  fill('red');
  circle(100, 100, 30);
  fill('green');
  circle(500, 100, 30);
  fill('blue');
  circle(100, 500, 30);
  fill('yellow');
  circle(500, 500, 30);
}

// --- STEP 10: Input Handling ---
// This special function runs whenever someone presses a key
// (Not holds it down - just presses it once)
function keyPressed() {
  console.log("A key was pressed! Key code: " + keyCode);
  
  // keyCode is a number that represents which key was pressed
  // ENTER has the code 13
  if (keyCode === ENTER) {
    console.log("Enter was pressed!");
    
    if (!gameStarted) {
      gameStarted = true; // Start the game!
      console.log("Game started!");
    }
  }
  
  // Let's add a fun feature - press SPACE to change player color!
  if (key === ' ') { // key === ' ' checks for spacebar
    console.log("Spacebar pressed! Player color will change next frame.");
    // We'll make the player flash different colors
    // (The color change happens in the draw() function)
  }
}

// --- BONUS: Understanding Coordinates ---
// Computer graphics use a coordinate system:
// - (0, 0) is the TOP-LEFT corner
// - X increases as you go RIGHT
// - Y increases as you go DOWN
// - Our canvas is 600x600 pixels
// - Center of canvas is (300, 300)

// --- DISCUSSION QUESTIONS FOR STUDENTS ---
// 1. What happens if you change the 'speed' variable to 10? To 1?
// 2. Can you figure out how to make the player start in a different position?
// 3. What would happen if we removed the constrain() functions?
// 4. How could we make the player bigger or smaller?
// 5. Can you add a console.log() message when the player reaches the edges?

// --- CHALLENGES FOR ADVANCED STUDENTS ---
// 1. Add diagonal movement (what happens when you press two arrow keys?)
// 2. Make the player leave a trail as it moves
// 3. Add a second player with WASD keys
// 4. Make the background color change based on player position
// 5. Add a "speed boost" when holding the SHIFT key

// --- WHAT WE'LL ADD TOMORROW (DAY 2) ---
// - Enemies that chase the player
// - Bullets that the player can shoot
// - Collision detection (when things touch)
// - A score system