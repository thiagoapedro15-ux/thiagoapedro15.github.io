document.addEventListener("DOMContentLoaded", () => {

  const wheel = document.getElementById("wheel");
  const spinBtn = document.getElementById("spin");
  const modal = document.getElementById("modal");
  const resultText = document.getElementById("result");
  const closeBtn = document.getElementById("close");

  let currentRotation = 0;
  let spinning = false;

  // ORDEM DAS FATIAS (sentido horário, começando do TOPO)
  const items = [
    "Poste uma foto agora e marque a gente",
    "Faça uma ideia para o Red Bull Basement",
    "Grite igual uma águia por 30s",
    "Faça um comercial da Red Bull em 15s",
    "10 flexões",
    "Fale bem do professor",
    "Ganhe um adesivo",
    "Siga a Eagles no Instagram"
  ];

  const total = items.length;
  const slice = 360 / total;

  spinBtn.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;

    const spins = 6;
    const randomAngle = Math.random() * 360;

    currentRotation += spins * 360 + randomAngle;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      const angleAtPointer =
        (360 - (currentRotation % 360) + 90) % 360;

      const index = Math.floor(angleAtPointer / slice);
      const centerOfSlice = index * slice + slice / 2;
      const correction = angleAtPointer - centerOfSlice;

      currentRotation += correction;
      wheel.style.transform = `rotate(${currentRotation}deg)`;

      resultText.textContent = items[index];
      modal.classList.add("active");

      launchFireworks();

      spinning = false;
    }, 4500);
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  /* =========================
     🎆 FOGOS (ISOLADOS)
  ========================= */

  const canvas = document.getElementById("fireworks");
  if (!canvas) return; // segurança extra

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function launchFireworks() {
    const particles = [];
    const colors = ["#fecd00", "#e10600", "#1e4fd8", "#ffffff"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 6 + 3,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 100
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
        p.speed *= 0.97;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      });

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    animate();
  }

});
