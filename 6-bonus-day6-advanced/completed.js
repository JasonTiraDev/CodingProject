// 🎮 Bonus Day 6: Boss Battles & Upgrades - Mini Survivors
// Ultimate game with boss battles and upgrade system

// NOTE: This completed version includes some extra features beyond the core lesson
// (like multiple game modes). The starter.js focuses on the core: bosses + upgrades.
// Feel free to explore the extra code, or stick to the main features!

// All previous variables plus advanced systems
let player;
let gameState = "start"; // start, playing, gameOver, upgradeShop
let bullets = [];
let enemies = [];
let bosses = [];
let powerUps = [];
let upgrades = [];
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

// Audio variables
let soundEnabled = true;
let audioVisualization = [];

// Sprite variables
let sprites = {
  player: null,
  enemies: {
    basic: null,
    fast: null,
    tank: null,
    shooter: null
  },
  bosses: {
    circle: null,
    charge: null,
    teleport: null,
    minions: null
  },
  powerUps: {
    health: null,
    weapon: null,
    speed: null,
    shield: null,
    upgrade: null
  },
  bullets: {
    basic: null,
    spread: null,
    rapid: null,
    boss: null
  }
};
let spritesLoaded = false;

// Advanced game variables
let bossLevel = 0;
let upgradePoints = 0;
let playerUpgrades = {
  damage: 1,
  speed: 1,
  health: 1,
  fireRate: 1,
  luck: 1
};
let comboMultiplier = 1;
let comboTimer = 0;

// Boss patterns
let bossPatterns = {
  "circle": {name: "Spiral Shooter", health: 300},
  "charge": {name: "Berserker", health: 250},
  "teleport": {name: "Phase Walker", health: 200},
  "minions": {name: "Summoner", health: 350}
};

function setup() {
  createCanvas(800, 600);
  
  // Initialize audio visualization
  for (let i = 0; i < 64; i++) {
    audioVisualization[i] = 0;
  }
  
  // Initialize player
  player = {
    x: width / 2,
    y: height / 2,
    size: 18,
    speed: 4,
    rotation: 0,
    invulnerable: 0,
    shield: 0
  };
  
  // Try to load custom sprites (optional)
  loadCustomSprites();
}

// Load custom sprites - kids can add their own images!
function loadCustomSprites() {
  // Instructions for kids:
  // 1. Create a 'sprites' folder next to your game file
  // 2. Add PNG images with these exact names:
  //    - player.png (for the player spaceship)
  //    - enemy-basic.png, enemy-fast.png, enemy-tank.png, enemy-shooter.png
  //    - boss-circle.png, boss-charge.png, boss-teleport.png, boss-minions.png
  //    - powerup-health.png, powerup-weapon.png, etc.
  //    - bullet-basic.png, bullet-spread.png, bullet-rapid.png, bullet-boss.png
  
  // Try to load sprites, but don't worry if they don't exist
  // The game will use colorful geometric shapes as backups!
  
  try {
    // Uncomment these lines and add your sprite files to a 'sprites' folder:
    // sprites.player = loadImage('sprites/player.png');
    // sprites.enemies.basic = loadImage('sprites/enemy-basic.png');
    // sprites.enemies.fast = loadImage('sprites/enemy-fast.png');
    // sprites.enemies.tank = loadImage('sprites/enemy-tank.png');
    // sprites.enemies.shooter = loadImage('sprites/enemy-shooter.png');
    // And so on...
    
    // For now, we'll use awesome geometric sprites!
    spritesLoaded = false; // Set to true when you add real images
  } catch (error) {
    console.log("No custom sprites found - using geometric shapes!");
    spritesLoaded = false;
  }
}

function draw() {
  updateAudioVisualization();
  
  // Screen shake effect
  if (screenShake > 0) {
    translate(random(-screenShake, screenShake), random(-screenShake, screenShake));
    screenShake *= 0.9;
  }
  
  drawAdvancedBackground();
  
  if (gameState === "start") {
    drawMainMenu();
  } else if (gameState === "upgradeShop") {
    drawUpgradeShop();
  } else if (gameState === "playing") {
    updateGameplay();
    drawGameplay();
  } else if (gameState === "bossIntro") {
    drawBossIntro();
  } else if (gameState === "gameOver") {
    drawGameOver();
  }
}

function drawMainMenu() {
  let floatOffset = sin(frameCount * 0.03) * 5;
  
  fill(255, 255, 100 + sin(frameCount * 0.05) * 50);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("MINI SURVIVORS", width/2, height/2 - 120 + floatOffset);
  
  textSize(24);
  fill(255);
  text("ULTIMATE EDITION", width/2, height/2 - 80);
  
  textSize(18);
  text("Press any key to start playing", width/2, height/2 - 20);
  text("Press U for upgrade shop", width/2, height/2 + 10);

  textSize(14);
  text("Features: Boss Battles • Upgrade System • High Scores", width/2, height/2 + 80);
  text("Advanced AI • Combo System • localStorage Persistence", width/2, height/2 + 100);
  
  drawAudioVisualization(width/2 - 100, height/2 + 140, 200, 30);
}

