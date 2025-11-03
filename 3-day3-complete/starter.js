// 🎮 Day 3: Polish & Customization - Mini Survivors
// Today we'll add health, power-ups, and make this game YOURS!
// We start with ALL the working Day 2 code, then add finishing touches

// ====================================
// LESSON GOALS:
// - Give the player health so they can take multiple hits
// - Add health pack power-ups that spawn randomly
// - Create a polished, complete game
// - CUSTOMIZE everything to make it uniquely YOURS!
// ====================================

// STEP 1: Variables from Day 2 + new ones for Day 3

// From Day 2 - these should be very familiar now!
let player;                    // Will hold all player information
let gameState = "start";       // Tracks which screen we're showing
let bullets = [];              // Will hold all bullets currently on screen
let enemies = [];              // Will hold all enemies currently on screen
let score = 0;                 // Player's score

// NEW for Day 3 - health system and power-ups!
// TODO: Create variables for health and power-ups
// HINT: let playerHealth = 3;    (player starts with 3 health)
// HINT: let maxHealth = 3;        (maximum health is 3)
// HINT: let powerUps = [];        (array to hold health packs)


// STEP 2: The setup() function runs ONCE when the game starts
function setup() {
  // Create the game window - same as Day 1 and 2
  createCanvas(800, 600);

  // STEP 3: Create our player character (same as Day 2)
  player = {
    x: width / 2,     // Start in center horizontally
    y: height / 2,    // Start in center vertically
    size: 20,         // Size of the circle
    speed: 4          // How fast they move
  };
}

// STEP 4: The draw() function runs 60 TIMES PER SECOND!
function draw() {
  // Paint the background color every frame
  // 💡 CUSTOMIZE THIS: Try (0, 0, 0) for black, (50, 0, 50) for purple!
  background(20, 20, 40);

  // Check what screen we should show
  if (gameState === "start") {
    // STEP 5: Show the start screen

    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);

    // 💡 CUSTOMIZE THIS: Change the game title to YOUR name!
    // Try "JASON'S SURVIVAL GAME" or "SPACE BATTLE 3000"
    text("MINI SURVIVORS", width/2, height/2 - 80);

    textSize(24);
    text("Press any key to start", width/2, height/2 + 20);

    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 60);
    text("Survive as long as you can!", width/2, height/2 + 90);
    text("Collect green health packs to heal!", width/2, height/2 + 120);

  } else if (gameState === "playing") {
    // STEP 6: Handle player movement (same as Day 2)

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Left arrow OR 'A' key
      player.x -= player.speed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Right arrow OR 'D' key
      player.x += player.speed;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // Up arrow OR 'W' key
      player.y -= player.speed;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // Down arrow OR 'S' key
      player.y += player.speed;
    }

    // Keep player within screen boundaries
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);

    // STEP 7: Handle automatic shooting (same as Day 2)
    // 💡 CUSTOMIZE THIS: Change % 10 to % 5 for FASTER shooting!
    // Or change to % 15 for slower shooting!
    if (frameCount % 10 === 0) {
      bullets.push({
        x: player.x,
        y: player.y,
        speed: 7
      });
    }

    // STEP 8: Update and draw all bullets (same as Day 2)
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= bullets[i].speed;

      // 💡 CUSTOMIZE THIS: Change bullet color!
      // Try fill(255, 0, 0) for red, fill(0, 255, 0) for green
      fill(255, 255, 0); // Yellow
      noStroke();

      // 💡 CUSTOMIZE THIS: Change 6 to make bullets bigger or smaller!
      ellipse(bullets[i].x, bullets[i].y, 6);

      // Remove bullets that go off screen
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }

    // STEP 9: Spawn enemies (same as Day 2)
    // 💡 CUSTOMIZE THIS: Change 1.8 to spawn MORE enemies (try 3.0)
    // Or make it HARDER with higher numbers!
    if (random(100) < 1.8) {
      enemies.push({
        x: random(20, width - 20),
        y: 0,
        size: 20,
        speed: random(1.5, 3.5)
      });
    }

    // STEP 10: Update and draw all enemies (enhanced with health system!)
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

      // 💡 CUSTOMIZE THIS: Change enemy color!
      // Try fill(0, 255, 0) for green aliens, fill(255, 0, 255) for purple!
      fill(255, 100, 100); // Red
      noStroke();
      ellipse(enemy.x, enemy.y, enemy.size);

      // STEP 11: NEW FOR DAY 3 - Health system instead of instant death!
      // TODO: When enemy hits player, lose 1 health (not instant death!)
      // HINT: Check if enemy touches player (same distance check as Day 2)
      // HINT: if (distance < (player.size + enemy.size) / 2) {
      // HINT:   playerHealth -= 1;          (lose 1 health)
      // HINT:   enemies.splice(i, 1);       (remove the enemy)
      // HINT:
      // HINT:   if (playerHealth <= 0) {    (check if dead)
      // HINT:     gameState = "gameOver";
      // HINT:   }
      // HINT: }
      // 💡 CUSTOMIZE THIS: Try playerHealth -= 2 to make it HARDER!

    }

    // STEP 12: Check for bullet-enemy collisions (same as Day 2)
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = distance(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y);

        if (bulletDist < (6 + enemies[j].size) / 2) {
          bullets.splice(i, 1);
          enemies.splice(j, 1);

          // 💡 CUSTOMIZE THIS: Change += 10 to += 100 for HIGHER scores!
          score += 10;
          break;
        }
      }
    }

    // STEP 13: NEW FOR DAY 3 - Spawn health pack power-ups!
    // TODO: Spawn health packs rarely to help the player
    // HINT: if (random(1000) < 1) {         (0.1% chance each frame - very rare!)
    // HINT:   powerUps.push({
    // HINT:     x: random(30, width - 30),  (random position on screen)
    // HINT:     y: random(30, height - 30),
    // HINT:     size: 20
    // HINT:   });
    // HINT: }
    // 💡 CUSTOMIZE THIS: Change random(1000) to random(500) for MORE health packs!
    // Or random(2000) for FEWER health packs (harder game!)


    // STEP 14: NEW FOR DAY 3 - Draw and collect health packs
    // TODO: Draw health packs and check if player collects them
    // HINT: for (let i = powerUps.length - 1; i >= 0; i--) {
    // HINT:   let powerUp = powerUps[i];
    // HINT:
    // HINT:   fill(0, 255, 0);  (green color for health)
    // HINT:   noStroke();
    // HINT:   ellipse(powerUp.x, powerUp.y, powerUp.size);
    // HINT:
    // HINT:   // Check if player touches health pack
    // HINT:   let dist = sqrt((player.x - powerUp.x) ** 2 + (player.y - powerUp.y) ** 2);
    // HINT:   if (dist < (player.size + powerUp.size) / 2) {
    // HINT:     playerHealth = min(playerHealth + 1, maxHealth);  (heal 1 health, max 3)
    // HINT:     powerUps.splice(i, 1);                            (remove health pack)
    // HINT:   }
    // HINT: }
    // 💡 CUSTOMIZE THIS: Change powerUp.size to 30 for BIGGER health packs!
    // 💡 CUSTOMIZE THIS: Change +1 to +2 to heal MORE health!


    // Draw the player (same as Day 2)
    // 💡 CUSTOMIZE THIS: Change player color!
    // Try fill(255, 0, 0) for red, fill(255, 0, 255) for purple
    fill(0, 255, 255); // Cyan
    noStroke();
    ellipse(player.x, player.y, player.size);

    // STEP 15: NEW FOR DAY 3 - Display score AND health!
    // TODO: Show score and health hearts in the corner
    fill(255);
    textAlign(LEFT, TOP);
    textSize(20);
    text("Score: " + score, 10, 10);

    // TODO: Draw health as hearts (or numbers)
    // HINT: text("Health: " + playerHealth, 10, 35);
    // 💡 CREATIVE VERSION: Draw hearts instead of numbers!
    // HINT: for (let i = 0; i < playerHealth; i++) {
    // HINT:   text("❤️", 10 + i * 30, 35);  (draw hearts side by side)
    // HINT: }
    // 💡 CUSTOMIZE THIS: Try using "♥" or "💚" or "⭐" for different icons!


  } else if (gameState === "gameOver") {
    // STEP 16: Show game over screen (same as Day 2)

    // 💡 CUSTOMIZE THIS: Change the color!
    fill(255, 100, 100);
    textSize(48);
    textAlign(CENTER, CENTER);

    // 💡 CUSTOMIZE THIS: Change the message to something funny!
    // Try "YOU DIED!" or "WASTED" or "TRY AGAIN!"
    text("GAME OVER", width/2, height/2 - 50);

    fill(255);
    textSize(24);
    text("Final Score: " + score, width/2, height/2);

    textSize(18);
    text("Press SPACE to restart", width/2, height/2 + 50);
  }
}

