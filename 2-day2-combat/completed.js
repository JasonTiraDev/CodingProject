// 🎮 Day 2: Combat Systems - Mini Survivors
// COMPLETED VERSION - This is what the finished game should look like!
// We start with working Day 1 code, then add combat features

// ====================================
// LESSON GOALS:
// - Learn about arrays (lists that hold multiple objects)
// - Create bullets that shoot automatically
// - Make enemies that chase the player
// - Detect when bullets hit enemies (collision detection)
// - Add a score system and game over screen
// ====================================

// STEP 1: Variables from Day 1 + new ones for Day 2
// Think of these like labeled boxes that hold important data
let player;
let gameState = "start";
let bullets = [];
let enemies = [];
let score = 0;

// STEP 2: The setup() function runs ONCE when the game starts
function setup() {
  // Create the game window - same as Day 1
  // TODO: Create a canvas that's 800 pixels wide and 600 pixels tall
  // HINT: Use createCanvas(width, height)
  createCanvas(800, 600);
  
  // STEP 3: Create our player character (same as Day 1)
  // This is like a character sheet with all the player's stats
  // TODO: Fill in the player object with these properties:
  // x: width / 2 (center horizontally)
  // y: height / 2 (center vertically) 
  // size: 20 (try different numbers like 15 or 30!)
  // speed: 4 (try 2 for slow or 8 for fast!)
  player = {
    x: width / 2,     // Start in center horizontally
    y: height / 2,    // Start in center vertically
    size: 20,         // Size of the circle
    speed: 4          // How fast they move
  };
}

