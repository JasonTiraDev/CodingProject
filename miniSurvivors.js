// ================================================
// ⚔️ Mini Survivors: Endless Mode + Progressive Difficulty + Start With Single Shot
// ================================================
// - Game runs endlessly, gets harder over time
// - Player always starts with single shot
// - Level system increases spawn rate and speed
// ================================================

// --- Global Variables: The Game's Brain ---
// We store all the important information for our game in these variables.
// It's like the game's memory.

// The 'player' is an object. It holds the player's X/Y position and radius (size).
let player = { x: 300, y: 300, r: 20 };

// These are arrays, which are like lists. They will hold all the enemies,
// bullets, and orbitals currently in the game.
let enemies = [];
let bullets = [];
let orbitals = [];
let powerups = [];

// Game state and stats
let xp = 0; // Experience points collected from defeating enemies.
let speed = 4; // How fast the player can move.
let fireRate = 20; // How often we fire. A lower number means faster shooting!
let spreadFireRate = 40; // A separate, slower fire rate for the spread weapon.
let weaponType = 'single'; // What weapon the player has. Always starts with 'single'.
let spawnInterval = 90; // How often a new enemy appears. Lower is more frequent.
let level = 1; // The current difficulty level.
let totalFrames = 0; // A counter for every frame that has passed, used for the timer.

// Timers
// These act like countdown clocks for game events.
let levelTimer = 60 * 30; // 60 frames per second * 30 seconds = level up every 30s.
let bannerTimer = 0; // How long to show the "LEVEL UP!" banner.

// Booleans: These are like on/off switches.
let onStartScreen = true; // Are we on the very first screen?
let gameStarted = false; // Has the player started the main game yet?
let gameOver = false; // Is the game over?

// Other helpful variables
let lastDir = { x: 1, y: 0 }; // Remembers the last direction the player moved, for aiming.


// --- The setup() function ---
// This function runs only ONE time, right at the very beginning of the game.
// It's used to set up our game world.
function setup() {
  // createCanvas tells p5.js to create a drawing area for us.
  createCanvas(600, 600);
  // Sets the default font size for any text we draw.
  textSize(18);
}


