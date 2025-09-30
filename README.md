# 🎮 Mini Survivors - Educational Game Development Course

A progressive 6-day course teaching game development fundamentals to students aged 14-16 using p5.js.

## 🎯 Course Overview

This course transforms a simple survival game concept into a comprehensive learning experience. Students build increasingly complex games over 6 days, learning fundamental programming concepts while creating something fun and engaging.

### Core Course (3 Days)
- **Day 1**: Basic game loop, player movement, and drawing
- **Day 2**: Enemies, bullets, collision detection, and game states  
- **Day 3**: Complete game with weapons, power-ups, and progression

### Bonus Lessons (Advanced Students)
- **Day 4**: Visual polish with sprites and particle effects
- **Day 5**: Audio integration with sound effects and music
- **Day 6**: Advanced mechanics with boss battles and upgrade systems

## 📁 Project Structure

```
CodingProject/
├── day1-basics/
│   ├── starter.js       # Guided lesson framework
│   ├── completed.js     # Reference solution
│   └── README.md        # Day 1 instructions
├── day2-combat/
│   ├── starter.js       # Guided lesson framework
│   ├── completed.js     # Reference solution
│   └── README.md        # Day 2 instructions
├── day3-complete/
│   ├── starter.js       # Guided lesson framework
│   ├── completed.js     # Reference solution
│   └── README.md        # Day 3 instructions
├── bonus-day4-visuals/
│   ├── starter.js       # Guided lesson framework
│   ├── completed.js     # Reference solution
│   └── README.md        # Bonus Day 4 instructions
├── bonus-day5-audio/
│   ├── starter.js       # Guided lesson framework
│   ├── completed.js     # Reference solution
│   └── README.md        # Bonus Day 5 instructions
├── bonus-day6-advanced/
│   ├── starter.js       # Guided lesson framework
│   ├── completed.js     # Reference solution
│   └── README.md        # Bonus Day 6 instructions
├── teacher-resources/
│   └── README.md        # Teaching guide & resources
└── README.md            # This file
```

## 🚀 Quick Start

Each day builds upon the previous, so start with Day 1:

