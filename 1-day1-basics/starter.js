// 🎮 Day 1: Game Foundations - Mini Survivors
// Today we'll build the basic game structure and player movement

// ====================================
// LESSON GOALS:
// - Understand the p5.js game loop (setup and draw)
// - Create a player character that moves with keyboard input
// - Keep the player within screen boundaries
// - Add a simple start screen
// ====================================

// TODO: Create global variables for the game
// We'll need a player object and a game state
let player;
let gameState = "start"; // Can be "start", "playing", or "gameOver"

function setup() {
  // TODO: Create a canvas that's 800 pixels wide and 600 pixels tall
  createCanvas(800, 600);
  
  // TODO: Create the player object
  // HINT: The player needs x, y, size, and speed properties
  // Start the player in the center of the screen
  player = {
    x: width / 2,      // TODO: Put player in center horizontally
    y: height / 2,     // TODO: Put player in center vertically
    size: 20,          // TODO: Choose a good size for the player (not too big!)
    speed: 4           // TODO: Choose a good movement speed
  };
}

function draw() {
  background(20, 20, 40); // Dark blue background
  
  // TODO: Check what game state we're in and show the right screen
  if (gameState === "start") {
    // TODO: Show the start screen
    // HINT: Use fill(), textSize(), textAlign(), and text() functions
    // Show title, instructions, and "Press any key to start"
    
  } else if (gameState === "playing") {
    // TODO: Handle player movement
    // HINT: Check if keys are pressed and update player position
    // Use keyIsDown() to check for WASD or arrow keys
    
    // TODO: Keep player within screen boundaries
    // HINT: Use constrain() function to keep player on screen
    
    // TODO: Draw the player
    // HINT: Use fill() and ellipse() to draw a colored circle
    
  }
}

// TODO: Handle key presses to start the game
function keyPressed() {
  // HINT: If we're on the start screen and any key is pressed, start playing
  
}

// CHALLENGES TO TRY:
// 1. Change the player's color when moving
// 2. Add a trail effect behind the player
// 3. Make the player rotate to face the movement direction
// 4. Add smooth acceleration instead of instant movement

// NEXT LESSON PREVIEW:
// Tomorrow we'll add enemies that chase the player and bullets to fight them!