// 🎮 Bonus Day 5: Sound & Music - Mini Survivors
// Starting with your complete Day 4 visual game, now let's add AMAZING AUDIO!
// Today we'll make your game sound as good as it looks

// ====================================
// LESSON GOALS:
// - Add immersive sound effects for all game actions
// - Create background music that loops with the game
// - Build volume controls so players can adjust audio
// - Make audio-reactive visual elements that pulse with sound
// - Transform your visual masterpiece into a complete sensory experience!
// ====================================

// STEP 1: All your working Day 4 variables (complete visual game foundation!)
let player;                    // Player object with rotation and visual effects
let gameState = "start";       // Current game screen
let bullets = [];              // Array of all bullets with trails
let enemies = [];              // Array of all enemies with pulsing animation
let powerUps = [];             // Array of power-ups with glow effects
let score = 0;                 // Player's current score
let playerXP = 0;              // Experience points for leveling
let playerLevel = 1;           // Current player level
let playerHealth = 60;         // Current health (can take damage!)
let maxHealth = 60;            // Maximum possible health
let currentWeapon = "basic";   // Current weapon type
let difficultyTimer = 0;       // Tracks time to increase difficulty
let lastDirection = {x: 0, y: -1}; // Direction player is facing for shooting

// Visual effect variables from Day 4
let explosionParticles = [];   // Array of explosion particles
let screenShake = 0;           // Screen shake intensity
let animationFrame = 0;        // Animation counter

// STEP 2: NEW variables for audio system!
// TODO: Add variables for audio controls and effects
// HINT: let soundEnabled = true; (master sound toggle)
// HINT: let musicVolume = 0.5; (background music volume 0-1)
// HINT: let sfxVolume = 0.7; (sound effects volume 0-1)
// HINT: let backgroundMusic; (will hold background music oscillator)
// HINT: let shootSound, explosionSound, powerUpSound, damageSound; (sound effect oscillators)
// 💡 TRY THIS: Add more sound variables for different audio layers!

// IMPORTANT: For p5.js web editor, you MUST add p5.sound library!
// Go to index.html and add this line in the <head> section:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>

// STEP 3: Audio setup function
function preload() {
  // TODO: Load audio files (if you have them) or prepare for procedural sounds
  // HINT: If you upload .wav or .mp3 files to p5.js editor:
  // HINT: backgroundMusic = loadSound('assets/music.mp3');
  // HINT: shootSound = loadSound('assets/laser.wav');
  // 💡 TRY THIS: For now, we'll create procedural sounds with oscillators!
}

// STEP 4: Enhanced setup() with audio initialization
function setup() {
  createCanvas(800, 600);
  
  // TODO: Create procedural audio oscillators for sound effects
  // HINT: shootSound = new p5.Oscillator('triangle');
  // HINT: explosionSound = new p5.Oscillator('sawtooth');
  // HINT: powerUpSound = new p5.Oscillator('sine');
  // HINT: damageSound = new p5.Oscillator('square');
  // HINT: backgroundMusic = new p5.Oscillator('sine');
  // 
  // TODO: Set initial frequencies and start oscillators
  // HINT: shootSound.freq(800); shootSound.amp(0); shootSound.start();
  // HINT: explosionSound.freq(200); explosionSound.amp(0); explosionSound.start();
  // HINT: powerUpSound.freq(600); powerUpSound.amp(0); powerUpSound.start();
  // HINT: damageSound.freq(150); damageSound.amp(0); damageSound.start();
  // HINT: backgroundMusic.freq(220); backgroundMusic.amp(0); backgroundMusic.start();
  // 💡 TRY THIS: Different frequencies create different pitched sounds!
  
  // Your working player setup from Day 4 (with all visual enhancements)
  player = {
    x: width / 2,     // Start in center horizontally
    y: height / 2,    // Start in center vertically
    size: 18,         // Size for collision detection
    speed: 4,         // Movement speed
    rotation: 0       // Sprite rotation from Day 4
  };
  
  // TODO: Start background music
  // HINT: if (soundEnabled && backgroundMusic) {
  // HINT:   backgroundMusic.amp(musicVolume * 0.1); // Very quiet background drone
  // HINT: }
}