// --- The draw() function ---
// This is the heart of the game! The code inside draw() runs in a loop,
// about 60 times every second. This is what makes the game animated.
function draw() {
  // Clear the screen with a dark grey color on every frame to prevent old drawings
  // from smearing across the screen.
  background(15);

  // --- Game State Manager ---
  // These 'if' statements check the state of the game and decide what to draw.
  // It's like a traffic cop directing what should be on the screen.
  if (onStartScreen) {
    drawStartScreen();
    return; // 'return' stops the draw() function here so we don't run game logic.
  }
  if (!gameStarted) {
    drawMenu();
    return;
  }
  if (gameOver) {
    drawGameOver();
    return;
  }

  // --- Timers and Counters ---
  // If the game is running, we update our counters on every frame.
  totalFrames++; // Increment the total frame count.
  levelTimer--; // Countdown the level timer.

  // --- Level Up Logic ---
  // When the level timer reaches zero, it's time to level up!
  if (levelTimer <= 0) {
    level++; // Increase the level number.
    levelTimer = 60 * 30; // Reset the timer for the next level up.
    
    // Make the game harder!
    if (spawnInterval > 20) spawnInterval -= 5; // Make enemies spawn faster.
    speed *= 1.02; // Increase player AND enemy speed slightly.
    bannerTimer = 120; // Set the banner timer to show the "LEVEL UP" message for 2 seconds (120 frames).
  }

  // --- Player Movement ---
  // Check if the arrow keys are being held down.
  if (keyIsDown(LEFT_ARROW)) { player.x -= speed; lastDir = {x: -1, y: 0}; }
  if (keyIsDown(RIGHT_ARROW)) { player.x += speed; lastDir = {x: 1, y: 0}; }
  if (keyIsDown(UP_ARROW)) { player.y -= speed; lastDir = {x: 0, y: -1}; }
  if (keyIsDown(DOWN_ARROW)) { player.y += speed; lastDir = {x: 0, y: 1}; }
  
  // Keep the player from going off the screen.
  player.x = constrain(player.x, player.r, width - player.r);
  player.y = constrain(player.y, player.r, height - player.r);
  
  // Draw the player on the screen.
  fill('cyan');
  circle(player.x, player.y, player.r * 2);

  // --- Spawning Logic ---
  // We use the modulo operator (%) to check for remainders.
  // `frameCount % spawnInterval === 0` is true only when the frameCount is
  // perfectly divisible by the spawnInterval. It's a great way to time events.
  if (frameCount % spawnInterval === 0) enemies.push(randomEnemySpawn());

  // Spawn a powerup every 900 frames (about 15 seconds).
  if (frameCount % 900 === 0) {
    powerups.push({ x: random(50, width-50), y: random(50, height-50), type: random(['spread', 'orbital']) });
  }

  // --- Auto Firing Logic ---
  // The player shoots automatically based on the weapon type and fire rate.
  if (weaponType === 'spread') {
    if (frameCount % spreadFireRate === 0) fireWeapons();
  } else if (frameCount % fireRate === 0) {
    fireWeapons();
  }

  // --- Update Bullets ---
  fill('yellow');
  // This 'for loop' goes through every bullet in our 'bullets' list.
  for (let b of bullets) {
    // Move the bullet based on its velocity (vx, vy).
    b.x += b.vx;
    b.y += b.vy;
    // Draw the bullet.
    circle(b.x, b.y, b.r * 2);
  }
  // This 'filter' function creates a NEW array, keeping only the bullets
  // that are still on the screen. This is how we remove old bullets.
  bullets = bullets.filter(b => b.x > 0 && b.x < width && b.y > 0 && b.y < height);

  // --- Update Orbitals ---
  // If we have the orbital weapon, or already have orbitals, update them.
  if (weaponType === 'orbital' || orbitals.length > 0) updateOrbitals();

  // --- Update Enemies ---
  fill('red');
  for (let e of enemies) {
    // Simple "homing" logic: move the enemy a tiny bit towards the player's position.
    e.x += (player.x - e.x) * 0.01 * e.speed;
    e.y += (player.y - e.y) * 0.01 * e.speed;
    circle(e.x, e.y, e.r * 2);
    
    // Check if an enemy has hit the player.
    if (dist(e.x, e.y, player.x, player.y) < player.r + e.r) {
      gameOver = true; // If they touch, it's game over!
    }
  }

  // --- Update Powerups ---
  for (let p of powerups) {
    fill('lime'); // Green color for powerups.
    rect(p.x - 10, p.y - 10, 20, 20); // Draw a square for the powerup.
    
    // Check if the player has collected the powerup.
    if (dist(player.x, player.y, p.x, p.y) < player.r + 10) {
      weaponType = p.type; // Change the player's weapon.
      if (p.type === 'orbital') initOrbitals(); // If it's orbital, create them.
      p.collected = true; // Mark the powerup as collected so we can remove it.
    }
  }
  // Filter out any collected powerups.
  powerups = powerups.filter(p => !p.collected);

  // --- Collision Detection ---
  // This is a "nested loop". For every bullet, we check every enemy.
  for (let b of bullets) {
    for (let e of enemies) {
      // If a bullet and an enemy are touching...
      if (dist(b.x, b.y, e.x, e.y) < b.r + e.r) {
        // Mark both as 'dead'. We don't remove them here because it can
        // cause problems inside a loop.
        b.dead = true;
        e.dead = true;
        xp++; // Give the player one experience point.
      }
    }
  }
  // Now, we safely remove all the 'dead' bullets and enemies by filtering our arrays.
  bullets = bullets.filter(b => !b.dead);
  enemies = enemies.filter(e => !e.dead);

  // --- XP Upgrades ---
  // When the player gets enough XP, reward them with a faster fire rate!
  if (xp === 10) fireRate = 15;
  if (xp === 20) fireRate = 10;

  // --- HUD (Heads-Up Display) ---
  // Draw all the game information on the screen for the player.
  fill(255); // White text.
  text('XP: ' + xp, 10, 25);
  text('Level: ' + level, width - 100, 25);
  text('Weapon: ' + weaponType, 10, 50);
  text('Time: ' + floor(totalFrames / 60) + 's', width - 120, 50);

  // --- Level Banner ---
  // If the banner timer is greater than 0, draw the banner and count down.
  if (bannerTimer > 0) {
    drawLevelBanner();
    bannerTimer--;
  }
}

// --- Helper Functions ---
// We break our code into smaller functions to keep it organized and readable.

// Draws the "LEVEL UP" banner in the middle of the screen.
function drawLevelBanner() {
  fill(0, 0, 0, 150); // Semi-transparent black rectangle.
  rect(0, height/2 - 40, width, 80);
  textAlign(CENTER); // Center the text.
  fill('yellow');
  textSize(36);
  text('LEVEL ' + level, width / 2, height / 2 + 10);
  textAlign(LEFT); // Reset text alignment for the HUD.
}

