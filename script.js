document.addEventListener("DOMContentLoaded", () => {

  const particlesContainer = document.getElementById('particles');
  const stickyBar = document.getElementById('stickyBar');
  const ofertaSection = document.getElementById('oferta');
  const viewersEl = document.getElementById("viewers");
  const parallaxEls = document.querySelectorAll('.img-main, .img-medium');
  const sections = document.querySelectorAll('.section');

  const isMobile = window.innerWidth < 768;
  const isMouseDevice = window.matchMedia('(pointer: fine)').matches;

  /* ── PARTÍCULAS ── */
  if (particlesContainer) {
    const MAX = isMobile ? 20 : 40;

    for (let i = 0; i < MAX; i++) {
      const span = document.createElement('span');
      span.style.left = Math.random() * 100 + 'vw';
      span.style.animationDuration = (Math.random() * 10 + 10) + 's';
      span.style.animationDelay = (Math.random() * 10) + 's';
      particlesContainer.appendChild(span);
    }
  }

  /* ── SCROLL REVEAL ── */
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

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── CONTADOR ── */
  if (viewersEl) {
    let current = Math.floor(Math.random() * 25) + 70;
    viewersEl.innerText = current;

    setInterval(() => {
      current += Math.floor(Math.random() * 5) - 2;
      current = Math.min(97, Math.max(68, current));
      viewersEl.innerText = current;
    }, 4000);
  }

  /* ── CURSOR GLOW (DESKTOP) ── */
  let glow;
  if (isMouseDevice) {
    glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  /* ── BOTÕES ── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    const href = btn.getAttribute('href') || '';
    if (!href.startsWith('http')) return;

    btn.addEventListener('click', () => {
      const original = btn.innerText;
      btn.innerText = '⏳ CARREGANDO...';
      setTimeout(() => btn.innerText = original, 3000);
    });

    if (isMouseDevice) {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px) scale(1.05)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    }
  });

  /* ── CARDS LIGHT ── */
  if (isMouseDevice) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--y', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* ── SCROLL OTIMIZADO (TUDO JUNTO) ── */
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {

        const scroll = window.scrollY;

        // Sticky bar
        if (stickyBar) {
          const show = scroll > 600 &&
            (!ofertaSection || scroll < ofertaSection.offsetTop - 100);
          stickyBar.classList.toggle('show', show);
        }

        // Parallax (apenas desktop)
        if (!isMobile && parallaxEls.length) {
          parallaxEls.forEach(el => {
            el.style.transform = `translateY(${scroll * 0.05}px)`;
          });
        }

        // Seções foco
        sections.forEach(sec => {
          const top = sec.offsetTop - 200;
          const bottom = top + sec.offsetHeight;
          sec.classList.toggle('inactive', !(scroll >= top && scroll <= bottom));
        });

        ticking = false;
      });

      ticking = true;
    }
  }, { passive: true });

});
