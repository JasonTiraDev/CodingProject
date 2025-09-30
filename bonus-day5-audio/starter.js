// 🎮 Bonus Day 5: Audio Integration - Mini Survivors
// Today we'll add immersive sound effects and music!
// Starting with working Day 4 code, then adding audio features

// ====================================
// LESSON GOALS:
// - Add sound effects for game actions
// - Create background music that loops
// - Make audio-reactive visual elements
// - Add volume controls for players
// - Create procedural audio for dynamic effects
// ====================================

// Starting with Day 4's working code (including all visual effects)
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
let explosionParticles = [];
let screenShake = 0;
let animationFrame = 0;

// TODO: Add new variables for audio
let soundEnabled = true;  // Master sound toggle
let musicVolume = 0.5;    // Background music volume
let sfxVolume = 0.7;      // Sound effects volume

// NOTE: For p5.js web editor, you'll need to add p5.sound library
// Go to index.html and add this line in the head section:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>

function preload() {
  // TODO: Load audio files (or create procedural sounds)
  // CHALLENGE: Upload audio files to p5.js editor or create sounds with code
  
  // For now, we'll create procedural sounds using p5.sound
  // In a real project, you'd load actual audio files here
}

function setup() {
  createCanvas(800, 600);
  
  // TODO: Create procedural audio oscillators
  // HINT: Use p5.sound oscillators for dynamic sound effects
  // STEP 1: Create oscillators for different sound types
  // STEP 2: Set default frequencies and types
  // STEP 3: Set volumes to 0 initially
  
  // Day 4's working player setup (includes all visual enhancements)
  player = {
    x: width / 2,
    y: height / 2,
    size: 18, // Same as Days 3-4
    speed: 4
  };
  
  // TODO: Start background music
  // HINT: Create a looping ambient sound
  
}

function draw() {
  // TODO: Copy your visual code from Day 4
  
  // TODO: Add audio-reactive visual elements
  // CHALLENGE: Make elements pulse or change with music
  // HINT: Use getLevel() or analyze() to get audio data
  
  if (gameState === "start") {
    // TODO: Copy start screen from Day 4
    // Add: Volume control instructions
    
  } else if (gameState === "playing") {
    // TODO: Copy all game logic from Day 4
    
    // TODO: Add sound triggers for game events
    // HINT: Play sounds when things happen in the game
    
    // When player shoots:
    // STEP 1: Check if bullet was just created
    // STEP 2: Play shooting sound effect
    
    // When enemy is destroyed:
    // STEP 1: Check if enemy was just removed
    // STEP 2: Play explosion sound
    // STEP 3: Maybe add audio-reactive screen effects
    
    // When power-up is collected:
    // STEP 1: Check if power-up was collected
    // STEP 2: Play power-up sound
    
    // When player takes damage:
    // STEP 1: Check if health decreased
    // STEP 2: Play damage sound
    // STEP 3: Maybe distort audio briefly
    
    // TODO: Dynamic music based on game state
    // CHALLENGE: Change music intensity based on danger level
    // HINT: Adjust tempo or add layers based on enemy count
    
    // TODO: Draw audio visualizations
    // HINT: Show sound waves or frequency bars as decoration
    
    // TODO: Draw volume controls
    // HINT: Show current volume levels and controls
    
  } else if (gameState === "gameOver") {
    // TODO: Copy game over screen from Day 4
    // Add: Play game over sound once
    
  }
}

function keyPressed() {
  // TODO: Copy key handling from Day 4
  
  // TODO: Add audio control keys
  // HINT: Use M to mute/unmute, +/- to adjust volume
  // STEP 1: Check for 'M' key to toggle sound
  // STEP 2: Check for '+' and '-' keys for volume
  // STEP 3: Update volume variables and apply to sounds
  
}

// TODO: Create procedural sound effects
function playShootSound() {
  // CHALLENGE: Create a laser-like shooting sound
  // HINT: Use oscillator with quick frequency sweep
  // STEP 1: Set oscillator frequency (high pitch)
  // STEP 2: Start the sound
  // STEP 3: Quickly fade out
}

function playExplosionSound() {
  // CHALLENGE: Create an explosion sound
  // HINT: Use noise and low frequency rumble
  // STEP 1: Create brief noise burst
  // STEP 2: Add low frequency component
  // STEP 3: Quick fade out
}

function playPowerUpSound() {
  // CHALLENGE: Create a pleasant power-up sound
  // HINT: Use ascending musical notes
  // STEP 1: Play sequence of rising tones
  // STEP 2: Add slight echo effect
}

// TODO: Update background music intensity
function updateMusicIntensity() {
  // CHALLENGE: Make music more intense when more enemies are present
  // HINT: Adjust volume, add filters, or change tempo
  // STEP 1: Calculate danger level (enemy count, player health)
  // STEP 2: Adjust music parameters accordingly
}

// TODO: Create audio-reactive visuals
function drawAudioVisualization() {
  // CHALLENGE: Create visual elements that react to audio
  // HINT: Use FFT analysis to get frequency data
  // STEP 1: Get frequency spectrum data
  // STEP 2: Draw bars or circles that scale with frequencies
  // STEP 3: Use different colors for different frequency ranges
}

// CHALLENGES TO TRY:
// 1. Add 3D positioned audio (sounds come from enemy directions)
// 2. Create dynamic music that layers instruments based on score
// 3. Add voice synthesizer for announcements
// 4. Create rhythm-based gameplay elements
// 5. Add environmental audio (ambient space sounds)

// NEXT LESSON PREVIEW:
// In Bonus Day 6, we'll add boss battles and advanced game mechanics!