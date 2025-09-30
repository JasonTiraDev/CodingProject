// 🎮 Day 2: Combat Systems - Mini Survivors
// Today we'll add enemies, bullets, and collision detection!
// Starting with working Day 1 code, then adding combat features

// ====================================
// LESSON GOALS:
// - Create arrays to manage multiple objects (bullets and enemies)
// - Add automatic shooting system
// - Create enemies that spawn and move toward the player
// - Implement collision detection between bullets and enemies
// - Add a score system and game over condition
// ====================================

// Starting with Day 1's working code
let player;
let gameState = "start";

// TODO: Create new arrays for bullets and enemies
let bullets = [];  // Will hold all bullets currently on screen
let enemies = [];  // Will hold all enemies currently on screen
let score = 0;     // Player's score

function setup() {
  createCanvas(800, 600);
  
  // Day 1's working player setup
  player = {
    x: width / 2,
    y: height / 2,
    size: 20,
    speed: 4
  };
}

function draw() {
  background(20, 20, 40);
  
  if (gameState === "start") {
    // Day 1's working start screen
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("MINI SURVIVORS", width/2, height/2 - 50);
    
    textSize(24);
    text("Press any key to start", width/2, height/2 + 50);
    
    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 100);
    text("Survive as long as you can!", width/2, height/2 + 130);
    
  } else if (gameState === "playing") {
    // Day 1's working player movement
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
      player.x -= player.speed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
      player.x += player.speed;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
      player.y -= player.speed;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S key
      player.y += player.speed;
    }
    
    // Keep player within boundaries
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // TODO: Handle automatic shooting
    // HINT: Create a new bullet every few frames
    // STEP 1: Check if frameCount % 10 === 0 (shoots every 10 frames)
    // STEP 2: Create a bullet object with x, y, and speed properties
    // STEP 3: Add it to the bullets array using push()
    
    // TODO: Update and draw all bullets
    // HINT: Use a for loop to go through the bullets array backwards
    // STEP 1: Move each bullet up (decrease y by bullet speed)
    // STEP 2: Draw each bullet as a yellow circle
    // STEP 3: Remove bullets that go off screen (y < 0)
    
    // TODO: Spawn enemies randomly
    // HINT: Use random() to occasionally spawn enemies
    // STEP 1: Check if random(100) < 1.8 (1.8% chance each frame - manageable pace)
    // STEP 2: Create enemy object with x, y, size, and speed properties
    // STEP 3: Add enemy to enemies array using push()
    
    // TODO: Update and draw all enemies
    // HINT: Use a for loop to go through the enemies array
    // STEP 1: Move each enemy toward the player (calculate direction first)
    // STEP 2: Draw each enemy as a red circle
    // STEP 3: Check if enemy touches player (game over!)
    
    // TODO: Check for bullet-enemy collisions
    // HINT: Use nested loops to check each bullet against each enemy
    // STEP 1: Calculate distance between bullet and enemy
    // STEP 2: If distance < combined sizes, it's a hit!
    // STEP 3: Remove both bullet and enemy, increase score
    
    // Day 1's working player drawing
    fill(0, 255, 255); // Cyan
    noStroke();
    ellipse(player.x, player.y, player.size);
    
    // TODO: Display the score
    // HINT: Use fill(), textAlign(), textSize(), and text()
    
  } else if (gameState === "gameOver") {
    // TODO: Show game over screen with final score
    // HINT: Show "GAME OVER", final score, and restart instructions
    
  }
}

function keyPressed() {
  // Day 1's working key handling
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "gameOver") {
    // TODO: Reset the game
    // HINT: Clear bullets and enemies arrays, reset score, reset player position
    // Then set gameState back to "playing"
    
  }
}

// HELPER FUNCTION: Calculate distance between two points
function distance(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// CHALLENGES TO TRY:
// 1. Make enemies spawn faster as score increases
// 2. Add different enemy types with different behaviors
// 3. Create power-ups that give temporary advantages
// 4. Add sound effects for shooting and collisions

// NEXT LESSON PREVIEW:
// Tomorrow we'll add multiple weapon types, XP system, and power-ups!