// Handle key presses
function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "gameOver" && key === ' ') {
    // STEP 17: Reset the game (enhanced from Day 2)
    // TODO: Reset all variables including health and power-ups
    // HINT: bullets = [];
    // HINT: enemies = [];
    // HINT: powerUps = [];
    // HINT: score = 0;
    // HINT: playerHealth = 3;
    // HINT: player.x = width / 2;
    // HINT: player.y = height / 2;
    // HINT: gameState = "playing";

  }
}

// Helper function: Calculate distance between two points
function distance(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// ============================================
// 🎨 CUSTOMIZATION TIME! (Last 15-20 minutes)
// ============================================
// Now that your game works, make it YOURS! Try these ideas:

// 💡 EASY CUSTOMIZATIONS:
// 1. Change ALL the colors - player, enemies, bullets, health packs, background
// 2. Change the game title and messages to something funny or cool
// 3. Make bullets shoot FASTER (change shooting rate)
// 4. Make enemies spawn MORE OFTEN (increase spawn rate)
// 5. Make the player FASTER or SLOWER (change player.speed)
// 6. Make health packs spawn MORE or LESS often
// 7. Make bullets BIGGER or SMALLER
// 8. Make enemies BIGGER or SMALLER
// 9. Change how much health you START with (try 5 health!)
// 10. Change how much damage enemies do (try 2 damage per hit!)

// 💡 MEDIUM CUSTOMIZATIONS:
// 11. Draw health as HEARTS instead of numbers (❤️❤️❤️)
// 12. Make enemies different COLORS based on their speed
// 13. Add a BORDER around the game area
// 14. Make the background a different color
// 15. Add more TEXT to the start screen (your name, instructions)
// 16. Change what SPACE text says ("Press R to retry", etc.)
// 17. Make power-ups BLINK or PULSE (use sin(frameCount))
// 18. Show a HIGH SCORE on game over screen

// 💡 HARDER CHALLENGES (if you're feeling brave!):
// 19. Make enemies spawn from ALL sides (not just top)
// 20. Add a second type of power-up (speed boost? bigger bullets?)
// 21. Make the game get HARDER over time (more enemies as score increases)
// 22. Add SOUND effects (see p5.js sound library)
// 23. Make bullets shoot in the direction you're MOVING
// 24. Add a PAUSE button (press P to pause/unpause)

// 🎯 YOUR IDEAS:
// What would make this game more fun? Try it!
// - Different enemy types?
// - Boss battles?
// - Power-ups that give you super speed?
// - Make enemies explode into particles?
// - Add your name to the title screen?
//
// This is YOUR game now - experiment and have fun! 🎮
