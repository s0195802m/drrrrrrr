const button = document.getElementById("magicBtn");
const music = document.getElementById("music");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

button.addEventListener("click", () => {

    // 🎵 музыка
    if (music.paused) {
        music.volume = 0.8;
        music.play();
    }

    // 💥 взрыв
    createExplosion();
    animate();
});

/* 💥 СОЗДАНИЕ ВЗРЫВА */
function createExplosion() {
    const dpr = window.devicePixelRatio || 1;

    const cx = canvas.width / (2 * dpr);
    const cy = canvas.height / (2 * dpr);

    const colors = ["#ff3b7f", "#ff77aa", "#ffd1dc", "#ffffff"];

    for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4;

        particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 12 + 16,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1
        });
    }
}

/* ❤️ РИСУЕМ ПРОСТОЕ СЕРДЦЕ */
function drawHeart(x, y, size, color, alpha) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x - size / 2, y - size / 2, size / 2, 0, Math.PI * 2);
    ctx.arc(x + size / 2, y - size / 2, size / 2, 0, Math.PI * 2);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 1;
}

/* 🎉 АНИМАЦИЯ */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;      // гравитация
        p.life -= 0.015;   // затухание

        drawHeart(p.x, p.y, p.size, p.color, p.life);

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    });

    if (particles.length > 0) {
        requestAnimationFrame(animate);
    }
}