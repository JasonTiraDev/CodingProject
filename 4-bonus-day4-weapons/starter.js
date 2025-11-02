// 🎮 Bonus Day 4: Multiple Weapons - Mini Survivors
// Today we'll add different weapon types and directional shooting!
// We start with working Day 3 code (health + power-ups), then add weapons

// ====================================
// LESSON GOALS:
// - Add multiple weapon types (Basic, Spread, Rapid)
// - Make bullets shoot in the direction you're moving
// - Add weapon switching with number keys (1, 2, 3)
// - Give each weapon unique properties
// ====================================

// STEP 1: Variables from Day 3 + new ones for Day 4

// From Day 3 - these should be very familiar now!
let player;                    // Will hold all player information
let gameState = "start";       // Tracks which screen we're showing
let bullets = [];              // Will hold all bullets currently on screen
let enemies = [];              // Will hold all enemies currently on screen
let score = 0;                 // Player's score
let playerHealth = 3;          // Player health
let maxHealth = 3;             // Maximum health
let powerUps = [];             // Array to hold health packs

// NEW for Day 4 - weapon system!
// TODO: Create variables for weapon system
// HINT: let currentWeapon = "basic";           (current weapon type)
// HINT: let lastDirection = {x: 0, y: -1};     (direction player is facing for shooting)


// STEP 2: The setup() function runs ONCE when the game starts
function setup() {
  createCanvas(800, 600);

  // STEP 3: Create our player character (same as Day 3)
  player = {
    x: width / 2,
    y: height / 2,
    size: 20,
    speed: 4
  };
}

// STEP 4: The draw() function runs 60 TIMES PER SECOND!
function draw() {
  background(20, 20, 40);

  if (gameState === "start") {
    // STEP 5: Show the start screen

    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("MINI SURVIVORS", width/2, height/2 - 80);

    textSize(24);
    text("Press any key to start", width/2, height/2 + 20);

    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 60);
    text("Press 1, 2, 3 to switch weapons!", width/2, height/2 + 90);
    text("Collect green health packs to heal!", width/2, height/2 + 120);

  } else if (gameState === "playing") {
    // STEP 6: Handle player movement AND track direction (enhanced from Day 3!)

    // TODO: Track which direction player is moving for shooting
    // HINT: When moving left, set lastDirection = {x: -1, y: 0}
    // HINT: When moving right, set lastDirection = {x: 1, y: 0}
    // HINT: When moving up, set lastDirection = {x: 0, y: -1}
    // HINT: When moving down, set lastDirection = {x: 0, y: 1}

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      player.x -= player.speed;
      // TODO: Set lastDirection for left

    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      player.x += player.speed;
      // TODO: Set lastDirection for right

    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      player.y -= player.speed;
      // TODO: Set lastDirection for up

    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      player.y += player.speed;
      // TODO: Set lastDirection for down

    }

    // Keep player within screen boundaries
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);

    // STEP 7: NEW FOR DAY 4 - Enhanced shooting with weapon types!
    // TODO: Replace Day 3's simple shooting with weapon-based system
    // HINT: Different weapons have different fire rates
    // HINT: Basic weapon: frameCount % 15 === 0
    // HINT: Rapid weapon: frameCount % 8 === 0
    // HINT: Spread weapon: frameCount % 20 === 0 (slower but more bullets)

    // TODO: Create bullets based on currentWeapon
    // HINT: if (currentWeapon === "basic") {
    // HINT:   // Create ONE bullet in lastDirection
    // HINT: } else if (currentWeapon === "spread") {
    // HINT:   // Create THREE bullets at slightly different angles
    // HINT: } else if (currentWeapon === "rapid") {
    // HINT:   // Create ONE bullet but fires faster
    // HINT: }

    // 💡 HINT for Spread Weapon:
    // Spread uses trigonometry to create 3 bullets at different angles
    // You'll need Math.atan2() to get the base angle
    // Then add/subtract a spread angle (like 0.3 radians)
    // Use Math.cos() and Math.sin() to get x and y velocities

    // 💡 Example for basic weapon:
    // if (currentWeapon === "basic" && frameCount % 15 === 0) {
    //   bullets.push({
    //     x: player.x,
    //     y: player.y,
    //     vx: lastDirection.x * 7,  (velocity in x direction)
    //     vy: lastDirection.y * 7,  (velocity in y direction)
    //     type: "basic"
    //   });
    // }


    // STEP 8: Enhanced bullet system (works with all weapon types!)
    // TODO: Update bullets to move in ANY direction (not just up)
    // HINT: Use bullet.vx and bullet.vy for velocity
    // HINT: bullet.x += bullet.vx;
    // HINT: bullet.y += bullet.vy;

    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];

      // TODO: Move bullet using velocity
      // HINT: bullet.x += bullet.vx;
      // HINT: bullet.y += bullet.vy;


      // TODO: Draw bullets with different colors based on type
      // HINT: if (bullet.type === "basic") fill(255, 255, 0);      (yellow)
      // HINT: else if (bullet.type === "spread") fill(255, 150, 0); (orange)
      // HINT: else if (bullet.type === "rapid") fill(0, 255, 255);  (cyan)

      noStroke();
      ellipse(bullet.x, bullet.y, 6);

      // TODO: Remove bullets that go off screen in ANY direction
      // HINT: if (bullet.y < -10 || bullet.y > height + 10 ||
      // HINT:     bullet.x < -10 || bullet.x > width + 10)

    }

    // STEP 9: Spawn enemies (same as Day 3)
    if (random(100) < 1.8) {
      enemies.push({
        x: random(20, width - 20),
        y: 0,
        size: 20,
        speed: random(1.5, 3.5)
      });
    }

    // STEP 10: Update and draw enemies (same as Day 3)
    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemy = enemies[i];

      let dx = player.x - enemy.x;
      let dy = player.y - enemy.y;
      let distance = sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        enemy.x += (dx / distance) * enemy.speed;
        enemy.y += (dy / distance) * enemy.speed;
      }

      fill(255, 100, 100);
      noStroke();
      ellipse(enemy.x, enemy.y, enemy.size);

      // Health system from Day 3
      if (distance < (player.size + enemy.size) / 2) {
        playerHealth -= 1;
        enemies.splice(i, 1);

        if (playerHealth <= 0) {
          gameState = "gameOver";
        }
      }
    }

    // STEP 11: Check for bullet-enemy collisions (enhanced for new bullet system)
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = distance(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y);

        if (bulletDist < (6 + enemies[j].size) / 2) {
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          break;
        }
      }
    }

    // STEP 12: Spawn health packs (same as Day 3)
    if (random(1000) < 1) {
      powerUps.push({
        x: random(30, width - 30),
        y: random(30, height - 30),
        size: 20
      });
    }

    // STEP 13: Draw and collect health packs (same as Day 3)
    for (let i = powerUps.length - 1; i >= 0; i--) {
      let powerUp = powerUps[i];

      fill(0, 255, 0);
      noStroke();
      ellipse(powerUp.x, powerUp.y, powerUp.size);

      let dist = sqrt((player.x - powerUp.x) ** 2 + (player.y - powerUp.y) ** 2);
      if (dist < (player.size + powerUp.size) / 2) {
        playerHealth = min(playerHealth + 1, maxHealth);
        powerUps.splice(i, 1);
      }
    }

    // Draw the player
    fill(0, 255, 255);
    noStroke();
    ellipse(player.x, player.y, player.size);

    // STEP 14: Enhanced UI showing current weapon!
    fill(255);
    textAlign(LEFT, TOP);
    textSize(20);
    text("Score: " + score, 10, 10);

    // Draw health as hearts
    for (let i = 0; i < playerHealth; i++) {
      text("❤️", 10 + i * 30, 35);
    }

    // TODO: Show current weapon at the bottom
    // HINT: textAlign(CENTER, BOTTOM);
    // HINT: textSize(16);
    // HINT: text("Weapon: " + currentWeapon.toUpperCase(), width/2, height - 10);
    // HINT: textSize(12);
    // HINT: text("Press 1, 2, or 3 to change weapons", width/2, height - 30);


  } else if (gameState === "gameOver") {
    // STEP 15: Show game over screen (same as Day 3)

    fill(255, 100, 100);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2 - 50);

    fill(255);
    textSize(24);
    text("Final Score: " + score, width/2, height/2);

    textSize(18);
    text("Press SPACE to restart", width/2, height/2 + 50);
  }
}

