# 🎮 Day 3: Complete Mini Survivors Game
*Building on Day 2's combat system to create a full-featured survival game*

## 🎯 What Students Will Build Today
Starting with their **completed Day 2 combat game**, students will add:
- **Multiple Weapon Types**: Basic, Spread, and Rapid fire modes
- **XP and Leveling System**: Collect experience, level up, get stronger
- **Power-up Collection**: Health, weapon upgrades, and speed boosts
- **Health System**: Take multiple hits instead of instant death
- **Progressive Difficulty**: Game gets harder with level and time
- **Enhanced UI**: Health bars, XP progress, level display, and weapon info

## 📚 Teaching Notes
This lesson builds directly on Day 2's combat mechanics. Students should be comfortable with:
- Arrays and pushing/splicing objects
- The distance() function for collision detection
- Basic p5.js drawing and game state management

### Key New Concepts Today:
1. **Object Properties**: Adding velocity (vx, vy) and type to bullets
2. **Direction Vectors**: Using {x, y} objects to track movement direction
3. **Trigonometry**: Using Math.atan2() and Math.cos/sin for spread shots
4. **Math for Game Design**: Balancing XP requirements and difficulty scaling
5. **UI Programming**: Progress bars with percentage-based width
6. **Function Organization**: Creating drawUI() and applyPowerUp() helper functions

## 🎮 How to Run
1. Open the p5.js Web Editor: https://editor.p5js.org/
2. Students should use the **Day 3 starter file** (contains all working Day 2 code)
3. Follow the step-by-step TODOs to add Day 3 advanced features
4. Test each feature as you build it!

**File Structure:**
- `starter.js`: Contains working Day 2 game + Day 3 TODOs for students
- `completed.js`: Contains all working Day 3 features for teacher reference

## 🔑 Key Programming Concepts Covered

- **Complex Object Management**: Working with multiple interconnected arrays
- **Weapon System Design**: Using variables to control different behaviors  
- **XP and Leveling Math**: Calculating requirements and scaling difficulty
- **UI Programming**: Creating health bars and progress displays
- **Game State Complexity**: Managing multiple systems simultaneously

## 🎮 New Features Students Will Code

- **Direction-Based Shooting**: Bullets now shoot in the direction you're moving
- **Basic Weapon**: Single bullets (enhanced from Day 2)
- **Spread Weapon**: Three bullets fired in a spread pattern
- **Rapid Weapon**: Faster firing rate with different bullet color
- **XP System**: Gain 8 XP per enemy kill, level up every `level * 75` XP
- **Health System**: Start with 60 health, take 25 damage per hit
- **Power-ups**: Health (green), weapon upgrades (yellow), speed boosts (blue)
- **Multi-directional Enemies**: Spawn from all four screen edges
- **Progressive Difficulty**: Spawn rate and enemy speed scale with level and time

## 💡 Teaching Tips

**Start with Familiar Code**: Begin with the working Day 2 game so students feel confident

**Build One Feature at a Time**: Don't try to add everything at once - test each step

**Explain the Math**: When adding XP requirements, show why `level * 75` creates good progression

**Let Them Customize**: Encourage students to adjust damage values, colors, and spawn rates

**Celebrate Success**: When the game is complete, let students play each other's versions!

## ❓ Discussion Questions for Class

1. Why do games often have XP and leveling systems?
2. How does the spread weapon use trigonometry to create three bullets?
3. What's the difference between the three weapon types we coded?
4. How does tracking `lastDirection` enable multi-directional shooting?
5. Why do enemies spawn from all edges instead of just the top?
6. How could we balance the health and damage system differently?
7. What makes a survival game fun to play repeatedly?

## 🎯 Extension Challenges (For Fast Finishers)

**Beginner Extensions:**
- Change the weapon colors or sizes
- Adjust the XP requirements for leveling up
- Modify enemy spawn rates or speed

**Advanced Extensions:**
- Add a fourth weapon type with unique behavior
- Create enemies that move in different patterns
- Add a "game won" condition after reaching level 10
- Display a high score that persists between games

## 🎊 Wrap-Up: What Students Accomplished

By the end of Day 3, students have:

- Built a complete, playable survival game from scratch
- Learned fundamental game programming concepts
- Worked with complex object interactions and arrays
- Implemented multiple systems working together
- Created something they can actually show off and be proud of!

This is real game development - the same concepts used in professional games!