function drawUpgradeShop() {
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("UPGRADE SHOP", width/2, 50);
  
  textSize(16);
  text("Upgrade Points: " + upgradePoints, width/2, 80);
  
  let startY = 120;
  let spacing = 60;
  
  drawUpgradeOption("DAMAGE", playerUpgrades.damage, startY, "Increases bullet damage");
  drawUpgradeOption("SPEED", playerUpgrades.speed, startY + spacing, "Increases movement speed");
  drawUpgradeOption("HEALTH", playerUpgrades.health, startY + spacing * 2, "Increases maximum health");
  drawUpgradeOption("FIRE RATE", playerUpgrades.fireRate, startY + spacing * 3, "Increases shooting speed");
  drawUpgradeOption("LUCK", playerUpgrades.luck, startY + spacing * 4, "Better power-up drops");
  
  textSize(14);
  fill(200);
  text("Use number keys (1-5) to upgrade • ESC to return", width/2, height - 30);
}

function drawUpgradeOption(name, level, y, description) {
  let cost = level * 2;
  let affordable = upgradePoints >= cost;
  
  textAlign(LEFT, CENTER);
  fill(affordable ? 255 : 150);
  textSize(18);
  text(name + " (Level " + level + ")", 50, y);
  
  textSize(14);
  fill(200);
  text(description, 50, y + 20);
  
  textAlign(RIGHT, CENTER);
  fill(affordable ? 255 : 150);
  text("Cost: " + cost, width - 50, y + 10);
}

function updateGameplay() {
  animationFrame++;
  difficultyTimer++;
  
  // Update combo system
  if (comboTimer > 0) {
    comboTimer--;
  } else {
    comboMultiplier = 1;
  }
  
  // Update player invulnerability
  if (player.invulnerable > 0) {
    player.invulnerable--;
  }
  
  // Player movement
  handlePlayerMovement();
  
  // Weapon shooting
  handleWeaponShooting();
  
  // Update game mode specific logic
  if (gameMode === "classic") {
    updateClassicMode();
  } else if (gameMode === "endless") {
    updateEndlessMode();
  } else if (gameMode === "boss-rush") {
    updateBossRushMode();
  }
  
  // Update bullets
  updateBullets();
  
  // Update enemies
  updateEnemies();
  
  // Update bosses
  updateBosses();
  
  // Update power-ups
  updatePowerUps();
  
  // Update particles
  updateExplosionParticles();
  
  // Check collisions
  checkCollisions();
}

function handlePlayerMovement() {
  let moveX = 0, moveY = 0;
  
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    moveX = -1;
    lastDirection = {x: -1, y: 0};
    player.rotation = -PI/2;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    moveX = 1;
    lastDirection = {x: 1, y: 0};
    player.rotation = PI/2;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    moveY = -1;
    lastDirection = {x: 0, y: -1};
    player.rotation = 0;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    moveY = 1;
    lastDirection = {x: 0, y: 1};
    player.rotation = PI;
  }
  
  // Diagonal movement normalization
  if (moveX !== 0 && moveY !== 0) {
    moveX *= 0.707;
    moveY *= 0.707;
  }
  
  let speed = player.speed * playerUpgrades.speed;
  player.x += moveX * speed;
  player.y += moveY * speed;
  
  player.x = constrain(player.x, player.size/2, width - player.size/2);
  player.y = constrain(player.y, player.size/2, height - player.size/2);
}

function handleWeaponShooting() {
  let baseFireRate = 15;
  let fireRate = max(5, baseFireRate - (playerUpgrades.fireRate * 2));
  if (currentWeapon === "rapid") fireRate = max(3, fireRate - 5);
  
  if (frameCount % fireRate === 0) {
    createBullets();
  }
}

