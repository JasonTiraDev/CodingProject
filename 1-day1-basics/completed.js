// 🎮 Day 1: Game Foundations - Mini Survivors
// A basic game with player movement and boundaries

// Global variables for the game
let player;
let gameState = "start"; // Can be "start", "playing", or "gameOver"

function setup() {
  createCanvas(800, 600);
  
  // Create the player object
  player = {
    x: width / 2,
    y: height / 2,
    size: 20,
    speed: 4
  };
}

function draw() {
  background(20, 20, 40); // Dark blue background
  
  if (gameState === "start") {
    // Show the start screen
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("MINI SURVIVORS", width/2, height/2 - 50);
    
    textSize(24);
    text("Press any key to start", width/2, height/2 + 50);
    
    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 100);
    
  } else if (gameState === "playing") {
    // Handle player movement
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
    
    // Keep player within screen boundaries
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // Draw the player
    fill(0, 255, 255); // Cyan color
    noStroke();
    ellipse(player.x, player.y, player.size);
    
    // Add some UI
    fill(255);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Move with WASD or Arrow Keys", 10, 10);
  }
}

function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  }
}