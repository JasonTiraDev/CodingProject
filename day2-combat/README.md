# 🎮 Day 2: Combat System

## 📚 Learning Goals
- Understand arrays (lists of objects)
- Create and manage multiple enemies
- Implement automatic shooting
- Learn collision detection (when things touch)
- Add game over conditions

## 🎯 What You'll Build
- Enemies that spawn from screen edges and chase the player
- Automatic bullet firing system
- Collision detection between bullets and enemies
- Score system and game over conditions
- Clean-up of off-screen objects

## 🎮 How to Use This Lesson

### For Students:
1. **Important**: Complete Day 1 first!
2. Start with `starter.js` - copy your Day 1 completed code into the marked sections
3. Follow the guided instructions to add combat systems
4. Test each feature as you build it in [p5.js Web Editor](https://editor.p5js.org/)
5. Compare with `completed.js` if you need help

**Controls:**
- Arrow keys or WASD: Move
- Shooting is automatic
- Any key to start/restart

### For Teachers:
- Ensure students have working Day 1 code before starting
- `starter.js`: Framework with guided instructions for building combat
- `completed.js`: Reference solution showing the complete combat system
- Emphasize testing each feature before moving to the next

## 🔑 Key Concepts Covered
- **Arrays**: Managing lists of objects (enemies, bullets)
- **Object Creation**: Making multiple similar objects
- **Collision Detection**: Using the distance formula to detect when objects touch
- **Game States**: Different screens (start, playing, game over)
- **Automatic Actions**: Events that happen based on timing using `frameCount`
- **Array Management**: Adding items with `push()`, removing with `filter()`

## 💡 Try These Modifications
- Change the fire rate to shoot faster or slower
- Make enemies move at different speeds
- Add different enemy sizes and colors
- Change bullet size and speed
- Modify spawn rates for more or fewer enemies

## ❓ Discussion Questions
1. What happens if you change fireRate to 5? To 60?
2. How could you make enemies move faster or slower?
3. What would happen if we removed the boundary checking for the player?
4. Can you figure out how to make bullets bigger or smaller?
5. How could we make enemies spawn more or less frequently?

## 🎯 Advanced Challenges
- Add different types of enemies (different sizes, speeds, colors)
- Make some enemies move in random directions instead of toward player
- Add a health system (player can take multiple hits)
- Create different bullet types (faster, bigger, different colors)
- Add sound effects when bullets hit enemies

## ➡️ What's Next?
Tomorrow (Day 3) we'll add:
- Multiple weapon types (spread shot, orbital weapons)
- Power-ups to collect
- Increasing difficulty levels
- Experience points and upgrades
- Polish and game balance