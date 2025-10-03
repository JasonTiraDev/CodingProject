# 🎮 Running Mini Survivors Locally in VS Code

## 🚀 Quick Start (3 Methods)

### **Method 1: Live Server Extension (RECOMMENDED)**

1. **Install Live Server Extension:**
   - Open VS Code Extensions (Cmd+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Run the Game:**
   - Open `index.html`
   - Right-click anywhere in the file
   - Select "Open with Live Server"
   - Game opens in browser automatically! 🎉

3. **Debug with Breakpoints:**
   - Open your `.js` file (e.g., `completed.js`)
   - Click left of line numbers to add breakpoints (red dots)
   - Go to Run & Debug (Cmd+Shift+D)
   - Select "🎮 Debug Mini Survivors (Chrome)"
   - Press F5 or click green play button
   - Code will pause at breakpoints!

---

### **Method 2: Python Simple Server (No Extensions)**

```bash
# In Terminal (Cmd+J to open)
cd /Users/jtira/repos/CodingProject
python3 -m http.server 8000
```

Then open: http://localhost:8000

---

### **Method 3: VS Code Simple Browser (Quick Preview)**

1. Open Command Palette (Cmd+Shift+P)
2. Type: "Simple Browser: Show"
3. Enter URL: `http://localhost:5500/index.html` (after starting Live Server)

---

## 🔧 Switching Between Day Files

Edit `index.html` line 30 to change which game version loads:

```html
<!-- Load Day 1 -->
<script src="1-day1-basics/completed.js"></script>

<!-- Load Day 2 -->
<script src="2-day2-combat/completed.js"></script>

<!-- Load Day 3 -->
<script src="3-day3-complete/completed.js"></script>

<!-- Load Bonus Days -->
<script src="4-bonus-day4-visuals/completed.js"></script>
<script src="5-bonus-day5-audio/completed.js"></script>
<script src="6-bonus-day6-advanced/completed.js"></script>

<!-- Or test starter files -->
<script src="1-day1-basics/starter.js"></script>
```

---

## 🐛 Debugging Tips

### **Console Debugging:**
```javascript
console.log("Player position:", player.x, player.y);
console.log("Number of enemies:", enemies.length);
console.log("Current weapon:", currentWeapon);
```

### **Chrome DevTools:**
- Press F12 to open Developer Tools
- **Console tab**: See console.log() output
- **Sources tab**: Set breakpoints, step through code
- **Elements tab**: Inspect HTML/CSS

### **VS Code Debugging:**
1. Set breakpoints (click left of line numbers)
2. Press F5 to start debugging
3. Use debug toolbar:
   - **Continue (F5)**: Resume execution
   - **Step Over (F10)**: Next line
   - **Step Into (F11)**: Enter function
   - **Step Out (Shift+F11)**: Exit function

### **Inspect Variables While Paused:**
- Hover over variables to see values
- Use Debug Console to evaluate expressions
- Watch window to monitor specific variables

---

## 🎯 Common Issues

### **"Live Server not starting"**
- Check port 5500 isn't already in use
- Try different port in `.vscode/settings.json`

### **"Game not loading"**
- Check browser console (F12) for errors
- Verify file path in `index.html` is correct
- Make sure Live Server is running

### **"p5.js is not defined"**
- Internet connection needed (loads from CDN)
- Or download p5.js locally and update `index.html`

### **"Debugger not connecting"**
- Make sure Chrome/Edge is installed
- Try closing all browser windows first
- Check firewall isn't blocking localhost

---

## 📁 Project Structure

```
CodingProject/
├── index.html              # Main HTML file (loads p5.js and game)
├── completed.js            # Full game (all 6 days)
├── miniSurvivors.js        # Alternative version
├── 1-day1-basics/
│   ├── starter.js          # Student version
│   └── completed.js        # Teacher reference
├── 2-day2-combat/
│   ├── starter.js
│   └── completed.js
├── ... (more days)
└── .vscode/
    ├── launch.json         # Debug configurations
    └── settings.json       # Live Server settings
```

---

## 🎨 For Students: Testing Your Code

1. **Save your changes** (Cmd+S)
2. **Browser auto-refreshes** (with Live Server)
3. **Check console** for errors (F12)
4. **Play test** your modifications!

---

## 🏆 Pro Tips

- **Auto-reload**: Live Server refreshes browser when you save
- **Multiple files**: Open `.js` and browser side-by-side
- **Console tricks**: Use `console.table(enemies)` to see array contents
- **Performance**: Check FPS with `console.log(frameRate())`
- **Screenshots**: Use browser's screenshot tool for showcasing

---

## 📚 Additional Resources

- **p5.js Reference**: https://p5js.org/reference/
- **Chrome DevTools Guide**: https://developer.chrome.com/docs/devtools/
- **VS Code Debugging**: https://code.visualstudio.com/docs/editor/debugging

---

**Happy Coding! 🚀**
