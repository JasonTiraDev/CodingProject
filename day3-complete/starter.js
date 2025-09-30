// 🎮 Day 3: Complete Game - Mini Survivors
// Today we'll create a full-featured survival game!
// Starting with working Day 2 code, then adding advanced features

// ====================================
// LESSON GOALS:
// - Add multiple weapon types with different behaviors
// - Create an XP and leveling system
// - Add power-ups that randomly appear
// - Implement a health system for the player
// - Add increasing difficulty over time
// ====================================

// Starting with Day 2's working code
let player;
let gameState = "start";
let bullets = [];
let enemies = [];
let score = 0;

// TODO: Add new variables for advanced features
let playerXP = 0;           // Experience points for leveling up
let playerLevel = 1;        // Current player level
let playerHealth = 60;      // Current health (can take damage now!)
let maxHealth = 60;         // Maximum possible health
let currentWeapon = "basic"; // Current weapon type
let powerUps = [];          // Array to hold power-ups
let difficultyTimer = 0;    // Tracks time to increase difficulty
let lastDirection = {x: 0, y: -1}; // Direction player is facing (for shooting)

function setup() {
  createCanvas(800, 600);
  
  // Day 2's working player setup (smaller for more challenge)
  player = {
    x: width / 2,
    y: height / 2,
    size: 18,
    speed: 4
  };
}

function draw() {
  background(20, 20, 40);
  
  if (gameState === "start") {
    // Day 2's working start screen
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("MINI SURVIVORS", width/2, height/2 - 80);
    
    textSize(24);
    text("Press any key to start", width/2, height/2 + 20);
    
    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 60);
    text("Collect XP to level up and get stronger!", width/2, height/2 + 90);
    text("Press 1, 2, 3 to switch weapons", width/2, height/2 + 120);
    
  } else if (gameState === "playing") {
    // Day 2's working player movement + direction tracking
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
      player.x -= player.speed;
      lastDirection = {x: -1, y: 0}; // Remember we're moving left
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
      player.x += player.speed;
      lastDirection = {x: 1, y: 0}; // Remember we're moving right
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
      player.y -= player.speed;
      lastDirection = {x: 0, y: -1}; // Remember we're moving up
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S key
      player.y += player.speed;
      lastDirection = {x: 0, y: 1}; // Remember we're moving down
    }
    
    // Keep player within boundaries
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // TODO: Increase difficulty over time
    // HINT: Increment difficultyTimer each frame to track game time
    
    // TODO: Enhanced shooting system with weapon types
    // CHALLENGE: Create different shooting patterns based on currentWeapon:
    // - "basic": Single bullet straight up
    // - "spread": Three bullets in a fan pattern
    // - "rapid": Faster shooting rate
    // HINT: Use if/else statements with currentWeapon variable
    
    // TODO: Enhanced shooting system with directional shooting
    // HINT: Bullets should travel in the direction the player last moved
    if (frameCount % 10 === 0) { // Shoot every 10 frames
      bullets.push({
        x: player.x,
        y: player.y,
        vx: lastDirection.x * 7,  // TODO: Use lastDirection for bullet velocity
        vy: lastDirection.y * 7,  // TODO: Multiply by bullet speed (7)
        type: "basic" // TODO: Set bullet type based on weapon
      });
    }
    
    // Day 2's working bullet system (enhance this)
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      bullet.x += bullet.vx; // TODO: Add this line for horizontal movement
      bullet.y += bullet.vy; // Use vy instead of speed
      
      // TODO: Draw different bullet colors based on type
      fill(255, 255, 0); // Yellow for basic
      noStroke();
      ellipse(bullet.x, bullet.y, 6);
      
      // Remove bullets that go off screen
      if (bullet.y < 0 || bullet.x < 0 || bullet.x > width) {
        bullets.splice(i, 1);
      }
    }
    
    // TODO: Enhanced enemy spawning from all directions
    // HINT: Enemies should spawn from all edges of the screen, not just the top
    // HINT: Make spawn rate increase with player level for balanced progression
    if (random(100) < (1.2 + (playerLevel - 1) * 0.4)) { // Scales with level!
      let enemy = {
        size: random(14, 26),
        speed: random(0.8, 1.8 + (playerLevel * 0.2)), // TODO: Scale with player level
        health: 1
      };
      
      // TODO: Spawn enemies from random screen edges
      // HINT: Choose random side ('top', 'bottom', 'left', 'right')
      // HINT: Set x,y position based on which side was chosen
      enemy.x = random(20, width - 20); // TODO: Replace this with edge-based positioning
      enemy.y = 0; // TODO: Replace this with edge-based positioning
      
      enemies.push(enemy);
    }
    
    // Day 2's working enemy system (enhance this)
    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemy = enemies[i];
      
      // Move enemy toward player
      let dx = player.x - enemy.x;
      let dy = player.y - enemy.y;
      let distance = sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        enemy.x += (dx / distance) * enemy.speed;
        enemy.y += (dy / distance) * enemy.speed;
      }
      
      // Draw enemy
      fill(255, 100, 100); // Red
      noStroke();
      ellipse(enemy.x, enemy.y, enemy.size);
      
      // TODO: Modify this - instead of game over, reduce health
      if (distance < (player.size + enemy.size) / 2) {
        // TODO: Reduce playerHealth by 25 (significant damage!)
        // TODO: Remove the enemy
        // TODO: Check if playerHealth <= 0 for game over
        gameState = "gameOver"; // Replace this with health system
      }
    }
    
    // TODO: Add power-up spawning
    // HINT: Very low random chance to spawn power-ups
    // Create power-up objects with type ("health", "weapon", "speed") and position
    
    // TODO: Handle power-up collection
    // HINT: Loop through powerUps array, check distance to player
    // If collected, call applyPowerUp(type) and remove from array
    
    // Day 2's working collision detection (enhance this)
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = sqrt((bullets[i].x - enemies[j].x) ** 2 + (bullets[i].y - enemies[j].y) ** 2);
        
        if (bulletDist < (6 + enemies[j].size) / 2) {
          // Hit! Remove both bullet and enemy
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          
          // TODO: Add XP gain here (try playerXP += 8)
          // TODO: Check for level up (XP >= playerLevel * 75 for balanced progression)
          // TODO: On level up: increase playerLevel, maxHealth by 15, partial heal
          
          break; // Exit inner loop since bullet is gone
        }
      }
    }
    
    // Day 2's working player drawing
    fill(0, 255, 255); // Cyan
    noStroke();
    ellipse(player.x, player.y, player.size);
    
    // TODO: Draw UI elements
    // HINT: Create health bar, XP bar, and text info
    // Health bar: red background, green foreground based on health percentage
    // XP bar: blue background, cyan foreground based on XP progress
    // Text: show score, level, current weapon
    
    // Day 2's basic UI (enhance this)
    fill(255);
    textAlign(LEFT, TOP);
    textSize(20);
    text("Score: " + score, 10, 10);
    
  } else if (gameState === "gameOver") {
    // TODO: Enhanced game over screen
    // Show "GAME OVER", final score, level reached, and restart instructions
    fill(255, 100, 100);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2 - 50);
    
    fill(255);
    textSize(24);
    text("Final Score: " + score, width/2, height/2);
    
    textSize(18);
    text("Press any key to restart", width/2, height/2 + 50);
  }
}

