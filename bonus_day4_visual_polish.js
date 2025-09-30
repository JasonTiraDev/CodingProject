// ================================================
// 🎨 Mini Survivors - BONUS DAY 4: Visual Polish & Images
// ================================================
// Learning Goals for Bonus Day 4:
// - Loading and displaying images
// - Creating animated sprites
// - Background graphics and parallax effects
// - Visual effects and particle systems
// - Game juice and polish techniques
// ================================================

// --- Image Variables ---
// These will hold our loaded images
let playerImg, enemyImg, bulletImg, powerupImg;
let backgroundImg, explosionImg;
let playerFrames = []; // For animated sprites

// --- Visual Effects Variables ---
let particles = []; // Explosion particles
let screenShake = 0; // Screen shake intensity
let backgroundOffset = 0; // For scrolling background

// --- Core Game Variables (same as Day 3) ---
let player = { x: 300, y: 300, r: 20, frame: 0 };
let enemies = [];
let bullets = [];
let orbitals = [];
let powerups = [];

let xp = 0;
let level = 1;
let speed = 4;
let fireRate = 20;
let spreadFireRate = 40;
let weaponType = 'single';
let spawnInterval = 90;
let levelTimer = 60 * 30;
let bannerTimer = 0;
let totalFrames = 0;

let onStartScreen = true;
let gameStarted = false;
let gameOver = false;
let lastDir = { x: 1, y: 0 };

// --- STEP 1: Preload Function ---
// This special p5.js function runs BEFORE setup()
// Use it to load all images and sounds
function preload() {
  console.log("Loading images...");
  
  // In a real project, you'd load actual image files like this:
  // playerImg = loadImage('assets/player.png');
  // enemyImg = loadImage('assets/enemy.png');
  
  // For this tutorial, we'll create images programmatically
  // This way the code works without needing image files
  createImageAssets();
}

// --- STEP 2: Create Image Assets Programmatically ---
// This function creates our "images" using p5.js graphics
// In a real game, you'd use actual PNG/JPG files
function createImageAssets() {
  // Create player sprite (animated spaceship)
  for (let i = 0; i < 4; i++) {
    let frame = createGraphics(40, 40);
    frame.background(0, 0, 0, 0); // Transparent background
    frame.fill(0, 200, 255); // Cyan
    frame.noStroke();
    
    // Draw spaceship shape that changes slightly each frame
    frame.triangle(35, 20, 5, 10 + i, 5, 30 - i);
    frame.ellipse(15, 20, 8, 12);
    
    // Add engine glow that flickers
    frame.fill(255, 100 + i * 30, 0, 150);
    frame.ellipse(5, 20, 6 + i, 8);
    
    playerFrames.push(frame);
  }
  
  // Create enemy sprite (alien)
  enemyImg = createGraphics(30, 30);
  enemyImg.background(0, 0, 0, 0);
  enemyImg.fill(255, 50, 50);
  enemyImg.ellipse(15, 15, 25, 25);
  enemyImg.fill(255, 0, 0);
  enemyImg.ellipse(10, 10, 6, 6);
  enemyImg.ellipse(20, 10, 6, 6);
  enemyImg.fill(0);
  enemyImg.ellipse(10, 10, 3, 3);
  enemyImg.ellipse(20, 10, 3, 3);
  
  // Create bullet sprite (energy blast)
  bulletImg = createGraphics(12, 12);
  bulletImg.background(0, 0, 0, 0);
  bulletImg.fill(255, 255, 0);
  bulletImg.ellipse(6, 6, 8, 8);
  bulletImg.fill(255, 255, 200);
  bulletImg.ellipse(6, 6, 4, 4);
  
  // Create power-up sprites
  powerupImg = createGraphics(20, 20);
  powerupImg.background(0, 0, 0, 0);
  powerupImg.fill(0, 255, 0);
  powerupImg.rect(2, 2, 16, 16);
  powerupImg.fill(255);
  powerupImg.textAlign(CENTER);
  powerupImg.textSize(12);
  powerupImg.text('P', 10, 14);
  
  // Create scrolling space background
  backgroundImg = createGraphics(width, height);
  backgroundImg.background(5, 5, 20); // Dark blue space
  
  // Add stars
  for (let i = 0; i < 200; i++) {
    let brightness = random(100, 255);
    backgroundImg.fill(brightness, brightness, brightness);
    backgroundImg.noStroke();
    backgroundImg.ellipse(random(width), random(height), random(1, 3), random(1, 3));
  }
  
  // Add nebula effect
  for (let i = 0; i < 50; i++) {
    backgroundImg.fill(random(100, 200), random(50, 150), random(150, 255), 30);
    backgroundImg.ellipse(random(width), random(height), random(20, 100), random(20, 100));
  }
  
  console.log("All images created!");
}