// STEP 5: Enhanced draw() function with audio integration!
function draw() {
  // Screen shake effect from Day 4 (your working visual code)
  if (screenShake > 0) {
    translate(random(-screenShake, screenShake), random(-screenShake, screenShake));
    screenShake *= 0.9; // Fade out shake
  }
  
  // Animated background from Day 4
  drawAnimatedBackground();
  
  if (gameState === "start") {
    // Enhanced start screen with floating text animation (Day 4 code)
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
    
    // TODO: Add audio control instructions
    // HINT: text("Press M to mute, +/- for volume", width/2, height/2 + 150);
    // 💡 TRY THIS: Show current volume levels on start screen!
    
  } else if (gameState === "playing") {
    animationFrame++;
    
    // Increase difficulty over time (your working Day 3-4 code)
    difficultyTimer++;
    
    // Enhanced player movement with sprite rotation (Day 4 code)
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
    
    // Enhanced shooting system with audio (Day 4 code + audio TODOs)
    let fireRate = 15;
    if (currentWeapon === "rapid") fireRate = 8;
    
    if (frameCount % fireRate === 0) {
      let bulletSpeed = 7;
      
      // TODO: Play shooting sound based on weapon type
      // HINT: if (soundEnabled && shootSound) {
      // HINT:   playShootSound(currentWeapon); // Different sounds for different weapons
      // HINT: }
      
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
    
    // Enhanced bullets with trails (Day 4 code)
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
      
      // Draw enhanced bullets
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
    
    // Enhanced enemy spawning (Day 4 code)
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
    
    // Enhanced enemies with pulsing animation (Day 4 code)
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
      
      // Draw animated enemy with pulsing effect
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
        
        // TODO: Play damage sound when player gets hit
        // HINT: if (soundEnabled && damageSound) {
        // HINT:   playDamageSound();
        // HINT: }
        
        if (playerHealth <= 0) {
          gameState = "gameOver";
        }
      }
    }
    
    // Enhanced power-up spawning (Day 4 code)
    if (random(1000) < 1) {
      powerUps.push({
        x: random(30, width - 30),
        y: random(30, height - 30),
        type: random(["health", "weapon", "speed"]),
        size: 15,
        glowPhase: 0
      });
    }
    
    // Enhanced power-ups with glow effects (Day 4 code)
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
        // TODO: Play power-up sound when collected
        // HINT: if (soundEnabled && powerUpSound) {
        // HINT:   playPowerUpSound(powerUp.type);
        // HINT: }
        
        applyPowerUp(powerUp.type);
        powerUps.splice(i, 1);
        addScreenShake(4);
      }
    }
    
    // Enhanced collision detection with explosion effects (Day 4 code)
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = sqrt((bullets[i].x - enemies[j].x) ** 2 + (bullets[i].y - enemies[j].y) ** 2);
        
        if (bulletDist < (6 + enemies[j].size) / 2) {
          // Create explosion and screen shake
          createExplosion(enemies[j].x, enemies[j].y);
          addScreenShake(3);
          
          // TODO: Play explosion sound when enemy dies
          // HINT: if (soundEnabled && explosionSound) {
          // HINT:   playExplosionSound(enemies[j].size); // Bigger enemies = deeper sound
          // HINT: }
          
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          playerXP += 8;
          
          if (playerXP >= playerLevel * 75) {
            playerLevel++;
            maxHealth += 15;
            playerHealth = min(playerHealth + 20, maxHealth);
            addScreenShake(6);
            
            // TODO: Play level up sound
            // HINT: if (soundEnabled && powerUpSound) {
            // HINT:   playLevelUpSound();
            // HINT: }
          }
          
          break;
        }
      }
    }
    
    // Update and draw explosion particles (Day 4 code)
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
    
    // Draw enhanced player with rotation and glow (Day 4 code)
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
    
    // TODO: Update background music intensity based on game state
    // HINT: updateMusicIntensity(enemies.length, playerHealth);
    
    // TODO: Draw audio visualization (optional cool effect)
    // HINT: drawAudioVisualization();
    
    // Draw enhanced UI (Day 4 code)
    drawEnhancedUI();
    
  } else if (gameState === "gameOver") {
    // TODO: Stop background music
    // HINT: if (backgroundMusic) backgroundMusic.amp(0, 1);
    
    // Animated game over screen (Day 4 code)
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
    
    // TODO: Play game over sound (once)
    // HINT: Use a variable to track if game over sound has played
  }
}

