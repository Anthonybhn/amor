const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
let speed = 10;
let message = "Te Amo mi princesa 💘";
let color = "#ffffff";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 24;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }).fill(1);

document.getElementById("speedControl").addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
});

document.getElementById("colorPicker").addEventListener("input", (e) => {
  color = e.target.value;
});

document.getElementById("textInput").addEventListener("input", (e) => {
  message = e.target.value;
});

canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  explosion(x, y);
});

function explosion(x, y) {
  const partes = 30;
  for (let i = 0; i < partes; i++) {
    const angulo = (Math.PI * 2 * i) / partes;
    const dx = Math.cos(angulo) * 4;
    const dy = Math.sin(angulo) * 4;
    animateExplosion(x, y, dx, dy);
  }
}

function animateExplosion(x, y, dx, dy) {
  let vida = 40;
  function frame() {
    if (vida <= 0) return;
    ctx.fillStyle = color;
    ctx.font = "bold 18px 'Segoe Script', cursive";
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillText(message, x + dx * (40 - vida), y + dy * (40 - vida));
    vida--;
    requestAnimationFrame(frame);
  }
  frame();
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.font = `${fontSize}px 'Segoe Script', cursive`;

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? message : "💖";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    draw();
  }, 1000 / speed);
}

animate();