// --- STEP 3: Enhanced Setup ---
function setup() {
  createCanvas(600, 600);
  textSize(18);
  console.log("Bonus Day 4: Visual Polish ready!");
}

// --- STEP 4: Enhanced Draw Function with Visual Effects ---
function draw() {
  // Apply screen shake effect
  if (screenShake > 0) {
    translate(random(-screenShake, screenShake), random(-screenShake, screenShake));
    screenShake *= 0.9; // Fade out shake
  }
  
  // Draw animated background
  drawScrollingBackground();
  
  // Game state management (same as before)
  if (onStartScreen) {
    drawEnhancedStartScreen();
    return;
  }
  if (!gameStarted) {
    drawEnhancedWeaponMenu();
    return;
  }
  if (gameOver) {
    drawEnhancedGameOver();
    return;
  }
  
  // Game logic (same as Day 3)
  totalFrames++;
  levelTimer--;
  
  if (levelTimer <= 0) {
    level++;
    levelTimer = 60 * 30;
    if (spawnInterval > 20) spawnInterval -= 5;
    speed *= 1.02;
    bannerTimer = 120;
    screenShake = 10; // Screen shake on level up!
  }
  
  // Player movement
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= speed;
    lastDir = { x: -1, y: 0 };
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += speed;
    lastDir = { x: 1, y: 0 };
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= speed;
    lastDir = { x: 0, y: -1 };
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.y += speed;
    lastDir = { x: 0, y: 1 };
  }
  
  player.x = constrain(player.x, player.r, width - player.r);
  player.y = constrain(player.y, player.r, height - player.r);
  
  // --- STEP 5: Draw Animated Player ---
  push();
  translate(player.x, player.y);
  
  // Rotate player to face movement direction
  if (lastDir.x !== 0 || lastDir.y !== 0) {
    rotate(atan2(lastDir.y, lastDir.x));
  }
  
  // Animate player sprite
  player.frame = (player.frame + 0.2) % playerFrames.length;
  let currentFrame = playerFrames[floor(player.frame)];
  image(currentFrame, -20, -20);
  pop();
  
  // Spawning
  if (frameCount % spawnInterval === 0) {
    enemies.push(createAdvancedEnemy());
  }
  if (frameCount % 900 === 0) {
    powerups.push(createPowerUp());
  }
  
  // Shooting
  if (weaponType === 'spread') {
    if (frameCount % spreadFireRate === 0) fireWeapons();
  } else if (frameCount % fireRate === 0) {
    fireWeapons();
  }
  
  // --- STEP 6: Draw Enhanced Bullets ---
  for (let bullet of bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    
    // Draw bullet image with rotation
    push();
    translate(bullet.x, bullet.y);
    rotate(atan2(bullet.vy, bullet.vx));
    image(bulletImg, -6, -6);
    
    // Add trail effect
    fill(255, 255, 0, 100);
    ellipse(-10, 0, 4, 2);
    ellipse(-15, 0, 2, 1);
    pop();
  }
  bullets = bullets.filter(b => b.x > 0 && b.x < width && b.y > 0 && b.y < height);
  
  // Update orbitals
  if (weaponType === 'orbital' || orbitals.length > 0) {
    updateEnhancedOrbitals();
  }
  
  // --- STEP 7: Draw Enhanced Enemies ---
  for (let enemy of enemies) {
    enemy.x += (player.x - enemy.x) * 0.01 * enemy.speed;
    enemy.y += (player.y - enemy.y) * 0.01 * enemy.speed;
    
    // Draw enemy image with slight rotation for movement
    push();
    translate(enemy.x, enemy.y);
    rotate(frameCount * 0.02 + enemy.x * 0.01); // Slight spin
    image(enemyImg, -15, -15);
    pop();
    
    // Check collision with player
    if (dist(enemy.x, enemy.y, player.x, player.y) < player.r + enemy.r) {
      gameOver = true;
      createExplosion(player.x, player.y, 20); // Big explosion!
    }
  }
  
  // Update power-ups with floating animation
  for (let powerup of powerups) {
    powerup.floatOffset = (powerup.floatOffset || 0) + 0.1;
    let floatY = powerup.y + sin(powerup.floatOffset) * 3;
    
    push();
    translate(powerup.x, floatY);
    rotate(frameCount * 0.05);
    image(powerupImg, -10, -10);
    
    // Glowing effect
    fill(0, 255, 0, 50);
    ellipse(0, 0, 30, 30);
    pop();
    
    if (dist(player.x, player.y, powerup.x, powerup.y) < player.r + 10) {
      weaponType = powerup.type;
      if (powerup.type === 'orbital') initOrbitals();
      powerup.collected = true;
      createExplosion(powerup.x, powerup.y, 5); // Small explosion
    }
  }
  powerups = powerups.filter(p => !p.collected);
  
  // Enhanced collision detection with particle effects
  for (let bullet of bullets) {
    for (let enemy of enemies) {
      if (dist(bullet.x, bullet.y, enemy.x, enemy.y) < bullet.r + enemy.r) {
        bullet.dead = true;
        enemy.dead = true;
        xp++;
        createExplosion(enemy.x, enemy.y, 8); // Medium explosion
        screenShake = 3; // Small screen shake
      }
    }
  }
  bullets = bullets.filter(b => !b.dead);
  enemies = enemies.filter(e => !e.dead);
  
  // XP upgrades
  if (xp === 10) fireRate = 15;
  if (xp === 20) fireRate = 10;
  if (xp === 30) fireRate = 8;
  
  // Update particles
  updateParticles();
  
  // Enhanced HUD
  drawEnhancedHUD();
  
  if (bannerTimer > 0) {
    drawEnhancedLevelBanner();
    bannerTimer--;
  }
}

