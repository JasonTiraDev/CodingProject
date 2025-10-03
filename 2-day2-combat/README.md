# 🎮 Day 2: Combat System - Now With Enemies!

## 📚 What You'll Learn Today (building on Day 1!)
- **Arrays** - Lists that hold multiple bullets and enemies at once
- **Automatic actions** - Making bullets shoot every few frames using `frameCount`
- **Object creation** - Spawning enemies with random positions and speeds
- **Movement math** - Making enemies chase the player using direction calculations
- **Collision detection** - Using distance math to detect when things touch
- **Game states** - Adding a proper game over screen and restart system

## 🎯 What You'll Build
By the end of today, you'll have a **real survival game**:
- 🟡 **Auto-shooting bullets** that fire every few frames
- 🔴 **Smart enemies** that spawn randomly and chase you around
- 💥 **Collision system** - bullets destroy enemies on contact
- 📊 **Live score counter** that increases as you survive
- ⚰️ **Game over screen** when enemies catch you (with your final score!)
- 🔄 **Restart system** - press SPACE to try again and beat your high score
- 🎮 **Escalating challenge** - the longer you survive, the more intense it gets!

## 🎮 How to Get Started

### For Students:
1. **You must finish Day 1 first!** - Day 2 builds on Day 1's code
2. **You'll be typing the actual code again!** - The file has TODOs with detailed HINTs
3. Open the `starter.js` file - this starts with Day 1's working code
4. **The HINTs show you exactly what to type** - but you still have to type it!
5. Follow the STEP-BY-STEP comments and complete each TODO
6. **Test after each step!** Run your code to see what changes
7. Try the "TRY THIS" suggestions - change numbers and see what happens!

### Quick Start:
1. **Make sure your Day 1 code is working first** - you need player movement!
2. Go to [p5.js Web Editor](https://editor.p5js.org/)
3. Copy your code from Day 2 `starter.js` into the editor
4. Complete the TODOs one by one (there are 16 steps!)
5. **Test after each major step** - don't wait until the end!
6. Click the Play button ▶️ to test your game!

**Game Controls:**
- **WASD or Arrow Keys**: Move your player
- **Shooting**: Automatic (no keys needed!)
- **Any key**: Start the game
- **SPACE**: Restart when game over

### For Teachers

**Before Starting:**
- **Verify Day 1 completion** - Students need working player movement
- **Expect 1+ hours** - This is significantly more complex than Day 1
- **Arrays will be confusing** - First time working with lists of objects

**During the Lesson:**
- **Students type all combat code** - `starter.js` has 16 detailed steps
- **Encourage testing early and often** - Each step should be testable
- **Use `completed.js` for demos** - Shows working examples of each feature
- **"TRY THIS" sections** - Built-in challenges for fast finishers

**Common Issues:**
- **"My bullets aren't showing"** - Check the bullet drawing code in Step 8
- **"Enemies aren't moving"** - Verify the direction math in Step 10
- **"Nothing happens when bullets hit"** - Debug the collision detection in Step 11
- **"Game won't restart"** - Make sure they're pressing SPACE, not any key

## 🔑 What They're Actually Learning (Even If They Don't Know It)

- **Arrays** - Lists that can hold multiple things (like enemies and bullets)
- **Loops** - Going through every item in a list to update them
- **Collision Detection** - Math to figure out when things touch
- **Game States** - Managing different screens (start, playing, game over)
- **Automatic Actions** - Making things happen based on time
- **Object Management** - Creating, updating, and removing game objects

## 💡 Easy Modifications to Try

**Speed & Timing**:
- Change `frameCount % 10` to `% 5` for faster shooting
- Change `random(100) < 1.8` to `< 3.0` for more enemies
- Change bullet `speed: 7` to `speed: 10` for faster bullets

**Scoring & Size**:
- Change `score += 10` to `+= 50` for higher scores
- Change bullet size from `6` to `10` for bigger bullets
- Change enemy `size: 20` to `30` for bigger enemies

**Colors & Customization**:
- Change `fill(255, 255, 0)` for different bullet colors
- Change `fill(255, 100, 100)` for different enemy colors
- Change the restart key from SPACE to R (see code comments!)
- Modify `"MINI SURVIVORS"` to your own game title

## 🗣️ Great Questions to Ask Students

1. **"What happens if we change % 10 to % 5 in the shooting code?"**
2. **"Can you make the enemies a different color?"**
3. **"What if we made bullets bigger by changing the 6 to 15?"**
4. **"How could we make enemies spawn more often?"**
5. **"What do you think the arrays are doing?"**

## ➡️ What's Next (Day 3)

Once you've mastered Day 2's combat system, Day 3 will add:
- **Multiple weapon types** - spread shots that fire in multiple directions
- **Power-ups** - collectible items that boost your abilities
- **Experience system** - gain XP and level up your character
- **Dynamic difficulty** - enemies get stronger as you survive longer
- **Visual polish** - particle effects and screen shake

**For now, focus on making Day 2 work perfectly - it's the foundation for everything else!**