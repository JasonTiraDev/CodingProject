// ================================================
// 🎵 Mini Survivors - BONUS DAY 5: Sound & Music
// ================================================
// Learning Goals for Bonus Day 5:
// - Loading and playing sound effects
// - Background music and audio loops
// - Dynamic audio based on game events
// - Audio feedback for player actions
// - Creating atmosphere with sound design
// ================================================

// --- Audio Variables ---
// Note: This requires the p5.sound library to be included
// Add this line to your HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>

let sounds = {
  shoot: null,
  enemyHit: null,
  playerHit: null,
  powerup: null,
  levelUp: null,
  backgroundMusic: null
};

let musicVolume = 0.3;
let sfxVolume = 0.7;

// --- All previous game variables from Day 4 ---
let playerImg, enemyImg, bulletImg, powerupImg, backgroundImg;
let playerFrames = [];
let particles = [];
let screenShake = 0;
let backgroundOffset = 0;

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

// --- STEP 1: Preload with Sound ---
function preload() {
  console.log("Loading images and sounds...");
  
  // Create visual assets (same as Day 4)
  createImageAssets();
  
  // In a real project, load actual sound files:
  // sounds.shoot = loadSound('assets/shoot.wav');
  // sounds.enemyHit = loadSound('assets/explosion.wav');
  // sounds.backgroundMusic = loadSound('assets/music.mp3');
  
  // For this tutorial, we'll create procedural sounds
  createProceduralSounds();
}

// --- STEP 2: Create Procedural Sounds ---
// This creates sounds programmatically using p5.sound
// In a real game, you'd use actual audio files
function createProceduralSounds() {
  // Create oscillators for different sounds
  sounds.shoot = createSimpleSound(800, 0.1, 'square');
  sounds.enemyHit = createSimpleSound(200, 0.3, 'sawtooth');
  sounds.powerup = createSimpleSound(600, 0.4, 'sine');
  sounds.levelUp = createSimpleSound(400, 0.8, 'triangle');
  
  // Create background music (simple ambient drone)
  sounds.backgroundMusic = createAmbientMusic();
  
  console.log("Procedural sounds created!");
}

function createSimpleSound(frequency, duration, waveType) {
  // This is a placeholder - in real p5.sound you'd use:
  // let osc = new p5.Oscillator(waveType);
  // osc.freq(frequency);
  // return osc;
  
  return {
    frequency: frequency,
    duration: duration,
    waveType: waveType,
    play: function() {
      console.log(`Playing ${this.waveType} sound at ${this.frequency}Hz for ${this.duration}s`);
      // In real implementation, this would actually play the sound
    }
  };
}

function createAmbientMusic() {
  return {
    playing: false,
    play: function() {
      if (!this.playing) {
        console.log("Starting background music...");
        this.playing = true;
      }
    },
    stop: function() {
      console.log("Stopping background music...");
      this.playing = false;
    }
  };
}

// --- STEP 3: Create Image Assets (same as Day 4) ---
function createImageAssets() {
  // Player animation frames
  for (let i = 0; i < 4; i++) {
    let frame = createGraphics(40, 40);
    frame.background(0, 0, 0, 0);
    frame.fill(0, 200, 255);
    frame.noStroke();
    frame.triangle(35, 20, 5, 10 + i, 5, 30 - i);
    frame.ellipse(15, 20, 8, 12);
    frame.fill(255, 100 + i * 30, 0, 150);
    frame.ellipse(5, 20, 6 + i, 8);
    playerFrames.push(frame);
  }
  
  // Enemy sprite
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
  
  // Bullet sprite
  bulletImg = createGraphics(12, 12);
  bulletImg.background(0, 0, 0, 0);
  bulletImg.fill(255, 255, 0);
  bulletImg.ellipse(6, 6, 8, 8);
  bulletImg.fill(255, 255, 200);
  bulletImg.ellipse(6, 6, 4, 4);
  
  // Power-up sprite
  powerupImg = createGraphics(20, 20);
  powerupImg.background(0, 0, 0, 0);
  powerupImg.fill(0, 255, 0);
  powerupImg.rect(2, 2, 16, 16);
  powerupImg.fill(255);
  powerupImg.textAlign(CENTER);
  powerupImg.textSize(12);
  powerupImg.text('P', 10, 14);
  
  // Background
  backgroundImg = createGraphics(width, height);
  backgroundImg.background(5, 5, 20);
  for (let i = 0; i < 200; i++) {
    let brightness = random(100, 255);
    backgroundImg.fill(brightness, brightness, brightness);
    backgroundImg.noStroke();
    backgroundImg.ellipse(random(width), random(height), random(1, 3), random(1, 3));
  }
  for (let i = 0; i < 50; i++) {
    backgroundImg.fill(random(100, 200), random(50, 150), random(150, 255), 30);
    backgroundImg.ellipse(random(width), random(height), random(20, 100), random(20, 100));
  }
}

