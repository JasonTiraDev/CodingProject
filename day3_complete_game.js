// ================================================
// 🎮 Mini Survivors - DAY 3: Complete Game
// ================================================
// Learning Goals for Day 3:
// - Advanced game mechanics (power-ups, weapon systems)
// - Progressive difficulty and level systems
// - Complex object interactions
// - Game balancing and polish
// - Code organization and structure
// ================================================

// --- STEP 1: Core Variables (Built from Days 1 & 2) ---
let player = { x: 300, y: 300, r: 20 };
let enemies = [];
let bullets = [];

// --- STEP 2: New Advanced Variables for Day 3 ---
let orbitals = [];    // Special spinning weapons around player
let powerups = [];    // Items player can collect for upgrades

// Advanced game statistics
let xp = 0;           // Experience points (gained by defeating enemies)
let level = 1;        // Current difficulty level
let speed = 4;        // Player movement speed
let fireRate = 20;    // Normal shooting speed
let spreadFireRate = 40; // Slower fire rate for spread weapon

// Weapon system
let weaponType = 'single'; // Current weapon: 'single', 'spread', or 'orbital'

// Game timing and difficulty
let spawnInterval = 90;    // How often enemies spawn
let levelTimer = 60 * 30;  // Time until next level (30 seconds)
let bannerTimer = 0;       // How long to show "LEVEL UP!" message
let totalFrames = 0;       // Total frames since game started

// Game states
let onStartScreen = true;
let gameStarted = false;
let gameOver = false;

// Player direction for aiming
let lastDir = { x: 1, y: 0 };

// --- STEP 3: Setup Function ---
function setup() {
  createCanvas(600, 600);
  textSize(18);
  console.log("Day 3: Complete Mini Survivors ready!");
}

