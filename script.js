/* ============================================================
   ADESTRAMENTO SEM MISTÉRIO — main.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ── SCROLL REVEAL — delay via data-delay (ajuste 5) ───────
  // Cada elemento pode ter data-delay="0.1" no HTML para
  // controlar a ordem de entrada de forma cinematográfica.
  // Sem data-delay → entra imediatamente.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.transitionDelay = delay + 's';
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
      current = Math.min(97, Math.max(68, current + variation));
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

  // ── BOTÃO MAGNÉTICO (ajuste 4) ────────────────────────────
  // O botão acompanha levemente o mouse, criando atração.
  // Só em desktop (pointer: fine).
  const isMouseDevice = window.matchMedia('(pointer: fine)').matches;

  if (isMouseDevice) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px) scale(1.05)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ── LUZ NO CARD SEGUINDO O MOUSE ──────────────────────────
  if (isMouseDevice) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--y', (e.clientY - rect.top)  + 'px');
      });
    });
  }

  // ── PARALLAX NAS IMAGENS ───────────────────────────────────
  const parallaxEls = document.querySelectorAll('.img-main, .img-medium');

  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      parallaxEls.forEach(el => {
        el.style.transform = `translateY(${scroll * 0.05}px)`;
      });
    }, { passive: true });
  }

  // ── EFEITO FOCO NAS SEÇÕES (ajuste 7) ─────────────────────
  // A seção ativa fica em destaque; as demais ficam levemente
  // apagadas e reduzidas. Desativado em mobile via CSS.
  const sections = document.querySelectorAll('.section');

  if (sections.length > 0) {
    const onScroll = () => {
      const current = window.scrollY;
      sections.forEach(sec => {
        const top    = sec.offsetTop - 200;
        const bottom = top + sec.offsetHeight;
        sec.classList.toggle('inactive', !(current >= top && current <= bottom));
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // roda uma vez no load para não começar tudo inativo
  }

  // ── CURSOR GLOW (apenas desktop com mouse) ─────────────────
  if (isMouseDevice) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

});
