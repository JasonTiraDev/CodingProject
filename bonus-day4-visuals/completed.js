// 🎮 Bonus Day 4: Visual Polish - Mini Survivors
// Complete game with visual effects and enhanced graphics

// All Day 3 variables plus visual enhancements
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
let lastDirection = {x: 0, y: -1};

// Visual enhancement variables
let explosionParticles = [];
let screenShake = 0;
let animationFrame = 0;
let playerSprite;
let enemySprite;
let bulletSprite;

function setup() {
  createCanvas(800, 600);
  
  // Create sprite graphics
  createSprites();
  
  // Day 3's working player setup
  player = {
    x: width / 2,
    y: height / 2,
    size: 18,
    speed: 4,
    rotation: 0
  };
}

function draw() {
  // Screen shake effect
  if (screenShake > 0) {
    translate(random(-screenShake, screenShake), random(-screenShake, screenShake));
    screenShake *= 0.9; // Fade out shake
  }
  
  // Animated background
  drawAnimatedBackground();
  
  if (gameState === "start") {
    // Enhanced start screen with floating text
    let floatOffset = sin(frameCount * 0.03) * 5;
    
    fill(255, 255, 100);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("MINI SURVIVORS", width/2, height/2 - 80 + floatOffset);
    
    fill(255);
    textSize(24);
    text("Press any key to start", width/2, height/2 + 20);
    
    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 60);
    text("Collect XP to level up and get stronger!", width/2, height/2 + 90);
    text("Press 1, 2, 3 to switch weapons", width/2, height/2 + 120);
    
  } else if (gameState === "playing") {
    animationFrame++;
    
    // Increase difficulty over time
    difficultyTimer++;
    
    // Player movement with direction tracking
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
      player.x -= player.speed;
      lastDirection = {x: -1, y: 0};
      player.rotation = -PI/2;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
      player.x += player.speed;
      lastDirection = {x: 1, y: 0};
      player.rotation = PI/2;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
      player.y -= player.speed;
      lastDirection = {x: 0, y: -1};
      player.rotation = 0;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S key
      player.y += player.speed;
      lastDirection = {x: 0, y: 1};
      player.rotation = PI;
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
          type: "basic",
          trail: []
        });
      } else if (currentWeapon === "spread") {
        let spreadAngle = 0.3;
        let baseAngle = Math.atan2(lastDirection.y, lastDirection.x);
        
        for (let i = -1; i <= 1; i++) {
          let angle = baseAngle + (i * spreadAngle);
          bullets.push({
            x: player.x,
            y: player.y,
            vx: Math.cos(angle) * (bulletSpeed - 1),
            vy: Math.sin(angle) * (bulletSpeed - 1),
            type: "spread",
            trail: []
          });
        }
      } else if (currentWeapon === "rapid") {
        bullets.push({
          x: player.x,
          y: player.y,
          vx: lastDirection.x * (bulletSpeed + 1),
          vy: lastDirection.y * (bulletSpeed + 1),
          type: "rapid",
          trail: []
        });
      }
    }
    
    // Update and draw bullets with trails
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      
      // Add current position to trail
      bullet.trail.push({x: bullet.x, y: bullet.y});
      if (bullet.trail.length > 8) bullet.trail.shift();
      
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      
      // Draw bullet trail
      for (let j = 0; j < bullet.trail.length; j++) {
        let alpha = (j / bullet.trail.length) * 100;
        if (bullet.type === "basic") {
          fill(255, 255, 0, alpha);
        } else if (bullet.type === "spread") {
          fill(255, 150, 0, alpha);
        } else if (bullet.type === "rapid") {
          fill(0, 255, 255, alpha);
        }
        ellipse(bullet.trail[j].x, bullet.trail[j].y, 4 - j/2);
      }
      
      // Draw main bullet
      if (bullet.type === "basic") {
        fill(255, 255, 0);
        ellipse(bullet.x, bullet.y, 8);
        fill(255, 255, 150);
        ellipse(bullet.x, bullet.y, 4);
      } else if (bullet.type === "spread") {
        fill(255, 150, 0);
        ellipse(bullet.x, bullet.y, 7);
      } else if (bullet.type === "rapid") {
        fill(0, 255, 255);
        ellipse(bullet.x, bullet.y, 6);
      }
      
      // Remove bullets that go off screen
      if (bullet.y < -10 || bullet.y > height + 10 || 
          bullet.x < -10 || bullet.x > width + 10) {
        bullets.splice(i, 1);
      }
    }
    
    // Spawn enemies from all directions
    let baseSpawnRate = 1.2;
    let levelBonus = (playerLevel - 1) * 0.4;
    let timeBonus = difficultyTimer / 2400;
    let enemySpawnChance = baseSpawnRate + levelBonus + timeBonus;
    
    if (random(100) < enemySpawnChance) {
      let enemy = {
        size: random(14, 26),
        speed: random(0.8, 1.8 + (playerLevel * 0.2) + (difficultyTimer / 7200)),
        health: 1,
        pulsePhase: random(TWO_PI)
      };
      
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
      } else {
        enemy.x = width + enemy.size;
        enemy.y = random(enemy.size, height - enemy.size);
      }
      
      enemies.push(enemy);
    }
    
    // Update and draw enemies with animation
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
      
      // Draw enemy with pulsing animation
      enemy.pulsePhase += 0.1;
      let pulseSize = enemy.size + sin(enemy.pulsePhase) * 3;
      
      // Outer glow
      fill(255, 50, 50, 100);
      ellipse(enemy.x, enemy.y, pulseSize + 6);
      
      // Main enemy body
      fill(255, 100, 100);
      ellipse(enemy.x, enemy.y, pulseSize);
      
      // Inner core
      fill(255, 150, 150);
      ellipse(enemy.x, enemy.y, pulseSize * 0.6);
      
      // Check if enemy hits player
      if (distance < (player.size + enemy.size) / 2) {
        playerHealth -= 25;
        enemies.splice(i, 1);
        addScreenShake(8);
        
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
        size: 15,
        glowPhase: 0
      });
    }
    
    // Update and draw power-ups with glow effect
    for (let i = powerUps.length - 1; i >= 0; i--) {
      let powerUp = powerUps[i];
      powerUp.glowPhase += 0.05;
      
      // Glowing effect
      let glowSize = powerUp.size + sin(powerUp.glowPhase) * 5;
      
      if (powerUp.type === "health") {
        fill(0, 255, 0, 100);
        ellipse(powerUp.x, powerUp.y, glowSize + 10);
        fill(0, 255, 0);
      } else if (powerUp.type === "weapon") {
        fill(255, 255, 0, 100);
        ellipse(powerUp.x, powerUp.y, glowSize + 10);
        fill(255, 255, 0);
      } else if (powerUp.type === "speed") {
        fill(0, 0, 255, 100);
        ellipse(powerUp.x, powerUp.y, glowSize + 10);
        fill(0, 0, 255);
      }
      
      ellipse(powerUp.x, powerUp.y, powerUp.size);
      
      // Check if player collects power-up
      let distance = sqrt((player.x - powerUp.x) ** 2 + (player.y - powerUp.y) ** 2);
      if (distance < (player.size + powerUp.size) / 2) {
        applyPowerUp(powerUp.type);
        powerUps.splice(i, 1);
        addScreenShake(4);
      }
    }
    
    // Check bullet-enemy collisions
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = sqrt((bullets[i].x - enemies[j].x) ** 2 + (bullets[i].y - enemies[j].y) ** 2);
        
        if (bulletDist < (6 + enemies[j].size) / 2) {
          // Create explosion
          createExplosion(enemies[j].x, enemies[j].y);
          addScreenShake(3);
          
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          playerXP += 8;
          
          if (playerXP >= playerLevel * 75) {
            playerLevel++;
            maxHealth += 15;
            playerHealth = min(playerHealth + 20, maxHealth);
            addScreenShake(6);
          }
          
          break;
        }
      }
    }
    
    // Update and draw explosion particles
    for (let i = explosionParticles.length - 1; i >= 0; i--) {
      let particle = explosionParticles[i];
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 2;
      particle.size *= 0.98;
      
      fill(particle.color.r, particle.color.g, particle.color.b, particle.life);
      ellipse(particle.x, particle.y, particle.size);
      
      if (particle.life <= 0) {
        explosionParticles.splice(i, 1);
      }
    }
    
    // Draw player with rotation and glow
    push();
    translate(player.x, player.y);
    rotate(player.rotation);
    
    // Player glow
    fill(0, 255, 255, 100);
    ellipse(0, 0, player.size + 8);
    
    // Player body
    fill(0, 255, 255);
    ellipse(0, 0, player.size);
    
    // Player core
    fill(150, 255, 255);
    ellipse(0, 0, player.size * 0.6);
    
    pop();
    
    // Draw enhanced UI
    drawEnhancedUI();
    
  } else if (gameState === "gameOver") {
    // Animated game over screen
    let pulseAlpha = 150 + sin(frameCount * 0.1) * 100;
    
    fill(255, 100, 100, pulseAlpha);
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

function drawAnimatedBackground() {
  background(15, 15, 30);
  
  // Moving stars
  for (let i = 0; i < 50; i++) {
    let x = (i * 77) % width;
    let y = (i * 43 + frameCount * 0.5) % height;
    let brightness = 100 + sin(frameCount * 0.02 + i) * 50;
    
    fill(brightness, brightness, 255, 150);
    ellipse(x, y, 2);
  }
}

function drawEnhancedUI() {
  // Health bar with glow
  fill(255, 0, 0, 100);
  rect(8, 8, 204, 24);
  fill(255, 0, 0);
  rect(10, 10, 200, 20);
  fill(0, 255, 0);
  rect(10, 10, (playerHealth / maxHealth) * 200, 20);
  
  // XP bar with glow
  fill(100, 100, 255, 100);
  rect(8, 33, 204, 19);
  fill(100, 100, 255);
  rect(10, 35, 200, 15);
  fill(0, 255, 255);
  let xpProgress = (playerXP % (playerLevel * 75)) / (playerLevel * 75);
  rect(10, 35, xpProgress * 200, 15);
  
  // Text with glow effect
  fill(0, 0, 0, 100);
  textAlign(LEFT, TOP);
  textSize(16);
  text("Health", 222, 14);
  text("XP", 222, 39);
  text("Score: " + score, 12, 62);
  text("Level: " + playerLevel, 12, 82);
  text("Weapon: " + currentWeapon, 12, 102);
  
  fill(255);
  text("Health", 220, 12);
  text("XP", 220, 37);
  text("Score: " + score, 10, 60);
  text("Level: " + playerLevel, 10, 80);
  text("Weapon: " + currentWeapon, 10, 100);
  
  textAlign(RIGHT, TOP);
  fill(0, 0, 0, 100);
  text("1,2,3: Switch Weapons", width - 8, 12);
  fill(255);
  text("1,2,3: Switch Weapons", width - 10, 10);
}

function createSprites() {
  // This would create proper sprites in a full implementation
  // For now, we use enhanced drawing in the main draw loop
}

function createExplosion(x, y) {
  for (let i = 0; i < 15; i++) {
    explosionParticles.push({
      x: x,
      y: y,
      vx: random(-3, 3),
      vy: random(-3, 3),
      size: random(3, 8),
      life: 255,
      color: {
        r: random(200, 255),
        g: random(100, 200),
        b: random(0, 100)
      }
    });
  }
}

function addScreenShake(intensity) {
  screenShake = intensity;
}

function applyPowerUp(type) {
  if (type === "health") {
    playerHealth = min(playerHealth + 20, maxHealth);
  } else if (type === "weapon") {
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
    if (key === '1') currentWeapon = "basic";
    if (key === '2') currentWeapon = "spread";
    if (key === '3') currentWeapon = "rapid";
  } else if (gameState === "gameOver") {
    // Reset game
    bullets = [];
    enemies = [];
    powerUps = [];
    explosionParticles = [];
    score = 0;
    playerXP = 0;
    playerLevel = 1;
    playerHealth = 60;
    maxHealth = 60;
    currentWeapon = "basic";
    difficultyTimer = 0;
    lastDirection = {x: 0, y: -1};
    screenShake = 0;
    player.x = width / 2;
    player.y = height / 2;
    player.speed = 4;
    player.rotation = 0;
    gameState = "playing";
  }
}