# 🎮 Day 1: Game Basics

## 📚 Learning Goals
- Understand what a game loop is
- Learn about coordinates and positioning  
- Create a player that can move around
- Draw shapes and text on screen
- Handle keyboard input

## 🎯 What You'll Build
- A moveable cyan circle (your player character)
- Arrow key controls for movement
- Boundary checking to keep player on screen
- Real-time position display and game statistics
- A start screen with instructions

## 🎮 How to Use This Lesson

### For Students:
1. Start with `starter.js` - this has the framework and guided instructions
2. Read the comments and complete the TODOs step by step
3. Test your code frequently by running it in [p5.js Web Editor](https://editor.p5js.org/)
4. If you get stuck, check `completed.js` for reference
5. Use arrow keys or WASD to move your spaceship around!

### For Teachers:
- `starter.js`: Give this to students as their starting point
- `completed.js`: Reference solution for troubleshooting and demonstration
- Students should build the game themselves, not just copy the completed code

## 🔑 Key Concepts Covered
- **Variables and Objects**: How to store game data
- **Game Loop**: The `draw()` function that runs 60 times per second
- **Coordinate System**: How computer graphics work (x, y positions)
- **User Input**: Using `keyIsDown()` and `keyPressed()`
- **Drawing Functions**: `circle()`, `text()`, `background()`
- **Boundary Checking**: Using `constrain()` to keep values within limits

## 💡 Try These Modifications
- Change the player color from cyan to your favorite color
- Make the player bigger or smaller by changing the radius
- Adjust the movement speed
- Add new text displays showing different information
- Change the canvas size

## ❓ Discussion Questions
1. Why does the background need to be redrawn each frame?
2. What happens if we change the canvas size?
3. How do coordinates work differently than in math class?
4. What would happen if we removed the `constrain()` functions?

## ➡️ What's Next?
Tomorrow (Day 2) we'll add:
- Enemies that chase the player
- Bullets that the player can shoot
- Collision detection (when things touch)
- A score system and game over conditions