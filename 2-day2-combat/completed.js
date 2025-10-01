// 🎮 Day 2: Combat Systems - Mini Survivors
// Player movement + enemies + bullets + collision detection

// Global variables for the game
let player;
let gameState = "start";
let bullets = [];
let enemies = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  
  player = {
    x: width / 2,
    y: height / 2,
    size: 20,
    speed: 4
  };
}

function draw() {
  background(20, 20, 40);
  
  if (gameState === "start") {
    // Start screen
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("MINI SURVIVORS", width/2, height/2 - 50);
    
    textSize(24);
    text("Press any key to start", width/2, height/2 + 50);
    
    textSize(16);
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 100);
    text("Survive as long as you can!", width/2, height/2 + 130);
    text("Survive as long as you can!", width/2, height/2 + 130);
    
  } else if (gameState === "playing") {
    // Player movement
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
      player.x -= player.speed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
      player.x += player.speed;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
      player.y -= player.speed;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S key
      player.y += player.speed;
    }
    
    // Keep player within boundaries
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // Automatic shooting
    if (frameCount % 10 === 0) { // Shoot every 10 frames
      bullets.push({
        x: player.x,
        y: player.y,
        speed: 7
      });
    }
    
    // Update and draw bullets
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
    
    // Spawn enemies gradually
    if (random(100) < 1.8) { // 1.8% chance each frame - steady but manageable
      enemies.push({
        x: random(20, width - 20),
        y: 0,
        size: 20,
        speed: random(1.5, 3.5) // Slightly faster enemies
      });
    }
    
    // Update and draw enemies
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
    
    // Check bullet-enemy collisions
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
    
    // Draw player
    fill(0, 255, 255); // Cyan
    noStroke();
    ellipse(player.x, player.y, player.size);
    
    // Draw UI
    fill(255);
    textAlign(LEFT, TOP);
    textSize(20);
    text("Score: " + score, 10, 10);
    
  } else if (gameState === "gameOver") {
    // Game over screen
    fill(255, 100, 100);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2 - 50);
    
    fill(255);
    textSize(24);
    text("Final Score: " + score, width/2, height/2);
    
    textSize(18);
    text("Press any key to restart", width/2, height/2 + 50);
  }
}

function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  } else if (gameState === "gameOver") {
    // Reset game
    bullets = [];
    enemies = [];
    score = 0;
    player.x = width / 2;
    player.y = height / 2;
    gameState = "playing";
  }
}

// Helper function to calculate distance between two points
function distance(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}