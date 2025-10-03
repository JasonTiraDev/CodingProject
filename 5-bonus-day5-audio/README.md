# 🎵 Bonus Day 5: Sound & Music

## 📚 Learning Goals
- Loading and playing sound effects
- Background music and audio loops
- Dynamic audio based on game events
- Audio feedback for player actions
- Creating atmosphere with sound design

## 🎯 What You'll Build
Starting with your **complete Day 4 visual masterpiece**, you'll add:
- **Weapon Sound Effects**: Unique audio for basic, spread, and rapid fire weapons
- **Dynamic Explosions**: Explosion sounds that vary based on enemy size
- **Musical Power-ups**: Pleasant musical notes when collecting health, weapons, speed
- **Background Music**: Ambient music that intensifies with danger level
- **Audio Controls**: Master mute toggle and volume controls for music/SFX
- **Damage Feedback**: Harsh audio feedback when taking damage
- **Level Up Fanfare**: Musical sequences for major achievements
- **Complete Audio Experience**: Transform your visual game into a sensory masterpiece

## 🎮 How to Use This Lesson

### For Students:
1. **Prerequisites**: Complete Days 1-4 first!
2. **CRITICAL**: Must add p5.sound library before starting!
3. **Important**: Use the Day 5 `starter.js` file - it contains your complete working Day 4 visual game!
4. Follow the step-by-step TODOs to add incredible audio effects
5. Test each sound as you implement it in [p5.js Web Editor](https://editor.p5js.org/)
6. Allow microphone access if prompted (for audio analysis)
7. Compare with `completed.js` when you need guidance

### For Teachers:
- **ESSENTIAL**: Verify p5.sound library is added to all projects
- **File Structure**:
  - `starter.js`: Complete Day 4 visual game + Day 5 audio TODOs for students
  - `completed.js`: All Day 5 audio features fully implemented with Day 4 visuals
- Perfect lesson to discuss how audio creates emotional connection in games
- Emphasize that professional games are multi-sensory experiences

## 🔊 **CRITICAL** Audio Setup
**BEFORE STARTING: You MUST add the p5.sound library!**

### In p5.js Web Editor:
1. Click on the `index.html` file in your project
2. Add this line in the `<head>` section:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>
   ```
3. **Without this library, none of the audio code will work!**

### Optional: Using Real Audio Files
- Create an `assets/` folder in your project
- Upload `.wav` or `.mp3` files
- Use `loadSound('assets/filename.wav')` in `preload()`
- **For this lesson**: We'll create procedural sounds with oscillators (no files needed!)

## 🔑 Key Concepts Covered
- **p5.sound Library**: Using the powerful p5.sound addon for web audio
- **Procedural Audio**: Creating sounds with oscillators instead of files
- **Sound Triggers**: Playing audio in response to specific game events
- **Dynamic Music**: Background music that changes intensity with game state
- **Audio Controls**: Implementing mute toggles and volume sliders
- **Musical Theory**: Using musical notes and scales for pleasant power-up sounds
- **Audio Feedback**: Creating immediate auditory response to player actions
- **Frequency Mapping**: Matching sound pitch to visual elements (enemy size = pitch)

## 🎵 Audio Features Students Will Add
- **Weapon-Specific Sounds**: Different frequencies for basic (800Hz), spread (600Hz), rapid (1000Hz)
- **Size-Based Explosions**: Bigger enemies create deeper explosion sounds (150-250Hz range)
- **Musical Power-ups**: Pleasant note sequences (C-E-G progressions) for different power-up types
- **Adaptive Background Music**: Quiet ambient drone that intensifies with enemy count
- **Damage Audio**: Harsh low-frequency (150Hz) feedback when taking damage
- **Level Up Fanfare**: Ascending musical scale (C-E-G-C octave) for achievements
- **Real-time Controls**: M key for mute toggle, +/- keys for volume adjustment
- **Audio Status Display**: Visual indicators showing current volume levels and mute status
- Background music with game state management
- Volume controls (M to mute, +/- for volume)
- Visual audio feedback with pulsing elements

## 💡 Try These Modifications
- Record your own sound effects using your phone
- Find royalty-free music tracks online
- Create different audio themes for different levels
- Add positional audio (sounds from left/right)
- Implement voice acting or narration

## 🎯 Advanced Challenges
- Add different sound effects for each weapon type
- Create dynamic music that changes with level
- Add footstep sounds when player moves
- Implement 3D positioned audio
- Create a full audio options menu
- Make visuals react to actual audio analysis

## ➡️ What's Next?
Ready for the ultimate challenge? Bonus Day 6 features advanced game mechanics with boss battles and complex systems!