// 🎮 Bonus Day 6: Boss Battles & Upgrades - Mini Survivors
// Starting with your complete Day 5 effects game, now let's add BOSSES and UPGRADES!
// This is your portfolio project - a complete game with advanced features!

// ====================================
// LESSON GOALS:
// - Create four epic boss enemies with unique AI patterns
// - Build a player upgrade system with 6 different upgrades
// - Implement boss health bars and professional UI
// - Add advanced combat mechanics (armor, critical hits, invulnerability frames)
// - Save high scores using localStorage
// - Create a complete, professional-quality game to show off!
// ====================================

// STEP 1: All your working Day 5 variables (complete audio+visual game foundation!)
let player;                    // Player object with rotation, visuals, audio
let gameState = "start";       // Current game screen
let bullets = [];              // Array of all bullets with trails and audio
let enemies = [];              // Array of all enemies with pulsing animation
let powerUps = [];             // Array of power-ups with glow effects and sounds
let score = 0;                 // Player's current score
let playerXP = 0;              // Experience points for leveling
let playerLevel = 1;           // Current player level
let playerHealth = 60;         // Current health (can take damage!)
let maxHealth = 60;            // Maximum possible health
let currentWeapon = "basic";   // Current weapon type with unique sounds
let difficultyTimer = 0;       // Tracks time to increase difficulty
let lastDirection = {x: 0, y: -1}; // Direction player is facing for shooting

// Visual effect variables from Day 4-5
let explosionParticles = [];   // Array of explosion particles
let screenShake = 0;           // Screen shake intensity
let animationFrame = 0;        // Animation counter

// Audio variables from Day 5
let soundEnabled = true;       // Master sound toggle
let musicVolume = 0.3;         // Background music volume
let sfxVolume = 0.7;           // Sound effects volume

// STEP 2: NEW variables for advanced game mechanics!
// TODO: Add variables for boss system
// HINT: let bosses = []; (array to hold boss enemies)
// HINT: let bossSpawnTimer = 0; (tracks when to spawn next boss)

// NOTE: This is survival mode - fight enemies and bosses as long as you can!
// The completed.js has optional game modes you can explore later

// TODO: Add variables for upgrade system  
// HINT: let upgradePoints = 0; (currency for buying upgrades)
// HINT: let playerStats = { armor: 0, critChance: 0.1, critDamage: 2.0 }; (player stats)

// TODO: Add variables for advanced combat
// HINT: let invulnerabilityTime = 0; (frames of invulnerability after damage)
// HINT: let comboMultiplier = 1; (score multiplier for consecutive kills)
// HINT: let comboTimer = 0; (time left on current combo)

// TODO: Add variables for persistence
// HINT: let highScore = 0; (best score achieved)
// HINT: let totalPlayTime = 0; (lifetime play time)

// STEP 3: Enhanced setup() with advanced game initialization
function setup() {
  createCanvas(800, 600);
  
  // TODO: Initialize audio system (copy from Day 5)
  // HINT: Create oscillators for all sound effects
  // HINT: shootSound = new p5.Oscillator('triangle');
  // HINT: explosionSound = new p5.Oscillator('sawtooth');
  // HINT: powerUpSound = new p5.Oscillator('sine');
  // HINT: damageSound = new p5.Oscillator('square');
  // HINT: backgroundMusic = new p5.Oscillator('sine');
  // HINT: Don't forget to set frequencies and start them!
  
  // Your working player setup from Day 5 (with all enhancements)
  player = {
    x: width / 2,     // Start in center horizontally
    y: height / 2,    // Start in center vertically
    size: 18,         // Size for collision detection
    speed: 4,         // Movement speed
    rotation: 0,      // Sprite rotation from Day 4
    // TODO: Add advanced player stats
    // HINT: armor: 0, (reduces incoming damage)
    // HINT: critChance: 0.1, (10% chance for critical hits)
    // HINT: critDamage: 2.0, (critical hits do 2x damage)
  };
  
  // TODO: Load saved data from localStorage
  // HINT: let savedHighScore = localStorage.getItem('miniSurvivorsHighScore');
  // HINT: if (savedHighScore) highScore = parseInt(savedHighScore);
  // 💡 TRY THIS: This saves the high score between play sessions!
  
  // Survival mode - fight as long as you can!
  // Bosses spawn automatically as you progress
}

function draw() {
  // TODO: Copy your visual and audio code from Day 5
  
  if (gameState === "start") {
    // TODO: Enhanced start screen
    // HINT: Show game title, high score, and controls
    // STEP 1: Display "MINI SURVIVORS - ULTIMATE EDITION"
    // STEP 2: Show high score from localStorage
    // STEP 3: Show controls (any key to start, U for upgrades)
    
  } else if (gameState === "playing") {
    // TODO: Copy all enhanced game logic from Day 5
    
    // TODO: Update invulnerability timer
    // HINT: Decrease invulnerabilityTime each frame

    // TODO: Survival mode gameplay
    // HINT: Spawn enemies continuously with increasing difficulty
    // STEP 1: Normal enemy spawning (like Day 5)
    // STEP 2: Every 5 levels, spawn a random boss
    // STEP 3: Difficulty increases over time (faster spawns, tougher enemies)
    
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
    // Start the game or open upgrade shop
    // Any key starts, U opens upgrades
    
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
// - Complex AI and boss behavior systems
// - Player progression and upgrade mechanics
// - Advanced combat (armor, crits, invulnerability frames)
// - Data persistence with localStorage
// - Boss battles with health bars and patterns
//
// Keep experimenting and creating amazing games!