/**
 * Main Application Script — "ANJALI'S DIGITAL LAB"
 * Manages the Monogram Loader, Navigation, Video Autoplay, Scroll Spies, Toast, and Digital Lab interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. UNIQUE MONOGRAM LOADING SEQUENCE (A -> AG -> ANJALI)
  const introLoader = document.getElementById('lab-intro-loader');
  const loaderText = document.getElementById('loader-monogram-text');
  const loaderStatus = document.getElementById('loader-status-text');
  const loaderProgress = document.getElementById('loader-progress-fill');

  if (introLoader && loaderText && loaderStatus && loaderProgress) {
    const sequence = [
      { text: 'A', status: '> initializing Anjali\'s digital lab...', progress: '25%', delay: 150 },
      { text: 'AG', status: '> loading core modules & toolkit...', progress: '65%', delay: 450 },
      { text: 'ANJALI', status: '> systems online ✓', progress: '100%', delay: 750 }
    ];

    sequence.forEach(step => {
      setTimeout(() => {
        loaderText.textContent = step.text;
        loaderStatus.textContent = step.status;
        loaderProgress.style.width = step.progress;
      }, step.delay);
    });

    // Dismiss loader smoothly
    setTimeout(() => {
      introLoader.classList.add('loader-hidden');
    }, 1100);
  }

  // 2. STICKY NAVBAR & ACTIVE SECTION HIGHLIGHTING
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. MOBILE MENU TOGGLE
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('active');
      const isExpanded = mobileToggle.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. DIGITAL LAB PROFILE VIDEO (Exact Asset & Sound Toggle)
  const profileVideo = document.getElementById('lab-profile-video');
  const audioToggleBtn = document.getElementById('lab-audio-btn');

  if (profileVideo) {
    profileVideo.muted = true;
    profileVideo.play().catch(err => {
      console.log('Video autoplay handled by browser policy:', err);
    });

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        profileVideo.muted = !profileVideo.muted;
        const icon = audioToggleBtn.querySelector('.audio-icon');
        if (profileVideo.muted) {
          icon.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;
          audioToggleBtn.setAttribute('title', 'Unmute audio');
        } else {
          icon.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;
          audioToggleBtn.setAttribute('title', 'Mute audio');
        }
      });
    }
  }

  // 5. TOAST & EMAIL CLIPBOARD COPY
  const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('global-toast');
  const toastMessage = document.getElementById('toast-message');

  const showToast = (message) => {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  copyEmailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'anjaliagolegaonkar@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  // 6. SCROLL REVEAL OBSERVER
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 7. SMOOTH SCROLL ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 75;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
