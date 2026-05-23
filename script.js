// Portfolio Hadriel — interactive particle background + small enhancements
console.log("%c👋 Halo! Selamat datang di Portfolio Hadriel.", "color:#8b7cff;font-weight:bold;font-size:14px");

// --- Particle network background (Lewis Hadden style starfield) ---
(function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];
  const COLORS = ["#8b7cff", "#38bdf8", "#4ade80", "#c9b8ff"];

  function resize() {
    w = canvas.width = window.innerWidth * devicePixelRatio;
    h = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 14000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      r: (Math.random() * 1.4 + 0.4) * devicePixelRatio,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      a: Math.random() * 0.6 + 0.2,
    }));
  }
  window.addEventListener("resize", resize);
  resize();

  const mouse = { x: -9999, y: -9999 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX * devicePixelRatio;
    mouse.y = e.clientY * devicePixelRatio;
  });

  function tick() {
    ctx.clearRect(0, 0, w, h);
    // draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const max = 120 * devicePixelRatio;
        if (d < max) {
          ctx.strokeStyle = `rgba(139,124,255,${0.12 * (1 - d / max)})`;
          ctx.lineWidth = 0.6 * devicePixelRatio;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    // draw + move particles
    for (const p of particles) {
      // mouse interaction
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      const radius = 110 * devicePixelRatio;
      if (d2 < radius * radius) {
        const f = (1 - Math.sqrt(d2) / radius) * 0.6;
        p.x += (dx / Math.sqrt(d2 || 1)) * f;
        p.y += (dy / Math.sqrt(d2 || 1)) * f;
      }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) tick();
})();

// Active nav link on scroll
document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
  a.addEventListener("click", () => {
    document.querySelectorAll(".nav-links a").forEach((x) => x.classList.remove("active"));
    a.classList.add("active");
  });
});