function keyPressed() {
  // Day 2's working key handling
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "playing") {
    // TODO: Add weapon switching
    // HINT: Use number keys 1, 2, 3 to switch weapons
    // if (key === '1') currentWeapon = "basic";
    // if (key === '2') currentWeapon = "spread";
    // if (key === '3') currentWeapon = "rapid";
    
  } else if (gameState === "gameOver") {
    // TODO: Reset all game variables for restart
    // HINT: Reset all the new variables we added (health, XP, level, weapon)
    // Plus clear all arrays and reset player position
    
    // Day 2's working reset code (enhance this)
    bullets = [];
    enemies = [];
    score = 0;
    player.x = width / 2;
    player.y = height / 2;
    gameState = "playing";
  }
}

// TODO: Create power-up effects function
function applyPowerUp(type) {
  // CHALLENGE: Create different power-up types:
  // - "health": Restore health (use min() to not exceed maxHealth)
  // - "weapon": Cycle through weapon types  
  // - "speed": Increase player.speed slightly
}

// TODO: Create a drawUI function to organize your interface code
function drawUI() {
  // HINT: Move all your UI drawing code here
  // Health bar, XP bar, text info, etc.
}

// CHALLENGES TO TRY:
// 1. Add a boss enemy that appears every few levels
// 2. Create weapon upgrade system with permanent improvements
// 3. Add particle effects for explosions and power-ups
// 4. Save high scores to local storage
// 5. Add different enemy types with unique behaviors

// NEXT LESSON PREVIEW:
// In Bonus Day 4, we'll add amazing visual effects and animations!