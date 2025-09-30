// 🎮 Bonus Day 6: Advanced Mechanics - Mini Survivors
// Today we'll create the ultimate survival experience with boss battles!
// Starting with working Day 5 code, then adding advanced systems

// ====================================
// LESSON GOALS:
// - Create boss enemies with complex AI patterns
// - Build a comprehensive upgrade system
// - Add multiple game modes for variety
// - Implement advanced combat mechanics
// - Create a complete game experience
// ====================================

// Starting with Day 5's working code (including all audio and visual effects)
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
let explosionParticles = [];
let screenShake = 0;
let animationFrame = 0;
let soundEnabled = true;
let musicVolume = 0.5;
let sfxVolume = 0.7;

// TODO: Add new variables for advanced features
let bosses = [];              // Array to hold boss enemies
let gameMode = "survival";    // Current game mode
let upgradePoints = 0;        // Points for buying upgrades
let invulnerabilityTime = 0;  // Frames of invulnerability after damage
let highScore = 0;            // Best score achieved

function setup() {
  createCanvas(800, 600);
  
  // Day 5's working player setup (includes all audio and visual enhancements)
  player = {
    x: width / 2,
    y: height / 2,
    size: 18, // Consistent with Days 3-5
    speed: 4
  };
  
  // TODO: Load high score from localStorage
  // HINT: Use localStorage.getItem() to save between sessions
  
}

function draw() {
  // TODO: Copy your visual and audio code from Day 5
  
  if (gameState === "start") {
    // TODO: Enhanced start screen with game mode selection
    // HINT: Show options for different game modes
    // STEP 1: Display game mode options
    // STEP 2: Show high score
    // STEP 3: Show controls for mode selection
    
  } else if (gameState === "playing") {
    // TODO: Copy all enhanced game logic from Day 5
    
    // TODO: Update invulnerability timer
    // HINT: Decrease invulnerabilityTime each frame
    
    // TODO: Handle different game modes
    if (gameMode === "survival") {
      // CHALLENGE: Endless gameplay with periodic boss spawns
      // STEP 1: Normal enemy spawning
      // STEP 2: Every few minutes, spawn a boss
      // STEP 3: Difficulty increases over time
      
    } else if (gameMode === "waves") {
      // CHALLENGE: Structured waves with breaks for upgrades
      // STEP 1: Spawn specific number of enemies per wave
      // STEP 2: When wave cleared, show upgrade menu
      // STEP 3: Increase wave difficulty
      
    } else if (gameMode === "boss_rush") {
      // CHALLENGE: Continuous boss battles
      // STEP 1: Spawn boss immediately
      // STEP 2: When defeated, spawn next boss
      // STEP 3: Each boss is stronger than the last
      
    }
    
    // TODO: Enhanced combat system with armor and crits
    // HINT: Modify damage calculations for advanced mechanics
    // STEP 1: When player takes damage, subtract armor first
    // STEP 2: Apply invulnerability frames
    // STEP 3: Calculate critical hits for player damage
    
    // TODO: Boss AI and behavior
    // CHALLENGE: Create different boss types with unique patterns
    // 
    // Spinner Boss:
    // STEP 1: Moves in circular patterns around player
    // STEP 2: Shoots radial bullet patterns
    // STEP 3: Has multiple phases with different behaviors
    //
    // Charger Boss:
    // STEP 1: Charges directly at player after telegraphing
    // STEP 2: Vulnerable during recovery time
    // STEP 3: Gets faster as health decreases
    //
    // Shooter Boss:
    // STEP 1: Stays at distance and shoots aimed projectiles
    // STEP 2: Occasionally spawns mini enemies
    // STEP 3: Bullet patterns get more complex over time
    
    // TODO: Advanced UI with boss health bars
    // HINT: Show boss health, wave number, upgrade points
    
  } else if (gameState === "upgrade") {
    // TODO: Upgrade selection screen
    // CHALLENGE: Show 3 random upgrade options
    // STEP 1: Display upgrade choices
    // STEP 2: Show what each upgrade does
    // STEP 3: Allow player to select one
    
  } else if (gameState === "gameOver") {
    // TODO: Enhanced game over with stats
    // HINT: Show detailed game statistics and achievements
    
  }
}

function keyPressed() {
  // TODO: Copy key handling from Day 5
  
  if (gameState === "start") {
    // TODO: Game mode selection keys
    // HINT: Use 1, 2, 3 keys to select game modes
    
  } else if (gameState === "upgrade") {
    // TODO: Upgrade selection keys
    // HINT: Use 1, 2, 3 keys to choose upgrades
    
  }
}

// TODO: Create boss classes or objects
function createSpinnerBoss(x, y) {
  // CHALLENGE: Boss that spins and shoots radial patterns
  // STEP 1: Create boss object with health, position, rotation
  // STEP 2: Add behavior patterns (spinning, shooting)
  // STEP 3: Add phase transitions based on health
}

function createChargerBoss(x, y) {
  // CHALLENGE: Boss that charges at player
  // STEP 1: Create boss with charge timing mechanics
  // STEP 2: Add telegraph warning before charges
  // STEP 3: Add vulnerable recovery periods
}

function createShooterBoss(x, y) {
  // CHALLENGE: Boss that shoots complex bullet patterns
  // STEP 1: Create boss with aimed shooting
  // STEP 2: Add bullet pattern variations
  // STEP 3: Add minion spawning ability
}

// TODO: Upgrade system functions
function generateUpgradeOptions() {
  // CHALLENGE: Create 3 random upgrade choices
  // Possible upgrades:
  // - Health Boost (+20 max health)
  // - Armor Plating (+5 armor)
  // - Speed Boost (+1 speed)
  // - Rapid Fire (-3 fire rate)
  // - Power Shot (+1 damage)
  // - Lucky Shot (+5% crit chance)
}

function applyUpgrade(upgradeType) {
  // TODO: Apply the selected upgrade to player stats
  // HINT: Modify playerStats object based on upgrade type
}

// TODO: Advanced collision detection with armor
function playerTakeDamage(damage) {
  // CHALLENGE: Implement armor system and invulnerability
  // STEP 1: Check if player is invulnerable
  // STEP 2: Reduce damage by armor amount
  // STEP 3: Apply remaining damage to health
  // STEP 4: Set invulnerability frames
  // STEP 5: Add screen shake and effects
}

// TODO: Save/load high score system
function saveHighScore() {
  // HINT: Use localStorage.setItem() to save between sessions
}

function loadHighScore() {
  // HINT: Use localStorage.getItem() to load saved score
}

// FINAL CHALLENGES:
// 1. Add achievements system (survive X minutes, defeat Y bosses)
// 2. Create leaderboard with multiple score categories
// 3. Add custom difficulty settings
// 4. Create boss rush with randomized boss order
// 5. Add secret unlockable content
// 6. Create level editor for custom challenges

// CONGRATULATIONS!
// You've built a complete, professional-quality game!
// You now understand advanced game development concepts including:
// - Complex AI and behavior systems
// - Player progression and upgrade mechanics
// - Multiple game modes and variety
// - Advanced combat and damage systems
// - Data persistence and high scores
//
// Keep experimenting and creating amazing games!