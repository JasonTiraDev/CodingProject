// 🎮 Bonus Day 4: Visual Polish - Mini Survivors
// Today we'll make our game look amazing with graphics and effects!
// Starting with working Day 3 code, then adding visual enhancements

// ====================================
// LESSON GOALS:
// - Load and display sprite images instead of simple shapes
// - Create animated sprites with multiple frames
// - Add particle systems for explosions and effects
// - Implement screen shake and visual feedback
// - Create an animated background
// ====================================

// Starting with Day 3's working code
let player;
let gameState = "start";
let bullets = [];
let enemies = [];
let powerUps = [];
let score = 0;
let playerXP = 0;
let playerLevel = 1;
let playerHealth = 60;
let maxHealth = 60;
let currentWeapon = "basic";
let difficultyTimer = 0;
let lastDirection = {x: 0, y: -1};

// TODO: Add new variables for graphics and effects
let explosionParticles = [];  // Array to hold explosion particles
let screenShake = 0;          // Screen shake intensity
let animationFrame = 0;       // Counter for animations

// TODO: Load images in preload function
function preload() {
  // NOTE: Since we're using p5.js web editor, we'll create graphics instead of loading files
  // CHALLENGE: If you want real images, upload them to the p5.js editor first!
  
  // We'll create simple placeholder graphics for now
  // In a real project, you'd load actual image files here
}

function setup() {
  createCanvas(800, 600);
  
  // TODO: Create sprite graphics using createGraphics()
  // HINT: This creates off-screen graphics we can draw on
  // STEP 1: Create graphics for player (18x18 pixels to match Day 3)
  // STEP 2: Draw a cool spaceship design on it
  // STEP 3: Repeat for enemies and bullets
  
  // Day 3's working player setup
  player = {
    x: width / 2,
    y: height / 2,
    size: 18, // Same as Day 3
    speed: 4
  };
}

function draw() {
  // TODO: Add screen shake effect
  // HINT: Use translate() with random values when screenShake > 0
  // STEP 1: If screenShake > 0, translate by random amounts
  // STEP 2: Decrease screenShake each frame
  
  background(20, 20, 40);
  
  // TODO: Draw animated background
  // CHALLENGE: Create moving stars or patterns
  // HINT: Use loops to draw multiple elements that move over time
  
  if (gameState === "start") {
    // TODO: Enhanced start screen with animations
    // HINT: Use sin() and cos() for floating text effects
    
  } else if (gameState === "playing") {
    // TODO: Copy your game logic from Day 3
    // But replace all the basic drawing with sprite drawing
    
    // TODO: Update animation frame counter
    animationFrame++;
    
    // TODO: Draw player with sprite instead of rectangle
    // HINT: Use image() function instead of rect()
    // STEP 1: Push and pop matrix for rotation
    // STEP 2: Translate to player position
    // STEP 3: Rotate based on movement or time
    // STEP 4: Draw the sprite centered
    
    // TODO: Draw bullets with trail effects
    // CHALLENGE: Add glowing trails behind bullets
    // HINT: Draw multiple copies with decreasing opacity
    
    // TODO: Draw enemies with animation
    // HINT: Make them pulse or rotate for more life
    
    // TODO: Update and draw explosion particles
    // HINT: When enemies are destroyed, create particle bursts
    // STEP 1: Create particles with random velocity
    // STEP 2: Update particle positions
    // STEP 3: Draw particles with decreasing size/opacity
    // STEP 4: Remove particles when they fade out
    
    // TODO: Enhanced UI with graphics
    // HINT: Add borders, gradients, and icons to UI elements
    
  } else if (gameState === "gameOver") {
    // TODO: Animated game over screen
    // HINT: Add pulsing text and particle effects
    
  }
}

// TODO: Create explosion effect function
function createExplosion(x, y) {
  // CHALLENGE: Create 10-20 particles at the explosion point
  // STEP 1: Loop to create multiple particles
  // STEP 2: Give each particle random velocity and color
  // STEP 3: Add them to explosionParticles array
}

// TODO: Create screen shake function
function addScreenShake(intensity) {
  // HINT: Set screenShake variable to intensity value
  // The draw function will handle the shaking effect
}

function keyPressed() {
  // TODO: Copy your key handling from Day 3
  
}

// TODO: Helper function to create sprite graphics
function createPlayerSprite() {
  // CHALLENGE: Create a cool spaceship design
  // HINT: Use createGraphics() to make an off-screen canvas
  // STEP 1: Create graphics object
  // STEP 2: Draw spaceship shape with triangles and rectangles
  // STEP 3: Add details like engines or weapons
  // STEP 4: Return the graphics object
}

// CHALLENGES TO TRY:
// 1. Add different sprite animations for different states
// 2. Create power-up visual effects (glowing, pulsing)
// 3. Add parallax scrolling background layers
// 4. Implement sprite sheet animations
// 5. Add lighting effects and shadows

// NEXT LESSON PREVIEW:
// In Bonus Day 5, we'll add amazing sound effects and music!