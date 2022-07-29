import Complex from './complex.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const size = Math.min(innerWidth, innerHeight);
canvas.height = innerHeight;
canvas.width = innerWidth;
const arr = new Uint8ClampedArray(4 * innerWidth * innerHeight);
let iw = innerWidth;
let ih = innerWidth;
let a = 0;
let b = 4;
let dx = 2;
let dy = 1.5;

function drow() {
  for (let i = 0; i < arr.length; i += 4) {
    const x = (((i / 4) % iw) / iw) * b - dx;
    const y = (Math.floor(i / 4 / iw) / ih) * b - dy;
    const score = new Complex(x, y).isInMandelbrot(1024) * 255;
    if (score === true) {
      arr[i + 0] = 255;
      arr[i + 1] = 255;
      arr[i + 2] = 255;
      arr[i + 3] = 255;
    } else {
      arr[i + 0] = score; // R value
      arr[i + 1] = score * 2; // G value
      arr[i + 2] = score * 3; // B value
      arr[i + 3] = 255; // A value
    }
  }

  const imageData = new ImageData(arr, innerWidth, innerHeight);

  ctx.putImageData(imageData, 0, 0);
}
drow();
/**
 * 0123
 * 4567
 * 8901
 *
 */
addEventListener('keydown', (e) => {
  let d = b / 3;
  let magic = b / 30;
  switch (e.key) {
    case 'a':
      dx += d;
      break;
    case 'd':
      dx -= d;
      break;
    case 'w':
      dy += d;
      break;
    case 's':
      dy -= d;
      break;
    case 'q':
      b *= 1.1;
      dy += magic;
      dx += magic;
      break;
    case 'e':
      b /= 1.1;
      dx -= magic;
      dy -= magic;
      break;
  }
  drow();
});

setInterval(() => {
  let magic = b / 45;
  b /= 1.05;
  dx -= magic;
  dy -= magic;
  drow();
}, 100);
