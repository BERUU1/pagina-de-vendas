/* ============================================================
   ADESTRAMENTO SEM MISTÉRIO — main.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ── SCROLL REVEAL ──────────────────────────────────────────
  // Usa .visible (padrão do CSS). transitionDelay aleatório
  // deixa os elementos entrarem de forma orgânica, não robótica.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (Math.random() * 0.2) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── SMOOTH SCROLL para links internos (#ancora) ────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── CONTADOR DE VISITANTES — orgânico ─────────────────────
  const viewersEl = document.getElementById("viewers");
  if (viewersEl) {
    let current = Math.floor(Math.random() * (95 - 70) + 70);
    viewersEl.innerText = current;
    setInterval(() => {
      const variation = Math.floor(Math.random() * 5) - 2;
      current += variation;
      if (current < 68) current = 68;
      if (current > 97) current = 97;
      viewersEl.innerText = current;
    }, 4000); // intervalo maior = mais humano
  }

  // ── STICKY BAR ────────────────────────────────────────────
  const stickyBar = document.getElementById('stickyBar');
  const ofertaSection = document.getElementById('oferta');

  if (stickyBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 600;
      const pastOffer = ofertaSection && window.scrollY > ofertaSection.offsetTop - 100;
      if (scrolled && !pastOffer) {
        stickyBar.classList.add('show');
      } else {
        stickyBar.classList.remove('show');
      }
    });
  }

  // ── FAQ CHEVRON ────────────────────────────────────────────
  document.querySelectorAll('details').forEach(d => {
    d.addEventListener('toggle', () => {
      const chevron = d.querySelector('.chevron');
      if (chevron) {
        chevron.style.transform = d.open ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });

  // ── FEEDBACK IMEDIATO NO BOTÃO (reduz ansiedade pós-clique) ─
  // Só aplica nos botões que levam pra fora (href externo),
  // para não interferir com links internos (#ancora).
  document.querySelectorAll('.btn-primary').forEach(btn => {
    const href = btn.getAttribute('href') || '';
    const isExternal = href.startsWith('http');
    if (!isExternal) return;

    btn.addEventListener('click', () => {
      const original = btn.innerText;
      btn.innerText = '⏳ CARREGANDO...';
      // Restaura após 3s caso o usuário volte ou a aba não abra
      setTimeout(() => { btn.innerText = original; }, 3000);
    });
  });

  // ── CURSOR GLOW (apenas desktop com mouse) ─────────────────
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

});
