// script.js

// Grab the canvas and set up context
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to fit the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Array to hold our letters ("particles")
const letters = [];

// Characters to choose from (like in The Matrix)
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789あいうえおかきくけこさしすせそ';

// Mouse move listener
window.addEventListener('mousemove', (e) => {
  // Number of letters to spawn around the cursor
  const count = 15;

  for (let i = 0; i < count; i++) {
    // Random letter from our matrixChars string
    const char = matrixChars.charAt(
      Math.floor(Math.random() * matrixChars.length)
    );

    // Slight offset so the letters aren’t all in the same position
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;

    // Create a letter object
    letters.push({
      x: e.clientX + offsetX,
      y: e.clientY + offsetY,
      char,
      opacity: 1, // start fully opaque
      size: Math.floor(Math.random() * 18) + 12, // random size
      fadeSpeed: Math.random() * 0.02 + 0.01, // how fast it fades
    });
  }
});

// Animation loop
function animate() {
  // Clear the canvas each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw letters
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];

    // Set the font and style
    ctx.font = `${letter.size}px monospace`;
    ctx.fillStyle = `rgba(0, 255, 0, ${letter.opacity})`; // green color
    ctx.fillText(letter.char, letter.x, letter.y);

    // Make the letters fade
    letter.opacity -= letter.fadeSpeed;

    // Optionally move the letters slightly downward to mimic falling
    letter.y += 0.5;

    // Remove letters that are fully transparent
    if (letter.opacity <= 0) {
      letters.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}
animate();
