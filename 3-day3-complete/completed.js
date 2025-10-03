// 🎮 Day 3: Complete Game - Mini Survivors
// COMPLETED VERSION - This is what the finished game should look like!
// We start with working Day 2 code, then add advanced features

// ====================================
// LESSON GOALS:
// - Learn about different weapon systems (spread shots, rapid fire)
// - Add an XP and leveling system to make progression rewarding
// - Create power-ups that randomly appear and help the player
// - Give the player health so they can take multiple hits
// - Make the game get progressively harder over time
// - Build a complete, polished survival game!
// ====================================

// STEP 1: Variables from Day 2 + new ones for Day 3
// Think of these like labeled boxes that hold important data

// From Day 2 - these should be very familiar now!
let player;                    // Will hold all player information
let gameState = "start";       // Tracks which screen we're showing
let bullets = [];              // Will hold all bullets currently on screen
let enemies = [];              // Will hold all enemies currently on screen  
let score = 0;                 // Player's score

// NEW for Day 3 - advanced game features!
// TODO: Create variables for the new systems
// HINT: let playerXP = 0;           (experience points for leveling up)
// HINT: let playerLevel = 1;        (current player level - starts at 1)
// HINT: let playerHealth = 60;      (current health - can take damage now!)
// HINT: let maxHealth = 60;         (maximum possible health)
// HINT: let currentWeapon = "basic"; (current weapon type)
// HINT: let powerUps = [];          (array to hold power-ups)
// HINT: let difficultyTimer = 0;    (tracks time to increase difficulty)
// HINT: let lastDirection = {x: 0, y: -1}; (direction player is facing for shooting)
let powerUps = [];             // Array to hold power-ups
let playerXP = 0;              // Experience points for leveling up
let playerLevel = 1;           // Current player level
let playerHealth = 60;         // Current health (can take damage now!)
let maxHealth = 60;            // Maximum possible health
let currentWeapon = "basic";   // Current weapon type
let difficultyTimer = 0;       // Tracks time to increase difficulty
let lastDirection = {x: 0, y: -1}; // Direction player is facing (for shooting)

// STEP 2: The setup() function runs ONCE when the game starts
function setup() {
  // Create the game window - same as Day 1 and 2
  // TODO: Create a canvas that's 800 pixels wide and 600 pixels tall
  // HINT: Use createCanvas(width, height)
  createCanvas(800, 600);
  
  // STEP 3: Create our player character (same as Day 2, but slightly smaller)
  // This is like a character sheet with all the player's stats
  // TODO: Fill in the player object with these properties:
  // x: width / 2 (center horizontally)
  // y: height / 2 (center vertically) 
  // size: 18 (slightly smaller for more challenge)
  // speed: 4 (how fast they move)
  player = {
    x: width / 2,     // Start in center horizontally
    y: height / 2,    // Start in center vertically
    size: 18,         // Slightly smaller for more challenge
    speed: 4          // How fast they move
  };
}

