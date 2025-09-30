// ================================================
// 🎮 Mini Survivors - DAY 2: Enemies and Combat
// ================================================
// Learning Goals for Day 2:
// - Understand arrays (lists of objects)
// - Create and manage multiple enemies
// - Implement automatic shooting
// - Learn collision detection (when things touch)
// - Add game over conditions
// ================================================

// --- STEP 1: Variables from Day 1 (Review) ---
// Player object - our character
let player = { x: 300, y: 300, r: 20 };

// Game settings
let speed = 4;
let gameStarted = false;

// --- STEP 2: New Variables for Day 2 ---
// Arrays are like lists that can hold multiple objects
// Think of them as containers that can hold many items

let enemies = [];  // List of all enemy objects (starts empty)
let bullets = [];  // List of all bullet objects (starts empty)

// Game statistics
let score = 0;        // How many enemies the player has destroyed
let gameOver = false; // Is the game over?

// Timing variables
let fireRate = 20;       // How often we shoot (lower = faster)
let spawnInterval = 90;  // How often enemies appear (lower = more frequent)

// Player direction - remembers which way player last moved
// This is used for aiming bullets
let lastDir = { x: 1, y: 0 }; // Start facing right

// --- STEP 3: Setup Function (Same as Day 1) ---
function setup() {
  createCanvas(600, 600);
  textSize(18);
  console.log("Day 2: Enemies and Combat ready!");
}

// --- STEP 4: Main Game Loop ---
function draw() {
  background(15); // Clear screen with dark gray
  
  // Game state management
  if (!gameStarted) {
    drawStartScreen();
    return;
  }
  
  if (gameOver) {
    drawGameOverScreen();
    return;
  }
  
  // --- STEP 5: Player Movement (Enhanced from Day 1) ---
  // Now we also track the direction for bullet aiming
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= speed;
    lastDir = { x: -1, y: 0 }; // Remember we moved left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += speed;
    lastDir = { x: 1, y: 0 };  // Remember we moved right
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= speed;
    lastDir = { x: 0, y: -1 }; // Remember we moved up
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.y += speed;
    lastDir = { x: 0, y: 1 };  // Remember we moved down
  }
  
  // Keep player on screen
  player.x = constrain(player.x, player.r, width - player.r);
  player.y = constrain(player.y, player.r, height - player.r);
  
  // Draw the player
  fill('cyan');
  circle(player.x, player.y, player.r * 2);
  
  // --- STEP 6: Enemy Spawning ---
  // frameCount is p5.js built-in variable that counts frames
  // % is the "modulo" operator - it gives the remainder after division
  // frameCount % spawnInterval === 0 is only true every spawnInterval frames
  
  if (frameCount % spawnInterval === 0) {
    // Create a new enemy and add it to our enemies array
    let newEnemy = createRandomEnemy();
    enemies.push(newEnemy); // push() adds an item to the end of an array
    console.log("Enemy spawned! Total enemies: " + enemies.length);
  }
  
  // --- STEP 7: Automatic Shooting ---
  // Player shoots automatically based on fire rate
  if (frameCount % fireRate === 0) {
    shootBullet();
  }
  
  // --- STEP 8: Update and Draw Bullets ---
  fill('yellow'); // Bullets are yellow
  
  // "for...of" loop goes through each item in the array
  for (let bullet of bullets) {
    // Move the bullet based on its velocity (speed and direction)
    bullet.x += bullet.vx; // vx = velocity in x direction
    bullet.y += bullet.vy; // vy = velocity in y direction
    
    // Draw the bullet
    circle(bullet.x, bullet.y, bullet.r * 2);
  }
  
  // Remove bullets that have gone off screen
  // filter() creates a new array with only items that meet a condition
  bullets = bullets.filter(bullet => {
    return bullet.x > 0 && bullet.x < width && bullet.y > 0 && bullet.y < height;
  });
  
  // --- STEP 9: Update and Draw Enemies ---
  fill('red'); // Enemies are red
  
  for (let enemy of enemies) {
    // Simple AI: move enemy towards player
    // We move only a tiny bit each frame (0.01) for smooth movement
    let moveX = (player.x - enemy.x) * 0.01;
    let moveY = (player.y - enemy.y) * 0.01;
    
    enemy.x += moveX;
    enemy.y += moveY;
    
    // Draw the enemy
    circle(enemy.x, enemy.y, enemy.r * 2);
    
    // --- STEP 10: Player-Enemy Collision Detection ---
    // dist() calculates distance between two points
    let distanceToPlayer = dist(enemy.x, enemy.y, player.x, player.y);
    
    // If enemy and player are touching (distance less than both radii)
    if (distanceToPlayer < enemy.r + player.r) {
      gameOver = true; // End the game!
      console.log("Game Over! Enemy touched player.");
    }
  }
  
  // --- STEP 11: Bullet-Enemy Collision Detection ---
  // This is a "nested loop" - for each bullet, check each enemy
  for (let bullet of bullets) {
    for (let enemy of enemies) {
      let distance = dist(bullet.x, bullet.y, enemy.x, enemy.y);
      
      // If bullet and enemy are touching
      if (distance < bullet.r + enemy.r) {
        // Mark them for removal (we don't remove during the loop)
        bullet.dead = true;
        enemy.dead = true;
        score++; // Increase score!
        console.log("Hit! Score: " + score);
      }
    }
  }
  
  // Remove "dead" bullets and enemies
  bullets = bullets.filter(bullet => !bullet.dead);
  enemies = enemies.filter(enemy => !enemy.dead);
  
  // --- STEP 12: Draw Game Information ---
  fill(255); // White text
  text('Score: ' + score, 10, 25);
  text('Enemies: ' + enemies.length, 10, 50);
  text('Bullets: ' + bullets.length, 10, 75);
  text('Frames: ' + frameCount, 10, 100);
  
  // Instructions
  text('Arrow keys to move', 10, height - 50);
  text('Shooting is automatic!', 10, height - 25);
}

