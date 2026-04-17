/* ============================================================
   ADESTRAMENTO SEM MISTÉRIO — main.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const isMobile     = window.innerWidth < 768;
  const isMouseDevice = window.matchMedia('(pointer: fine)').matches;

  /* ── PARTÍCULAS CANVAS ──────────────────────────────────── */
  const canvas = document.getElementById('pCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const PCOUNT = isMobile ? 22 : 50;
    const particles = Array.from({ length: PCOUNT }, () => ({
      x:   Math.random() * window.innerWidth,
      y:   window.innerHeight + Math.random() * window.innerHeight,
      size:  Math.random() * 1.8 + 0.7,
      speed: Math.random() * 0.55 + 0.2,
      drift: (Math.random() - 0.5) * 0.22,
      maxOp: Math.random() * 0.5 + 0.15,
      op:    0,
    }));

    (function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        const prog = 1 - p.y / canvas.height;
        p.op = prog < 0.12 ? (prog / 0.12) * p.maxOp
             : prog > 0.85 ? ((1 - prog) / 0.15) * p.maxOp
             : p.maxOp;
        if (p.y < -10) {
          p.y = canvas.height + Math.random() * 120;
          p.x = Math.random() * canvas.width;
          p.speed = Math.random() * 0.55 + 0.2;
          p.maxOp = Math.random() * 0.5 + 0.15;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(245,197,24,${p.op})`;
        ctx.shadowColor = 'rgba(245,197,24,0.5)';
        ctx.shadowBlur  = 5;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + 's';
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── SMOOTH SCROLL ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── CONTADOR DE VISITANTES ─────────────────────────────── */
  const viewersEl = document.getElementById('viewers');
  if (viewersEl) {
    let current = Math.floor(Math.random() * 25 + 70);
    viewersEl.innerText = current;
    setInterval(() => {
      current = Math.min(97, Math.max(68, current + Math.floor(Math.random() * 5) - 2));
      viewersEl.innerText = current;
    }, 4000);
  }

  /* ── FAQ CHEVRON ────────────────────────────────────────── */
  document.querySelectorAll('details').forEach(d => {
    d.addEventListener('toggle', () => {
      const c = d.querySelector('.chevron');
      if (c) c.style.transform = d.open ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });

  /* ── FEEDBACK NO BOTÃO (externos) ───────────────────────── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (!(btn.getAttribute('href') || '').startsWith('http')) return;
    btn.addEventListener('click', () => {
      const orig = btn.innerText;
      btn.innerText = '⏳ CARREGANDO...';
      setTimeout(() => { btn.innerText = orig; }, 3000);
    });
  });

  /* ── SCROLL ÚNICO OTIMIZADO (rAF) ───────────────────────── */
  const stickyBar     = document.getElementById('stickyBar');
  const ofertaSection = document.getElementById('oferta');
  const parallaxEls   = document.querySelectorAll('.img-main,.img-medium');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const sy = window.scrollY;

      // Sticky bar
      if (stickyBar) {
        const show = sy > 600 && (!ofertaSection || sy < ofertaSection.offsetTop - 100);
        stickyBar.classList.toggle('show', show);
      }

      // Parallax (apenas desktop)
      if (!isMobile) {
        parallaxEls.forEach(el => { el.style.transform = `translateY(${sy * 0.04}px)`; });
      }

      ticking = false;
    });
  }, { passive: true });

  /* ── EFEITOS APENAS DESKTOP ─────────────────────────────── */
  if (isMouseDevice) {

    // Cursor glow
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });

    // Luz no card seguindo mouse
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
      });
    });

    // Botão magnético
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width/2)*0.12}px,${(e.clientY - r.top - r.height/2)*0.16}px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

});