// STEP 4: The draw() function runs 60 TIMES PER SECOND!
// This is what makes the game move and look alive
function draw() {
  // Paint the background color every frame (like erasing a whiteboard)
  // These numbers are Red, Green, Blue (0-255). Try (0, 0, 0) for black!
  // 🎨 Find more colors at: https://colorpicker.me or just Google "RGB color picker"
  background(20, 20, 40);
  
  // Check what screen we should show
  if (gameState === "start") {
    // STEP 5: Show the start screen (same as Day 2, but with new instructions!)
    
    // TODO: Set text color to white
    // HINT: Use fill(255)
    fill(255);
    
    // TODO: Make text big for the title
    // HINT: Use textSize(48)
    textSize(48);
    
    // TODO: Center the text on screen
    // HINT: Use textAlign(CENTER, CENTER)
    textAlign(CENTER, CENTER);
    
    // TODO: Draw the title text
    // HINT: Use text("MINI SURVIVORS", width/2, height/2 - 80)
    // 💡 TRY THIS: Change "MINI SURVIVORS" to your own game title!
    text("MINI SURVIVORS", width/2, height/2 - 80);
    
    // TODO: Add start instructions
    // HINT: textSize(24) then text("Press any key to start", width/2, height/2 + 20)
    textSize(24);
    text("Press any key to start", width/2, height/2 + 20);
    
    // TODO: Add game instructions
    // HINT: textSize(16) for smaller text
    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 60);
    text("Collect XP to level up and get stronger!", width/2, height/2 + 90);
    text("Press 1, 2, 3 to switch weapons", width/2, height/2 + 120);
    
  } else if (gameState === "playing") {
    // STEP 7: Increase difficulty over time (NEW for Day 3!)
    // TODO: Track how long the game has been running
    // HINT: difficultyTimer++; (add 1 each frame to count time)
    difficultyTimer++;
    
    // STEP 6: Handle player movement (same as Day 2, but now we track direction!)
    // Check if keys are being pressed RIGHT NOW
    
    // TODO: Move player and track direction for shooting
    // HINT: Same movement as Day 2, but now set lastDirection for bullets
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Left arrow OR 'A' key
      player.x -= player.speed;                   // Move left
      lastDirection = {x: -1, y: 0};             // Remember we're moving left
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Right arrow OR 'D' key
      player.x += player.speed;                    // Move right
      lastDirection = {x: 1, y: 0};               // Remember we're moving right
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {    // Up arrow OR 'W' key
      player.y -= player.speed;                    // Move up
      lastDirection = {x: 0, y: -1};              // Remember we're moving up
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {  // Down arrow OR 'S' key
      player.y += player.speed;                    // Move down
      lastDirection = {x: 0, y: 1};               // Remember we're moving down
    }
    
    // Keep player within screen boundaries (same as Day 2)
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // STEP 8: Enhanced shooting system with multiple weapon types (NEW!)
    // TODO: Create different shooting patterns based on currentWeapon
    // HINT: Use if/else statements to check currentWeapon
    // HINT: "basic" = single bullet, "spread" = 3 bullets, "rapid" = faster rate
    // HINT: For spread: create 3 bullets with slightly different directions
    // HINT: For rapid: use frameCount % 5 instead of % 10
    let fireRate = 15;
    if (currentWeapon === "rapid") fireRate = 8;
    
    if (frameCount % fireRate === 0) {
      let bulletSpeed = 7;
      if (currentWeapon === "basic") {
        bullets.push({
          x: player.x,
          y: player.y,
          vx: lastDirection.x * bulletSpeed,
          vy: lastDirection.y * bulletSpeed,
          type: "basic"
        });
      } else if (currentWeapon === "spread") {
        // Three bullets in a spread pattern
        let spreadAngle = 0.3; // Spread angle in radians
        let baseAngle = Math.atan2(lastDirection.y, lastDirection.x);
        
        for (let i = -1; i <= 1; i++) {
          let angle = baseAngle + (i * spreadAngle);
          bullets.push({
            x: player.x,
            y: player.y,
            vx: Math.cos(angle) * (bulletSpeed - 1),
            vy: Math.sin(angle) * (bulletSpeed - 1),
            type: "spread"
          });
        }
      } else if (currentWeapon === "rapid") {
        bullets.push({
          x: player.x,
          y: player.y,
          vx: lastDirection.x * (bulletSpeed + 1),
          vy: lastDirection.y * (bulletSpeed + 1),
          type: "rapid"
        });
      }
    }
    
    // STEP 9: Update and draw all bullets (enhanced from Day 2)
    // TODO: Make bullets move in any direction and draw different colors
    // HINT: Same loop structure as Day 2, but now bullets can move horizontally too
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      
      // TODO: Move bullet using its velocity
      // HINT: bullet.x += bullet.vx; (move horizontally)
      // HINT: bullet.y += bullet.vy; (move vertically)
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      
      // TODO: Draw different bullet colors based on type
      // HINT: if (bullet.type === "basic") fill(255, 255, 0); (yellow)
      // HINT: if (bullet.type === "spread") fill(255, 150, 0); (orange)
      // HINT: if (bullet.type === "rapid") fill(0, 255, 255); (cyan)
      // 💡 TRY THIS: Try different colors for different bullet types!
      if (bullet.type === "basic") {
        fill(255, 255, 0); // Yellow
        ellipse(bullet.x, bullet.y, 6);
      } else if (bullet.type === "spread") {
        fill(255, 150, 0); // Orange
        ellipse(bullet.x, bullet.y, 5);
      } else if (bullet.type === "rapid") {
        fill(0, 255, 255); // Cyan
        ellipse(bullet.x, bullet.y, 4);
      }
      
      // TODO: Remove bullets that go off screen in ANY direction
      // HINT: Check if bullet.y < 0 OR bullet.y > height OR bullet.x < 0 OR bullet.x > width
      if (bullet.y < -10 || bullet.y > height + 10 || 
          bullet.x < -10 || bullet.x > width + 10) {
        bullets.splice(i, 1);
      }
    }
    
    // STEP 10: Enhanced enemy spawning from all directions (NEW for Day 3!)
    // TODO: Make enemies spawn from all screen edges, not just the top
    // TODO: Make spawn rate increase with player level for balanced progression
    // HINT: Use random() and check if it's less than a spawn chance
    // HINT: Spawn chance should increase with playerLevel: 1.2 + (playerLevel - 1) * 0.4
    let baseSpawnRate = 1.2; // Start low
    let levelBonus = (playerLevel - 1) * 0.4; // Each level adds 0.4%
    let timeBonus = difficultyTimer / 2400; // Very gradual time increase
    let enemySpawnChance = baseSpawnRate + levelBonus + timeBonus;
    
    if (random(100) < enemySpawnChance) {
      let enemy = {
        size: random(14, 26), // Random size variety
        speed: random(0.8, 1.8 + (playerLevel * 0.2) + (difficultyTimer / 7200)), // Speed increases with level
        health: 1
      };
      
      // TODO: Spawn enemies from random screen edges
      // HINT: Choose random side using random(['top', 'bottom', 'left', 'right'])
      // HINT: If 'top': x = random(width), y = -enemy.size
      // HINT: If 'bottom': x = random(width), y = height + enemy.size
      // HINT: If 'left': x = -enemy.size, y = random(height)
      // HINT: If 'right': x = width + enemy.size, y = random(height)
      // 💡 TRY THIS: This makes enemies come from all directions - much more challenging!
      let side = random(['top', 'bottom', 'left', 'right']);
      if (side === 'top') {
        enemy.x = random(enemy.size, width - enemy.size);
        enemy.y = -enemy.size;
      } else if (side === 'bottom') {
        enemy.x = random(enemy.size, width - enemy.size);
        enemy.y = height + enemy.size;
      } else if (side === 'left') {
        enemy.x = -enemy.size;
        enemy.y = random(enemy.size, height - enemy.size);
      } else { // right
        enemy.x = width + enemy.size;
        enemy.y = random(enemy.size, height - enemy.size);
      }
      
      enemies.push(enemy);
    }
    
    // Update and draw enemies
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
      
      // TODO: Health system - player can take multiple hits now! (NEW for Day 3!)
      if (distance < (player.size + enemy.size) / 2) {
        // TODO: Reduce playerHealth by 25 (significant damage!)
        // HINT: playerHealth -= 25;
        // TODO: Remove the enemy that hit the player
        // HINT: enemies.splice(i, 1);
        // TODO: Check if playerHealth <= 0 for game over
        // HINT: if (playerHealth <= 0) { gameState = "gameOver"; }
        // 💡 TRY THIS: Change the damage amount - try 15 for easier, 35 for harder!
        playerHealth -= 25; // More damage per hit
        enemies.splice(i, 1);
        
        if (playerHealth <= 0) {
          gameState = "gameOver";
        }
      }
    }
    
    // STEP 11: Power-up spawning system (NEW for Day 3!)
    // TODO: Spawn power-ups very rarely
    // HINT: if (random(1000) < 1) {  (0.1% chance each frame - very rare!)
    // HINT:   powerUps.push({
    // HINT:     x: random(30, width - 30),     (random position)
    // HINT:     y: random(30, height - 30),
    // HINT:     type: random(["health", "weapon", "speed"]),  (random type)
    // HINT:     size: 15
    // HINT:   });
    // HINT: }
    // 💡 TRY THIS: Change the spawn rate - try random(500) < 1 for more frequent!
    if (random(1000) < 1) {
      powerUps.push({
        x: random(30, width - 30),
        y: random(30, height - 30),
        type: random(["health", "weapon", "speed"]),
        size: 15
      });
    }
    
    // STEP 12: Power-up collection and drawing
    // TODO: Draw power-ups and check if player collects them
    // HINT: Loop through powerUps array like bullets and enemies
    // HINT: Draw different colors: health = green, weapon = yellow, speed = blue
    // HINT: Check distance to player, if close enough call applyPowerUp(type)
    // HINT: Don't forget to remove collected power-ups from the array!
    for (let i = powerUps.length - 1; i >= 0; i--) {
      let powerUp = powerUps[i];
      
      // Draw power-up with different colors
      if (powerUp.type === "health") {
        fill(0, 255, 0); // Green
      } else if (powerUp.type === "weapon") {
        fill(255, 255, 0); // Yellow  
      } else if (powerUp.type === "speed") {
        fill(0, 0, 255); // Blue
      }
      
      noStroke();
      ellipse(powerUp.x, powerUp.y, powerUp.size);
      
      // Check if player collects power-up
      let distance = sqrt((player.x - powerUp.x) ** 2 + (player.y - powerUp.y) ** 2);
      if (distance < (player.size + powerUp.size) / 2) {
        applyPowerUp(powerUp.type);
        powerUps.splice(i, 1);
      }
    }
    
    // Check bullet-enemy collisions
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = sqrt((bullets[i].x - enemies[j].x) ** 2 + (bullets[i].y - enemies[j].y) ** 2);
        
        if (bulletDist < (6 + enemies[j].size) / 2) {
          // Hit! Remove both bullet and enemy
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          
          // TODO: Add XP and leveling system (NEW for Day 3!)
          // HINT: playerXP += 8;  (gain XP for each enemy killed)
          // 
          // TODO: Check for level up
          // HINT: if (playerXP >= playerLevel * 75) {  (each level needs more XP)
          // HINT:   playerLevel++;                      (increase level)
          // HINT:   maxHealth += 15;                     (increase max health)
          // HINT:   playerHealth = min(playerHealth + 20, maxHealth);  (partial heal)
          // HINT: }
          // 💡 TRY THIS: Change the XP requirement - try playerLevel * 50 for faster leveling!
          playerXP += 8; // Gain XP for each enemy killed
          
          // Level up check - harder to level up
          if (playerXP >= playerLevel * 75) {
            playerLevel++;
            maxHealth += 15; // Increase max health
            playerHealth = min(playerHealth + 20, maxHealth); // Partial heal, not full
          }
          
          break;
        }
      }
    }
    
    // Draw player
    fill(0, 255, 255); // Cyan
    noStroke();
    ellipse(player.x, player.y, player.size);
    
    // STEP 13: Draw enhanced UI (NEW for Day 3!)
    // TODO: Create health bar, XP bar, and enhanced text info
    // HINT: Health bar: red background rect, then green rect scaled by health percentage
    // HINT: XP bar: blue background rect, then cyan rect scaled by XP progress
    // HINT: Text: show score, level, current weapon, and controls
    // HINT: You might want to create a drawUI() function to organize this!
    // 💡 TRY THIS: Try different bar colors and positions!
    drawUI();
    
  } else if (gameState === "gameOver") {
    // STEP 14: Enhanced game over screen (improved from Day 2!)
    // TODO: Show game over info including level reached
    // HINT: Same structure as Day 2, but add level information
    // HINT: text("Level Reached: " + playerLevel, width/2, height/2 + 10);
    fill(255, 100, 100);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2 - 80);
    
    fill(255);
    textSize(24);
    text("Final Score: " + score, width/2, height/2 - 20);
    text("Level Reached: " + playerLevel, width/2, height/2 + 10);
    
    textSize(18);
    text("Press any key to restart", width/2, height/2 + 60);
  }
}