// --- STEP 8: Visual Effect Functions ---

function drawScrollingBackground() {
  // Create parallax scrolling effect
  backgroundOffset += 0.5;
  
  push();
  translate(0, backgroundOffset % height);
  image(backgroundImg, 0, -height);
  image(backgroundImg, 0, 0);
  pop();
}

function createExplosion(x, y, size) {
  // Create particle explosion
  for (let i = 0; i < size; i++) {
    particles.push({
      x: x,
      y: y,
      vx: random(-3, 3),
      vy: random(-3, 3),
      life: 30,
      maxLife: 30,
      size: random(2, 6),
      color: random(['red', 'orange', 'yellow'])
    });
  }
}

function updateParticles() {
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    
    // Draw particle with fading alpha
    let alpha = map(p.life, 0, p.maxLife, 0, 255);
    fill(p.color + hex(floor(alpha), 2));
    noStroke();
    ellipse(p.x, p.y, p.size * (p.life / p.maxLife), p.size * (p.life / p.maxLife));
  }
  
  // Remove dead particles
  particles = particles.filter(p => p.life > 0);
}

function updateEnhancedOrbitals() {
  for (let orbital of orbitals) {
    orbital.angle += 2;
    let rad = radians(orbital.angle);
    let ox = player.x + cos(rad) * orbital.dist;
    let oy = player.y + sin(rad) * orbital.dist;
    
    // Draw glowing orbital
    fill(255, 150, 0, 100);
    ellipse(ox, oy, 25, 25);
    fill(255, 200, 0);
    ellipse(ox, oy, 15, 15);
    fill(255, 255, 200);
    ellipse(ox, oy, 8, 8);
    
    // Check collision with enemies
    for (let enemy of enemies) {
      if (dist(ox, oy, enemy.x, enemy.y) < 15 + enemy.r) {
        enemy.dead = true;
        xp++;
        createExplosion(enemy.x, enemy.y, 6);
      }
    }
  }
}