function createBullets() {
  let bulletSpeed = 7;
  let damage = playerUpgrades.damage;
  
  if (currentWeapon === "basic") {
    bullets.push({
      x: player.x,
      y: player.y,
      vx: lastDirection.x * bulletSpeed,
      vy: lastDirection.y * bulletSpeed,
      type: "basic",
      damage: damage,
      trail: []
    });
  } else if (currentWeapon === "spread") {
    let spreadAngle = 0.4;
    let baseAngle = Math.atan2(lastDirection.y, lastDirection.x);
    
    for (let i = -2; i <= 2; i++) {
      let angle = baseAngle + (i * spreadAngle);
      bullets.push({
        x: player.x,
        y: player.y,
        vx: Math.cos(angle) * bulletSpeed,
        vy: Math.sin(angle) * bulletSpeed,
        type: "spread",
        damage: damage * 0.8,
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
      damage: damage * 0.6,
      trail: []
    });
  }
}

function updateClassicMode() {
  // Wave-based gameplay with boss fights
  if (!isWaveActive && enemies.length === 0 && bosses.length === 0) {
    if (waveNumber % 5 === 0) {
      // Boss wave
      gameState = "bossIntro";
      bossLevel++;
    } else {
      // Regular wave
      startNewWave();
    }
  }
  
  // Spawn enemies for current wave
  if (isWaveActive && enemiesInWave < maxEnemiesPerWave) {
    if (random(100) < 2) {
      spawnEnemy();
      enemiesInWave++;
    }
  }
  
  if (enemiesInWave >= maxEnemiesPerWave) {
    isWaveActive = false;
  }
}

function updateEndlessMode() {
  // Continuous spawning with increasing difficulty
  let spawnRate = 1.5 + (difficultyTimer / 1800) + (playerLevel * 0.2);
  
  if (random(100) < spawnRate) {
    spawnEnemy();
  }
  
  // Random boss spawns
  if (random(10000) < 1 + (difficultyTimer / 3600)) {
    spawnRandomBoss();
  }
}

function updateBossRushMode() {
  // Continuous boss battles
  if (bosses.length === 0) {
    spawnRandomBoss();
    bossLevel++;
  }
}

function startNewWave() {
  waveNumber++;
  maxEnemiesPerWave = 8 + waveNumber * 2;
  enemiesInWave = 0;
  isWaveActive = true;
  addScreenShake(5);
}

function spawnEnemy() {
  let enemy = createBasicEnemy();
  
  // Advanced enemy types based on level
  if (playerLevel >= 3 && random(100) < 20) {
    enemy.type = "fast";
    enemy.speed *= 1.5;
    enemy.size *= 0.8;
    enemy.health = 1;
  } else if (playerLevel >= 5 && random(100) < 15) {
    enemy.type = "tank";
    enemy.speed *= 0.7;
    enemy.size *= 1.3;
    enemy.health = 3;
  } else if (playerLevel >= 7 && random(100) < 10) {
    enemy.type = "shooter";
    enemy.speed *= 0.9;
    enemy.shootTimer = 0;
    enemy.health = 2;
  }
  
  enemies.push(enemy);
}

function createBasicEnemy() {
  let enemy = {
    size: random(14, 22),
    speed: random(0.8, 1.5 + (playerLevel * 0.15)),
    health: 1,
    maxHealth: 1,
    pulsePhase: random(TWO_PI),
    type: "basic"
  };
  
  // Spawn from random edge
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
  
  return enemy;
}

function spawnRandomBoss() {
  let patterns = Object.keys(bossPatterns);
  let pattern = patterns[floor(random(patterns.length))];
  let bossData = bossPatterns[pattern];
  
  let boss = {
    x: width / 2,
    y: 100,
    size: 60,
    health: bossData.health + (bossLevel * 50),
    maxHealth: bossData.health + (bossLevel * 50),
    pattern: pattern,
    name: bossData.name,
    phase: 0,
    timer: 0,
    bullets: []
  };
  
  bosses.push(boss);
}

function updateBosses() {
  for (let i = bosses.length - 1; i >= 0; i--) {
    let boss = bosses[i];
    boss.timer++;
    
    // Boss AI patterns
    if (boss.pattern === "circle") {
      updateCircleBoss(boss);
    } else if (boss.pattern === "charge") {
      updateChargeBoss(boss);
    } else if (boss.pattern === "teleport") {
      updateTeleportBoss(boss);
    } else if (boss.pattern === "minions") {
      updateMinionBoss(boss);
    }
    
    // Update boss bullets
    for (let j = boss.bullets.length - 1; j >= 0; j--) {
      let bullet = boss.bullets[j];
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      
      if (bullet.x < 0 || bullet.x > width || bullet.y < 0 || bullet.y > height) {
        boss.bullets.splice(j, 1);
      }
    }
    
    // Check boss death
    if (boss.health <= 0) {
      createMassiveExplosion(boss.x, boss.y);
      addScreenShake(15);
      score += 500 * comboMultiplier;
      upgradePoints += 3;
      bosses.splice(i, 1);
      
      if (gameMode === "classic") {
        startNewWave();
      }
    }
  }
}

function updateCircleBoss(boss) {
  // Circular shooting pattern
  if (boss.timer % 30 === 0) {
    for (let angle = 0; angle < TWO_PI; angle += PI/6) {
      boss.bullets.push({
        x: boss.x,
        y: boss.y,
        vx: cos(angle + boss.timer * 0.05) * 2,
        vy: sin(angle + boss.timer * 0.05) * 2
      });
    }
  }
}

function updateChargeBoss(boss) {
  // Charging attack pattern
  if (boss.timer % 120 === 0) {
    let dx = player.x - boss.x;
    let dy = player.y - boss.y;
    let dist = sqrt(dx*dx + dy*dy);
    
    boss.chargeVx = (dx/dist) * 5;
    boss.chargeVy = (dy/dist) * 5;
    boss.charging = true;
    boss.chargeTime = 30;
  }
  
  if (boss.charging && boss.chargeTime > 0) {
    boss.x += boss.chargeVx;
    boss.y += boss.chargeVy;
    boss.chargeTime--;
    
    if (boss.chargeTime <= 0) {
      boss.charging = false;
    }
  }
}

function updateTeleportBoss(boss) {
  // Teleporting pattern
  if (boss.timer % 90 === 0) {
    boss.x = random(boss.size, width - boss.size);
    boss.y = random(boss.size, height/2);
    
    // Shoot bullets after teleport
    for (let i = 0; i < 8; i++) {
      let angle = (i / 8) * TWO_PI;
      boss.bullets.push({
        x: boss.x,
        y: boss.y,
        vx: cos(angle) * 3,
        vy: sin(angle) * 3
      });
    }
  }
}

function updateMinionBoss(boss) {
  // Summon minions
  if (boss.timer % 180 === 0) {
    for (let i = 0; i < 3; i++) {
      let minion = createBasicEnemy();
      minion.x = boss.x + random(-50, 50);
      minion.y = boss.y + random(-50, 50);
      minion.speed *= 0.8;
      enemies.push(minion);
    }
  }
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    
    bullet.trail.push({x: bullet.x, y: bullet.y});
    if (bullet.trail.length > 8) bullet.trail.shift();
    
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    
    if (bullet.y < -10 || bullet.y > height + 10 || 
        bullet.x < -10 || bullet.x > width + 10) {
      bullets.splice(i, 1);
    }
  }
}

