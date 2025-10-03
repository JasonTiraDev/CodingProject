// 🎮 Bonus Day 4: Visual Polish - Mini Survivors
// Starting with your complete Day 3 game, now let's make it look AMAZING!
// Today we'll add animated sprites, particle effects, and professional polish

// ====================================
// LESSON GOALS:
// - Transform simple shapes into cool animated sprites
// - Add particle explosion effects when enemies die
// - Create screen shake for impact feedback
// - Build a scrolling star background
// - Polish the UI with glow effects
// - Make the game feel professional and polished!
// ====================================

// STEP 1: All your working Day 3 variables (complete game foundation!)
let player;                    // Player object with position and stats
let gameState = "start";       // Current game screen
let bullets = [];              // Array of all bullets on screen
let enemies = [];              // Array of all enemies on screen
let powerUps = [];             // Array of power-ups to collect
let score = 0;                 // Player's current score
let playerXP = 0;              // Experience points for leveling up
let playerLevel = 1;           // Current player level
let playerHealth = 60;         // Current health (can take damage!)
let maxHealth = 60;            // Maximum possible health
let currentWeapon = "basic";   // Current weapon type
let difficultyTimer = 0;       // Tracks time to increase difficulty
let lastDirection = {x: 0, y: -1}; // Direction player is facing for shooting

// STEP 2: NEW variables for visual enhancements!
// TODO: Add variables for visual effects
// HINT: let explosionParticles = []; (array to hold explosion particles)
// HINT: let screenShake = 0; (intensity of screen shake effect)
// HINT: let animationFrame = 0; (counter for animations)
// 💡 TRY THIS: Add more visual variables like backgroundStars = []

// STEP 3: The setup() function - enhanced for graphics!
function setup() {
  createCanvas(800, 600);
  
  // TODO: Create graphics for sprites (since we can't load images in p5.js web editor)
  // HINT: You'll learn to use createGraphics() to make custom sprites
  // HINT: This is like drawing on invisible canvases that we can reuse
  
  // Your working player setup from Day 3
  player = {
    x: width / 2,     // Start in center horizontally
    y: height / 2,    // Start in center vertically
    size: 18,         // Size for collision detection
    speed: 4,         // Movement speed
    // TODO: Add rotation property for sprite animation
    // HINT: rotation: 0 (tracks which direction player is facing)
  };
}

