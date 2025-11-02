# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mini Survivors is a JavaScript game development curriculum designed for teaching Boy Scouts (ages 14-16) intro to coding using p5.js. The project is structured as:
- **Core 3-day course** (1 hour each): Students build a complete, playable survival game
- **Bonus 3 days** (optional at-home): Progressive enhancements from weapons to advanced features

The core course is designed to get students hooked on coding, not to make them experts. The bonus days provide a path for motivated students to continue learning.

## Branch Structure

- **`main`** - Full lesson curriculum for students and teachers (starter files, completed examples, READMEs)
- **`gh-pages`** - Showcase/portfolio page with live demos (you are currently here)

## Repository Structure

The codebase follows a day-by-day lesson structure:

**Core 3-Day Course (1 hour each):**
```
1-day1-basics/        - Player movement and boundaries
2-day2-combat/        - Combat system with shooting mechanics
3-day3-complete/      - Simple health, one power-up type, heavy customization
```

**Bonus Days (At-Home Learning):**
```
4-bonus-day4-weapons/ - Multiple weapon types (Basic, Spread, Rapid)
5-bonus-day5-effects/ - Visual effects (particles, screen shake, 360° spawning)
6-bonus-day6-advanced/ - Boss battles, game modes, upgrade system
```

Each day folder contains:
- `starter.js` - Scaffolded file with TODOs and hints for students to complete
- `completed.js` - Finished reference implementation
- `README.md` - Learning objectives and teaching notes

## Demo Files

The showcase page uses these HTML files:
- `index.html` - Main showcase/portfolio page (homepage)
- `demo-day1.html` - Day 1 basic movement demo
- `demo-day2.html` - Day 2 combat system demo
- `demo-day3.html` - Day 3 complete game demo
- `demo-advanced.html` - Advanced features demo (Day 6)

## Game Architecture

### Core Game Loop Pattern
All game files follow p5.js conventions:
- `setup()` - Runs once at start, initializes game state
- `draw()` - Runs 60 times/second, main game loop
- `keyPressed()` - Handles single key press events

### Progressive Feature Additions

**Day 1 (Core):** Foundation
- Player object with position (x, y), size, speed
- Keyboard input handling (WASD + Arrow keys)
- Boundary detection using `constrain()`
- Game states: "start" and "playing"
- Start screen with instructions

**Day 2 (Core):** Combat System
- Arrays for bullets and enemies
- Collision detection using distance formula
- Automatic shooting based on `frameCount`
- ONE enemy type (basic chasing circles)
- Score tracking
- Game over and restart

**Day 3 (Core):** Complete Game + Customization
- Simple health system (3 health, take hits without instant death)
- ONE power-up type (health packs)
- Hearts display (❤️❤️❤️)
- **Heavy customization focus** (20-30 min making it their own)
- Students leave with a unique, personalized game

**Day 4 (Bonus):** Multiple Weapons
- Three weapon types: Basic, Spread, Rapid
- Direction-based shooting (bullets go where you move)
- Weapon switching with 1, 2, 3 keys
- Trigonometry for spread pattern
- Color-coded bullets (yellow, orange, cyan)

**Day 5 (Bonus):** Visual Effects
- Particle explosion effects (15 particles per enemy)
- Screen shake when taking damage
- Enemies spawn from all 4 sides (not just top)
- Canvas transformations (push/pop/translate)

**Day 6 (Bonus):** Boss Battles & Upgrades
- Boss battle system with AI patterns (4 boss types)
- Upgrade system (6 upgrades: damage, speed, health, fire rate, armor, luck)
- Advanced combat (armor, critical hits, invulnerability frames)
- Boss health bars and professional UI
- High score persistence (localStorage)
- Portfolio-worthy capstone project (multi-session, 3-5 hours)

### Key Patterns Used

**Object Storage:**
```javascript
player = {
  x: width / 2,
  y: height / 2,
  size: 20,
  speed: 4
}
```

