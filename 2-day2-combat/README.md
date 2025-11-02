# 🎮 Day 2: Combat System - Now With Enemies!

## 📚 What You'll Learn Today (building on Day 1!)
- **Arrays** - Lists that hold multiple bullets and enemies at once
- **Automatic actions** - Making bullets shoot every few frames using `frameCount`
- **Collision detection** - Using distance math to detect when things touch
- **Game states** - Adding a game over screen and restart system

## 🎯 What You'll Build
By the end of today, you'll have a **real survival game**:
- 🟡 **Auto-shooting bullets** that fire upward automatically
- 🔴 **Enemies** that spawn at the top and chase you around
- 💥 **Collision system** - bullets destroy enemies on contact
- 📊 **Live score counter** that tracks your kills
- ⚰️ **Game over screen** when enemies catch you
- 🔄 **Restart system** - press SPACE to try again!

## 🎮 How to Get Started

### For Students:
1. **You must finish Day 1 first!** - Day 2 builds on Day 1's code
2. Open the `starter.js` file - it has all the TODOs you need to complete
3. **Follow the HINTS** - They show you exactly what to type (or copy/paste!)
4. **Test after completing a few steps** - Don't wait until the end!
5. **It's OKAY to copy/paste from the hints** - The goal is to see it work and understand what's happening
6. Try the "TRY THIS" suggestions to make the game your own!

### Quick Start:
1. Go to [p5.js Web Editor](https://editor.p5js.org/)
2. Copy the Day 2 `starter.js` code into the editor
3. Complete the TODOs using the hints (type or copy/paste - both are fine!)
4. Click Play ▶️ after every few steps to see your progress
5. Experiment with the numbers once it's working!

**Game Controls:**
- **WASD or Arrow Keys**: Move your player
- **Shooting**: Automatic (no keys needed!)
- **Any key**: Start the game
- **SPACE**: Restart when game over

### For Teachers

**Realistic Expectations (1 hour session):**
- **Goal: Get them hooked, not make them experts** - If they leave excited, you win!
- **Copy/paste is encouraged** - They'll learn by seeing it work and tweaking values
- **Focus on the "wow" moments** - First bullet, first enemy destroyed, first game over
- **8-9 students is perfect** - You can help everyone individually

**During the Lesson:**
- **5-10 min**: Recap Day 1, show the goal (play `completed.js`)
- **35-40 min**: Students work through TODOs with your help
- **10-15 min**: Customization time (colors, speeds, game title)
- **5 min**: Share games with each other

**Copy/Paste Strategy:**
- Tell them: "Programming is about understanding, not memorizing. Copy the hint if you want!"
- After copying, have them change ONE number and see what happens
- This builds confidence and reduces frustration

**Common Issues:**
- **"My bullets aren't showing"** - They probably missed the drawing code (Step 8)
- **"Enemies aren't moving"** - Check the direction math (Step 10)
- **"Nothing happens when bullets hit"** - Missing collision detection (Step 11)
- **"Can't restart"** - Make sure they press SPACE, not just any key

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

Once Day 2 is working, Day 3 will add:
- **Player health system** - take multiple hits before game over!
- **Health pack power-ups** - collectible items that heal you
- **Polish & customization** - make the game uniquely YOURS!

**Then for extended learning at home:**
- **Bonus Days 4-6** - Multiple weapons, XP systems, bosses, particle effects, and more!

**For now, focus on getting Day 2's combat working - once you can shoot enemies and see your score go up, you're ready for Day 3!**