### For Students:
1. Navigate to the `day1-basics/` folder
2. Open [p5.js Web Editor](https://editor.p5js.org/)
3. Copy the code from `starter.js` (not completed.js!)
4. Follow the guided instructions in the comments
5. Build the game step-by-step using the TODO comments
6. Test frequently and use `completed.js` only for reference

### For Teachers:
- Each folder has `starter.js` (student template) and `completed.js` (reference solution)
- Students should work from starter files and build the features themselves
- Use completed files for troubleshooting and demonstration
- Each folder's README has detailed lesson plans and teaching notes

## 📚 What Students Learn

### Programming Fundamentals
- Variables, functions, and objects
- Arrays and loops
- Conditional statements
- Event handling

### Game Development Concepts  
- Game loops and state management
- Collision detection algorithms
- Player input and movement
- Enemy AI and spawning systems
- Progression and scoring

### Problem Solving Skills
- Breaking down complex problems
- Debugging and testing code
- Iterative development
- Creative thinking and design

## 🎮 Game Features by Day

### Day 1: Foundation
- Player-controlled spaceship
- Smooth keyboard movement
- Boundary collision detection
- Start screen and game states
- **Learning Focus**: Game loops, coordinates, user input

### Day 2: Combat System
- Automatic bullet firing
- Enemy spawning and movement
- Collision detection between bullets and enemies
- Score tracking and game over conditions
- **Learning Focus**: Arrays, object interaction, game states

### Day 3: Complete Game
- Multiple weapon types (spread shot, laser, orbital)
- XP and leveling system
- Power-ups and weapon switching
- Increasing difficulty over time
- Health system and damage feedback
- **Learning Focus**: Complex systems, game balance, progression

### Bonus Day 4: Visual Effects
- Sprite animations and image loading
- Particle systems for explosions
- Screen shake and visual feedback
- Animated backgrounds
- **Learning Focus**: Graphics programming, user experience

### Bonus Day 5: Audio
- Sound effect triggers
- Background music loops
- Audio-reactive visual elements
- Volume controls
- **Learning Focus**: Multimedia programming, audio integration

### Bonus Day 6: Advanced Systems
- Boss enemies with complex AI patterns
- Player upgrade system with meaningful choices
- Multiple game modes (Survival, Wave, Boss Rush)
- Health/armor system with invulnerability frames
- High score tracking
- **Learning Focus**: Advanced AI, system design, game modes

## 🛠️ Technical Requirements

- **Platform**: Any modern web browser
- **Framework**: p5.js (included via CDN)
- **Skills**: Basic understanding of variables and functions helpful but not required
- **Time**: 2-4 hours per day depending on student pace and discussion

## 👩‍🏫 For Teachers

See the `teacher-resources/` folder for comprehensive teaching guides, including:
- Detailed lesson plans and timing
- Common challenges and solutions
- Assessment strategies
- Extension activities
- Setup requirements

### Teaching Approach
1. **Demo First**: Show the working game before explaining code
2. **Incremental**: Add one feature at a time with testing
3. **Interactive**: Encourage experimentation and modification
4. **Collaborative**: Support pair programming and peer learning

## 🎯 Learning Outcomes

By the end of this course, students will:
- Understand fundamental programming concepts
- Know how to structure and organize code
- Be able to debug simple programming problems
- Have experience with game development workflows
- Feel confident experimenting with code
- Understand how complex systems are built from simple parts

## 🌟 Extension Ideas

- Create original games using learned concepts
- Explore other programming languages and frameworks
- Design levels or characters for existing games
- Research game development careers and pathways
- Share creations with friends and family

## 🤝 Contributing

This educational resource is designed to be adapted and improved. Suggestions for better explanations, additional features, or alternative approaches are welcome!

## 📄 License

This educational content is provided freely for classroom and educational use.

## 📋 Prerequisites
- Basic understanding of what programming is (no prior coding experience required)
- Access to computers with internet connection
- Web browser (Chrome, Firefox, Safari, or Edge)
- Text editor (VS Code recommended, but any editor works)

## 🛠️ Setup Instructions

### For Teachers:
1. Ensure all computers have a web browser and text editor installed
2. Bookmark the p5.js web editor: https://editor.p5js.org/
3. Test that the web editor works on all computers
4. Have the day files ready to share with students

### For Students:
1. Open the p5.js web editor in your browser
2. Create a new account (optional but recommended for saving work)
3. Copy and paste the code for each day into a new sketch

## 📅 Day-by-Day Breakdown

## Day 1: Game Foundation 🎯
**File:** `day1_basic_game.js`

### Key Concepts Introduced:
- **Variables and Objects**: Understanding how to store game data
- **Coordinate System**: How computer graphics work (x, y positions)
- **Game Loop**: The `draw()` function that runs 60 times per second
- **User Input**: Responding to keyboard presses
- **Basic Drawing**: Creating shapes and text on screen

### What Students Will Build:
- A player character (cyan circle) that can move with arrow keys
- Boundary checking to keep player on screen
- A start screen with instructions
- Real-time display of player position and game statistics

### Key Functions Covered:
- `setup()` - Initialize the game
- `draw()` - Main game loop
- `keyIsDown()` - Check for held keys
- `keyPressed()` - Respond to key presses
- `circle()`, `text()` - Drawing functions
- `constrain()` - Keep values within bounds

### Teaching Tips:
- Emphasize that the game loop runs continuously
- Show how changing variables affects the game immediately
- Demonstrate the coordinate system by having students guess positions
- Let students experiment with different colors and sizes

### Discussion Points:
- Why does the background need to be redrawn each frame?
- What happens if we change the canvas size?
- How do coordinates work differently than in math class?

---

## Day 2: Combat System ⚔️
**File:** `day2_enemies_bullets.js`

### Key Concepts Introduced:
- **Arrays**: Managing lists of objects (enemies, bullets)
- **Object Creation**: Making multiple similar objects
- **Collision Detection**: Determining when objects touch
- **Game States**: Different screens (start, playing, game over)
- **Automatic Actions**: Events that happen based on timing

### What Students Will Build:
- Enemies that spawn from screen edges and chase the player
- Automatic bullet firing system
- Collision detection between bullets and enemies
- Score system and game over conditions
- Clean-up of off-screen objects

### Key Functions Covered:
- `push()` - Add items to arrays
- `filter()` - Remove items from arrays
- `dist()` - Calculate distance between points
- `random()` - Generate random numbers
- `for...of` loops - Iterate through arrays

### Teaching Tips:
- Start with just one enemy, then show how arrays let us have many
- Demonstrate collision detection visually with console.log messages
- Explain why we remove off-screen bullets (memory management)
- Show how `frameCount % number` creates timing events

### Common Student Challenges:
- Understanding array manipulation (adding/removing items)
- Grasping collision detection math
- Managing multiple objects at once

---

## Day 3: Complete Game 🏆
**File:** `day3_complete_game.js`

### Key Concepts Introduced:
- **Complex Systems**: Multiple interacting game mechanics
- **Progressive Difficulty**: Games that get harder over time
- **Weapon Systems**: Different player abilities
- **Trigonometry**: Using math for circular motion
- **Game Balance**: Making games fun and challenging

### What Students Will Build:
- Multiple weapon types (single, spread, orbital)
- Power-up collection system
- Level progression with increasing difficulty
- Experience points and upgrades
- Polished UI with progress bars and banners

### Advanced Concepts:
- **Orbital Weapons**: Using `cos()` and `sin()` for circular motion
- **State Management**: Complex game state tracking
- **Nested Loops**: Checking all bullets against all enemies
- **Progressive Systems**: Scaling difficulty and player power

### Teaching Tips:
- Build incrementally - add one feature at a time
- Show how trigonometry creates smooth circular motion
- Discuss game balance - what makes games fun vs. frustrating
- Encourage students to suggest new features

---

## 🎨 Customization Ideas

### Easy Modifications:
- Change colors of player, enemies, bullets
- Adjust movement speed, fire rate, spawn rate
- Modify canvas size and starting positions
- Add new text displays and statistics

### Intermediate Challenges:
- Add different enemy types (size, speed, color)
- Create new weapon types
- Add sound effects (using p5.sound library)
- Implement different movement patterns for enemies

### Advanced Extensions:
- Boss enemies with special behaviors
- Multiple levels with different backgrounds
- Save/load high score system
- Particle effects for explosions
- Multiplayer with two players

## 🔧 Troubleshooting Guide

### Common Issues:

**"Nothing appears on screen"**
- Check that `createCanvas()` is in `setup()`
- Make sure `background()` is called in `draw()`
- Verify that drawing functions have `fill()` before them

**"Player doesn't move"**
- Check that movement code is inside `draw()`
- Verify arrow key codes are correct
- Make sure `speed` variable is greater than 0

**"Enemies/bullets don't appear"**
- Check that spawn timing code uses `frameCount %`
- Verify that objects are being added to arrays with `push()`
- Make sure drawing code iterates through arrays

**"Collision detection not working"**
- Verify that `dist()` function is calculating correctly
- Check that radius values are reasonable
- Make sure collision code is inside the right loops

**"Game runs too fast/slow"**
- p5.js runs at 60 FPS by default
- Adjust timing variables (`fireRate`, `spawnInterval`)
- Use `frameCount %` for consistent timing

## 📚 Extended Learning Resources

### For Students Who Want More:
- **p5.js Reference**: https://p5js.org/reference/
- **Coding Train YouTube**: Excellent p5.js tutorials
- **Khan Academy Computer Programming**: Interactive lessons
- **Game Development Concepts**: Look into Unity or Godot for more advanced game engines

### Next Steps in Programming:
- Learn more JavaScript fundamentals
- Explore other p5.js projects (art, music, simulations)
- Try web development with HTML/CSS
- Investigate other programming languages (Python, Java, C#)

## 🎯 Assessment Ideas

### Day 1 Assessment:
- Can student explain what the game loop does?
- Can they modify player speed and predict the result?
- Do they understand the coordinate system?

### Day 2 Assessment:
- Can student explain how arrays work in the context of enemies?
- Do they understand collision detection?
- Can they modify spawn rates and fire rates?

### Day 3 Assessment:
- Can student add a new weapon type?
- Do they understand how the level system works?
- Can they explain the difference between the three weapon types?

### Final Project Ideas:
- Students modify the game with their own features
- Create a completely different game using the same concepts
- Write a tutorial explaining one aspect of the game to other students

## 🏆 Success Metrics

### Technical Skills:
- Understanding of basic programming concepts
- Ability to read and modify existing code
- Debugging skills when things don't work
- Comfort with trial-and-error programming

### Problem-Solving Skills:
- Breaking down complex problems into smaller parts
- Testing ideas and iterating on solutions
- Understanding cause and effect in code

### Creative Skills:
- Personalizing the game with their own ideas
- Thinking about game balance and player experience
- Designing new features and mechanics

## 📝 Teacher Notes

### Time Management:
- Each day should be 2-3 hours with breaks
- Allow extra time for students who want to experiment
- Have extension activities ready for fast finishers

### Classroom Management:
- Encourage pair programming and collaboration
- Walk around and help debug individual issues
- Use the projector to demonstrate concepts to the whole class

### Student Engagement:
- Let students share their modifications with the class
- Encourage creativity and personal expression
- Connect programming concepts to other subjects (math, art, physics)

### Differentiation:
- Provide additional challenges for advanced students
- Offer more guidance for students who need it
- Allow students to work at their own pace within reason

## 🎉 Conclusion

This course provides a solid foundation in both programming and game development. Students will leave with:
- A complete, playable game they created
- Understanding of fundamental programming concepts
- Experience with iterative development
- Confidence to continue learning programming
- Appreciation for the complexity behind video games

The progression from simple movement to complex game systems mirrors real game development, showing students how large projects are built piece by piece.

---

*Happy coding! Remember: the best way to learn programming is by doing, experimenting, and having fun!* 🚀