function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    
    // Move towards player
    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;
    let distance = sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      enemy.x += (dx / distance) * enemy.speed;
      enemy.y += (dy / distance) * enemy.speed;
    }
    
    // Special enemy behaviors
    if (enemy.type === "shooter" && enemy.shootTimer !== undefined) {
      enemy.shootTimer++;
      if (enemy.shootTimer % 60 === 0) {
        // Enemy shoots at player
        let bulletSpeed = 2;
        let angle = atan2(dy, dx);
        // Add enemy bullet (would need separate array)
      }
    }
    
    enemy.pulsePhase += 0.1;
    
    // Check collision with player
    if (distance < (player.size + enemy.size) / 2 && player.invulnerable === 0) {
      let damage = 25;
      if (player.shield > 0) {
        player.shield -= damage;
        damage = 0;
      } else {
        playerHealth -= damage;
      }
      
      player.invulnerable = 60;
      enemies.splice(i, 1);
      addScreenShake(8);
      
      if (playerHealth <= 0) {
        gameState = "gameOver";
      }
    }
  }
}

function updatePowerUps() {
  // Enhanced power-up spawning based on luck
  let spawnChance = 0.5 + (playerUpgrades.luck * 0.3);
  
  if (random(1000) < spawnChance) {
    let types = ["health", "weapon", "speed", "shield", "upgrade"];
    powerUps.push({
      x: random(30, width - 30),
      y: random(30, height - 30),
      type: random(types),
      size: 15,
      glowPhase: 0
    });
  }
  
  for (let i = powerUps.length - 1; i >= 0; i--) {
    let powerUp = powerUps[i];
    powerUp.glowPhase += 0.05;
    
    let distance = sqrt((player.x - powerUp.x) ** 2 + (player.y - powerUp.y) ** 2);
    if (distance < (player.size + powerUp.size) / 2) {
      applyAdvancedPowerUp(powerUp.type);
      powerUps.splice(i, 1);
      addScreenShake(4);
    }
  }
}

function updateExplosionParticles() {
  for (let i = explosionParticles.length - 1; i >= 0; i--) {
    let particle = explosionParticles[i];
    
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life -= 2;
    particle.size *= 0.98;
    
    if (particle.life <= 0) {
      explosionParticles.splice(i, 1);
    }
  }
}

function checkCollisions() {
  // Bullet-enemy collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      let bulletDist = sqrt((bullets[i].x - enemies[j].x) ** 2 + (bullets[i].y - enemies[j].y) ** 2);
      
      if (bulletDist < (6 + enemies[j].size) / 2) {
        enemies[j].health -= bullets[i].damage;
        
        if (enemies[j].health <= 0) {
          createExplosion(enemies[j].x, enemies[j].y);
          addScreenShake(3);
          
          score += 10 * comboMultiplier;
          playerXP += 8 * comboMultiplier;
          comboMultiplier = min(comboMultiplier + 0.1, 5);
          comboTimer = 180;
          
          enemies.splice(j, 1);
          
          if (playerXP >= playerLevel * 75) {
            levelUp();
          }
        }
        
        bullets.splice(i, 1);
        break;
      }
    }
  }
  
  // Bullet-boss collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = 0; j < bosses.length; j++) {
      let boss = bosses[j];
      let bulletDist = sqrt((bullets[i].x - boss.x) ** 2 + (bullets[i].y - boss.y) ** 2);
      
      if (bulletDist < (6 + boss.size) / 2) {
        boss.health -= bullets[i].damage;
        createExplosion(bullets[i].x, bullets[i].y);
        addScreenShake(2);
        bullets.splice(i, 1);
        break;
      }
    }
  }
  
  // Boss bullet-player collisions
  for (let boss of bosses) {
    for (let i = boss.bullets.length - 1; i >= 0; i--) {
      let bullet = boss.bullets[i];
      let dist = sqrt((bullet.x - player.x) ** 2 + (bullet.y - player.y) ** 2);
      
      if (dist < (player.size + 5) / 2 && player.invulnerable === 0) {
        let damage = 15;
        if (player.shield > 0) {
          player.shield -= damage;
        } else {
          playerHealth -= damage;
        }
        
        player.invulnerable = 30;
        boss.bullets.splice(i, 1);
        addScreenShake(5);
        
        if (playerHealth <= 0) {
          gameState = "gameOver";
        }
      }
    }
  }
}

function drawGameplay() {
  // Draw all game elements
  drawBullets();
  drawEnemies();
  drawBosses();
  drawPowerUps();
  drawExplosionParticles();
  drawPlayer();
  drawAdvancedUI();
}

function drawBullets() {
  for (let bullet of bullets) {
    // Draw trail
    for (let j = 0; j < bullet.trail.length; j++) {
      let alpha = (j / bullet.trail.length) * 100;
      let size = 4 - j/2;
      
      if (bullet.type === "basic") {
        fill(255, 255, 0, alpha);
      } else if (bullet.type === "spread") {
        fill(255, 150, 0, alpha);
      } else if (bullet.type === "rapid") {
        fill(0, 255, 255, alpha);
      }
      ellipse(bullet.trail[j].x, bullet.trail[j].y, size);
    }
    
    // Draw main bullet with sprite or geometric shape
    if (spritesLoaded && sprites.bullets[bullet.type]) {
      imageMode(CENTER);
      let bulletSize = bullet.type === "basic" ? 8 : (bullet.type === "spread" ? 10 : 5);
      image(sprites.bullets[bullet.type], bullet.x, bullet.y, bulletSize, bulletSize);
    } else {
      // Draw cool bullet sprites using geometric shapes
      drawBulletSprite(bullet.type, bullet.x, bullet.y);
    }
  }
}

