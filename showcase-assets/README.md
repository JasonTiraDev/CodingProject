# 📸 Adding Gameplay Screenshots to Showcase

## Quick Guide to Capturing Gameplay Screenshots

### **What You Need:**
- The game running locally (via Live Server or `python3 -m http.server`)
- Screenshot tool (built into macOS/Windows)

---

## 🎮 **Step-by-Step Screenshot Guide**

### **For Each Day:**

#### **Day 1 - Player Movement**
1. Open `demo-day1.html` in browser
2. Press any key to start the game
3. Move the player around with arrow keys
4. Take screenshot showing: **Player (cyan circle) in motion on screen**
5. Save as: `showcase-assets/day1-gameplay.png`

**What to capture:** Player circle visible, moving, with clear boundaries

---

#### **Day 2 - Combat System**
1. Open `demo-day2.html` in browser
2. Start the game
3. Let enemies spawn and bullets fire
4. Wait for active combat (bullets hitting enemies)
5. Take screenshot showing: **Bullets, enemies, score counter**
6. Save as: `showcase-assets/day2-gameplay.png`

**What to capture:** Yellow bullets, red enemies, active combat, score visible

---

#### **Day 3 - Complete Game**
1. Open `demo-day3.html` in browser
2. Start the game
3. Play until you collect some power-ups
4. Switch weapons (press 1, 2, or 3)
5. Take screenshot showing: **Multiple weapons, XP bar, health bar, level display**
6. Save as: `showcase-assets/day3-gameplay.png`

**What to capture:** Full UI (health, XP, level), different weapon types, power-ups

---

#### **Bonus Day 6 - Advanced Game** (Optional)
1. Open `index.html` (currently loads Day 6)
2. Start the game and play for a bit
3. Get to a boss battle or high level
4. Take screenshot showing: **Particle effects, complex gameplay, boss if possible**
5. Save as: `showcase-assets/day6-gameplay.png`

**What to capture:** Visual effects, advanced features, polished UI

---

## 🖼️ **Screenshot Tips**

### **For Best Results:**
- **Timing:** Capture during active gameplay (not menus)
- **Action:** Show bullets, enemies, and effects happening
- **UI:** Make sure score/health/XP bars are visible
- **Clarity:** Full screen, good resolution
- **Composition:** Center the action

### **macOS Screenshot Shortcuts:**
- `Cmd + Shift + 3` - Full screen
- `Cmd + Shift + 4` - Select area (recommended)
- `Cmd + Shift + 4, then Space` - Capture window

### **Windows Screenshot Shortcuts:**
- `Windows + Shift + S` - Snipping tool
- `PrtScn` - Full screen
- `Alt + PrtScn` - Active window

---

## 🔄 **Adding Screenshots to Showcase Page**

Once you have the screenshots saved in `showcase-assets/`:

1. Open `showcase.html`
2. Find the placeholder divs (search for "placeholder")
3. Replace each placeholder with:

```html
<!-- Replace this: -->
<div class="placeholder">
  <div class="placeholder-icon">🎯</div>
  <p>Add screenshot...</p>
</div>

<!-- With this: -->
<img src="showcase-assets/day1-gameplay.png" alt="Day 1 Gameplay - Player Movement">
```

### **Full Replacements:**

**Day 1:**
```html
<div class="day-image">
  <img src="showcase-assets/day1-gameplay.png" alt="Day 1 - Player movement with keyboard controls">
</div>
```

**Day 2:**
```html
<div class="day-image">
  <img src="showcase-assets/day2-gameplay.png" alt="Day 2 - Combat system with bullets and enemies">
</div>
```

**Day 3:**
```html
<div class="day-image">
  <img src="showcase-assets/day3-gameplay.png" alt="Day 3 - Complete game with weapons and power-ups">
</div>
```

**Bonus Days:**
```html
<div class="day-image">
  <img src="showcase-assets/day6-gameplay.png" alt="Advanced game with visual effects and boss battles">
</div>
```

---

## 🎨 **Alternative: Use Video GIFs**

For even better showcasing:

### **Record Gameplay GIFs:**
1. Use a screen recorder (QuickTime on Mac, Xbox Game Bar on Windows)
2. Record 5-10 seconds of gameplay per day
3. Convert to GIF using online tools like:
   - https://ezgif.com/video-to-gif
   - https://cloudconvert.com/mp4-to-gif

### **Add GIFs to Showcase:**
```html
<div class="day-image">
  <img src="showcase-assets/day1-gameplay.gif" alt="Day 1 Gameplay">
</div>
```

**GIFs are more engaging** and show the game in action!

---

## 📋 **Quick Checklist**

- [ ] Capture Day 1 screenshot (player moving)
- [ ] Capture Day 2 screenshot (bullets hitting enemies)
- [ ] Capture Day 3 screenshot (full UI, weapons, power-ups)
- [ ] Capture Bonus Day screenshot (advanced features)
- [ ] Save all screenshots to `showcase-assets/` folder
- [ ] Replace placeholder divs in `showcase.html`
- [ ] Test showcase page looks good
- [ ] Push to GitHub

---

## 🚀 **Publishing the Showcase**

### **Option 1: GitHub Pages**
1. Go to your repo Settings
2. Click "Pages" in sidebar
3. Source: Deploy from branch → `main`
4. Choose root folder
5. Save
6. Your showcase will be at: `https://jasontiradev.github.io/CodingProject/showcase.html`

### **Option 2: Add to TirareConnect**
1. Copy the `showcase.html` content
2. Add to your TirareConnect project
3. Update the GitHub links to point to your repo
4. Style to match your portfolio theme

---

## 💡 **Pro Tips**

- **Compress images** to keep page load fast (use TinyPNG or similar)
- **Use WebP format** for better compression (modern browsers support it)
- **Add loading="lazy"** to img tags for performance
- **Test on mobile** to ensure screenshots look good on all devices

---

**Need help?** The showcase page works great even with placeholders - screenshots just make it more visual and engaging!
