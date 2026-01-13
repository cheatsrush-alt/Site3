function showTab(tab) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  if (tab === 'funcoes') {
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.getElementById('funcoes').classList.add('active');
  } else {
    document.querySelectorAll('.tab')[1].classList.add('active');
    document.getElementById('info').classList.add('active');
  }
}

function toggleCheck(item) {
  const img = item.querySelector('img');
  const isOn = img.src.includes('check-on');

  img.src = isOn
    ? 'assets/check-off.png'
    : 'assets/check-on.png';
}

/* FUNDO ANIMADO */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = Array.from({length: 40}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - .5) * .4,
  vy: (Math.random() - .5) * .4
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x<0||p.x>canvas.width) p.vx*=-1;
    if (p.y<0||p.y>canvas.height) p.vy*=-1;

    ctx.fillStyle = '#ff0033';
    ctx.fillRect(p.x, p.y, 2, 2);
  });

  for (let i=0;i<points.length;i++) {
    for (let j=i+1;j<points.length;j++) {
      let dx = points[i].x - points[j].x;
      let dy = points[i].y - points[j].y;
      let d = Math.sqrt(dx*dx+dy*dy);
      if (d < 120) {
        ctx.strokeStyle = 'rgba(255,0,51,0.15)';
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();