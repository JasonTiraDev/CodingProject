// 🎮 Day 1: Game Foundations - Mini Survivors
// COMPLETED VERSION - This is what the finished game should look like!

// ====================================
// LESSON GOALS:
// - Understand how games work (they redraw the screen many times per second!)
// - Create a player character (a colored circle) that moves with keyboard
// - Keep the player from going off the screen
// - Add a simple start screen with text
// ====================================

// STEP 1: Create variables to store game information
// Think of these like labeled boxes that hold important data

// This will hold all information about our player (position, size, speed)
let player;                    // Will hold all player information

// This keeps track of what screen we're showing
// "start" = title screen, "playing" = the actual game
// TODO: Create a variable called gameState and set it to "start"
let gameState = "start";      // Tracks which screen we're showing

// STEP 2: The setup() function runs ONCE when the game starts
function setup() {
  // Create the game window - like a piece of paper to draw on
  // TODO: Create a canvas that's 800 pixels wide and 600 pixels tall
  // HINT: Use createCanvas(width, height)
  createCanvas(800, 600);
  
  // STEP 3: Create our player character
  // This is like a character sheet with all the player's stats
  // TODO: Fill in the player object with these properties:
  // x: width / 2 (center horizontally)
  // y: height / 2 (center vertically) 
  // size: 20 (try different numbers like 15 or 30!)
  // speed: 4 (try 2 for slow or 8 for fast!)
  player = {
    x: width / 2,     // Start in center horizontally (400 pixels from left)
    y: height / 2,    // Start in center vertically (300 pixels from top)  
    size: 20,         // Size of the circle (diameter)
    speed: 4          // How many pixels to move each frame
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
    // STEP 5: Show the start screen with text
    
    // TODO: Set text color to white
    // HINT: Use fill(255, 255, 255) or just fill(255)
    fill(255, 255, 255);           // Set text color to white
    
    // TODO: Make text big for the title
    // HINT: Use textSize(48)
    textSize(48);                  // Make text big for title
    
    // TODO: Center the text on screen
    // HINT: Use textAlign(CENTER, CENTER)
    textAlign(CENTER, CENTER);     // Center text on screen
    
    // TODO: Draw the title text
    // HINT: Use text("MINI SURVIVORS", width/2, height/2 - 50)
    // 💡 TRY THIS: Change "MINI SURVIVORS" to your own game title!
    text("MINI SURVIVORS", width/2, height/2 - 50);
    
    // TODO: Make text smaller and add instructions
    // HINT: textSize(24) then text("Press any key to start", width/2, height/2 + 50)
    textSize(24);                  // Smaller text for instructions
    text("Press any key to start", width/2, height/2 + 50);
    
    // TODO: Add controls instruction
    // HINT: textSize(16) then text("Use WASD or Arrow Keys to move", width/2, height/2 + 100)
    textSize(16);                  // Even smaller for controls
    text("Use WASD or Arrow Keys to move", width/2, height/2 + 100);
    
  } else if (gameState === "playing") {
    // STEP 6: Handle player movement
    // Check if keys are being pressed RIGHT NOW
    
    // TODO: Check if LEFT arrow or 'A' key is pressed, then move left
    // HINT: if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    // HINT:   player.x = player.x - player.speed;
    // HINT: }
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Left arrow OR 'A' key (65 is A's code)
      player.x = player.x - player.speed;        // Move left (subtract from x)
    }
    
    // TODO: Check if RIGHT arrow or 'D' key is pressed, then move right
    // HINT: if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    // HINT:   player.x = player.x + player.speed;
    // HINT: }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Right arrow OR 'D' key
      player.x = player.x + player.speed;         // Move right (add to x)
    }
    
    // TODO: Check if UP arrow or 'W' key is pressed, then move up
    // HINT: if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    // HINT:   player.y = player.y - player.speed; (y gets smaller going up!)
    // HINT: }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {    // Up arrow OR 'W' key
      player.y = player.y - player.speed;         // Move up (subtract from y!)
    }
    
    // TODO: Check if DOWN arrow or 'S' key is pressed, then move down  
    // HINT: if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    // HINT:   player.y = player.y + player.speed;
    // HINT: }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {  // Down arrow OR 'S' key
      player.y = player.y + player.speed;         // Move down (add to y)
    }
    
    // STEP 7: Keep player on the screen
    // TODO: Use constrain() to keep player within screen boundaries
    // HINT: player.x = constrain(player.x, player.size/2, width - player.size/2);
    // HINT: player.y = constrain(player.y, player.size/2, height - player.size/2);
    player.x = constrain(player.x, player.size/2, width - player.size/2);
    player.y = constrain(player.y, player.size/2, height - player.size/2);
    
    // STEP 8: Draw the player as a colored circle
    // TODO: Set the fill color for the player
    // HINT: fill(0, 255, 255) makes cyan (Red=0, Green=255, Blue=255)
    // 💡 TRY THIS: Use fill(255, 0, 0) for red or fill(0, 255, 0) for green!
    fill(0, 255, 255);    // Cyan color (Red=0, Green=255, Blue=255)
    
    // TODO: Remove the outline from the circle
    // HINT: Use noStroke()
    noStroke();           // No outline around the circle
    
    // TODO: Draw the player circle
    // HINT: ellipse(player.x, player.y, player.size)
    ellipse(player.x, player.y, player.size);
    
    // TODO: Add helpful text in the corner
    // HINT: fill(255) for white text, then textAlign(LEFT, TOP)
    // HINT: textSize(16), then text("Move with WASD or Arrow Keys", 10, 10)
    fill(255);            // White text
    textAlign(LEFT, TOP); // Align to top-left corner
    textSize(16);
    text("Move with WASD or Arrow Keys", 10, 10);
  }
}

// STEP 9: Handle when someone presses a key ONCE (not holding it down)
function keyPressed() {
  // TODO: If we're on the start screen, change to playing when any key is pressed
  // HINT: if (gameState === "start") {
  // HINT:   gameState = "playing";
  // HINT: }
  if (gameState === "start") {
    gameState = "playing";
  }
}

// 🎯 EASY MODIFICATIONS TO TRY:
// 1. Change player.size to 30 or 15 - what happens?
// 2. Change player.speed to 2 or 8 - how does it feel?
// 3. Change fill(0, 255, 255) to fill(255, 0, 255) - what color is that?
// 4. Change the canvas size: createCanvas(1000, 800)
// 5. Change the background color: background(100, 50, 200)
// 6. Add your name to the title screen!

// 🚀 HARDER CHALLENGES (if you finish early):
// 1. Make the player change color when moving
// 2. Add text showing the player's X and Y position
// 3. Make the player leave a trail behind
// 4. Add a border around the screen

// NEXT TIME:
// We'll add enemies that chase you and learn about collision detection!