// STEP 4: The draw() function runs 60 TIMES PER SECOND!
// This is what makes the game move and look alive
function draw() {
  // Paint the background color every frame (like erasing a whiteboard)
  // These numbers are Red, Green, Blue (0-255). Try (0, 0, 0) for black!
  // 🎨 Find more colors at: https://colorpicker.me or just Google "RGB color picker"
  background(20, 20, 40);
  
  // Check what screen we should show
  if (gameState === "start") {
    // STEP 5: Show the start screen (same as Day 1, but with new text!)
    
    // TODO: Set text color to white
    // HINT: Use fill(255)
    fill(255);
    
    // TODO: Make text big for the title
    // HINT: Use textSize(48)
    textSize(48);
    
    // TODO: Center the text on screen
    // HINT: Use textAlign(CENTER, CENTER)
    textAlign(CENTER, CENTER);
    
    // TODO: Draw the title text
    // HINT: Use text("MINI SURVIVORS", width/2, height/2 - 50)
    // 💡 TRY THIS: Change "MINI SURVIVORS" to your own game title!
    text("MINI SURVIVORS", width/2, height/2 - 50);
    
    // TODO: Add instructions for starting
    // HINT: textSize(24) then text("Press any key to start", width/2, height/2 + 50)
    textSize(24);
    text("Press any key to start", width/2, height/2 + 50);
    
    // TODO: Add controls and gameplay instructions
    // HINT: textSize(16) for smaller text
    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 100);
    text("Survive as long as you can!", width/2, height/2 + 130);
    
  } else if (gameState === "playing") {
    // STEP 6: Handle player movement (same as Day 1)
    // Check if keys are being pressed RIGHT NOW
    
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Left arrow OR 'A' key
      player.x -= player.speed;                   // Move left
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Right arrow OR 'D' key
      player.x += player.speed;                    // Move right
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {    // Up arrow OR 'W' key
      player.y -= player.speed;                    // Move up
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {  // Down arrow OR 'S' key
      player.y += player.speed;                    // Move down
    }
    
    // Keep player within screen boundaries (same as Day 1)
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // STEP 7: Handle automatic shooting (NEW for Day 2!)
    // TODO: Make the player shoot bullets automatically
    // HINT: if (frameCount % 10 === 0) {  (frameCount counts frames, % means "remainder")
    // HINT:   bullets.push({            (push adds something to the end of an array)
    // HINT:     x: player.x,            (bullet starts at player position)
    // HINT:     y: player.y,
    // HINT:     speed: 7                (how fast bullet moves)
    // HINT:   });
    // HINT: }
    // 💡 TRY THIS: Change % 10 to % 5 for faster shooting!
    if (frameCount % 10 === 0) { // Shoot every 10 frames
      bullets.push({
        x: player.x,
        y: player.y,
        speed: 7
      });
    }
    
    // STEP 8: Update and draw all bullets
    // TODO: Make bullets move up the screen and draw them
    // HINT: for (let i = bullets.length - 1; i >= 0; i--) {  (go backwards through array)
    // HINT:   bullets[i].y -= bullets[i].speed;              (move bullet up)
    // HINT:   
    // HINT:   fill(255, 255, 0);                            (yellow color)
    // HINT:   noStroke();
    // HINT:   ellipse(bullets[i].x, bullets[i].y, 6);        (draw bullet)
    // HINT:   
    // HINT:   if (bullets[i].y < 0) {                        (if bullet goes off screen)
    // HINT:     bullets.splice(i, 1);                        (remove it from array)
    // HINT:   }
    // HINT: }
    // 💡 TRY THIS: Change the 6 to make bigger or smaller bullets!
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= bullets[i].speed;
      
      // Draw bullet
      fill(255, 255, 0); // Yellow
      noStroke();
      ellipse(bullets[i].x, bullets[i].y, 6);
      
      // Remove bullets that go off screen
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }
    
    // STEP 9: Spawn enemies randomly
    // TODO: Create enemies that appear at the top of the screen
    // HINT: if (random(100) < 1.8) {        (1.8% chance each frame)
    // HINT:   enemies.push({                (add enemy to array)
    // HINT:     x: random(20, width - 20),  (random position across top)
    // HINT:     y: 0,                       (start at top of screen)
    // HINT:     size: 20,                   (enemy size)
    // HINT:     speed: random(1.5, 3.5)     (random speed - some fast, some slow!)
    // HINT:   });
    // HINT: }
    // 💡 TRY THIS: Change 1.8 to 3.0 for more enemies!
    if (random(100) < 1.8) { // 1.8% chance each frame - steady but manageable
      enemies.push({
        x: random(20, width - 20),
        y: 0,
        size: 20,
        speed: random(1.5, 3.5) // Slightly faster enemies
      });
    }
    
    // STEP 10: Update and draw all enemies
    // TODO: Make enemies move toward the player and draw them
    // HINT: for (let i = enemies.length - 1; i >= 0; i--) {
    // HINT:   let enemy = enemies[i];
    // HINT:   
    // HINT:   // Calculate direction to player
    // HINT:   let dx = player.x - enemy.x;
    // HINT:   let dy = player.y - enemy.y;
    // HINT:   let distance = sqrt(dx * dx + dy * dy);
    // HINT:   
    // HINT:   // Move toward player
    // HINT:   if (distance > 0) {
    // HINT:     enemy.x += (dx / distance) * enemy.speed;
    // HINT:     enemy.y += (dy / distance) * enemy.speed;
    // HINT:   }
    // HINT:   
    // HINT:   // Draw enemy
    // HINT:   fill(255, 100, 100);  (red color)
    // HINT:   noStroke();
    // HINT:   ellipse(enemy.x, enemy.y, enemy.size);
    // HINT:   
    // HINT:   // Check if enemy hits player (GAME OVER!)
    // HINT:   if (distance < (player.size + enemy.size) / 2) {
    // HINT:     gameState = "gameOver";
    // HINT:   }
    // HINT: }
    // 💡 TRY THIS: Change fill(255, 100, 100) to make different colored enemies!
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
      
      // Draw enemy
      fill(255, 100, 100); // Red
      noStroke();
      ellipse(enemy.x, enemy.y, enemy.size);
      
      // Check if enemy hits player
      if (distance < (player.size + enemy.size) / 2) {
        gameState = "gameOver";
      }
    }
    
    // STEP 11: Check for bullet-enemy collisions
    // TODO: When bullets hit enemies, both should disappear and score should increase
    // HINT: for (let i = bullets.length - 1; i >= 0; i--) {              (check each bullet)
    // HINT:   for (let j = enemies.length - 1; j >= 0; j--) {             (against each enemy)
    // HINT:     let bulletDist = distance(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y);
    // HINT:     
    // HINT:     if (bulletDist < (6 + enemies[j].size) / 2) {             (if they touch)
    // HINT:       bullets.splice(i, 1);                                   (remove bullet)
    // HINT:       enemies.splice(j, 1);                                   (remove enemy)
    // HINT:       score += 10;                                            (increase score)
    // HINT:       break;                                                   (stop checking this bullet)
    // HINT:     }
    // HINT:   }
    // HINT: }
    // 💡 TRY THIS: Change += 10 to += 50 for higher scores!
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        let bulletDist = distance(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y);
        
        if (bulletDist < (6 + enemies[j].size) / 2) {
          // Hit! Remove both bullet and enemy
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          break; // Exit inner loop since bullet is gone
        }
      }
    }
    
    // STEP 12: Draw the player (same as Day 1)
    fill(0, 255, 255);    // Cyan color (Red=0, Green=255, Blue=255)
    // 💡 TRY THIS: Change the color! Try fill(255, 0, 0) for red!
    noStroke();           // No outline around the circle
    ellipse(player.x, player.y, player.size);
    
    // STEP 13: Display the score
    // TODO: Show the player's current score in the corner
    // HINT: fill(255);                              (white text)
    // HINT: textAlign(LEFT, TOP);                   (align to top-left)
    // HINT: textSize(20);                           (good size for score)
    // HINT: text("Score: " + score, 10, 10);        (show score in corner)
    fill(255);
    textAlign(LEFT, TOP);
    textSize(20);
    text("Score: " + score, 10, 10);
    
  } else if (gameState === "gameOver") {
    // STEP 14: Show game over screen (NEW for Day 2!)
    // TODO: Display game over message and final score
    // HINT: fill(255, 100, 100);                           (red color for dramatic effect)
    // HINT: textSize(48);                                   (big text)
    // HINT: textAlign(CENTER, CENTER);                     (center everything)
    // HINT: text("GAME OVER", width/2, height/2 - 50);     (big game over text)
    // HINT: 
    // HINT: fill(255);                                      (white text)
    // HINT: textSize(24);                                   (smaller text)
    // HINT: text("Final Score: " + score, width/2, height/2);  (show final score)
    // HINT: 
    // HINT: textSize(18);                                   (even smaller)
    // HINT: text("Press SPACE to restart", width/2, height/2 + 50);  (restart instructions)
    // 💡 TRY THIS: Change "SPACE" to "ENTER" and key === ' ' to key === '\n' for Enter key!
    // 💡 TRY THIS: Or use key === 'r' and "Press R to restart" for R key!
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

// STEP 15: Handle when someone presses a key ONCE (not holding it down)
function keyPressed() {
  // Start the game (same as Day 1)
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "gameOver" && key === ' ') {
    // STEP 16: Reset the game when player presses SPACE
    // TODO: Clear everything and start over (only when SPACE is pressed)
    // 💡 TO CHANGE THE RESTART KEY:
    // 💡 For Enter key: change key === ' ' to key === '\n' 
    // 💡 For R key: change key === ' ' to key === 'r'
    // 💡 For any letter: use key === 'a' (or whatever letter you want)
    // 💡 Don't forget to update the text message too!
    // HINT: bullets = [];           (empty the bullets array)
    // HINT: enemies = [];           (empty the enemies array)  
    // HINT: score = 0;              (reset score back to zero)
    // HINT: player.x = width / 2;   (put player back in center)
    // HINT: player.y = height / 2;  (put player back in center)
    // HINT: gameState = "playing";  (start playing again)
    bullets = [];
    enemies = [];
    score = 0;
    player.x = width / 2;
    player.y = height / 2;
    gameState = "playing";
  }
}

// HELPER FUNCTION: Calculate distance between two points
// This is used for collision detection - when things touch!
function distance(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// 🎯 EASY MODIFICATIONS TO TRY:
// 1. Change frameCount % 10 to % 5 for faster shooting
// 2. Change random(100) < 1.8 to < 3.0 for more enemies
// 3. Change bullet speed from 7 to 10 for faster bullets
// 4. Change score += 10 to += 50 for higher scores per kill
// 5. Change enemy speed from random(1.5, 3.5) to random(2, 5) for faster enemies
// 6. Change bullet size from 6 to 10 for bigger bullets
// 7. Change restart key: key === ' ' to key === 'r' (and update the text!)

// 🚀 HARDER CHALLENGES (if you finish early):
// 1. Make enemies spawn faster as score increases
// 2. Add different colored enemies with different speeds
// 3. Make some enemies move in random directions instead of toward player
// 4. Add different bullet colors based on score

// NEXT TIME:
// We'll add multiple weapon types, power-ups, and experience points!