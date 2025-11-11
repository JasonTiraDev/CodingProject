# Day 1 Teaching Notes - Mini Survivors
**Target Audience:** Ages 14-16, 1-hour session
**Goal:** Students leave excited about coding with a working game they can control

---

## 🎯 Big Picture Introduction (5 minutes)

**What to say:**
> "Today we're building a video game from scratch. By the end of this hour, you'll have a character you can move around the screen. Next week we'll add enemies and shooting. By Day 3, you'll have a complete game that's uniquely yours."

**Key concept to emphasize:**
- Games are just drawings that update really fast (60 times per second!)
- It's like a flipbook - each page is slightly different to create motion
- p5.js does all the hard computer graphics stuff, we just tell it what to draw

---

## STEP 1: Variables - Labeled Storage Boxes

### Code Section:
```javascript
let player;
let gameState = "start";
```

### Talking Points:

**Main concept:**
> "Variables are like labeled boxes that hold information. The label doesn't change, but what's inside can change."

**Common Questions:**

**Q: "What does `let` mean?"**
A: "It means 'create a new variable.' Think of it as grabbing an empty box and putting a label on it. We use `let` once when creating the box, then just use the name after that."

**Q: "Why is gameState in quotes but player isn't?"**
A: "Quotes mean TEXT (what programmers call a 'string'). `"start"` is literally the word 'start'. When we write `player` without quotes later, we'll put an entire object (a collection of information) into that box."