// STEP 19: Create a drawUI function to organize your interface code
function drawUI() {
  // TODO: Move all your UI drawing code here for better organization
  // HINT: Health bar: fill(255, 0, 0); rect(); then fill(0, 255, 0); rect();
  // HINT: XP bar: similar structure but with blue/cyan colors
  // HINT: Text info: score, level, weapon, controls
  // 💡 TRY THIS: Try different bar styles and layouts!
  
  // Health bar
  fill(255, 0, 0);
  rect(10, 10, 200, 20);
  fill(0, 255, 0);
  rect(10, 10, (playerHealth / maxHealth) * 200, 20);
  
  // XP bar
  fill(100, 100, 255);
  rect(10, 35, 200, 15);
  fill(0, 255, 255);
  let xpProgress = (playerXP % (playerLevel * 75)) / (playerLevel * 75);
  rect(10, 35, xpProgress * 200, 15);
  
  // Text info
  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  text("Health", 220, 12);
  text("XP", 220, 37);
  text("Score: " + score, 10, 60);
  text("Level: " + playerLevel, 10, 80);
  text("Weapon: " + currentWeapon, 10, 100);
  
  textAlign(RIGHT, TOP);
  text("1,2,3: Switch Weapons", width - 10, 10);
}

// STEP 18: Create power-up effects function (NEW for Day 3!)
function applyPowerUp(type) {
  // TODO: Create different power-up effects
  // HINT: if (type === "health") {   
  // HINT:   playerHealth = min(playerHealth + 20, maxHealth);  (restore health but don't exceed max)
  // HINT: } else if (type === "weapon") {
  // HINT:   // Cycle through weapon types: basic -> spread -> rapid -> basic
  // HINT: } else if (type === "speed") {
  // HINT:   player.speed += 0.5;  (permanent speed increase!)
  // HINT: }
  // 💡 TRY THIS: Add new power-up types like "damage" or "shield"!
  if (type === "health") {
    playerHealth = min(playerHealth + 20, maxHealth); // Restore health but don't exceed max
  } else if (type === "weapon") {
    // Cycle through weapons: basic -> spread -> rapid -> basic
    if (currentWeapon === "basic") currentWeapon = "spread";
    else if (currentWeapon === "spread") currentWeapon = "rapid";
    else currentWeapon = "basic";
  } else if (type === "speed") {
    player.speed += 0.5; // Permanent speed increase!
  }
}