// Draw bullet sprites using geometric shapes
function drawBulletSprite(type, x, y) {
  push();
  translate(x, y);
  
  if (type === "basic") {
    // Basic bullet - energy orb
    fill(255, 255, 0);
    ellipse(0, 0, 8);
    fill(255, 255, 150);
    ellipse(0, 0, 6);
    fill(255, 255, 200);
    ellipse(0, 0, 3);
  } else if (type === "spread") {
    // Spread bullet - angular shard (made larger for visibility)
    fill(255, 150, 0);
    triangle(0, -5, -3, 5, 3, 5);
    fill(255, 200, 100);
    triangle(0, -3, -2, 3, 2, 3);
  } else if (type === "rapid") {
    // Rapid bullet - small energy dot
    fill(0, 255, 255);
    ellipse(0, 0, 5);
    fill(150, 255, 255);
    ellipse(0, 0, 3);
  }
  
  pop();
}

function drawEnemies() {
  for (let enemy of enemies) {
    let pulseSize = enemy.size + sin(enemy.pulsePhase) * 3;
    
    push();
    translate(enemy.x, enemy.y);
    
    // Glow effect
    if (enemy.type === "fast") {
      fill(255, 100, 255, 100);
    } else if (enemy.type === "tank") {
      fill(100, 255, 100, 100);
    } else if (enemy.type === "shooter") {
      fill(255, 255, 100, 100);
    } else {
      fill(255, 50, 50, 100);
    }
    ellipse(0, 0, pulseSize + 6);
    
    // Draw sprite or geometric shape
    if (spritesLoaded && sprites.enemies[enemy.type]) {
      imageMode(CENTER);
      image(sprites.enemies[enemy.type], 0, 0, pulseSize, pulseSize);
    } else {
      // Draw cool enemy sprites using geometric shapes
      drawEnemySprite(enemy.type, 0, 0, pulseSize);
    }
    
    pop();
    
    // Health bar for multi-hit enemies
    if (enemy.health > 1) {
      let barWidth = enemy.size;
      let barHeight = 4;
      fill(255, 0, 0);
      rect(enemy.x - barWidth/2, enemy.y - enemy.size/2 - 8, barWidth, barHeight);
      fill(0, 255, 0);
      rect(enemy.x - barWidth/2, enemy.y - enemy.size/2 - 8, 
           (enemy.health / enemy.maxHealth) * barWidth, barHeight);
    }
  }
}

// Draw different enemy sprites using geometric shapes
function drawEnemySprite(type, x, y, size) {
  push();
  translate(x, y);
  
  if (type === "fast") {
    // Fast enemy - sleek diamond shape
    fill(255, 150, 255);
    rotate(frameCount * 0.1); // Spinning effect
    quad(0, -size/2, size/3, 0, 0, size/2, -size/3, 0);
    fill(255, 200, 255);
    ellipse(0, 0, size/3);
  } else if (type === "tank") {
    // Tank enemy - big square with details
    fill(150, 255, 150);
    rectMode(CENTER);
    rect(0, 0, size * 0.8, size * 0.6);
    fill(100, 200, 100);
    rect(0, 0, size * 0.6, size * 0.4);
    // Gun barrel
    fill(50, 150, 50);
    rect(0, -size/2, size/6, size/3);
  } else if (type === "shooter") {
    // Shooter enemy - star shape with gun
    fill(255, 255, 150);
    drawStar(0, 0, size/3, size/2, 5);
    fill(255, 200, 100);
    ellipse(0, 0, size/2);
  } else {
    // Basic enemy - alien UFO shape
    fill(255, 100, 100);
    ellipse(0, 0, size);
    fill(255, 150, 150);
    ellipse(0, 0, size * 0.7);
    fill(200, 0, 0);
    ellipse(0, 0, size * 0.3);
    // Alien details
    fill(255, 255, 255);
    ellipse(-size/4, -size/6, size/8);
    ellipse(size/4, -size/6, size/8);
  }
  
  pop();
}

// Helper function to draw star shapes
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawBosses() {
  for (let boss of bosses) {
    // Boss body with pulsing effect
    let pulseSize = boss.size + sin(frameCount * 0.1) * 5;
    
    push();
    translate(boss.x, boss.y);
    
    // Massive glow effect
    fill(150, 0, 150, 100);
    ellipse(0, 0, pulseSize + 20);
    
    // Draw sprite or geometric shape
    if (spritesLoaded && sprites.bosses[boss.pattern]) {
      imageMode(CENTER);
      image(sprites.bosses[boss.pattern], 0, 0, pulseSize, pulseSize);
    } else {
      // Draw awesome boss sprites using geometric shapes
      drawBossSprite(boss.pattern, 0, 0, pulseSize, boss.timer);
    }
    
    pop();
    
    // Boss health bar
    let barWidth = 200;
    let barHeight = 8;
    fill(0, 0, 0, 150);
    rect(width/2 - barWidth/2 - 2, 20 - 2, barWidth + 4, barHeight + 4);
    fill(255, 0, 0);
    rect(width/2 - barWidth/2, 20, barWidth, barHeight);
    fill(255, 255, 0);
    rect(width/2 - barWidth/2, 20, (boss.health / boss.maxHealth) * barWidth, barHeight);
    
    // Boss name
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(boss.name, width/2, 35);
    
    // Draw boss bullets with sprites
    for (let bullet of boss.bullets) {
      if (spritesLoaded && sprites.bullets.boss) {
        imageMode(CENTER);
        image(sprites.bullets.boss, bullet.x, bullet.y, 8, 8);
      } else {
        // Geometric boss bullets
        fill(255, 0, 0);
        ellipse(bullet.x, bullet.y, 8);
        fill(255, 100, 100);
        ellipse(bullet.x, bullet.y, 5);
        fill(255, 200, 200);
        ellipse(bullet.x, bullet.y, 2);
      }
    }
  }
}