**Analogy:**
- `player` = A box labeled "player" (empty for now, we'll fill it in setup)
- `gameState = "start"` = A box labeled "gameState" with a piece of paper inside that says "start"

**What if students struggle:**
- Show them writing a variable name on a sticky note and sticking it to an object in the room
- Explain you can change what's under the sticky note, but the note stays the same

---

## STEP 2-3: setup() Function - The Beginning

### Code Section:
```javascript
function setup() {
  createCanvas(800, 600);

  player = {
    x: width / 2,
    y: height / 2,
    size: 20,
    speed: 4
  };
}
```

### Talking Points:

**Main concept:**
> "`setup()` runs ONE TIME when you press play. It's like setting up a board game - you only do it once before playing."

**Common Questions:**

**Q: "What's `createCanvas(800, 600)`?"**
A: "It creates your game window. 800 pixels wide, 600 pixels tall. A pixel is one tiny dot on the screen. Your phone screen is probably 1000+ pixels wide."

**Visual aid to draw on whiteboard:**
```
   0                          800
0  ┌──────────────────────────┐
   │                          │
   │      (400, 300)          │  ← Center point
   │          ★               │
600│                          │
   └──────────────────────────┘
```

**Q: "What does `width / 2` mean?"**
A: "`width` is automatically set to 800 (your canvas width). So `width / 2` = 400. That's the horizontal center. Same with `height / 2` = 300 for vertical center."

**Q: "Why the curly braces `{}`?"**
A: "That creates an OBJECT - like a character sheet in a game. Instead of one piece of info, we store multiple related pieces together:"
```
player = {
  x: 400,        ← horizontal position
  y: 300,        ← vertical position
  size: 20,      ← how big the circle is
  speed: 4       ← how many pixels to move per frame
}
```

**Key insight:**
> "We use `player.x` to access just the x position, `player.speed` to access just the speed. The dot means 'look inside the player box and get this specific piece of info.'"

---

## STEP 4: draw() Function - The Game Loop

### Code Section:
```javascript
function draw() {
  background(20, 20, 40);
  // ... rest of game
}
```

### Talking Points:

**Main concept:**
> "`draw()` runs 60 TIMES EVERY SECOND. This is the magic that makes games work!"

**Analogy:**
> "Imagine you're drawing on a whiteboard. Every 1/60th of a second (faster than you can blink), you:
> 1. Erase EVERYTHING with background()
> 2. Calculate new positions
> 3. Draw everything again in slightly different spots
> Your brain sees smooth motion because it's happening so fast!"

**Common Questions:**

**Q: "Why do we call background() every time?"**
A: "Try commenting it out! You'll see trails because we're not erasing the old drawings. Sometimes that's cool, but usually you want a clean slate each frame."

**Demo to show students:**
```javascript
// Comment out background(20, 20, 40);
// Run the game and move around
// You'll see the player trail!
```

**Q: "What are those numbers in background(20, 20, 40)?"**
A: "RGB color system - Red, Green, Blue. Each number is 0-255."
- `(0, 0, 0)` = black (no light)
- `(255, 255, 255)` = white (all light)
- `(20, 20, 40)` = very dark blue (little red, little green, a bit more blue)

**Tool to share:** "Google 'RGB color picker' to experiment with colors!"

---

## STEP 5: Start Screen - Text and UI

### Code Section:
```javascript
if (gameState === "start") {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("MINI SURVIVORS", width/2, height/2 - 50);
}
```

### Talking Points:

**Main concept:**
> "Text is drawn just like shapes! You set the color, size, and position, then tell it what to display."

**Common Questions:**

**Q: "What's `===` mean?"**
A: "Triple equals checks if two things are EXACTLY the same. If `gameState` is `"start"`, run the code in curly braces. If not, skip it."

**Why three equals instead of one?**
- One `=` means "put this value in the box" (assignment)
- Three `===` means "are these equal?" (comparison)

**Q: "Why `width/2` for the x position?"**
A: "That's the center of the screen horizontally. We use `CENTER` alignment, so the text centers itself on that point."

**Visual aid:**
```
text("HELLO", 100, 200)
         ↑     ↑    ↑
        what  where(x, y)

If textAlign is CENTER: text centers on that point
If textAlign is LEFT: text starts from that point
```

**Q: "Why `height/2 - 50`?"**
A: "Center vertically (300) minus 50 pixels = 250. So the title appears above center. The instructions at `+ 50` and `+ 100` appear below."

---

## STEP 6: Player Movement - The Core Mechanic

### Code Section:
```javascript
if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
  player.x = player.x + player.speed;
}
```

### Talking Points:

**Main concept:**
> "Every frame (60 times per second), we check: 'Is the right arrow held down?' If yes, move the player right by adding to their x position."

**THIS IS THE MOST IMPORTANT SECTION - Take your time here!**

### Breaking Down `player.x = player.x + player.speed`

**Step-by-step explanation:**

1. **Right side first:** `player.x + player.speed`
   - "Look at where the player is now (let's say x = 400)"
   - "Add the speed (speed = 4)"
   - "So: 400 + 4 = 404"

2. **Then the left side:** `player.x =`
   - "Now store that new position back into player.x"
   - "player.x is now 404 instead of 400"

3. **Next frame (1/60th second later):**
   - "player.x is now 404"
   - "404 + 4 = 408"
   - "Store 408 back into player.x"

**Analogy:**
> "Imagine you're at position 400 on a number line. Each frame you take a step of size 4 to the right. 400 → 404 → 408 → 412... The steps happen so fast (60 per second) it looks like smooth motion!"

**Common Questions:**

**Q: "Why `player.x + player.speed` and not just `+ player.speed`?"**
A: "Because we need to know WHERE we're starting from! If you're at mile marker 400 and walk 4 miles, you don't end up at mile marker 4, you end up at 404."

**Wrong thinking to correct:**
```javascript
player.x = player.speed;  // ❌ This sets position to 4 (speed value)
player.x = player.x + player.speed;  // ✓ This adds 4 to current position
```

**Q: "What's the `||` symbol?"**
A: "That's OR. `(RIGHT_ARROW || 68)` means 'right arrow OR the D key'. Key 68 is the letter D. So either arrow keys OR WASD both work!"

**Q: "Why does UP use MINUS and DOWN use PLUS?"**
A: **THIS IS SUPER IMPORTANT - Draw this on the board:**

```
Screen coordinate system:

      0 ───────────────────→ X increases right
      │
      │    Moving RIGHT: x gets BIGGER (+ speed)
      │    Moving LEFT:  x gets SMALLER (- speed)
      │
      │    Moving DOWN:  y gets BIGGER (+ speed)  ← WEIRD!
      │    Moving UP:    y gets SMALLER (- speed)
      ↓
      Y
   increases
    DOWN
```

**Why is Y backwards?**
> "In math class, Y increases going UP. But computer screens are different - they measure from the TOP-LEFT corner going DOWN. So Y = 0 is the TOP of the screen, and Y increases as you go DOWN."

**Practice question for students:**
"If player.x = 100 and player.speed = 4, and I hold right arrow for 3 frames, where is player.x?"
- Frame 1: 100 + 4 = 104
- Frame 2: 104 + 4 = 108
- Frame 3: 108 + 4 = 112
- Answer: 112

---

## STEP 7: Boundaries - Keeping Player on Screen

### Code Section:
```javascript
player.x = constrain(player.x, player.size/2, width - player.size/2);
player.y = constrain(player.y, player.size/2, height - player.size/2);
```

### Talking Points:

**Main concept:**
> "`constrain()` is like bumpers in bowling. It says 'you can't go below this number or above that number.'"

**Common Questions:**

**Q: "What's `constrain(value, min, max)`?"**
A: "It keeps a value between min and max:"
- If value is less than min → return min
- If value is greater than max → return max
- Otherwise → return value

**Example with real numbers:**
```javascript
constrain(50, 0, 100)  // Returns 50 (it's between 0-100)
constrain(-10, 0, 100) // Returns 0 (can't go below min)
constrain(150, 0, 100) // Returns 100 (can't go above max)
```

**Q: "Why `player.size/2` and not just `0`?"**
A: "Great question! Let me draw this..."

**Draw on whiteboard:**
```
❌ If we use 0:
     Edge of screen
     │
0    │  ⚪ ← Half the circle goes off screen!
     │


✓ If we use size/2:
     Edge of screen
     │
10   │⚪ ← Circle is size 20, so radius is 10
     │   Player.x can't be less than 10
     │   Circle stays fully on screen!
```

**Q: "Why `width - player.size/2` for the right side?"**
A: "Same reason! If width = 800 and size = 20:"
- Center can go up to 800 - 10 = 790
- The right edge of the circle (790 + 10) touches the screen edge (800)
- Circle stays fully visible!

**Visual demonstration:**
> "Without constrain, try moving off screen - you disappear! With constrain, you get stuck at the edge like hitting a wall."

---

## STEP 8: Drawing the Player

### Code Section:
```javascript
fill(0, 255, 255);
noStroke();
ellipse(player.x, player.y, player.size);
```

### Talking Points:

**Main concept:**
> "Drawing shapes in p5.js is like using Microsoft Paint. First pick the color, then draw the shape."

**Common Questions:**

**Q: "What does each line do?"**
A:
1. `fill(0, 255, 255)` - "Set the fill color to cyan (no red, full green, full blue)"
2. `noStroke()` - "Don't draw an outline" (try removing this to see the difference!)
3. `ellipse(x, y, size)` - "Draw a circle at position x, y with this diameter"

**Q: "What's the difference between fill and stroke?"**
A: "Fill is the INSIDE color, stroke is the OUTLINE color."

**Demo:**
```javascript
fill(255, 0, 0);      // Red inside
stroke(0, 255, 0);    // Green outline
strokeWeight(3);      // Thick outline
ellipse(100, 100, 50);
```

**Q: "Why `ellipse` and not `circle`?"**
A: "p5.js has both! `ellipse(x, y, size)` draws a circle. `ellipse(x, y, width, height)` can draw ovals. We use the circle version."

---

## STEP 9: keyPressed() - One-Time Events

### Code Section:
```javascript
function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  }
}
```

### Talking Points:

**Main concept:**
> "`keyPressed()` runs ONCE when you press a key. `keyIsDown()` checks EVERY FRAME if a key is held."

**Common Questions:**

**Q: "What's the difference between keyPressed() and keyIsDown()?"**
A: **This is important - use a demonstration!**

**keyIsDown():** (for movement)
- Checked 60 times per second in draw()
- "Is this key being held down RIGHT NOW?"
- Good for: Continuous movement

**keyPressed():** (for state changes)
- Runs ONCE per key press
- "Did the player just press a key?"
- Good for: Menus, one-time actions, shooting (later)

**Analogy:**
> "keyIsDown() is like asking 'is the gas pedal pressed?' every split second while driving. keyPressed() is like a doorbell - it only dings once when you press it, even if you hold it down."

**Q: "Why change gameState here?"**
A: "We only want to start the game ONCE when they press a key, not 60 times per second! If we put this in draw(), the game would instantly start without showing the menu."

---

## 🎨 Customization Time (15-20 minutes)

**This is crucial for engagement!** Students should spend significant time making the game their own.

### Guided Customization Challenges:

**Level 1 - Easy (everyone should try):**
1. "Change your player color - try `fill(255, 0, 255)` for magenta!"
2. "Make your player bigger or smaller - change `size: 20` to something else"
3. "Change the game title to YOUR game name"
4. "Change the background color - try `background(0, 50, 0)` for dark green"

**Level 2 - Medium:**
1. "Make the player faster or slower - change the speed value"
2. "Change the canvas size to `createCanvas(1000, 800)` - now you have more room!"
3. "Add your name to the start screen with another `text()` line"
4. "Change the player to a square using `rect()` instead of `ellipse()`"

**Level 3 - Challenge:**
1. "Make the player change color when moving" (hint: put fill() inside the movement if-statements)
2. "Add text showing the player's position" (hint: `text("X: " + player.x, 10, 30)`)
3. "Make the background change color over time" (hint: use `frameCount`)

---

## 🐛 Common Issues & Troubleshooting

### Issue: "Nothing shows up!"

**Check:**
1. Did you call `createCanvas()` in setup?
2. Did you initialize the player object with x, y, size?
3. Is your fill() color the same as your background? (won't see it!)

### Issue: "Player moves but leaves a trail"

**Fix:** Make sure `background()` is at the very top of `draw()`

### Issue: "Player is too fast or too slow"

**Fix:** Change `speed: 4` in the player object. Try 2 for slow, 8 for fast.

### Issue: "Keys don't work"

**Check:**
1. Is the code in the `if (gameState === "playing")` block?
2. Make sure you're checking `keyIsDown()` not `keyPressed()`
3. Click on the canvas to make sure it has focus

### Issue: "Player goes off screen"

**Fix:** Make sure you added the `constrain()` lines for both player.x and player.y

---

## 📝 Key Concepts to Reinforce

**Before students leave, make sure they understand:**

1. **The game loop:** setup() runs once, draw() runs 60 times per second
2. **Variables:** Storage boxes that hold values we can change
3. **Objects:** Collections of related data (player has x, y, size, speed)
4. **Coordinate system:** (0,0) is top-left, Y increases downward
5. **Movement math:** Adding to position moves right/down, subtracting moves left/up

---

## 🚀 Wrap-Up & Next Session Teaser

**What to say:**
> "Awesome work! You built a game where you control a character. Next time, we're adding ENEMIES that chase you and BULLETS to fight back. By Day 3, you'll have a complete survival game!"

**If students finish early:**
- Let them customize colors, sizes, speeds
- Challenge them to add a border around the screen
- Have them help other students
- Show them the completed.js version to see what's possible

**Homework (optional):**
"Try changing 3 things about your game at home - maybe the colors, the player size, or add your name somewhere!"

---

## 📚 p5.js Reference Quick Guide

**Functions students used today:**
- `createCanvas(width, height)` - Creates game window
- `background(r, g, b)` - Fills background with color
- `fill(r, g, b)` - Sets fill color for shapes
- `noStroke()` - Removes outlines
- `ellipse(x, y, size)` - Draws a circle
- `text(message, x, y)` - Draws text
- `textSize(size)` - Sets text size
- `textAlign(h, v)` - Sets text alignment
- `constrain(value, min, max)` - Keeps value in range
- `keyIsDown(key)` - Checks if key is currently pressed

**Built-in variables:**
- `width` - Canvas width (800)
- `height` - Canvas height (600)
- `frameCount` - How many frames have passed
- `LEFT_ARROW`, `RIGHT_ARROW`, `UP_ARROW`, `DOWN_ARROW` - Arrow key codes
- Key codes: W=87, A=65, S=83, D=68

**Full reference:** https://p5js.org/reference/
