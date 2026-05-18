# 🎬 Scroll-Driven Canvas Sequencer

[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-F7DF1E?logo=javascript&logoColor=black)]()
[![Rendering](https://img.shields.io/badge/Rendering-HTML5%20Canvas-blue.svg)]()
[![Performance](https://img.shields.io/badge/Optimization-requestAnimationFrame-success.svg)]()

> **Cinematic, frame-by-frame scroll animations engineered with Vanilla JavaScript and HTML5 Canvas.**
> This project demonstrates how to create the "Apple-style" product showcase effect. It takes a pre-extracted sequence of video frames (WebP) and binds their playback directly to the user's scroll position, creating a buttery-smooth, interactive 3D-like experience without the overhead of WebGL.

---

## ✨ Features & Engineering

* **Scroll-Bound Playback:** The current image frame is dynamically calculated based on the window's `scrollY` percentage.
* **Linear Interpolation (Lerp):** Uses mathematical smoothing (`current += (target - current) * 0.08`) inside a `requestAnimationFrame` loop to prevent jarring frame jumps when scrolling quickly.
* **Dynamic Styling Effects:** Implements scroll-based CSS filters (blurring) and CSS transforms (title fading/scaling) synchronized with the frame sequence.
* **Smart Preloading:** Ensures all frames are fully loaded into the browser cache before initializing the render loop to prevent flickering or blank frames.
* **Responsive Canvas:** Dynamically scales and centers the image frames using aspect-ratio calculations (`Math.min`) to fit any viewport size.

---

## ⚙️ How It Works (The Logic)

<table width="100%">
  <tr>
    <th width="30%">Stage</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><strong>1. Asset Extraction</strong></td>
    <td>A source video is broken down into individual image frames (e.g., via FFmpeg) and stored in the <code>/frames</code> directory as highly compressed <code>.webp</code> files.</td>
  </tr>
  <tr>
    <td><strong>2. Preloading</strong></td>
    <td>JavaScript creates new <code>Image()</code> objects for all 100 frames and waits for the <code>onload</code> event to fire for every single frame before rendering.</td>
  </tr>
  <tr>
    <td><strong>3. Scroll Mapping</strong></td>
    <td>The scroll progress (<code>0.0</code> to <code>1.0</code>) is mapped to the frame index. For example, scrolling 50% down the page targets frame 50.</td>
  </tr>
  <tr>
    <td><strong>4. Canvas Drawing</strong></td>
    <td><code>ctx.drawImage()</code> is called continuously via <code>requestAnimationFrame</code>, wiping the canvas and drawing the exact frame matching the interpolated scroll position.</td>
  </tr>
</table>

---

## 🚀 Getting Started

### Prerequisites
All you need is a modern web browser. No build tools or package managers are required.

### Installation & Execution
1. Clone the repository:
```bash
git clone [https://github.com/YourUsername/scroll-driven-frames.git](https://github.com/YourUsername/scroll-driven-frames.git)
cd scroll-driven-frames
```
2. Open `index.html` directly in your browser.

---

## 🛠️ How to Use Your Own Video

If you want to swap the default animation with your own 3D render or video:

1. **Extract Frames:** Use FFmpeg to convert your video into an image sequence.
   ```bash
   # Example FFmpeg command to extract 30 frames per second as WebP
   ffmpeg -i your_video.mp4 -vf fps=30 frame_%04d.webp
   ```
2. **Move Files:** Place the extracted images into the `/frames` folder.
3. **Update Config:** Open `script.js` and update the `frameCount` variable at the top of the file to match your total number of extracted images:
   ```javascript
   const frameCount = 150; // Set this to your total frame count
   ```

---

## 📌 Project Purpose

This repository was built as an experimental frontend engineering project to explore scroll-linked animations, canvas rendering optimization, and linear interpolation techniques outside of heavy libraries like Three.js or GSAP.
