# 🎮 Bonus Day 4: Multiple Weapons

## 📚 What You'll Learn (Optional Extension!)
- **Direction vectors** - Track which way the player is moving
- **Velocity-based movement** - Bullets that fly in ANY direction
- **Multiple weapon types** - Different shooting patterns
- **Trigonometry basics** - Math.atan2(), Math.cos(), Math.sin()
- **Weapon switching** - Change weapons on the fly

## 🎯 What You'll Build
Building on your **Day 3 complete game**, you'll add:
- 🔫 **Three weapon types:**
  - **Basic** - Single bullet, balanced fire rate
  - **Spread** - Three bullets at once, slower fire rate
  - **Rapid** - Fast fire rate, single bullet
- 🎯 **Directional shooting** - Bullets fly where you're moving
- 🔢 **Weapon switching** - Press 1, 2, 3 to change weapons
- 🎨 **Color-coded bullets** - Yellow, orange, cyan for each type

## ⚙️ Prerequisites

**You MUST finish Day 3 first!** This builds on:
- Health system (3 health)
- Power-ups (health packs)
- All the Day 2 combat mechanics

## 🎮 How to Get Started

### For Students:
1. **Make sure Day 3 is working!** - This adds weapons to that game
2. Open the `starter.js` file - it starts with working Day 3 code
3. Follow the TODOs (there are 17 steps)
4. **The trickiest part:** Spread weapon uses trigonometry!
5. Test each weapon as you add it
6. Try all three weapons and pick your favorite!

### Quick Start:
1. Go to [p5.js Web Editor](https://editor.p5js.org/)
2. Copy the Day 4 `starter.js` code into the editor
3. Complete Steps 1-17 (direction tracking + weapon system)
4. Test it works!
5. Press 1, 2, 3 to switch weapons while playing!

**New Controls:**
- **1 key**: Switch to Basic weapon
- **2 key**: Switch to Spread weapon
- **3 key**: Switch to Rapid weapon
- Everything else same as Day 3

## 🔫 How Each Weapon Works

### Basic Weapon (Press 1)
- **Fire Rate:** Medium (every 15 frames)
- **Bullets:** 1 bullet per shot
- **Speed:** 7 pixels/frame
- **Color:** Yellow
- **Best For:** Balanced gameplay, good all-around

### Spread Weapon (Press 2)
- **Fire Rate:** Slow (every 20 frames)
- **Bullets:** 3 bullets per shot in a spread pattern
- **Speed:** 6 pixels/frame (slightly slower)
- **Color:** Orange
- **Best For:** Lots of enemies, wide coverage
- **Uses Math:** Trigonometry to create the spread!

### Rapid Weapon (Press 3)
- **Fire Rate:** Fast (every 8 frames)
- **Bullets:** 1 bullet per shot
- **Speed:** 8 pixels/frame (slightly faster)
- **Color:** Cyan
- **Best For:** Single targets, fast reflexes

## 🧮 New Concepts Explained

### Direction Vectors
```javascript
lastDirection = {x: 0, y: -1}  // Shooting up
lastDirection = {x: 1, y: 0}   // Shooting right
```
This tracks which way you're moving so bullets know where to go!

### Velocity (vx, vy)
Instead of just `y -= speed`, bullets now have:
- `vx`: velocity in x direction (left/right)
- `vy`: velocity in y direction (up/down)

This lets bullets move diagonally!

### Trigonometry (for Spread Weapon)
```javascript
let angle = Math.atan2(y, x);        // Get angle from direction
let vx = Math.cos(angle) * speed;    // Convert to x velocity
let vy = Math.sin(angle) * speed;    // Convert to y velocity
```
Don't worry if this looks scary - the hints show you exactly what to do!

## 💡 Teaching Notes

### For Teachers/Mentors:

**Concepts Covered:**
- Direction vectors and movement
- Velocity-based physics
- Basic trigonometry (angles, sin, cos)
- Weapon balancing (fire rate vs bullet count)
- User input (key switching)

**Difficulty Level:**
- The spread weapon is the hardest part (trigonometry)
- Students can skip spread if it's too complex
- Basic and Rapid weapons are straightforward

**Time Estimate:**
- 30-45 minutes if comfortable with Day 3
- 1 hour if they struggle with trigonometry
- Can split across multiple sessions

**Common Issues:**
- **"Spread weapon doesn't work"** - Check the Math.atan2() base angle
- **"Bullets go wrong direction"** - lastDirection not updating
- **"Weapon won't switch"** - Check if they're in "playing" state
- **"Spread bullets too close"** - Increase spreadAngle (try 0.5)

## 🎨 Customization Ideas

**Easy:**
- Change fire rates (make rapid SUPER fast!)
- Change bullet colors
- Change bullet sizes per weapon
- Add more health or fewer enemies to test weapons

**Medium:**
- Add a 4th weapon (laser that shoots through enemies?)
- Make spread shoot 5 bullets instead of 3
- Give each weapon different damage amounts
- Add weapon reload times

**Hard:**
- Add weapon upgrades (collect power-ups to improve weapons)
- Make enemies drop weapon power-ups
- Add ammo system (limited bullets per weapon)
- Create a "shotgun" weapon with random spread

## 🗣️ Great Questions for Students

1. **"Which weapon is your favorite? Why?"**
2. **"What happens if you make spread shoot 10 bullets?"**
3. **"Can you make rapid weapon fire EVERY frame?"**
4. **"What if weapons had different damage?"**
5. **"Can you create a new weapon nobody's thought of?"**

## ➡️ What's Next (Day 5)?

Once you have working weapons, Day 5 adds **visual polish**:
- 💥 Particle explosions when enemies die
- 📳 Screen shake when you take damage
- 🔄 Enemies spawn from ALL sides (not just top)
- 🎵 Optional: Sound effects

**Keep going!** You're building something really cool. 🚀

## 🎊 What You Accomplished

By completing Day 4, you've learned:
- ✅ Direction vectors and velocity
- ✅ Three unique weapon systems
- ✅ Basic trigonometry (spread weapon)
- ✅ Game balance and weapon design
- ✅ More complex user input

**This is getting ADVANCED!** 🎮