// --- STEP 4: Main Game Loop ---
function draw() {
  background(15);
  
  // --- Game State Management ---
  if (onStartScreen) {
    drawStartScreen();
    return;
  }
  if (!gameStarted) {
    drawWeaponMenu();
    return;
  }
  if (gameOver) {
    drawGameOver();
    return;
  }
  
  // --- Game is running - update counters ---
  totalFrames++;
  levelTimer--;
  
  // --- STEP 5: Level Up System ---
  // When timer reaches zero, increase difficulty!
  if (levelTimer <= 0) {
    level++;
    levelTimer = 60 * 30; // Reset timer
    
    // Make game progressively harder
    if (spawnInterval > 20) spawnInterval -= 5; // Enemies spawn faster
    speed *= 1.02; // Player (and enemies) move slightly faster
    bannerTimer = 120; // Show "LEVEL UP!" for 2 seconds
    
    console.log("LEVEL UP! Now level " + level);
  }
  
  // --- STEP 6: Enhanced Player Movement ---
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
  
  // Keep player on screen
  player.x = constrain(player.x, player.r, width - player.r);
  player.y = constrain(player.y, player.r, height - player.r);
  
  // Draw player
  fill('cyan');
  circle(player.x, player.y, player.r * 2);
  
  // --- STEP 7: Advanced Spawning System ---
  // Spawn enemies
  if (frameCount % spawnInterval === 0) {
    enemies.push(createAdvancedEnemy());
  }
  
  // Spawn power-ups every 15 seconds (900 frames)
  if (frameCount % 900 === 0) {
    powerups.push(createPowerUp());
  }
  
  // --- STEP 8: Weapon System ---
  // Different weapons have different fire rates
  if (weaponType === 'spread') {
    if (frameCount % spreadFireRate === 0) fireWeapons();
  } else if (frameCount % fireRate === 0) {
    fireWeapons();
  }
  
  // --- STEP 9: Update Bullets ---
  fill('yellow');
  for (let bullet of bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    circle(bullet.x, bullet.y, bullet.r * 2);
  }
  bullets = bullets.filter(b => b.x > 0 && b.x < width && b.y > 0 && b.y < height);
  
  // --- STEP 10: Update Orbital Weapons ---
  if (weaponType === 'orbital' || orbitals.length > 0) {
    updateOrbitals();
  }
  
  // --- STEP 11: Update Enemies ---
  fill('red');
  for (let enemy of enemies) {
    // Smarter enemy AI - they home in on player
    enemy.x += (player.x - enemy.x) * 0.01 * enemy.speed;
    enemy.y += (player.y - enemy.y) * 0.01 * enemy.speed;
    circle(enemy.x, enemy.y, enemy.r * 2);
    
    // Check collision with player
    if (dist(enemy.x, enemy.y, player.x, player.y) < player.r + enemy.r) {
      gameOver = true;
      console.log("Game Over! Final level: " + level + ", XP: " + xp);
    }
  }
  
  // --- STEP 12: Update Power-ups ---
  for (let powerup of powerups) {
    // Draw power-up as a colored square
    if (powerup.type === 'spread') fill('orange');
    else if (powerup.type === 'orbital') fill('purple');
    else fill('lime');
    
    rect(powerup.x - 10, powerup.y - 10, 20, 20);
    
    // Check if player collected it
    if (dist(player.x, player.y, powerup.x, powerup.y) < player.r + 10) {
      weaponType = powerup.type;
      if (powerup.type === 'orbital') initOrbitals();
      powerup.collected = true;
      console.log("Power-up collected! New weapon: " + weaponType);
    }
  }
  powerups = powerups.filter(p => !p.collected);
  
  // --- STEP 13: Collision Detection ---
  // Bullet vs Enemy
  for (let bullet of bullets) {
    for (let enemy of enemies) {
      if (dist(bullet.x, bullet.y, enemy.x, enemy.y) < bullet.r + enemy.r) {
        bullet.dead = true;
        enemy.dead = true;
        xp++;
      }
    }
  }
  bullets = bullets.filter(b => !b.dead);
  enemies = enemies.filter(e => !e.dead);
  
  // --- STEP 14: XP Upgrade System ---
  // As player gains XP, they get permanent upgrades
  if (xp === 10) fireRate = 15;  // Faster shooting at 10 XP
  if (xp === 20) fireRate = 10;  // Even faster at 20 XP
  if (xp === 30) fireRate = 8;   // Maximum fire rate at 30 XP
  
  // --- STEP 15: HUD (Heads-Up Display) ---
  fill(255);
  text('XP: ' + xp, 10, 25);
  text('Level: ' + level, width - 100, 25);
  text('Weapon: ' + weaponType, 10, 50);
  text('Time: ' + floor(totalFrames / 60) + 's', width - 120, 50);
  text('Enemies: ' + enemies.length, 10, 75);
  
  // Progress bar for next level
  let progress = (60 * 30 - levelTimer) / (60 * 30);
  fill('green');
  rect(10, height - 30, progress * 200, 10);
  fill(255);
  text('Next Level: ' + floor(progress * 100) + '%', 10, height - 35);
  
  // --- STEP 16: Level Up Banner ---
  if (bannerTimer > 0) {
    drawLevelBanner();
    bannerTimer--;
  }
}

// --- STEP 17: Advanced Helper Functions ---

// Creates enemies with scaling difficulty
function createAdvancedEnemy() {
  let side = floor(random(4));
  let x, y;
  
  if (side === 0) { x = random(width); y = -20; }
  else if (side === 1) { x = random(width); y = height + 20; }
  else if (side === 2) { x = -20; y = random(height); }
  else { x = width + 20; y = random(height); }
  
  return {
    x: x,
    y: y,
    r: 15,
    // Enemy speed increases with level for added challenge
    speed: random(0.5, 1.2) * (1 + level * 0.05),
    dead: false
  };
}

// Creates random power-ups
function createPowerUp() {
  let types = ['spread', 'orbital'];
  return {
    x: random(50, width - 50),
    y: random(50, height - 50),
    type: random(types),
    collected: false
  };
}

