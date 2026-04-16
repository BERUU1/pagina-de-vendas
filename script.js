/* ============================================================
   ADESTRAMENTO SEM MISTÉRIO — main.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ── PARTÍCULAS DINÂMICAS ───────────────────────────────────
  // Cria automaticamente 40 pontinhos dourados subindo.
  // Em mobile reduz para 20 para não pesar.
  const particlesContainer = document.getElementById('particles');

  if (particlesContainer) {
    const isMobile = window.innerWidth < 768;
    const MAX_PARTICLES = isMobile ? 20 : 40;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const span = document.createElement('span');
      span.style.left            = Math.random() * 100 + 'vw';
      span.style.animationDuration = (Math.random() * 10 + 10) + 's';
      span.style.animationDelay   = (Math.random() * 10) + 's';
      particlesContainer.appendChild(span);
    }
  }

  // ── SCROLL REVEAL — delay via data-delay ──────────────────
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

  // ── CONTADOR DE VISITANTES ─────────────────────────────────
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
 let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scroll = window.scrollY;
      parallaxEls.forEach(el => {
        el.style.transform = `translateY(${scroll * 0.05}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

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

  // ── EFEITOS APENAS DESKTOP ─────────────────────────────────
  const isMouseDevice = window.matchMedia('(pointer: fine)').matches;

  if (isMouseDevice) {

    // Botão magnético
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px) scale(1.05)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    // Luz no card seguindo o mouse
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--y', (e.clientY - rect.top)  + 'px');
      });
    });

    // Cursor glow
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.body.appendChild(glow);
  }

  // ── PARALLAX NAS IMAGENS ───────────────────────────────────
  const parallaxEls = document.querySelectorAll('.img-main, .img-medium');
  if (parallaxEls.length > 0) {
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // seu código aqui
      ticking = false;
    });
    ticking = true;
  }
});
      const scroll = window.scrollY;
      parallaxEls.forEach(el => {
        el.style.transform = `translateY(${scroll * 0.05}px)`;
      });
    }, { passive: true });
  }

  // ── EFEITO FOCO NAS SEÇÕES ─────────────────────────────────
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
    onScroll();
  }
   // GERAR PARTÍCULAS


document.addEventListener('mousemove', (e) => {
  if (glow) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }
});

});