// STEP 15: Handle when someone presses a key ONCE (enhanced from Day 2)
function keyPressed() {
  // Start the game (same as Day 2)
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "playing") {
    // STEP 16: Weapon switching system (NEW for Day 3!)
    // TODO: Add weapon switching with number keys
    // HINT: if (key === '1') currentWeapon = "basic";
    // HINT: if (key === '2') currentWeapon = "spread";
    // HINT: if (key === '3') currentWeapon = "rapid";
    // 💡 TRY THIS: Add more weapons like "orbital" or "laser"!
    if (key === '1') currentWeapon = "basic";
    if (key === '2') currentWeapon = "spread";
    if (key === '3') currentWeapon = "rapid";
    
  } else if (gameState === "gameOver") {
    // STEP 17: Reset all game variables for restart (enhanced from Day 2)
    // TODO: Reset all the new Day 3 variables
    // HINT: Reset health, XP, level, weapon, powerUps, etc.
    // HINT: Don't forget to clear all arrays and reset player position
    bullets = [];
    enemies = [];
    powerUps = [];
    score = 0;
    playerXP = 0;
    playerLevel = 1;
    playerHealth = 60;
    maxHealth = 60;
    currentWeapon = "basic";
    difficultyTimer = 0;
    lastDirection = {x: 0, y: -1};
    player.x = width / 2;
    player.y = height / 2;
    player.speed = 4;
    gameState = "playing";
  }
}