// --- STEP 13: Helper Functions ---

// Creates a new enemy at a random position off-screen
function createRandomEnemy() {
  // Choose a random side of the screen (0=top, 1=right, 2=bottom, 3=left)
  let side = floor(random(4));
  let x, y;
  
  if (side === 0) {        // Top
    x = random(width);
    y = -30; // Start above screen
  } else if (side === 1) { // Right
    x = width + 30; // Start right of screen
    y = random(height);
  } else if (side === 2) { // Bottom
    x = random(width);
    y = height + 30; // Start below screen
  } else {                 // Left
    x = -30; // Start left of screen
    y = random(height);
  }
  
  // Return a new enemy object
  return {
    x: x,
    y: y,
    r: 15, // radius (size)
    dead: false // is this enemy destroyed?
  };
}

// Creates and fires a bullet in the direction player last moved
function shootBullet() {
  // Calculate bullet velocity based on last direction
  let bulletSpeed = 6;
  let vx = lastDir.x * bulletSpeed;
  let vy = lastDir.y * bulletSpeed;
  
  // If player hasn't moved, shoot right by default
  if (vx === 0 && vy === 0) {
    vx = bulletSpeed;
  }
  
  // Create and add new bullet to array
  let newBullet = {
    x: player.x,    // Start at player position
    y: player.y,
    vx: vx,         // Velocity x
    vy: vy,         // Velocity y
    r: 5,           // Size
    dead: false     // Is this bullet destroyed?
  };
  
  bullets.push(newBullet);
  console.log("Bullet fired! Direction: (" + vx + ", " + vy + ")");
}

// --- STEP 14: Screen Drawing Functions ---

function drawStartScreen() {
  textAlign(CENTER);
  fill('white');
  textSize(28);
  text('🎮 MINI SURVIVORS - DAY 2 🎮', width / 2, height / 2 - 100);
  textSize(18);
  text('Today we learn: Combat & Enemies!', width / 2, height / 2 - 50);
  text('Features:', width / 2, height / 2 - 20);
  text('• Enemies spawn and chase you', width / 2, height / 2);
  text('• Automatic shooting', width / 2, height / 2 + 20);
  text('• Collision detection', width / 2, height / 2 + 40);
  text('Press ENTER to start surviving!', width / 2, height / 2 + 80);
  textAlign(LEFT);
}

function drawGameOverScreen() {
  textAlign(CENTER);
  fill('red');
  textSize(32);
  text('GAME OVER!', width / 2, height / 2 - 50);
  
  fill('white');
  textSize(18);
  text('Final Score: ' + score, width / 2, height / 2);
  text('You survived ' + floor(frameCount / 60) + ' seconds!', width / 2, height / 2 + 30);
  text('Press SPACE to restart', width / 2, height / 2 + 70);
  textAlign(LEFT);
}

// --- STEP 15: Input Handling ---
function keyPressed() {
  if (keyCode === ENTER && !gameStarted) {
    gameStarted = true;
    console.log("Day 2 game started!");
  }
  
  // Restart game when it's over
  if (key === ' ' && gameOver) {
    restartGame();
  }
}

// Reset all game variables for a new game
function restartGame() {
  // Reset player
  player = { x: 300, y: 300, r: 20 };
  
  // Clear all arrays
  enemies = [];
  bullets = [];
  
  // Reset game state
  score = 0;
  gameOver = false;
  lastDir = { x: 1, y: 0 };
  
  console.log("Game restarted!");
}

// --- UNDERSTANDING ARRAYS ---
// Arrays are fundamental to game programming!
// 
// Creating an array: let myArray = [];
// Adding items: myArray.push(item);
// Removing items: myArray = myArray.filter(item => condition);
// Going through all items: for (let item of myArray) { ... }
// 
// In our game:
// - enemies[] holds all enemy objects
// - bullets[] holds all bullet objects
// - Each object has properties like x, y, r, dead

// --- UNDERSTANDING COLLISION DETECTION ---
// We use the distance formula: dist(x1, y1, x2, y2)
// If distance < radius1 + radius2, objects are touching!
// 
// This works because:
// - Each object has a radius (half its diameter)
// - When two circles touch, the distance between centers
//   equals the sum of their radii

// --- DISCUSSION QUESTIONS FOR STUDENTS ---
// 1. What happens if you change fireRate to 5? To 60?
// 2. How could you make enemies move faster or slower?
// 3. What would happen if we removed the boundary checking for the player?
// 4. Can you figure out how to make bullets bigger or smaller?
// 5. How could we make enemies spawn more or less frequently?

// --- CHALLENGES FOR ADVANCED STUDENTS ---
// 1. Add different types of enemies (different sizes, speeds, colors)
// 2. Make some enemies move in random directions instead of toward player
// 3. Add a health system (player can take multiple hits)
// 4. Create different bullet types (faster, bigger, different colors)
// 5. Add sound effects when bullets hit enemies

// --- WHAT WE'LL ADD TOMORROW (DAY 3) ---
// - Multiple weapon types (spread shot, orbital weapons)
// - Power-ups to collect
// - Increasing difficulty levels
// - Experience points and upgrades
// - Polish and game balance