// Advanced weapon firing system
function fireWeapons() {
  let bulletSpeed = 6;
  let vx = lastDir.x * bulletSpeed;
  let vy = lastDir.y * bulletSpeed;
  
  // Default direction if player hasn't moved
  if (vx === 0 && vy === 0) vx = bulletSpeed;
  
  if (weaponType === 'single') {
    // Single bullet
    bullets.push({
      x: player.x, y: player.y,
      vx: vx, vy: vy,
      r: 5, dead: false
    });
  } else if (weaponType === 'spread') {
    // Three bullets in a spread pattern
    bullets.push({ x: player.x, y: player.y, vx: vx, vy: vy, r: 5, dead: false });
    bullets.push({ x: player.x, y: player.y, vx: vx + 1, vy: vy + 1, r: 5, dead: false });
    bullets.push({ x: player.x, y: player.y, vx: vx - 1, vy: vy - 1, r: 5, dead: false });
  }
  // Orbital weapons don't use bullets - they have their own system
}

// Initialize orbital weapons
function initOrbitals() {
  orbitals = [
    { angle: 0, dist: 60 },      // First orbital
    { angle: 120, dist: 60 },    // Second orbital (120 degrees apart)
    { angle: 240, dist: 60 }     // Third orbital (240 degrees apart)
  ];
}

// Update orbital weapon system
function updateOrbitals() {
  fill('orange');
  for (let orbital of orbitals) {
    orbital.angle += 2; // Spin speed
    
    // Convert angle to radians for trigonometry
    let rad = radians(orbital.angle);
    
    // Calculate orbital position using trigonometry
    let ox = player.x + cos(rad) * orbital.dist;
    let oy = player.y + sin(rad) * orbital.dist;
    
    circle(ox, oy, 15);
    
    // Check collision with enemies
    for (let enemy of enemies) {
      if (dist(ox, oy, enemy.x, enemy.y) < 15 + enemy.r) {
        enemy.dead = true;
        xp++;
      }
    }
  }
}

// --- STEP 18: Screen Drawing Functions ---

function drawStartScreen() {
  textAlign(CENTER);
  fill('white');
  textSize(28);
  text('🧨 MINI SURVIVORS - DAY 3 🧨', width / 2, height / 2 - 120);
  textSize(18);
  text('Complete Game with All Features!', width / 2, height / 2 - 80);
  
  fill('yellow');
  text('New Features Today:', width / 2, height / 2 - 50);
  fill('white');
  text('• Multiple weapon types', width / 2, height / 2 - 25);
  text('• Progressive difficulty levels', width / 2, height / 2);
  text('• Power-up collection system', width / 2, height / 2 + 25);
  text('• Experience and upgrades', width / 2, height / 2 + 50);
  
  fill('cyan');
  text('Press ENTER to begin!', width / 2, height / 2 + 90);
  textAlign(LEFT);
}

function drawWeaponMenu() {
  textAlign(CENTER);
  fill('white');
  textSize(24);
  text('Starting Weapon: Single Shot', width / 2, height / 2 - 20);
  textSize(18);
  text('(Collect power-ups during the game for upgrades!)', width / 2, height / 2 + 20);
  
  fill('orange');
  text('🟧 Spread Shot: Fires 3 bullets at once', width / 2, height / 2 + 60);
  fill('purple');
  text('🟪 Orbital: 3 spinning shields that destroy enemies', width / 2, height / 2 + 85);
  
  fill('cyan');
  text('Press ENTER to start the survival!', width / 2, height / 2 + 120);
  textAlign(LEFT);
}