// All your working Day 4 visual functions (complete implementations)
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
  
  // TODO: Add audio status indicators
  // HINT: Show volume levels and mute status
  // HINT: fill(255); text("Volume: " + (musicVolume * 100).toFixed(0) + "%", 10, 120);
  // HINT: text("SFX: " + (sfxVolume * 100).toFixed(0) + "%", 10, 140);
  // HINT: if (!soundEnabled) text("MUTED", 10, 160);
  
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
  text("1,2,3: Weapons | M: Mute | +/-: Volume", width - 8, 12);
  fill(255);
  text("1,2,3: Weapons | M: Mute | +/-: Volume", width - 10, 10);
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

// Enhanced key handling with audio controls
function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
    
    // TODO: Start background music when game starts
    // HINT: if (soundEnabled && backgroundMusic) {
    // HINT:   backgroundMusic.amp(musicVolume * 0.1, 0.5);
    // HINT: }
    
  } else if (gameState === "playing") {
    // Weapon switching (Day 4 code)
    if (key === '1') currentWeapon = "basic";
    if (key === '2') currentWeapon = "spread";
    if (key === '3') currentWeapon = "rapid";
    
    // TODO: Audio control keys
    // HINT: if (key === 'M' || key === 'm') {
    // HINT:   soundEnabled = !soundEnabled;
    // HINT:   if (!soundEnabled) {
    // HINT:     // Mute all sounds
    // HINT:     if (backgroundMusic) backgroundMusic.amp(0);
    // HINT:   } else {
    // HINT:     // Unmute background music
    // HINT:     if (backgroundMusic) backgroundMusic.amp(musicVolume * 0.1);
    // HINT:   }
    // HINT: }
    // HINT: 
    // HINT: if (key === '+' || key === '=') {
    // HINT:   musicVolume = min(musicVolume + 0.1, 1.0);
    // HINT:   sfxVolume = min(sfxVolume + 0.1, 1.0);
    // HINT:   if (soundEnabled && backgroundMusic) backgroundMusic.amp(musicVolume * 0.1);
    // HINT: }
    // HINT: 
    // HINT: if (key === '-' || key === '_') {
    // HINT:   musicVolume = max(musicVolume - 0.1, 0.0);
    // HINT:   sfxVolume = max(sfxVolume - 0.1, 0.0);
    // HINT:   if (soundEnabled && backgroundMusic) backgroundMusic.amp(musicVolume * 0.1);
    // HINT: }
    
  } else if (gameState === "gameOver") {
    // Reset game (Day 4 code + audio reset)
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
    
    // TODO: Restart background music
    // HINT: if (soundEnabled && backgroundMusic) {
    // HINT:   backgroundMusic.amp(musicVolume * 0.1);
    // HINT: }
    
    gameState = "playing";
  }
}

// TODO: STEP 6: Create sound effect functions
// function playShootSound(weaponType) {
//   // TODO: Create different shooting sounds for different weapons
//   // HINT: if (!soundEnabled || !shootSound) return;
//   // HINT: 
//   // HINT: if (weaponType === "basic") {
//   // HINT:   shootSound.freq(800);  // High pitch laser
//   // HINT:   shootSound.amp(sfxVolume * 0.3, 0.01);
//   // HINT:   shootSound.amp(0, 0.1); // Quick fade out
//   // HINT: } else if (weaponType === "spread") {
//   // HINT:   shootSound.freq(600);  // Medium pitch
//   // HINT:   shootSound.amp(sfxVolume * 0.2, 0.01);
//   // HINT:   shootSound.amp(0, 0.15);
//   // HINT: } else if (weaponType === "rapid") {
//   // HINT:   shootSound.freq(1000); // Very high pitch
//   // HINT:   shootSound.amp(sfxVolume * 0.2, 0.01);
//   // HINT:   shootSound.amp(0, 0.05); // Very quick fade
//   // HINT: }
//   // 💡 TRY THIS: Different weapon types sound unique!
// }

// function playExplosionSound(enemySize) {
//   // TODO: Create explosion sound that varies with enemy size
//   // HINT: if (!soundEnabled || !explosionSound) return;
//   // HINT: 
//   // HINT: let pitch = map(enemySize, 14, 26, 250, 150); // Bigger = deeper sound
//   // HINT: explosionSound.freq(pitch);
//   // HINT: explosionSound.amp(sfxVolume * 0.4, 0.01);
//   // HINT: explosionSound.amp(0, 0.3); // Longer explosion sound
//   // 💡 TRY THIS: Bigger enemies make deeper explosion sounds!
// }