// STEP 16: Handle key presses (enhanced for weapon switching!)
function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "playing") {
    // TODO: Add weapon switching with number keys
    // HINT: if (key === '1') currentWeapon = "basic";
    // HINT: if (key === '2') currentWeapon = "spread";
    // HINT: if (key === '3') currentWeapon = "rapid";

  } else if (gameState === "gameOver" && key === ' ') {
    // STEP 17: Reset the game (enhanced from Day 3)
    bullets = [];
    enemies = [];
    powerUps = [];
    score = 0;
    playerHealth = 3;
    player.x = width / 2;
    player.y = height / 2;

    // TODO: Reset weapon variables
    // HINT: currentWeapon = "basic";
    // HINT: lastDirection = {x: 0, y: -1};

    gameState = "playing";
  }
}

// Helper function: Calculate distance between two points
function distance(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// ============================================
// 🎯 DAY 4 CONCEPTS EXPLAINED
// ============================================

// 💡 DIRECTION VECTORS:
// lastDirection = {x: 0, y: -1} means "up"
// lastDirection = {x: 1, y: 0} means "right"
// This tells bullets which way to fly!

// 💡 VELOCITY:
// Instead of just moving "up" (y -= speed), bullets now have:
// - vx: velocity in x direction (left/right)
// - vy: velocity in y direction (up/down)
// This lets bullets move in ANY direction!

// 💡 TRIGONOMETRY FOR SPREAD:
// Math.atan2(y, x) converts direction to angle
// Math.cos(angle) gives x component
// Math.sin(angle) gives y component
// This creates the spread pattern!

// 💡 WEAPON BALANCE:
// - Basic: Medium speed, medium damage, balanced
// - Spread: Slow fire rate but 3 bullets
// - Rapid: Fast fire rate but less coverage
// Each weapon has pros and cons!

// ============================================
// 🎨 CUSTOMIZATION IDEAS
// ============================================
// - Add a 4th weapon type (laser? shotgun?)
// - Change weapon colors and bullet sizes
// - Make spread weapon shoot 5 bullets instead of 3
// - Make rapid weapon super fast (frameCount % 3)
// - Add weapon icons to the UI
// - Make enemies take different damage from different weapons