// Creates a new enemy at a random position just off-screen.
function randomEnemySpawn() {
  let side = floor(random(4)); // Pick a random side: 0=top, 1=bottom, 2=left, 3=right.
  let x, y;
  if (side === 0) { x = random(width); y = -20; }
  else if (side === 1) { x = random(width); y = height + 20; }
  else if (side === 2) { x = -20; y = random(height); }
  else { x = width + 20; y = random(height); }
  
  // Return a new enemy object with its position, size, and speed.
  // Enemy speed increases slightly with each level.
  return { x: x, y: y, r: 15, speed: random(0.5, 1.2) * (1 + level * 0.05) };
}

// Creates and fires bullets based on the current weapon type.
function fireWeapons() {
  // Get the bullet's direction from the player's last movement.
  let vx = lastDir.x * 6;
  let vy = lastDir.y * 6;
  
  // If the player isn't moving, fire to the right by default.
  if (vx === 0 && vy === 0) vx = 6;

  // Create different bullet patterns for different weapons.
  if (weaponType === 'single') {
    bullets.push({ x: player.x, y: player.y, vx, vy, r: 5 });
  } else if (weaponType === 'spread') {
    // Center bullet
    bullets.push({ x: player.x, y: player.y, vx, vy, r: 5 });
    // Angled bullets
    bullets.push({ x: player.x, y: player.y, vx: vx + 1, vy: vy + 1, r: 5 });
    bullets.push({ x: player.x, y: player.y, vx: vx - 1, vy: vy - 1, r: 5 });
  }
}

// Creates the orbital objects when the powerup is collected.
function initOrbitals() {
  orbitals = [
    { angle: 0, dist: 60 },
    { angle: 120, dist: 60 },
    { angle: 240, dist: 60 }
  ];
}

// Makes the orbitals spin around the player and damage enemies.
function updateOrbitals() {
  fill('orange');
  for (let o of orbitals) {
    o.angle += 2; // Increase the angle to make it spin.
    let rad = radians(o.angle); // Convert degrees to radians for cos() and sin().
    
    // Calculate the orbital's position using trigonometry.
    let ox = player.x + cos(rad) * o.dist;
    let oy = player.y + sin(rad) * o.dist;
    circle(ox, oy, 15); // Draw the orbital.
    
    // Check for collision with enemies.
    for (let e of enemies) {
      if (dist(ox, oy, e.x, e.y) < 15 + e.r) {
        e.dead = true;
        xp++;
      }
    }
  }
}

// --- Screen Drawing Functions ---

// Draws the initial start screen with instructions.
function drawStartScreen() {
  textAlign(CENTER);
  fill('white');
  textSize(28);
  text('🧨 MINI SURVIVORS 🧨', width / 2, height / 2 - 100);
  textSize(18);
  text('Endless survival — it only gets harder', width / 2, height / 2 - 60);
  text('Use ARROW KEYS to move', width / 2, height / 2 - 30);
  text('Bullets shoot where you last moved', width / 2, height / 2);
  text('Press ENTER to begin', width / 2, height / 2 + 60);
  textAlign(LEFT); // Reset alignment.
}

// Draws the weapon selection menu (which is just a starting message now).
function drawMenu() {
  fill('white');
  textSize(24);
  textAlign(CENTER);
  text('Weapon: Single Shot', width / 2, height / 2);
  textSize(18);
  text('(You will unlock others through powerups)', width / 2, height / 2 + 40);
  text('Press ENTER to start', width / 2, height / 2 + 80);
  textAlign(LEFT);
}

// Draws the game over screen.
function drawGameOver() {
  fill('white');
  textSize(32);
  textAlign(CENTER);
  text('GAME OVER', width / 2, height / 2);
  textSize(18);
  text('Press SPACE to restart', width / 2, height / 2 + 40);
  textAlign(LEFT);
}

// --- Input Handling ---

// This special p5.js function is called automatically anytime a key is pressed.
function keyPressed() {
  if (onStartScreen && keyCode === ENTER) {
    onStartScreen = false; // Move from the start screen to the menu.
    return;
  }
  
  // If we are on the menu screen...
  if (!gameStarted && !onStartScreen) {
    if (keyCode === ENTER) {
      gameStarted = true; // Start the game!
    }
  } 
  // If the game is over...
  else if (gameOver && key === ' ') {
    restartGame(); // Restart the game.
  }
}

// Resets all the game variables to their starting values for a new game.
function restartGame() {
  player = { x: 300, y: 300, r: 20 };
  enemies = [];
  bullets = [];
  orbitals = [];
  powerups = [];
  xp = 0;
  speed = 4;
  fireRate = 20;
  weaponType = 'single';
  spawnInterval = 90;
  level = 1;
  levelTimer = 60 * 30;
  bannerTimer = 0;
  totalFrames = 0;
  gameOver = false;
}