// function playPowerUpSound(powerUpType) {
//   // TODO: Create pleasant power-up sounds
//   // HINT: if (!soundEnabled || !powerUpSound) return;
//   // HINT: 
//   // HINT: if (powerUpType === "health") {
//   // HINT:   powerUpSound.freq(523); // C note
//   // HINT:   powerUpSound.amp(sfxVolume * 0.3, 0.01);
//   // HINT:   powerUpSound.freq(659, 0.2); // E note
//   // HINT:   powerUpSound.amp(0, 0.5);
//   // HINT: } else if (powerUpType === "weapon") {
//   // HINT:   powerUpSound.freq(440); // A note
//   // HINT:   powerUpSound.amp(sfxVolume * 0.3, 0.01);
//   // HINT:   powerUpSound.freq(554, 0.2); // C# note
//   // HINT:   powerUpSound.amp(0, 0.5);
//   // HINT: } else if (powerUpType === "speed") {
//   // HINT:   powerUpSound.freq(330); // E note (lower)
//   // HINT:   powerUpSound.amp(sfxVolume * 0.3, 0.01);
//   // HINT:   powerUpSound.freq(440, 0.2); // A note
//   // HINT:   powerUpSound.amp(0, 0.5);
//   // HINT: }
//   // 💡 TRY THIS: Musical power-up sounds feel rewarding!
// }

// function playDamageSound() {
//   // TODO: Create harsh damage sound
//   // HINT: if (!soundEnabled || !damageSound) return;
//   // HINT: 
//   // HINT: damageSound.freq(150); // Low, harsh frequency
//   // HINT: damageSound.amp(sfxVolume * 0.5, 0.01);
//   // HINT: damageSound.amp(0, 0.2);
//   // 💡 TRY THIS: Damage sounds should feel impactful!
// }

// function playLevelUpSound() {
//   // TODO: Create exciting level up sound
//   // HINT: if (!soundEnabled || !powerUpSound) return;
//   // HINT: 
//   // HINT: let notes = [523, 659, 784, 1047]; // C, E, G, C octave
//   // HINT: let noteIndex = 0;
//   // HINT: let playNextNote = () => {
//   // HINT:   if (noteIndex < notes.length) {
//   // HINT:     powerUpSound.freq(notes[noteIndex]);
//   // HINT:     powerUpSound.amp(sfxVolume * 0.4, 0.05);
//   // HINT:     powerUpSound.amp(0, 0.15);
//   // HINT:     noteIndex++;
//   // HINT:     setTimeout(playNextNote, 100);
//   // HINT:   }
//   // HINT: };
//   // HINT: playNextNote();
//   // 💡 TRY THIS: Musical sequences for major achievements!
// }

// TODO: STEP 7: Create background music intensity function
// function updateMusicIntensity(enemyCount, playerHealth) {
//   // TODO: Make music more intense based on danger
//   // HINT: if (!soundEnabled || !backgroundMusic) return;
//   // HINT: 
//   // HINT: let dangerLevel = enemyCount * 0.1 + (1 - playerHealth / maxHealth) * 0.5;
//   // HINT: let intensity = constrain(dangerLevel, 0.1, 0.3);
//   // HINT: backgroundMusic.amp(musicVolume * intensity);
//   // 💡 TRY THIS: Music gets more intense when you're in danger!
// }

// TODO: STEP 8: Create audio visualization (optional)
// function drawAudioVisualization() {
//   // TODO: Create cool visual effects that react to audio
//   // HINT: This requires FFT analysis - advanced feature!
//   // HINT: You can create fake audio bars for now:
//   // HINT: for (let i = 0; i < 10; i++) {
//   // HINT:   let barHeight = random(5, 25);
//   // HINT:   fill(100, 255, 255, 100);
//   // HINT:   rect(width - 50, height - 50 - i * 15, 40, barHeight);
//   // HINT: }
//   // 💡 TRY THIS: Visual elements that dance with your audio!
// }

// 🎯 YOUR MISSION:
// 1. Complete all the audio TODOs to add immersive sound
// 2. Test each sound effect as you implement it
// 3. Your visual masterpiece will now have amazing audio!
// 4. Different weapons will sound unique
// 5. Explosions will have realistic audio feedback
// 6. Background music will create atmosphere
// 7. Players can control their audio experience
// 
// By the end, your game will be a complete sensory experience!
// This is professional game development - audio makes games unforgettable! 🚀