function drawGameOver() {
  textAlign(CENTER);
  fill('red');
  textSize(32);
  text('GAME OVER', width / 2, height / 2 - 50);
  
  fill('white');
  textSize(18);
  text('Final Statistics:', width / 2, height / 2 - 10);
  text('Level Reached: ' + level, width / 2, height / 2 + 15);
  text('XP Earned: ' + xp, width / 2, height / 2 + 40);
  text('Time Survived: ' + floor(totalFrames / 60) + ' seconds', width / 2, height / 2 + 65);
  
  fill('cyan');
  text('Press SPACE to restart', width / 2, height / 2 + 100);
  textAlign(LEFT);
}

function drawLevelBanner() {
  // Semi-transparent background
  fill(0, 0, 0, 150);
  rect(0, height / 2 - 40, width, 80);
  
  // Level up text
  textAlign(CENTER);
  fill('yellow');
  textSize(36);
  text('LEVEL ' + level, width / 2, height / 2 + 10);
  textAlign(LEFT);
}

// --- STEP 19: Input Handling ---
function keyPressed() {
  if (onStartScreen && keyCode === ENTER) {
    onStartScreen = false;
    console.log("Moved to weapon menu");
    return;
  }
  
  if (!gameStarted && !onStartScreen) {
    if (keyCode === ENTER) {
      gameStarted = true;
      console.log("Day 3 complete game started!");
    }
  } else if (gameOver && key === ' ') {
    restartGame();
  }
}

// Complete game restart function
function restartGame() {
  // Reset player
  player = { x: 300, y: 300, r: 20 };
  
  // Clear all arrays
  enemies = [];
  bullets = [];
  orbitals = [];
  powerups = [];
  
  // Reset all game variables
  xp = 0;
  level = 1;
  speed = 4;
  fireRate = 20;
  spreadFireRate = 40;
  weaponType = 'single';
  spawnInterval = 90;
  levelTimer = 60 * 30;
  bannerTimer = 0;
  totalFrames = 0;
  gameOver = false;
  lastDir = { x: 1, y: 0 };
  
  console.log("Complete game restarted!");
}

// --- ADVANCED PROGRAMMING CONCEPTS DEMONSTRATED ---

// 1. OBJECT-ORIENTED THINKING
//    - Player, enemies, bullets, orbitals are all objects with properties
//    - Each object type has specific behaviors and interactions

// 2. STATE MANAGEMENT
//    - Game has multiple states (start screen, menu, playing, game over)
//    - State determines what code runs and what is displayed

// 3. PROGRESSIVE SYSTEMS
//    - Difficulty scales with time (level system)
//    - Player power grows with experience (XP upgrades)
//    - Weapon variety adds strategic depth

// 4. COLLISION DETECTION ALGORITHMS
//    - Circle-to-circle collision using distance formula
//    - Efficient filtering to remove "dead" objects

// 5. TRIGONOMETRY IN GAMES
//    - Orbital weapons use cos() and sin() for circular motion
//    - Angle conversion from degrees to radians

// 6. ARRAY MANIPULATION
//    - Adding elements with push()
//    - Removing elements with filter()
//    - Iterating with for...of loops

// --- DISCUSSION QUESTIONS FOR STUDENTS ---
// 1. How does the progressive difficulty system work?
// 2. What makes the orbital weapon different from bullets?
// 3. How could you add a new weapon type?
// 4. What would happen if enemies got smarter AI?
// 5. How could you balance the game to be more/less challenging?

// --- FINAL CHALLENGES FOR ADVANCED STUDENTS ---
// 1. Add boss enemies that appear every 5 levels
// 2. Create a shop system where XP can be spent on upgrades
// 3. Add different enemy types with unique behaviors
// 4. Implement a save/load system for high scores
// 5. Add particle effects for explosions and impacts
// 6. Create multiple levels/arenas with different layouts

// --- WHAT STUDENTS HAVE LEARNED ACROSS 3 DAYS ---
// Day 1: Game loops, coordinates, input handling, basic drawing
// Day 2: Arrays, collision detection, object management, game states
// Day 3: Advanced systems, game balance, complex interactions, polish

// This progression teaches fundamental game development concepts
// that apply to any programming language or game engine!