function drawEnhancedHUD() {
  // Semi-transparent HUD background
  fill(0, 0, 0, 100);
  rect(0, 0, width, 80);
  rect(0, height - 50, width, 50);
  
  // Enhanced text with glow effect
  drawGlowText('XP: ' + xp, 15, 25, 'cyan');
  drawGlowText('Level: ' + level, width - 100, 25, 'yellow');
  drawGlowText('Weapon: ' + weaponType, 15, 50, 'orange');
  drawGlowText('Time: ' + floor(totalFrames / 60) + 's', width - 120, 50, 'white');
  
  // Animated progress bar
  let progress = (60 * 30 - levelTimer) / (60 * 30);
  fill(0, 100, 255, 150);
  rect(15, height - 35, progress * 200, 15);
  fill(0, 200, 255);
  rect(15, height - 35, progress * 200, 8);
  
  drawGlowText('Next Level: ' + floor(progress * 100) + '%', 15, height - 15, 'cyan');
}

function drawGlowText(txt, x, y, col) {
  // Draw glow effect
  fill(col);
  for (let i = 0; i < 3; i++) {
    text(txt, x + i, y + i);
    text(txt, x - i, y - i);
    text(txt, x + i, y - i);
    text(txt, x - i, y + i);
  }
  
  // Draw main text
  fill(255);
  text(txt, x, y);
}

// --- Enhanced Screen Functions ---

function drawEnhancedStartScreen() {
  // Animated background effect
  for (let i = 0; i < 50; i++) {
    let x = (frameCount * 2 + i * 50) % (width + 100) - 50;
    let y = 50 + i * 10;
    fill(0, 100, 255, 100);
    ellipse(x, y, 5, 5);
  }
  
  textAlign(CENTER);
  drawGlowText('🚀 MINI SURVIVORS - VISUAL EDITION 🚀', width / 2, height / 2 - 120, 'cyan');
  
  fill(255);
  textSize(18);
  text('Enhanced with Images & Effects!', width / 2, height / 2 - 80);
  text('• Animated sprites', width / 2, height / 2 - 50);
  text('• Particle explosions', width / 2, height / 2 - 25);
  text('• Screen shake effects', width / 2, height / 2);
  text('• Scrolling backgrounds', width / 2, height / 2 + 25);
  
  drawGlowText('Press ENTER to begin!', width / 2, height / 2 + 70, 'yellow');
  textAlign(LEFT);
}

function drawEnhancedWeaponMenu() {
  textAlign(CENTER);
  drawGlowText('Choose Your Weapon Style!', width / 2, height / 2 - 50, 'orange');
  
  fill(255);
  textSize(16);
  text('Starting with: Single Shot', width / 2, height / 2 - 10);
  text('Collect power-ups for upgrades!', width / 2, height / 2 + 20);
  
  drawGlowText('Press ENTER to launch!', width / 2, height / 2 + 70, 'cyan');
  textAlign(LEFT);
}

function drawEnhancedGameOver() {
  // Dramatic game over effect
  fill(255, 0, 0, 200);
  rect(0, 0, width, height);
  
  textAlign(CENTER);
  drawGlowText('GAME OVER', width / 2, height / 2 - 50, 'red');
  
  fill(255);
  textSize(18);
  text('Final Statistics:', width / 2, height / 2 - 10);
  text('Level: ' + level + ' | XP: ' + xp, width / 2, height / 2 + 15);
  text('Survived: ' + floor(totalFrames / 60) + ' seconds', width / 2, height / 2 + 40);
  
  drawGlowText('Press SPACE to restart', width / 2, height / 2 + 80, 'yellow');
  textAlign(LEFT);
}

