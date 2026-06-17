// ── Persistent drawing canvas ─────────────────────────────
const drawCanvas = document.getElementById('draw-canvas');
const drawCtx    = drawCanvas.getContext('2d');

drawCanvas.width  = window.innerWidth;
drawCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  const img = drawCtx.getImageData(0, 0, drawCanvas.width, drawCanvas.height);
  drawCanvas.width  = window.innerWidth;
  drawCanvas.height = window.innerHeight;
  drawCtx.putImageData(img, 0, 0);
  setStyle();
});

function setStyle() {
  drawCtx.strokeStyle = '#111111';
  drawCtx.lineWidth   = 3;
  drawCtx.lineCap     = 'round';
  drawCtx.lineJoin    = 'round';
}
setStyle();

let prevX = null, prevY = null;

document.addEventListener('mousemove', e => {
  const cx = e.clientX, cy = e.clientY;
  if (prevX !== null) {
    drawCtx.beginPath();
    drawCtx.moveTo(prevX, prevY);
    drawCtx.lineTo(cx, cy);
    drawCtx.stroke();
  }
  prevX = cx; prevY = cy;
});

document.addEventListener('mouseleave', () => { prevX = null; prevY = null; });
document.addEventListener('mouseenter', e => { prevX = e.clientX; prevY = e.clientY; });

// ── Cursor dot ────────────────────────────────────────────
const dotCanvas = document.getElementById('dot-canvas');
const dotCtx    = dotCanvas.getContext('2d');
dotCanvas.width  = window.innerWidth;
dotCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  dotCanvas.width  = window.innerWidth;
  dotCanvas.height = window.innerHeight;
});

let mx = -999, my = -999;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function loop() {
  dotCtx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);
  dotCtx.beginPath();
  dotCtx.arc(mx, my, 4, 0, Math.PI * 2);
  dotCtx.fillStyle = '#111';
  dotCtx.fill();
  requestAnimationFrame(loop);
}
loop();

// ── Fade in ───────────────────────────────────────────────
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.body.style.opacity = '1';
}));