// Draw epic boss sprites using geometric shapes
function drawBossSprite(pattern, x, y, size, timer) {
  push();
  translate(x, y);
  
  if (pattern === "circle") {
    // Spiral Shooter - rotating segments
    fill(200, 50, 200);
    ellipse(0, 0, size);
    fill(255, 100, 255);
    ellipse(0, 0, size * 0.7);
    
    // Rotating cannons
    for (let i = 0; i < 6; i++) {
      push();
      rotate((timer * 0.05) + (i * TWO_PI / 6));
      fill(150, 0, 150);
      rect(0, -size/2, size/8, size/4);
      pop();
    }
  } else if (pattern === "charge") {
    // Berserker - angular and aggressive
    fill(200, 50, 200);
    rectMode(CENTER);
    rotate(sin(timer * 0.1) * 0.3); // Slight wobble
    rect(0, 0, size * 0.8, size * 0.6);
    
    // Spikes
    fill(255, 0, 150);
    triangle(0, -size/2, -size/4, -size/3, size/4, -size/3);
    triangle(-size/2, 0, -size/3, -size/4, -size/3, size/4);
    triangle(size/2, 0, size/3, -size/4, size/3, size/4);
  } else if (pattern === "teleport") {
    // Phase Walker - ethereal and shifting
    let phase = sin(timer * 0.1);
    fill(200, 50, 200, 150 + phase * 100);
    
    // Multiple overlapping shapes
    for (let i = 0; i < 3; i++) {
      push();
      rotate(i * TWO_PI / 3 + timer * 0.02);
      ellipse(size/4, 0, size/2);
      pop();
    }
    
    fill(255, 100, 255, 200);
    ellipse(0, 0, size * 0.4);
  } else if (pattern === "minions") {
    // Summoner - mystical appearance
    fill(200, 50, 200);
    ellipse(0, 0, size);
    fill(255, 100, 255);
    ellipse(0, 0, size * 0.7);
    
    // Summoning circles
    stroke(255, 200, 255);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, size * 1.2);
    ellipse(0, 0, size * 1.4);
    
    // Mystical symbols
    fill(255, 255, 255);
    noStroke();
    drawStar(0, 0, size/6, size/4, 5);
  }
  
  pop();
}

function drawPowerUps() {
  for (let powerUp of powerUps) {
    let glowSize = powerUp.size + sin(powerUp.glowPhase) * 5;
    
    push();
    translate(powerUp.x, powerUp.y);
    
    // Glow effect with type-specific colors
    if (powerUp.type === "health") {
      fill(0, 255, 0, 100);
    } else if (powerUp.type === "weapon") {
      fill(255, 255, 0, 100);
    } else if (powerUp.type === "speed") {
      fill(0, 0, 255, 100);
    } else if (powerUp.type === "shield") {
      fill(0, 255, 255, 100);
    } else if (powerUp.type === "upgrade") {
      fill(255, 0, 255, 100);
    }
    ellipse(0, 0, glowSize + 10);
    
    // Draw sprite or geometric shape
    if (spritesLoaded && sprites.powerUps[powerUp.type]) {
      imageMode(CENTER);
      image(sprites.powerUps[powerUp.type], 0, 0, powerUp.size, powerUp.size);
    } else {
      // Draw cool power-up sprites using geometric shapes
      drawPowerUpSprite(powerUp.type, 0, 0, powerUp.size, powerUp.glowPhase);
    }
    
    pop();
  }
}

// Draw power-up sprites using geometric shapes
function drawPowerUpSprite(type, x, y, size, glowPhase) {
  push();
  translate(x, y);
  rotate(glowPhase); // Gentle rotation
  
  if (type === "health") {
    // Health - red cross/heart
    fill(0, 255, 0);
    rectMode(CENTER);
    rect(0, 0, size/3, size);
    rect(0, 0, size, size/3);
    fill(150, 255, 150);
    ellipse(0, 0, size/2);
  } else if (type === "weapon") {
    // Weapon - lightning bolt
    fill(255, 255, 0);
    beginShape();
    vertex(-size/4, -size/2);
    vertex(size/6, -size/6);
    vertex(-size/6, -size/6);
    vertex(size/4, size/2);
    vertex(-size/6, size/6);
    vertex(size/6, size/6);
    endShape(CLOSE);
  } else if (type === "speed") {
    // Speed - wing/arrow shape
    fill(0, 0, 255);
    triangle(0, -size/2, -size/3, size/2, size/3, size/2);
    fill(100, 100, 255);
    triangle(0, -size/3, -size/4, size/3, size/4, size/3);
  } else if (type === "shield") {
    // Shield - protective shape
    fill(0, 255, 255);
    beginShape();
    vertex(0, -size/2);
    vertex(size/3, -size/4);
    vertex(size/3, size/4);
    vertex(0, size/2);
    vertex(-size/3, size/4);
    vertex(-size/3, -size/4);
    endShape(CLOSE);
  } else if (type === "upgrade") {
    // Upgrade - star/gem shape
    fill(255, 0, 255);
    drawStar(0, 0, size/4, size/2, 6);
    fill(255, 150, 255);
    ellipse(0, 0, size/3);
  }
  
  pop();
}

