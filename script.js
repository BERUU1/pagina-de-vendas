/* ============================================================
   ADESTRAMENTO SEM MISTÉRIO — main.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ── SCROLL REVEAL — delay orgânico ────────────────────────
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

  // ── SMOOTH SCROLL ─────────────────────────────────────────
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
    }, 4000);
  }

  // ── STICKY BAR ────────────────────────────────────────────
  const stickyBar = document.getElementById('stickyBar');
  const ofertaSection = document.getElementById('oferta');

  if (stickyBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 600;
      const pastOffer = ofertaSection && window.scrollY > ofertaSection.offsetTop - 100;
      stickyBar.classList.toggle('show', scrolled && !pastOffer);
    }, { passive: true });
  }

  // ── FAQ CHEVRON ────────────────────────────────────────────
  document.querySelectorAll('details').forEach(d => {
    d.addEventListener('toggle', () => {
      const chevron = d.querySelector('.chevron');
      if (chevron) chevron.style.transform = d.open ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });

  // ── FEEDBACK NO BOTÃO (só externos) ───────────────────────
  document.querySelectorAll('.btn-primary').forEach(btn => {
    const href = btn.getAttribute('href') || '';
    if (!href.startsWith('http')) return;

    btn.addEventListener('click', () => {
      const original = btn.innerText;
      btn.innerText = '⏳ CARREGANDO...';
      setTimeout(() => { btn.innerText = original; }, 3000);
    });
  });

  // ── LUZ NO CARD SEGUINDO O MOUSE ──────────────────────────
  // Atualiza as variáveis CSS --x e --y relativas ao card
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--y', (e.clientY - rect.top)  + 'px');
    });
  });

  // ── PARALLAX LEVE NAS IMAGENS ──────────────────────────────
  // Cria sensação de profundidade sem pesar a página
  const parallaxEls = document.querySelectorAll('.img-main, .img-medium');

  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      parallaxEls.forEach(el => {
        el.style.transform = `translateY(${scroll * 0.05}px)`;
      });
    }, { passive: true });
  }

  // ── CURSOR GLOW (apenas desktop/mouse) ────────────────────
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

});