**Array Management:**
```javascript
bullets.push({x, y, vx, vy})  // Add
bullets.splice(i, 1)           // Remove
```

**Distance-Based Collision:**
```javascript
let distance = sqrt((x1 - x2)**2 + (y1 - y2)**2)
if (distance < (size1 + size2) / 2) { /* collision */ }
```

**Game State Management:**
```javascript
if (gameState === "start") { /* menu */ }
else if (gameState === "playing") { /* gameplay */ }
```

## Development Commands

### Testing Locally

The game uses p5.js and can be tested in multiple ways:

1. **p5.js Web Editor** (recommended for students):
   - Copy JS code to https://editor.p5js.org/
   - Click Play button

2. **Local development with Live Server**:
   - Open any demo HTML file
   - Use Live Server extension (or similar)
   - Changes to linked JS files require browser refresh

3. **GitHub Pages** (deployment):
   - Committed changes to `gh-pages` branch auto-deploy
   - Available at: https://jasontiradev.github.io/CodingProject/

### No Build Process
This is a pure client-side JavaScript project with no build step, bundler, or package manager. All dependencies (p5.js) are loaded via CDN in HTML files.

## Teaching Philosophy

**Core Course Structure (Days 1-3):**
1. **Goal:** Get students hooked on coding, not make them experts
2. **Copy/paste is encouraged** - Understanding > memorizing
3. **Day 3 is 50% customization** - Students make the game their own
4. **Realistic pacing** - 1 hour sessions for 8-9 students
5. **If they leave excited, you win!**

**Bonus Days (4-6):**
- Optional at-home learning for motivated students
- Progressive complexity (weapons → effects → advanced)
- Day 6 is portfolio-worthy capstone project

**Key Principles:**
1. Students TYPE or COPY code - starter files provide detailed TODOs with hints
2. Progressive difficulty - each day builds on previous work
3. Immediate visual feedback - code changes are instantly visible
4. Working code at all times - students never start from blank file
5. Heavy emphasis on customization and ownership

**Hint Structure in Starter Files:**
```javascript
// TODO: Create a variable called gameState and set it to "start"
// HINT: Use let gameState = "start"

// TODO: Draw the player circle
// HINT: ellipse(player.x, player.y, player.size)

// 💡 CUSTOMIZE THIS: Try changing to fill(255, 0, 0) for red!
```

## Working with This Codebase

When modifying game code:
- Maintain the TODO/HINT structure in starter files
- Keep completed.js files in sync with starter.js (completed version)
- Use p5.js conventions and built-in functions (ellipse, rect, fill, etc.)
- Comment heavily for educational purposes
- Include "TRY THIS" suggestions for student experimentation

When modifying showcase page (index.html):
- Maintain responsive design (mobile-friendly)
- Keep gradient/neon aesthetic consistent
- Ensure all demo links work
- Screenshots should be in showcase-assets/ folder

## Common Modifications

**Adding new enemy types:**
1. Create enemy object in spawn function with `type` property
2. Add AI behavior in update loop
3. Add rendering in draw function with type-specific colors
4. Update collision detection if needed

**Adding new weapons:**
1. Add weapon name to weapon cycle
2. Create bullet pattern in shooting function
3. Add visual style in bullet rendering
4. Update UI to show weapon name

**Adding new power-ups:**
1. Add type to powerUps spawn array
2. Create application logic in `applyPowerUp()`
3. Add visual representation in draw function
4. Consider adding icon to showcase

## p5.js Specific Notes

- Canvas coordinates: (0,0) is top-left, y increases downward
- Colors: RGB values 0-255, optional alpha channel
- `frameCount` increments each frame (use for timing)
- `random()` for procedural generation
- `constrain()` for boundary enforcement
- Angles in radians (use `PI`, `TWO_PI`)

## GitHub Pages Deployment

The `gh-pages` branch serves as a portfolio/showcase:
- Main entry point: `index.html` (showcase page)
- All demo files must be in root directory
- Screenshots in `showcase-assets/` folder
- Changes push automatically deploy to GitHub Pages