// STEP 4: Enhanced draw() function with visual effects!
function draw() {
  // TODO: Add screen shake effect at the very beginning
  // HINT: if (screenShake > 0) {
  // HINT:   translate(random(-screenShake, screenShake), random(-screenShake, screenShake));
  // HINT:   screenShake *= 0.9; // Fade out the shake
  // HINT: }
  // 💡 TRY THIS: This makes the whole screen shake when things explode!
  
  // TODO: Create animated background instead of plain color
  // HINT: Call a function like drawAnimatedBackground();
  // HINT: You'll create this function later to draw moving stars!
  background(20, 20, 40); // Temporary - replace with animated background
  
  if (gameState === "start") {
    // TODO: Enhanced start screen with floating text animation
    // HINT: let floatOffset = sin(frameCount * 0.03) * 5;
    // HINT: Use floatOffset to make text float up and down
    // 💡 TRY THIS: Make the title text gently float for a cool effect!
    
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
    // TODO: Track animation frames for sprite animation
    // HINT: animationFrame++; (increment every frame)
    
    // Increase difficulty over time (your working Day 3 code)
    difficultyTimer++;
    
    // STEP 5: Enhanced player movement with sprite rotation
    // TODO: Update player movement to track rotation for sprites
    // HINT: Same movement as Day 3, but now set player.rotation
    // HINT: player.rotation = -PI/2; (for left), PI/2 (for right), 0 (for up), PI (for down)
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Left arrow OR 'A' key
      player.x -= player.speed;
      lastDirection = {x: -1, y: 0};
      // TODO: player.rotation = -PI/2; (rotate sprite to face left)
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Right arrow OR 'D' key
      player.x += player.speed;
      lastDirection = {x: 1, y: 0};
      // TODO: player.rotation = PI/2; (rotate sprite to face right)
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // Up arrow OR 'W' key
      player.y -= player.speed;
      lastDirection = {x: 0, y: -1};
      // TODO: player.rotation = 0; (rotate sprite to face up)
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // Down arrow OR 'S' key
      player.y += player.speed;
      lastDirection = {x: 0, y: 1};
      // TODO: player.rotation = PI; (rotate sprite to face down)
    }
    
    // Keep player within screen boundaries
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // STEP 6: Enhanced shooting system (your working Day 3 code)
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
          // TODO: Add trail array for bullet trails
          // HINT: trail: [] (empty array to store previous positions)
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
            // TODO: trail: [] (for bullet trails)
          });
        }
      } else if (currentWeapon === "rapid") {
        bullets.push({
          x: player.x,
          y: player.y,
          vx: lastDirection.x * (bulletSpeed + 1),
          vy: lastDirection.y * (bulletSpeed + 1),
          type: "rapid",
          // TODO: trail: [] (for bullet trails)
        });
      }
    }
    
    // STEP 7: Enhanced bullets with trails and better graphics
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      
      // TODO: Add current position to trail array
      // HINT: bullet.trail.push({x: bullet.x, y: bullet.y});
      // HINT: if (bullet.trail.length > 8) bullet.trail.shift(); (limit trail length)
      
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      
      // TODO: Draw bullet trail before main bullet
      // HINT: Loop through bullet.trail array
      // HINT: Draw each trail position with decreasing alpha (transparency)
      // HINT: for (let j = 0; j < bullet.trail.length; j++) {
      // HINT:   let alpha = (j / bullet.trail.length) * 100;
      // HINT:   fill(color, color, color, alpha);
      // HINT:   ellipse(trail position, smaller size);
      // HINT: }
      // 💡 TRY THIS: This creates cool trailing effects behind bullets!
      
      // Enhanced bullet drawing (better than Day 3's simple circles)
      if (bullet.type === "basic") {
        // TODO: Draw enhanced basic bullet with glow effect
        // HINT: Draw outer glow: fill(255, 255, 0); ellipse(x, y, 8);
        // HINT: Draw inner core: fill(255, 255, 150); ellipse(x, y, 4);
        fill(255, 255, 0);
        ellipse(bullet.x, bullet.y, 6);
      } else if (bullet.type === "spread") {
        // TODO: Draw enhanced spread bullet
        fill(255, 150, 0);
        ellipse(bullet.x, bullet.y, 5);
      } else if (bullet.type === "rapid") {
        // TODO: Draw enhanced rapid bullet
        fill(0, 255, 255);
        ellipse(bullet.x, bullet.y, 4);
      }
      
      // Remove bullets that go off screen
      if (bullet.y < -10 || bullet.y > height + 10 || 
          bullet.x < -10 || bullet.x > width + 10) {
        bullets.splice(i, 1);
      }
    }
    
    // STEP 8: Enhanced enemy spawning (your working Day 3 code)
    let baseSpawnRate = 1.2;
    let levelBonus = (playerLevel - 1) * 0.4;
    let timeBonus = difficultyTimer / 2400;
    let enemySpawnChance = baseSpawnRate + levelBonus + timeBonus;
    
    if (random(100) < enemySpawnChance) {
      let enemy = {
        size: random(14, 26),
        speed: random(0.8, 1.8 + (playerLevel * 0.2) + (difficultyTimer / 7200)),
        health: 1,
        // TODO: Add animation properties for pulsing effect
        // HINT: pulsePhase: random(TWO_PI) (random starting animation phase)
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
    
    // STEP 9: Enhanced enemies with pulsing animation
    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemy = enemies[i];
      
      // Move enemy toward player (your working Day 3 code)
      let dx = player.x - enemy.x;
      let dy = player.y - enemy.y;
      let distance = sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        enemy.x += (dx / distance) * enemy.speed;
        enemy.y += (dy / distance) * enemy.speed;
      }
      
      // TODO: Draw animated enemy with pulsing effect
      // HINT: enemy.pulsePhase += 0.1; (update animation)
      // HINT: let pulseSize = enemy.size + sin(enemy.pulsePhase) * 3; (pulsing size)
      // HINT: Draw multiple layers:
      // HINT:   - Outer glow: fill(255, 50, 50, 100); ellipse(x, y, pulseSize + 6);
      // HINT:   - Main body: fill(255, 100, 100); ellipse(x, y, pulseSize);
      // HINT:   - Inner core: fill(255, 150, 150); ellipse(x, y, pulseSize * 0.6);
      // 💡 TRY THIS: This makes enemies look alive and threatening!
      fill(255, 100, 100);
      ellipse(enemy.x, enemy.y, enemy.size);
      
      // Check if enemy hits player
      if (distance < (player.size + enemy.size) / 2) {
        playerHealth -= 25;
        enemies.splice(i, 1);
        
        // TODO: Add screen shake when player gets hit
        // HINT: Call a function like addScreenShake(8);
        
        if (playerHealth <= 0) {
          gameState = "gameOver";
        }
      }
    }
    
    // STEP 10: Enhanced power-up spawning (your working Day 3 code)
    if (random(1000) < 1) {
      powerUps.push({
        x: random(30, width - 30),
        y: random(30, height - 30),
        type: random(["health", "weapon", "speed"]),
        size: 15,
        // TODO: Add animation properties
        // HINT: glowPhase: 0 (for glowing animation)
      });
    }
    
    // STEP 11: Enhanced power-ups with glow effects
    for (let i = powerUps.length - 1; i >= 0; i--) {
      let powerUp = powerUps[i];
      
      // TODO: Update glow animation
      // HINT: powerUp.glowPhase += 0.05;
      // HINT: let glowSize = powerUp.size + sin(powerUp.glowPhase) * 5;
      
      // TODO: Draw glowing power-up
      // HINT: Draw outer glow first with alpha transparency
      // HINT: if (powerUp.type === "health") {
      // HINT:   fill(0, 255, 0, 100); ellipse(x, y, glowSize + 10);
      // HINT:   fill(0, 255, 0); ellipse(x, y, powerUp.size);
      // HINT: }
      // 💡 TRY THIS: Different glow colors for different power-up types!
      
      if (powerUp.type === "health") {
        fill(0, 255, 0);
      } else if (powerUp.type === "weapon") {
        fill(255, 255, 0);
      } else if (powerUp.type === "speed") {
        fill(0, 0, 255);
      }
      ellipse(powerUp.x, powerUp.y, powerUp.size);
      
      // Check if player collects power-up
      let distance = sqrt((player.x - powerUp.x) ** 2 + (player.y - powerUp.y) ** 2);
      if (distance < (player.size + powerUp.size) / 2) {
        applyPowerUp(powerUp.type);
        powerUps.splice(i, 1);
        
        // TODO: Add screen shake when collecting power-ups
        // HINT: addScreenShake(4);
      }
    }
    
    // STEP 12: Enhanced collision detection with explosion effects
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = sqrt((bullets[i].x - enemies[j].x) ** 2 + (bullets[i].y - enemies[j].y) ** 2);
        
        if (bulletDist < (6 + enemies[j].size) / 2) {
          // TODO: Create explosion particle effect!
          // HINT: Call createExplosion(enemies[j].x, enemies[j].y);
          // TODO: Add screen shake for impact
          // HINT: addScreenShake(3);
          
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          playerXP += 8;
          
          if (playerXP >= playerLevel * 75) {
            playerLevel++;
            maxHealth += 15;
            playerHealth = min(playerHealth + 20, maxHealth);
            // TODO: Add bigger screen shake for level up
            // HINT: addScreenShake(6);
          }
          
          break;
        }
      }
    }
    
    // TODO: STEP 13: Update and draw explosion particles
    // HINT: for (let i = explosionParticles.length - 1; i >= 0; i--) {
    // HINT:   let particle = explosionParticles[i];
    // HINT:   particle.x += particle.vx;  (move particle)
    // HINT:   particle.y += particle.vy;
    // HINT:   particle.life -= 2;         (fade out)
    // HINT:   particle.size *= 0.98;      (shrink)
    // HINT:   fill(particle.color with alpha based on life);
    // HINT:   ellipse(particle.x, particle.y, particle.size);
    // HINT:   if (particle.life <= 0) explosionParticles.splice(i, 1);
    // HINT: }
    // 💡 TRY THIS: This creates amazing explosion effects when enemies die!
    
    // STEP 14: Enhanced player drawing with rotation and glow
    // TODO: Draw player with rotation and glow effects
    // HINT: push(); (save drawing state)
    // HINT: translate(player.x, player.y); (move to player position)
    // HINT: rotate(player.rotation); (rotate for direction)
    // HINT: Draw player glow: fill(0, 255, 255, 100); ellipse(0, 0, player.size + 8);
    // HINT: Draw player body: fill(0, 255, 255); ellipse(0, 0, player.size);
    // HINT: Draw player core: fill(150, 255, 255); ellipse(0, 0, player.size * 0.6);
    // HINT: pop(); (restore drawing state)
    // 💡 TRY THIS: This makes your player look like a cool spaceship!
    fill(0, 255, 255);
    ellipse(player.x, player.y, player.size);
    
    // TODO: Draw enhanced UI
    // HINT: Call drawEnhancedUI(); instead of drawUI();
    drawUI();
    
  } else if (gameState === "gameOver") {
    // TODO: Enhanced game over screen with pulsing animation
    // HINT: let pulseAlpha = 150 + sin(frameCount * 0.1) * 100;
    // HINT: fill(255, 100, 100, pulseAlpha); for pulsing text
    
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

// TODO: STEP 15: Create animated background function
// function drawAnimatedBackground() {
//   background(15, 15, 30); // Dark space color
//   
//   // TODO: Draw moving stars
//   // HINT: for (let i = 0; i < 50; i++) {
//   // HINT:   let x = (i * 77) % width;  (spread stars across screen)
//   // HINT:   let y = (i * 43 + frameCount * 0.5) % height;  (moving stars)
//   // HINT:   let brightness = 100 + sin(frameCount * 0.02 + i) * 50;  (twinkling)
//   // HINT:   fill(brightness, brightness, 255, 150);
//   // HINT:   ellipse(x, y, 2);
//   // HINT: }
//   // 💡 TRY THIS: This creates a beautiful moving starfield background!
// }

// TODO: STEP 16: Create enhanced UI function
// function drawEnhancedUI() {
//   // TODO: Health bar with glow effect
//   // HINT: Draw glow first: fill(255, 0, 0, 100); rect(8, 8, 204, 24);
//   // HINT: Draw main bar: fill(255, 0, 0); rect(10, 10, 200, 20);
//   // HINT: Draw health: fill(0, 255, 0); rect(10, 10, (playerHealth/maxHealth) * 200, 20);
//   
//   // TODO: XP bar with glow effect (similar structure)
//   
//   // TODO: Text with glow/shadow effect
//   // HINT: Draw shadow first: fill(0, 0, 0, 100); text at offset position
//   // HINT: Draw main text: fill(255); text at normal position
//   // 💡 TRY THIS: This makes your UI look professional and polished!
// }

// TODO: STEP 17: Create explosion particle system
// function createExplosion(x, y) {
//   // TODO: Create multiple particles for each explosion
//   // HINT: for (let i = 0; i < 15; i++) {
//   // HINT:   explosionParticles.push({
//   // HINT:     x: x, y: y,
//   // HINT:     vx: random(-3, 3),  (random velocity)
//   // HINT:     vy: random(-3, 3),
//   // HINT:     size: random(3, 8),
//   // HINT:     life: 255,          (starts fully opaque)
//   // HINT:     color: { r: random(200, 255), g: random(100, 200), b: random(0, 100) }
//   // HINT:   });
//   // HINT: }
//   // 💡 TRY THIS: This creates realistic explosion particles!
// }

// TODO: STEP 18: Create screen shake function
// function addScreenShake(intensity) {
//   // TODO: Set screen shake intensity
//   // HINT: screenShake = intensity;
//   // HINT: The draw() function will handle reducing it over time
// }

// Your working UI function from Day 3 (will be enhanced later)
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

// Your working power-up function from Day 3
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

// Your working key handling from Day 3
function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "playing") {
    if (key === '1') currentWeapon = "basic";
    if (key === '2') currentWeapon = "spread";
    if (key === '3') currentWeapon = "rapid";
  } else if (gameState === "gameOver") {
    // TODO: Reset visual variables too
    // HINT: explosionParticles = [];
    // HINT: screenShake = 0;
    // HINT: animationFrame = 0;
    // HINT: Don't forget to reset player.rotation = 0;
    
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

// 🎯 YOUR MISSION:
// 1. Complete all the TODOs to add amazing visual effects
// 2. Test each effect as you add it - see your game transform!
// 3. Your simple shapes will become animated sprites
// 4. Explosions will make combat feel impactful  
// 5. Screen shake will add incredible game feel
// 6. The UI will look professional and polished
// 
// By the end, your game will look like something you'd want to show off!
// This is real game development - visual polish is what makes games memorable! 🚀