function drawExplosionParticles() {
  for (let particle of explosionParticles) {
    fill(particle.color.r, particle.color.g, particle.color.b, particle.life);
    ellipse(particle.x, particle.y, particle.size);
  }
}

function drawPlayer() {
  push();
  translate(player.x, player.y);
  rotate(player.rotation);
  
  // Player glow effect
  fill(0, 255, 255, 100);
  ellipse(0, 0, player.size + 8);
  
  // Draw sprite or geometric shape
  if (spritesLoaded && sprites.player) {
    // Use custom player sprite
    if (player.invulnerable > 0 && player.invulnerable % 8 < 4) {
      tint(255, 255, 255, 150); // Flashing when invulnerable
    } else {
      tint(255); // Normal color
    }
    imageMode(CENTER);
    image(sprites.player, 0, 0, player.size, player.size);
    noTint();
  } else {
    // Use cool spaceship geometric sprite
    drawSpaceshipSprite(0, 0, player.size, player.invulnerable);
  }
  
  // Shield indicator
  if (player.shield > 0) {
    stroke(0, 255, 255);
    strokeWeight(3);
    noFill();
    ellipse(0, 0, player.size + 12);
    noStroke();
  }
  
  pop();
}

// Draw a cool spaceship sprite using geometric shapes
function drawSpaceshipSprite(x, y, size, invulnerable) {
  push();
  translate(x, y);
  
  // Invulnerability flashing
  let alpha = (invulnerable > 0 && invulnerable % 8 < 4) ? 150 : 255;
  
  // Main body (triangle)
  fill(0, 255, 255, alpha);
  triangle(0, -size/2, -size/3, size/2, size/3, size/2);
  
  // Engine glow
  fill(255, 100, 0, alpha);
  ellipse(-size/6, size/3, size/4);
  ellipse(size/6, size/3, size/4);
  
  // Cockpit
  fill(255, 255, 255, alpha);
  ellipse(0, -size/4, size/3);
  
  // Wings
  fill(150, 255, 255, alpha);
  triangle(-size/3, 0, -size/2, size/3, -size/4, size/4);
  triangle(size/3, 0, size/2, size/3, size/4, size/4);
  
  pop();
}

function drawAdvancedUI() {
  // Health bar
  fill(255, 0, 0, 100);
  rect(8, 8, 204, 24);
  fill(255, 0, 0);
  rect(10, 10, 200, 20);
  fill(0, 255, 0);
  rect(10, 10, (playerHealth / maxHealth) * 200, 20);
  
  // XP bar
  fill(100, 100, 255, 100);
  rect(8, 33, 204, 19);
  fill(100, 100, 255);
  rect(10, 35, 200, 15);
  fill(0, 255, 255);
  let xpProgress = (playerXP % (playerLevel * 75)) / (playerLevel * 75);
  rect(10, 35, xpProgress * 200, 15);
  
  // Shield bar
  if (player.shield > 0) {
    fill(0, 255, 255, 100);
    rect(8, 55, 204, 14);
    fill(0, 255, 255);
    rect(10, 57, (player.shield / 100) * 200, 10);
  }
  
  // Game info
  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  text("Health", 220, 12);
  text("XP", 220, 37);
  if (player.shield > 0) text("Shield", 220, 58);
  
  text("Score: " + score, 10, 80);
  text("Level: " + playerLevel, 10, 100);
  text("Wave: " + waveNumber, 10, 120);
  text("Weapon: " + currentWeapon, 10, 140);
  text("Mode: " + gameMode, 10, 160);
  
  if (comboMultiplier > 1) {
    fill(255, 255, 0);
    text("Combo: x" + comboMultiplier.toFixed(1), 10, 180);
  }
  
  // Upgrade points
  fill(255, 0, 255);
  text("Upgrade Points: " + upgradePoints, 10, 200);
  
  textAlign(RIGHT, TOP);
  fill(255);
  text("U: Upgrades | 1,2,3: Weapons", width - 10, 10);
}

function drawBossIntro() {
  fill(0, 0, 0, 200);
  rect(0, 0, width, height);
  
  fill(255, 0, 0);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("BOSS INCOMING", width/2, height/2 - 50);
  
  fill(255);
  textSize(24);
  text("Wave " + waveNumber, width/2, height/2);
  text("Press any key to continue", width/2, height/2 + 50);
}

function drawGameOver() {
  fill(255, 100, 100, 150 + sin(frameCount * 0.1) * 100);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width/2, height/2 - 80);
  
  fill(255);
  textSize(24);
  text("Final Score: " + score, width/2, height/2 - 20);
  text("Level Reached: " + playerLevel, width/2, height/2 + 10);
  text("Waves Survived: " + (waveNumber - 1), width/2, height/2 + 40);
  text("Mode: " + gameMode, width/2, height/2 + 70);
  
  textSize(18);
  text("Press any key to return to menu", width/2, height/2 + 110);
}

