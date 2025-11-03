// 🎮 Bonus Day 5: Visual Effects & Polish - Mini Survivors
// COMPLETED VERSION - This shows all the visual effects working!
// We start with working Day 4 code (weapons), then add visual polish

// ====================================
// LESSON GOALS:
// - Add particle explosions when enemies die
// - Add screen shake effect when taking damage
// - Make enemies spawn from ALL 4 sides
// - Make the game feel more polished and professional
// ====================================

// STEP 1: Variables from Day 4 + new ones for Day 5

// From Day 4 - weapon system working!
let player;
let gameState = "start";
let bullets = [];
let enemies = [];
let score = 0;
let playerHealth = 3;
let maxHealth = 3;
let powerUps = [];
let currentWeapon = "basic";
let lastDirection = {x: 0, y: -1};

// NEW for Day 5 - visual effects!
let explosionParticles = [];   // Array to hold explosion particles
let screenShake = 0;            // How much screen is shaking

// STEP 2: The setup() function runs ONCE when the game starts
function setup() {
  createCanvas(800, 600);

  player = {
    x: width / 2,
    y: height / 2,
    size: 20,
    speed: 4
  };
}

// STEP 3: The draw() function runs 60 TIMES PER SECOND!
function draw() {
  // STEP 4: NEW FOR DAY 5 - Screen shake effect!
  push(); // Save the current drawing state

  if (screenShake > 0) {
    translate(random(-screenShake, screenShake), random(-screenShake, screenShake));
    screenShake *= 0.9;  // Gradually reduce shake
  }

  background(20, 20, 40);

  if (gameState === "start") {
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("MINI SURVIVORS", width/2, height/2 - 80);

    textSize(24);
    text("Press any key to start", width/2, height/2 + 20);

    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 60);
    text("Press 1, 2, 3 to switch weapons!", width/2, height/2 + 90);
    text("Now with EXPLOSIONS!", width/2, height/2 + 120);

  } else if (gameState === "playing") {
    // Player movement with direction tracking (from Day 4)
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      player.x -= player.speed;
      lastDirection = {x: -1, y: 0};
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      player.x += player.speed;
      lastDirection = {x: 1, y: 0};
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      player.y -= player.speed;
      lastDirection = {x: 0, y: -1};
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      player.y += player.speed;
      lastDirection = {x: 0, y: 1};
    }

    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);

    // Weapon system from Day 4
    let bulletSpeed = 7;

    if (currentWeapon === "basic" && frameCount % 15 === 0) {
      bullets.push({
        x: player.x,
        y: player.y,
        vx: lastDirection.x * bulletSpeed,
        vy: lastDirection.y * bulletSpeed,
        type: "basic"
      });
    }
    else if (currentWeapon === "spread" && frameCount % 20 === 0) {
      let baseAngle = Math.atan2(lastDirection.y, lastDirection.x);
      let spreadAngle = 0.3;
      for (let i = -1; i <= 1; i++) {
        let angle = baseAngle + (i * spreadAngle);
        bullets.push({
          x: player.x,
          y: player.y,
          vx: Math.cos(angle) * (bulletSpeed - 1),
          vy: Math.sin(angle) * (bulletSpeed - 1),
          type: "spread"
        });
      }
    }
    else if (currentWeapon === "rapid" && frameCount % 8 === 0) {
      bullets.push({
        x: player.x,
        y: player.y,
        vx: lastDirection.x * (bulletSpeed + 1),
        vy: lastDirection.y * (bulletSpeed + 1),
        type: "rapid"
      });
    }

    // Update and draw bullets (from Day 4)
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;

      if (bullet.type === "basic") fill(255, 255, 0);
      else if (bullet.type === "spread") fill(255, 150, 0);
      else if (bullet.type === "rapid") fill(0, 255, 255);

      noStroke();
      ellipse(bullet.x, bullet.y, 6);

      if (bullet.y < -10 || bullet.y > height + 10 ||
          bullet.x < -10 || bullet.x > width + 10) {
        bullets.splice(i, 1);
      }
    }

    // STEP 5: NEW FOR DAY 5 - Spawn enemies from ALL 4 sides!
    if (random(100) < 1.8) {
      let enemy = { size: 20, speed: random(1.5, 3.5) };

      let side = random(['top', 'bottom', 'left', 'right']);
      if (side === 'top') {
        enemy.x = random(20, width - 20);
        enemy.y = -enemy.size;
      } else if (side === 'bottom') {
        enemy.x = random(20, width - 20);
        enemy.y = height + enemy.size;
      } else if (side === 'left') {
        enemy.x = -enemy.size;
        enemy.y = random(20, height - 20);
      } else { // right
        enemy.x = width + enemy.size;
        enemy.y = random(20, height - 20);
      }

      enemies.push(enemy);
    }

    // Update and draw enemies
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

      // STEP 6: Enhanced collision with screen shake!
      if (distance < (player.size + enemy.size) / 2) {
        playerHealth -= 1;
        enemies.splice(i, 1);

        // Add screen shake when player gets hit!
        screenShake = 10;

        if (playerHealth <= 0) {
          gameState = "gameOver";
        }
      }
    }

    // STEP 7: Enhanced bullet-enemy collision with EXPLOSIONS!
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = distance(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y);

        if (bulletDist < (6 + enemies[j].size) / 2) {
          // Create explosion at enemy position!
          createExplosion(enemies[j].x, enemies[j].y);

          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          break;
        }
      }
    }

    // STEP 8: NEW FOR DAY 5 - Update and draw explosion particles!
    for (let i = explosionParticles.length - 1; i >= 0; i--) {
      let p = explosionParticles[i];

      p.x += p.vx;              // Move particle
      p.y += p.vy;
      p.life -= 5;              // Fade out
      p.size *= 0.95;           // Shrink

      fill(p.color.r, p.color.g, p.color.b, p.life);
      noStroke();
      ellipse(p.x, p.y, p.size);

      if (p.life <= 0) {
        explosionParticles.splice(i, 1);
      }
    }

    // Spawn health packs (from Day 3)
    if (random(1000) < 1) {
      powerUps.push({
        x: random(30, width - 30),
        y: random(30, height - 30),
        size: 20
      });
    }

    // Draw and collect health packs
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

    // UI
    fill(255);
    textAlign(LEFT, TOP);
    textSize(20);
    text("Score: " + score, 10, 10);

    for (let i = 0; i < playerHealth; i++) {
      text("❤️", 10 + i * 30, 35);
    }

    textAlign(CENTER, BOTTOM);
    textSize(16);
    text("Weapon: " + currentWeapon.toUpperCase(), width/2, height - 10);
    textSize(12);
    text("Press 1, 2, or 3 to change weapons", width/2, height - 30);

  } else if (gameState === "gameOver") {
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

  pop(); // Restore the drawing state (end screen shake)
}

