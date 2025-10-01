// 🎮 Day 3: Complete Game - Mini Survivors
// Combat system + weapons + XP + power-ups + health

// Global variables
let player;
let gameState = "start";
let bullets = [];
let enemies = [];
let powerUps = [];
let score = 0;
let playerXP = 0;
let playerLevel = 1;
let playerHealth = 60;
let maxHealth = 60;
let currentWeapon = "basic";
let difficultyTimer = 0;
let lastDirection = {x: 0, y: -1}; // Default direction is up

function setup() {
  createCanvas(800, 600);
  
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
    // Start screen
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
    // Increase difficulty over time
    difficultyTimer++;
    
    // Player movement with direction tracking
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
      player.x -= player.speed;
      lastDirection = {x: -1, y: 0};
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
      player.x += player.speed;
      lastDirection = {x: 1, y: 0};
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
      player.y -= player.speed;
      lastDirection = {x: 0, y: -1};
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S key
      player.y += player.speed;
      lastDirection = {x: 0, y: 1};
    }
    
    // Keep player within boundaries
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // Weapon-based shooting
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
    
    // Update and draw bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      
      // Draw bullet based on type
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
      
      // Remove bullets that go off screen in any direction
      if (bullet.y < -10 || bullet.y > height + 10 || 
          bullet.x < -10 || bullet.x > width + 10) {
        bullets.splice(i, 1);
      }
    }
    
    // Spawn enemies from all directions (scales with player level)
    let baseSpawnRate = 1.2; // Start low
    let levelBonus = (playerLevel - 1) * 0.4; // Each level adds 0.4%
    let timeBonus = difficultyTimer / 2400; // Very gradual time increase
    let enemySpawnChance = baseSpawnRate + levelBonus + timeBonus;
    
    if (random(100) < enemySpawnChance) {
      let enemy = {
        size: random(14, 26), // Reasonable size variety
        speed: random(0.8, 1.8 + (playerLevel * 0.2) + (difficultyTimer / 7200)), // Scale with level + slow time increase
        health: 1
      };
      
      // Spawn from random edge of screen
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
      
      // Check if enemy hits player
      if (distance < (player.size + enemy.size) / 2) {
        playerHealth -= 25; // More damage per hit
        enemies.splice(i, 1);
        
        if (playerHealth <= 0) {
          gameState = "gameOver";
        }
      }
    }
    
    // Spawn power-ups occasionally
    if (random(1000) < 1) {
      powerUps.push({
        x: random(30, width - 30),
        y: random(30, height - 30),
        type: random(["health", "weapon", "speed"]),
        size: 15
      });
    }
    
    // Update and draw power-ups
    for (let i = powerUps.length - 1; i >= 0; i--) {
      let powerUp = powerUps[i];
      
      // Draw power-up
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
          // Hit! Remove bullet and enemy
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          playerXP += 8; // Less XP per kill
          
          // Level up check - harder to level up
          if (playerXP >= playerLevel * 75) {
            playerLevel++;
            maxHealth += 15; // Less health bonus
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
    
    // Draw UI
    drawUI();
    
  } else if (gameState === "gameOver") {
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

function drawUI() {
  // Health bar
  fill(255, 0, 0);
  rect(10, 10, 200, 20);
  fill(0, 255, 0);
  rect(10, 10, (playerHealth / maxHealth) * 200, 20);
  
  // XP bar
  fill(100, 100, 255);
  rect(10, 35, 200, 15);
  fill(0, 255, 255);
  let xpProgress = (playerXP % (playerLevel * 75)) / (playerLevel * 75); // Use correct level requirement
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

function applyPowerUp(type) {
  if (type === "health") {
    playerHealth = min(playerHealth + 20, maxHealth); // Less healing
  } else if (type === "weapon") {
    // Cycle through weapons
    if (currentWeapon === "basic") currentWeapon = "spread";
    else if (currentWeapon === "spread") currentWeapon = "rapid";
    else currentWeapon = "basic";
  } else if (type === "speed") {
    player.speed += 0.5;
  }
}

function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "playing") {
    // Weapon switching
    if (key === '1') currentWeapon = "basic";
    if (key === '2') currentWeapon = "spread";
    if (key === '3') currentWeapon = "rapid";
    
  } else if (gameState === "gameOver") {
    // Reset game
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