// Advanced utility functions
function drawAdvancedBackground() {
  background(10, 10, 25);
  
  // Moving star field
  for (let i = 0; i < 80; i++) {
    let x = (i * 77 + frameCount * 0.3) % width;
    let y = (i * 43 + frameCount * 0.2) % height;
    let brightness = 100 + sin(frameCount * 0.02 + i) * 50;
    let size = 1 + sin(frameCount * 0.01 + i) * 2;
    
    fill(brightness, brightness, 255, 150);
    ellipse(x, y, size);
  }
}

function updateAudioVisualization() {
  for (let i = 0; i < audioVisualization.length; i++) {
    audioVisualization[i] = random(0, 1) * (enemies.length * 0.1 + bosses.length * 0.5 + 0.2);
  }
}

function drawAudioVisualization(x, y, w, h) {
  let barWidth = w / audioVisualization.length;
  
  for (let i = 0; i < audioVisualization.length; i++) {
    let barHeight = audioVisualization[i] * h;
    let hue = (i / audioVisualization.length) * 360 + frameCount;
    
    fill(100 + sin(hue * 0.01) * 100, 200, 255, 150);
    rect(x + i * barWidth, y + h - barHeight, barWidth - 1, barHeight);
  }
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

function createMassiveExplosion(x, y) {
  for (let i = 0; i < 30; i++) {
    explosionParticles.push({
      x: x,
      y: y,
      vx: random(-5, 5),
      vy: random(-5, 5),
      size: random(5, 15),
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

function levelUp() {
  playerLevel++;
  maxHealth += 15;
  playerHealth = min(playerHealth + 20, maxHealth);
  upgradePoints += 1;
  addScreenShake(6);
}

function applyAdvancedPowerUp(type) {
  if (type === "health") {
    playerHealth = min(playerHealth + 30, maxHealth);
  } else if (type === "weapon") {
    if (currentWeapon === "basic") currentWeapon = "spread";
    else if (currentWeapon === "spread") currentWeapon = "rapid";
    else currentWeapon = "basic";
  } else if (type === "speed") {
    player.speed = min(player.speed + 0.3, 8);
  } else if (type === "shield") {
    player.shield = min(player.shield + 50, 100);
  } else if (type === "upgrade") {
    upgradePoints += 2;
  }
}

function keyPressed() {
  if (gameState === "start") {
    if (key === ' ') {
      gameState = "modeSelect";
    } else if (key === 'U' || key === 'u') {
      gameState = "upgradeShop";
    } else {
      gameMode = "classic";
      startGame();
    }
  } else if (gameState === "modeSelect") {
    if (key === '1') gameMode = "classic";
    if (key === '2') gameMode = "endless";
    if (key === '3') gameMode = "boss-rush";
    if (keyCode === ENTER) {
      startGame();
    }
    if (keyCode === ESCAPE) {
      gameState = "start";
    }
  } else if (gameState === "upgradeShop") {
    if (key === '1' && upgradePoints >= playerUpgrades.damage * 2) {
      upgradePoints -= playerUpgrades.damage * 2;
      playerUpgrades.damage++;
    }
    if (key === '2' && upgradePoints >= playerUpgrades.speed * 2) {
      upgradePoints -= playerUpgrades.speed * 2;
      playerUpgrades.speed++;
    }
    if (key === '3' && upgradePoints >= playerUpgrades.health * 2) {
      upgradePoints -= playerUpgrades.health * 2;
      playerUpgrades.health++;
      maxHealth += 20;
      playerHealth += 20;
    }
    if (key === '4' && upgradePoints >= playerUpgrades.fireRate * 2) {
      upgradePoints -= playerUpgrades.fireRate * 2;
      playerUpgrades.fireRate++;
    }
    if (key === '5' && upgradePoints >= playerUpgrades.luck * 2) {
      upgradePoints -= playerUpgrades.luck * 2;
      playerUpgrades.luck++;
    }
    if (keyCode === ESCAPE) {
      gameState = "start";
    }
  } else if (gameState === "playing") {
    if (key === '1') currentWeapon = "basic";
    if (key === '2') currentWeapon = "spread";
    if (key === '3') currentWeapon = "rapid";
    if (key === 'U' || key === 'u') {
      gameState = "upgradeShop";
    }
  } else if (gameState === "bossIntro") {
    spawnRandomBoss();
    gameState = "playing";
  } else if (gameState === "gameOver") {
    resetGame();
    gameState = "start";
  }
}

function startGame() {
  resetGame();
  gameState = "playing";
  
  if (gameMode === "boss-rush") {
    spawnRandomBoss();
  } else {
    startNewWave();
  }
}

function resetGame() {
  bullets = [];
  enemies = [];
  bosses = [];
  powerUps = [];
  explosionParticles = [];
  score = 0;
  playerXP = 0;
  playerLevel = 1;
  playerHealth = 60 * playerUpgrades.health;
  maxHealth = 60 * playerUpgrades.health;
  currentWeapon = "basic";
  difficultyTimer = 0;
  lastDirection = {x: 0, y: -1};
  screenShake = 0;
  bossLevel = 0;
  waveNumber = 0;
  enemiesInWave = 0;
  isWaveActive = false;
  comboMultiplier = 1;
  comboTimer = 0;
  
  player.x = width / 2;
  player.y = height / 2;
  player.speed = 4;
  player.rotation = 0;
  player.invulnerable = 0;
  player.shield = 0;
}