// STEP 9: NEW FOR DAY 5 - Create explosion function!
function createExplosion(x, y) {
  for (let i = 0; i < 15; i++) {        // Create 15 particles
    explosionParticles.push({
      x: x,
      y: y,
      vx: random(-3, 3),                // Random velocity
      vy: random(-3, 3),
      size: random(3, 8),               // Random size
      life: 255,                        // Start fully visible
      color: {                          // Random red-orange-yellow colors
        r: random(200, 255),
        g: random(100, 200),
        b: random(0, 100)
      }
    });
  }
}

// Handle key presses
function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "playing") {
    if (key === '1') currentWeapon = "basic";
    if (key === '2') currentWeapon = "spread";
    if (key === '3') currentWeapon = "rapid";
  } else if (gameState === "gameOver" && key === ' ') {
    bullets = [];
    enemies = [];
    powerUps = [];
    explosionParticles = [];
    screenShake = 0;
    score = 0;
    playerHealth = 3;
    player.x = width / 2;
    player.y = height / 2;
    currentWeapon = "basic";
    lastDirection = {x: 0, y: -1};
    gameState = "playing";
  }
}

// Helper function: Calculate distance between two points
function distance(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// ============================================
// 🎯 DAY 5 CONCEPTS EXPLAINED
// ====================================== ======

// 💡 PARTICLE SYSTEMS:
// Particles are tiny objects that:
// - Have position (x, y)
// - Have velocity (vx, vy)
// - Have a life span (fade out)
// - Create cool visual effects!

// 💡 SCREEN SHAKE:
// translate() moves the entire canvas
// random() makes it jiggle
// Multiply by 0.9 each frame to gradually stop
// push() and pop() save/restore the canvas state

// 💡 SPAWNING FROM ALL SIDES:
// Instead of just y = 0 (top), we:
// - Pick a random side
// - Set x/y based on which side
// - Makes game much more challenging!

// ============================================
// 🎨 CUSTOMIZATION IDEAS
// ============================================
// - Change explosion colors (try blues for ice?)
// - More particles per explosion (try 30!)
// - Longer-lasting explosions (slower life decay)
// - Bigger screen shake (try 20!)
// - Different particle shapes (triangles? stars?)
// - Add particle trails to bullets
// - Make player leave a trail when moving
// - Add explosion sound effects
