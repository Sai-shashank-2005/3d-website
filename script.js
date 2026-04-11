const frameCount = 100; // change if needed
const images = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const title = document.querySelector(".title");

// resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 🔥 PRELOAD (FIXED FOR 0001 FORMAT)
let loaded = 0;

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = `frames/frame_${String(i).padStart(4, "0")}.webp`;

  img.onload = () => {
    loaded++;
    if (loaded === frameCount) {
      render(0);
    }
  };

  images.push(img);
}

let current = 0;
let target = 0;
let progress = 0;

// SCROLL CONTROL
const animationStart = 0.3;
const animationEnd = 0.9;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  progress = scrollTop / maxScroll;

  // blur effect
  const blur =
    progress < animationStart
      ? 20 * (1 - progress / animationStart)
      : 0;

  canvas.style.filter = `blur(${blur}px)`;

  // title animation
  if (progress < animationStart) {
    const localProgress = progress / animationStart;

    title.style.opacity = 1 - localProgress;
    title.style.transform = `translate(-50%, ${
      localProgress * -100
    }px) scale(${1 + localProgress * 0.3})`;
  }

  // frame animation
  if (progress > animationStart) {
    const animProgress =
      (progress - animationStart) /
      (animationEnd - animationStart);

    target = animProgress * (frameCount - 1);
  } else {
    target = 0;
  }
});

// render
function render(index) {
  const img = images[index];
  if (!img) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.min(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = (canvas.width - img.width * scale) / 2;
  const y = (canvas.height - img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// smooth animation
function animate() {
  current += (target - current) * 0.08;
  render(Math.floor(current));
  requestAnimationFrame(animate);
}

animate();