function drawEnhancedLevelBanner() {
  fill(0, 0, 0, 200);
  rect(0, height / 2 - 60, width, 120);
  
  textAlign(CENTER);
  drawGlowText('⭐ LEVEL ' + level + ' ⭐', width / 2, height / 2 - 20, 'gold');
  fill(255);
  text('Difficulty Increased!', width / 2, height / 2 + 10);
  textAlign(LEFT);
}

// --- Same helper functions as Day 3 ---
function createAdvancedEnemy() {
  let side = floor(random(4));
  let x, y;
  if (side === 0) { x = random(width); y = -20; }
  else if (side === 1) { x = random(width); y = height + 20; }
  else if (side === 2) { x = -20; y = random(height); }
  else { x = width + 20; y = random(height); }
  
  return {
    x: x, y: y, r: 15,
    speed: random(0.5, 1.2) * (1 + level * 0.05),
    dead: false
  };
}

function createPowerUp() {
  let types = ['spread', 'orbital'];
  return {
    x: random(50, width - 50),
    y: random(50, height - 50),
    type: random(types),
    collected: false
  };
}

function fireWeapons() {
  let bulletSpeed = 6;
  let vx = lastDir.x * bulletSpeed;
  let vy = lastDir.y * bulletSpeed;
  if (vx === 0 && vy === 0) vx = bulletSpeed;
  
  if (weaponType === 'single') {
    bullets.push({ x: player.x, y: player.y, vx, vy, r: 5, dead: false });
  } else if (weaponType === 'spread') {
    bullets.push({ x: player.x, y: player.y, vx, vy, r: 5, dead: false });
    bullets.push({ x: player.x, y: player.y, vx: vx + 1, vy: vy + 1, r: 5, dead: false });
    bullets.push({ x: player.x, y: player.y, vx: vx - 1, vy: vy - 1, r: 5, dead: false });
  }
}

function initOrbitals() {
  orbitals = [
    { angle: 0, dist: 60 },
    { angle: 120, dist: 60 },
    { angle: 240, dist: 60 }
  ];
}

// Input handling (same as Day 3)
function keyPressed() {
  if (onStartScreen && keyCode === ENTER) {
    onStartScreen = false;
    return;
  }
  if (!gameStarted && !onStartScreen) {
    if (keyCode === ENTER) gameStarted = true;
  } else if (gameOver && key === ' ') {
    restartGame();
  }
}

function restartGame() {
  player = { x: 300, y: 300, r: 20, frame: 0 };
  enemies = [];
  bullets = [];
  orbitals = [];
  powerups = [];
  particles = [];
  xp = 0;
  level = 1;
  speed = 4;
  fireRate = 20;
  weaponType = 'single';
  spawnInterval = 90;
  levelTimer = 60 * 30;
  bannerTimer = 0;
  totalFrames = 0;
  gameOver = false;
  screenShake = 0;
  lastDir = { x: 1, y: 0 };
}

// --- BONUS CONCEPTS EXPLAINED ---

// 1. SPRITE ANIMATION
//    - Multiple frames stored in an array
//    - Frame index increases over time
//    - Creates illusion of movement

// 2. PARTICLE SYSTEMS
//    - Many small objects with physics
//    - Used for explosions, trails, effects
//    - Each particle has position, velocity, lifetime

// 3. SCREEN EFFECTS
//    - Screen shake: translate() the entire canvas randomly
//    - Glowing text: draw text multiple times with offset
//    - Parallax scrolling: background moves at different speed

// 4. IMAGE ROTATION
//    - push()/pop() save and restore drawing state
//    - translate() moves the origin point
//    - rotate() changes drawing angle

// --- STUDENT CHALLENGES ---
// 1. Add different enemy sprites for different levels
// 2. Create animated power-up effects
// 3. Add sound effects using p5.sound library
// 4. Create different background themes
// 5. Add player health with visual damage effects