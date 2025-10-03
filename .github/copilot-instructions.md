# 🎮 Mini Survivors - AI Coding Agent Instructions

This project is a **6-day progressive JavaScript game development curriculum** for students aged 14-16. Understanding the educational structure and learning progression is crucial for providing appropriate assistance.

## 🎯 Project Overview

**Mini Survivors** is an educational p5.js game development course that teaches programming fundamentals through building an increasingly complex survival game. The course follows a carefully designed educational scaffolding approach where each day builds upon the complete functionality of the previous day.

### Core Framework
- **Language**: JavaScript with p5.js creative coding library
- **Target Audience**: Students aged 14-16 with minimal programming experience
- **Educational Philosophy**: Progressive complexity, hands-on learning, immediate visual feedback
- **Platform**: Web browser using p5.js Web Editor (https://editor.p5js.org/)

## 📁 Educational File Structure Pattern

Each lesson day follows this critical structure:
```
{day-folder}/
├── starter.js       # SCAFFOLDED LEARNING FILE - Previous day's completed functionality + current day's TODOs
├── completed.js     # REFERENCE SOLUTION - Full implementation of all features for that day
└── README.md        # Teaching instructions and lesson plans
```

### ⚠️ CRITICAL Educational Pattern
- **starter.js**: Contains the COMPLETE working code from the previous day PLUS TODO comments for the current day's new features
- **completed.js**: Shows the full implementation with all current day features working
- **This scaffolding ensures students always start with a solid foundation**

## 🏗️ Course Progression Architecture

### Core Curriculum (Days 1-3)
1. **Day 1: Game Foundations** (`1-day1-basics/`)
   - Player movement with arrow keys
   - Game loop fundamentals (`setup()`, `draw()`)
   - Coordinate system understanding
   - Basic game states (start screen)
   - **Key Concepts**: Variables, functions, user input, game loops

2. **Day 2: Combat System** (`2-day2-combat/`)
   - Builds on Day 1's complete player movement
   - Adds enemies, bullets, collision detection
   - Array management for game objects
   - Score system and game over states
   - **Key Concepts**: Arrays, collision detection, object lifecycle

3. **Day 3: Complete Game** (`3-day3-complete/`)
   - Builds on Day 2's complete combat system
   - Multiple weapon types (basic, spread, orbital)
   - XP system and leveling progression
   - Power-ups and weapon switching
   - **Key Concepts**: Complex systems, game balance, state management

### Bonus Curriculum (Days 4-6)
4. **Bonus Day 4: Visual Polish** (`4-bonus-day4-visuals/`)
   - Builds on Day 3's complete game
   - Particle systems for explosions
   - Screen shake effects
   - Sprite animations and visual feedback
   - **Key Concepts**: Graphics programming, user experience

5. **Bonus Day 5: Audio Integration** (`5-bonus-day5-audio/`)
   - Builds on Day 4's visual game
   - p5.sound library integration
   - Sound effects and background music
   - Audio-reactive visual elements
   - **Key Concepts**: Multimedia programming, audio APIs

6. **Bonus Day 6: Advanced Mechanics** (`6-bonus-day6-advanced/`)
   - Builds on Day 5's audio-visual game
   - Boss battles with complex AI patterns
   - Player upgrade systems
   - Multiple game modes (Classic, Endless, Boss Rush)
   - **Key Concepts**: Advanced AI, system design, scalable architecture

## 🎮 Game Architecture & Systems

### Core Game Object Structure
```javascript
// Player object pattern
player = {
  x: width / 2,
  y: height / 2, 
  size: 18,
  speed: 4,
  health: 60,
  // ... other properties
}

// Array-based entity management
let bullets = [];      // Player projectiles
let enemies = [];      // Enemy entities
let powerUps = [];     // Collectible items
let explosionParticles = []; // Visual effects (Day 4+)
```

### Key Technical Patterns

#### Educational Scaffolding Pattern
- Each day's `starter.js` = Previous day's `completed.js` + new TODOs
- Students never start from scratch after Day 1
- Progressive complexity ensures student success

#### Game Loop Structure
```javascript
function setup() {
  // One-time initialization
  createCanvas(800, 600);
  // Initialize game objects
}

function draw() {
  background(20);
  
  if (gameState === "playing") {
    // Update game logic
    // Draw all objects
    // Handle collisions
  }
  // Handle other game states
}
```

#### Collision Detection Pattern
```javascript
// Standard distance-based collision
if (dist(bullet.x, bullet.y, enemy.x, enemy.y) < bullet.size + enemy.size) {
  // Handle collision
}
```

## 🎯 AI Assistant Guidelines

### When Helping with This Project

#### 1. Respect the Educational Structure
- **NEVER** give complete solutions for current day TODOs
- **ALWAYS** guide students through problem-solving steps
- **ENCOURAGE** experimentation and testing
- **REFERENCE** the learning objectives for each day

#### 2. Code Assistance Approach
- Help debug existing code rather than rewriting
- Explain concepts in age-appropriate language (14-16 years old)
- Encourage incremental testing ("Try this change and see what happens")
- Point to relevant p5.js documentation when appropriate

#### 3. Maintain Educational Progression
- If asked about advanced features, check which day the student is on
- Don't introduce concepts from later days prematurely
- Respect the scaffolding - students should have working foundation code

#### 4. Common Student Challenges
- **Syntax Errors**: Guide to error messages, bracket matching
- **Logic Errors**: Help trace through code step-by-step
- **Performance Issues**: Explain loop optimization, array management
- **Creative Ideas**: Encourage but keep within current day's scope

### 🚫 What NOT to Do
- Don't provide complete `starter.js` or `completed.js` files
- Don't skip ahead to advanced concepts students haven't learned
- Don't rewrite large sections of student code
- Don't ignore the educational progression structure

### ✅ What TO Do
- Guide students through debugging processes
- Explain p5.js concepts clearly and simply
- Encourage creative modifications within scope
- Help students understand error messages
- Suggest testing strategies ("Let's try just moving the player first")

## 📚 Technical Reference

### p5.js Core Functions Used
- **Setup/Draw**: `setup()`, `draw()`, `createCanvas()`
- **Drawing**: `circle()`, `rect()`, `line()`, `text()`, `background()`, `fill()`, `stroke()`
- **Input**: `keyIsDown()`, `keyPressed()`, `mousePressed()`
- **Math**: `dist()`, `random()`, `constrain()`, `map()`, `cos()`, `sin()`
- **Arrays**: `push()`, `splice()`, `filter()`, `for...of` loops

### Game Development Concepts
- **Game States**: Start screen, playing, game over, upgrade screen
- **Entity Management**: Creating, updating, and removing game objects
- **Collision Systems**: Distance-based collision detection
- **Progression**: XP, leveling, difficulty scaling
- **Visual Feedback**: Particles, screen shake, UI elements

### Advanced Features (Bonus Days)
- **Particle Systems**: Array-based visual effects
- **Audio Integration**: p5.sound library usage
- **AI Patterns**: Boss movement and attack patterns
- **Upgrade Systems**: Player progression mechanics

## 🎨 Creative Customization Areas

Students are encouraged to modify:
- Colors and visual styles
- Movement speeds and game balance
- Enemy types and behaviors (within current day scope)
- UI elements and displays
- Sound effects and music (Day 5+)
- Particle effects and animations (Day 4+)

## 🔧 Common Debugging Patterns

### Typical Student Issues
1. **Nothing appears**: Check `createCanvas()`, `background()`, `fill()`
2. **Movement not working**: Verify `draw()` loop, check `keyIsDown()`
3. **Collisions not detecting**: Debug with `console.log()`, check distance calculations
4. **Performance problems**: Count array lengths, optimize nested loops
5. **Audio not playing**: Check p5.sound library loading (Day 5+)

### Debugging Teaching Approach
1. Help students identify the problem area
2. Guide them to add `console.log()` statements
3. Test with simplified versions
4. Compare with working reference code
5. Encourage systematic testing

## 🎯 Success Metrics

### Student Achievement Indicators
- Can explain their code changes to others
- Successfully debugs simple issues independently
- Shows creativity in customizing game features
- Demonstrates understanding of core programming concepts
- Expresses interest in continuing programming learning

### Educational Goals
- **Technical Skills**: Programming fundamentals, game development concepts
- **Problem Solving**: Debugging, logical thinking, systematic testing
- **Creativity**: Game design, visual customization, feature ideas
- **Confidence**: Willingness to experiment and learn from mistakes

---

## 🎓 Remember: This is Educational Code

This project prioritizes **learning progression** over optimal code architecture. The educational scaffolding is intentional and crucial for student success. When assisting students, focus on their learning journey rather than perfect code solutions.

**The goal is to build confident, creative programmers who understand that complex systems are built incrementally from simple foundations.**