// --- STEP 4: Setup with Audio ---
function setup() {
  createCanvas(600, 600);
  textSize(18);
  
  // Set master volume levels
  masterVolume(0.5);
  
  console.log("Bonus Day 5: Sound & Music ready!");
}

// --- STEP 5: Enhanced Draw with Audio Triggers ---
function draw() {
  // Screen shake
  if (screenShake > 0) {
    translate(random(-screenShake, screenShake), random(-screenShake, screenShake));
    screenShake *= 0.9;
  }
  
  // Scrolling background
  drawScrollingBackground();
  
  // Game state management
  if (onStartScreen) {
    drawAudioStartScreen();
    return;
  }
  if (!gameStarted) {
    drawAudioWeaponMenu();
    return;
  }
  if (gameOver) {
    sounds.backgroundMusic.stop();
    drawAudioGameOver();
    return;
  }
  
  // Start background music when game begins
  if (gameStarted && !sounds.backgroundMusic.playing) {
    sounds.backgroundMusic.play();
  }
  
  // Game logic
  totalFrames++;
  levelTimer--;
  
  // Level up with sound
  if (levelTimer <= 0) {
    level++;
    levelTimer = 60 * 30;
    if (spawnInterval > 20) spawnInterval -= 5;
    speed *= 1.02;
    bannerTimer = 120;
    screenShake = 10;
    
    // Play level up sound
    sounds.levelUp.play();
    console.log("Level up sound played!");
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
  
  // Draw animated player
  push();
  translate(player.x, player.y);
  if (lastDir.x !== 0 || lastDir.y !== 0) {
    rotate(atan2(lastDir.y, lastDir.x));
  }
  player.frame = (player.frame + 0.2) % playerFrames.length;
  image(playerFrames[floor(player.frame)], -20, -20);
  pop();
  
  // Spawning
  if (frameCount % spawnInterval === 0) {
    enemies.push(createAdvancedEnemy());
  }
  if (frameCount % 900 === 0) {
    powerups.push(createPowerUp());
  }
  
  // Shooting with sound
  if (weaponType === 'spread') {
    if (frameCount % spreadFireRate === 0) {
      fireWeaponsWithSound();
    }
  } else if (frameCount % fireRate === 0) {
    fireWeaponsWithSound();
  }
  
  // Update bullets
  for (let bullet of bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    
    push();
    translate(bullet.x, bullet.y);
    rotate(atan2(bullet.vy, bullet.vx));
    image(bulletImg, -6, -6);
    
    // Audio-reactive trail (changes with music)
    let trailIntensity = 100 + sin(frameCount * 0.1) * 50;
    fill(255, 255, 0, trailIntensity);
    ellipse(-10, 0, 4, 2);
    pop();
  }
  bullets = bullets.filter(b => b.x > 0 && b.x < width && b.y > 0 && b.y < height);
  
  // Update orbitals
  if (weaponType === 'orbital' || orbitals.length > 0) {
    updateAudioOrbitals();
  }
  
  // Update enemies
  for (let enemy of enemies) {
    enemy.x += (player.x - enemy.x) * 0.01 * enemy.speed;
    enemy.y += (player.y - enemy.y) * 0.01 * enemy.speed;
    
    push();
    translate(enemy.x, enemy.y);
    rotate(frameCount * 0.02 + enemy.x * 0.01);
    image(enemyImg, -15, -15);
    pop();
    
    // Player collision with sound
    if (dist(enemy.x, enemy.y, player.x, player.y) < player.r + enemy.r) {
      gameOver = true;
      sounds.playerHit.play();
      createExplosion(player.x, player.y, 20);
    }
  }
  
  // Update power-ups with audio feedback
  for (let powerup of powerups) {
    powerup.floatOffset = (powerup.floatOffset || 0) + 0.1;
    let floatY = powerup.y + sin(powerup.floatOffset) * 3;
    
    push();
    translate(powerup.x, floatY);
    
    // Audio-reactive rotation
    let musicRotation = frameCount * 0.05 + sin(frameCount * 0.2) * 0.5;
    rotate(musicRotation);
    image(powerupImg, -10, -10);
    
    // Pulsing glow with "beat"
    let glowSize = 30 + sin(frameCount * 0.3) * 5;
    fill(0, 255, 0, 50);
    ellipse(0, 0, glowSize, glowSize);
    pop();
    
    if (dist(player.x, player.y, powerup.x, powerup.y) < player.r + 10) {
      weaponType = powerup.type;
      if (powerup.type === 'orbital') initOrbitals();
      powerup.collected = true;
      sounds.powerup.play(); // Power-up sound
      createExplosion(powerup.x, powerup.y, 5);
    }
  }
  powerups = powerups.filter(p => !p.collected);
  
  // Collision detection with sound
  for (let bullet of bullets) {
    for (let enemy of enemies) {
      if (dist(bullet.x, bullet.y, enemy.x, enemy.y) < bullet.r + enemy.r) {
        bullet.dead = true;
        enemy.dead = true;
        xp++;
        sounds.enemyHit.play(); // Enemy hit sound
        createExplosion(enemy.x, enemy.y, 8);
        screenShake = 3;
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
  
  // Enhanced HUD with audio visualizer
  drawAudioHUD();
  
  if (bannerTimer > 0) {
    drawEnhancedLevelBanner();
    bannerTimer--;
  }
}

// --- STEP 6: Audio-Enhanced Functions ---

function fireWeaponsWithSound() {
  // Play shooting sound
  sounds.shoot.play();
  
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

function updateAudioOrbitals() {
  for (let orbital of orbitals) {
    orbital.angle += 2;
    let rad = radians(orbital.angle);
    let ox = player.x + cos(rad) * orbital.dist;
    let oy = player.y + sin(rad) * orbital.dist;
    
    // Audio-reactive orbital size
    let audioSize = 15 + sin(frameCount * 0.4) * 3;
    
    fill(255, 150, 0, 100);
    ellipse(ox, oy, audioSize + 10, audioSize + 10);
    fill(255, 200, 0);
    ellipse(ox, oy, audioSize, audioSize);
    fill(255, 255, 200);
    ellipse(ox, oy, audioSize - 7, audioSize - 7);
    
    // Check collision
    for (let enemy of enemies) {
      if (dist(ox, oy, enemy.x, enemy.y) < 15 + enemy.r) {
        enemy.dead = true;
        xp++;
        sounds.enemyHit.play();
        createExplosion(enemy.x, enemy.y, 6);
      }
    }
  }
}

function drawAudioHUD() {
  // Semi-transparent HUD with audio visualizer bars
  fill(0, 0, 0, 120);
  rect(0, 0, width, 80);
  rect(0, height - 50, width, 50);
  
  // Draw fake audio visualizer bars
  for (let i = 0; i < 20; i++) {
    let barHeight = random(5, 25) + sin(frameCount * 0.2 + i) * 10;
    fill(0, 255 - i * 10, 255, 150);
    rect(width - 150 + i * 6, 55 - barHeight, 4, barHeight);
  }
  
  // Enhanced text with glow
  drawGlowText('XP: ' + xp, 15, 25, 'cyan');
  drawGlowText('Level: ' + level, width - 250, 25, 'yellow');
  drawGlowText('Weapon: ' + weaponType, 15, 50, 'orange');
  drawGlowText('♪ Audio: ON', width - 100, height - 30, 'lime');
  
  // Animated progress bar with audio pulse
  let progress = (60 * 30 - levelTimer) / (60 * 30);
  let pulseSize = 2 + sin(frameCount * 0.5);
  fill(0, 100, 255, 150);
  rect(15, height - 35, progress * 200, 15 + pulseSize);
  fill(0, 200, 255);
  rect(15, height - 35, progress * 200, 8);
  
  drawGlowText('Next Level: ' + floor(progress * 100) + '%', 15, height - 15, 'cyan');
}

// --- Audio-Enhanced Screen Functions ---

function drawAudioStartScreen() {
  // Animated background with audio visualization
  for (let i = 0; i < 50; i++) {
    let x = (frameCount * 2 + i * 50) % (width + 100) - 50;
    let y = 50 + i * 10;
    let audioSize = 5 + sin(frameCount * 0.1 + i) * 2;
    fill(0, 100, 255, 100);
    ellipse(x, y, audioSize, audioSize);
  }
  
  textAlign(CENTER);
  
  // Pulsing title
  let titleSize = 28 + sin(frameCount * 0.1) * 4;
  textSize(titleSize);
  drawGlowText('🎵 MINI SURVIVORS: AUDIO EDITION 🎵', width / 2, height / 2 - 120, 'cyan');
  
  textSize(18);
  fill(255);
  text('Complete with Sound Effects & Music!', width / 2, height / 2 - 80);
  text('• Dynamic shooting sounds', width / 2, height / 2 - 50);
  text('• Explosion audio feedback', width / 2, height / 2 - 25);
  text('• Background music', width / 2, height / 2);
  text('• Audio-reactive visuals', width / 2, height / 2 + 25);
  
  // Pulsing enter button
  let enterBrightness = 150 + sin(frameCount * 0.2) * 100;
  fill(255, 255, enterBrightness);
  text('Press ENTER to start the audio experience!', width / 2, height / 2 + 70);
  textAlign(LEFT);
}

function drawAudioWeaponMenu() {
  textAlign(CENTER);
  drawGlowText('🔊 Audio-Enhanced Weapons! 🔊', width / 2, height / 2 - 50, 'orange');
  
  fill(255);
  textSize(16);
  text('Each weapon has unique sound effects:', width / 2, height / 2 - 10);
  text('Single Shot: Classic pew-pew!', width / 2, height / 2 + 15);
  text('Spread: Rapid-fire burst sounds', width / 2, height / 2 + 35);
  text('Orbital: Continuous energy hum', width / 2, height / 2 + 55);
  
  drawGlowText('Press ENTER to launch with sound!', width / 2, height / 2 + 90, 'cyan');
  textAlign(LEFT);
}

function drawAudioGameOver() {
  // Audio-reactive game over screen
  fill(255, 0, 0, 200);
  rect(0, 0, width, height);
  
  textAlign(CENTER);
  let shakeText = random(-2, 2);
  drawGlowText('💥 GAME OVER 💥', width / 2 + shakeText, height / 2 - 50, 'red');
  
  fill(255);
  textSize(18);
  text('Final Audio Statistics:', width / 2, height / 2 - 10);
  text('Level: ' + level + ' | XP: ' + xp, width / 2, height / 2 + 15);
  text('Sounds Played: ~' + (totalFrames / 10), width / 2, height / 2 + 40);
  text('Music Duration: ' + floor(totalFrames / 60) + ' seconds', width / 2, height / 2 + 65);
  
  drawGlowText('Press SPACE to restart the symphony!', width / 2, height / 2 + 100, 'yellow');
  textAlign(LEFT);
}

// --- Volume Control Functions ---
function keyPressed() {
  // Regular game controls
  if (onStartScreen && keyCode === ENTER) {
    onStartScreen = false;
    return;
  }
  if (!gameStarted && !onStartScreen) {
    if (keyCode === ENTER) gameStarted = true;
  } else if (gameOver && key === ' ') {
    restartGame();
  }
  
  // Audio controls
  if (key === 'M' || key === 'm') {
    // Toggle music
    if (sounds.backgroundMusic.playing) {
      sounds.backgroundMusic.stop();
      console.log("Music muted");
    } else {
      sounds.backgroundMusic.play();
      console.log("Music unmuted");
    }
  }
  
  if (key === '+' || key === '=') {
    // Increase volume
    sfxVolume = constrain(sfxVolume + 0.1, 0, 1);
    console.log("Volume increased to:", sfxVolume);
  }
  
  if (key === '-' || key === '_') {
    // Decrease volume
    sfxVolume = constrain(sfxVolume - 0.1, 0, 1);
    console.log("Volume decreased to:", sfxVolume);
  }
}

// --- Same helper functions as previous days ---
function drawScrollingBackground() {
  backgroundOffset += 0.5;
  push();
  translate(0, backgroundOffset % height);
  image(backgroundImg, 0, -height);
  image(backgroundImg, 0, 0);
  pop();
}

function createExplosion(x, y, size) {
  for (let i = 0; i < size; i++) {
    particles.push({
      x: x, y: y,
      vx: random(-3, 3), vy: random(-3, 3),
      life: 30, maxLife: 30,
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
    
    let alpha = map(p.life, 0, p.maxLife, 0, 255);
    fill(p.color + hex(floor(alpha), 2));
    noStroke();
    ellipse(p.x, p.y, p.size * (p.life / p.maxLife));
  }
  particles = particles.filter(p => p.life > 0);
}

function drawGlowText(txt, x, y, col) {
  fill(col);
  for (let i = 0; i < 3; i++) {
    text(txt, x + i, y + i);
    text(txt, x - i, y - i);
    text(txt, x + i, y - i);
    text(txt, x - i, y + i);
  }
  fill(255);
  text(txt, x, y);
}

function drawEnhancedLevelBanner() {
  fill(0, 0, 0, 200);
  rect(0, height / 2 - 60, width, 120);
  
  textAlign(CENTER);
  drawGlowText('🎶 LEVEL ' + level + ' 🎶', width / 2, height / 2 - 20, 'gold');
  fill(255);
  text('The beat drops harder!', width / 2, height / 2 + 10);
  textAlign(LEFT);
}

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
  return {
    x: random(50, width - 50),
    y: random(50, height - 50),
    type: random(['spread', 'orbital']),
    collected: false
  };
}

function initOrbitals() {
  orbitals = [
    { angle: 0, dist: 60 },
    { angle: 120, dist: 60 },
    { angle: 240, dist: 60 }
  ];
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
  
  // Reset audio
  sounds.backgroundMusic.stop();
}

// --- AUDIO CONCEPTS EXPLAINED ---

// 1. SOUND LOADING
//    - preload() ensures sounds load before game starts
//    - loadSound() in p5.sound library loads audio files
//    - Different formats: .wav, .mp3, .ogg

// 2. SOUND TRIGGERS
//    - Play sounds when specific events happen
//    - shooting, explosions, power-ups, level up
//    - Provides immediate feedback to player actions

// 3. BACKGROUND MUSIC
//    - Loop() makes music repeat continuously
//    - setVolume() controls loudness
//    - Can stop/start music based on game state

// 4. AUDIO-REACTIVE VISUALS
//    - Use sound amplitude to change visual elements
//    - Pulsing effects, size changes, color shifts
//    - Creates connection between audio and visuals

// 5. VOLUME CONTROL
//    - masterVolume() sets overall game volume
//    - Individual sound volumes can be controlled
//    - Players should be able to mute/adjust

// --- REAL IMPLEMENTATION NOTES ---
// To use actual audio files, you need:
// 1. Include p5.sound library in HTML
// 2. Have audio files in assets folder
// 3. Use loadSound() in preload()
// 4. Use .play(), .loop(), .stop() methods

// --- STUDENT CHALLENGES ---
// 1. Add different sound effects for each weapon type
// 2. Create dynamic music that changes with level
// 3. Add footstep sounds when player moves
// 4. Implement 3D positioned audio (sounds from left/right)
// 5. Create a full audio options menu
// 6. Add voice acting or narration
// 7. Make visuals react to actual audio analysis