/**
 * ============================================================================
 * MD KOUNAIN ANSARI - PORTFOLIO JAVASCRIPT
 * High-performance, modular interactive script
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initTypewriter();
  initStatsCounter();
  initSkillFilters();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initContactForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Sticky Navbar, Mobile Drawer & ScrollSpy
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll', navMenu.classList.contains('active'));
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // ScrollSpy Active Link Update
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Dynamic Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const words = [
    'Full-Stack Developer',
    'React & Next.js Specialist',
    'Node.js & MongoDB Builder',
    'Computer Science Student',
    'AI / ML Enthusiast'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. Stats Number Counter (Animated on scroll into view)
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1500; // 1.5 seconds
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = Math.floor(easeProgress * target);

            counter.textContent = currentVal + (target >= 100 ? '%' : '+');

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + (target >= 100 ? '%' : '+');
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   5. Skills Category Filters
   -------------------------------------------------------------------------- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('#skills-grid .skill-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Projects Category Filters
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const pFilterBtns = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  if (!pFilterBtns.length || !projectCards.length) return;

  pFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Project Detail Modal Preview System
   -------------------------------------------------------------------------- */
const projectsData = {
  salon: {
    title: 'Luxury Salon & Booking Platform',
    badge: 'Live Deployed Site',
    github: 'https://stylespeakz.netlify.app/',
    desc: 'A stylish, responsive beauty and grooming salon platform with service menus, pricing packages, customer testimonials, and an appointment booking UI.',
    features: [
      'Comprehensive service catalog with pricing and duration details',
      'Stylist showcases and customer testimonial sliders',
      'Interactive appointment reservation interface with instant input validation',
      'Flawless responsive layout optimized for mobile, tablet, and desktop viewports'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI/UX', 'Flexbox & Grid']
  },
  fashion: {
    title: 'M&M Fashion E-Commerce Store',
    badge: 'Live GitHub Project',
    github: 'https://mandmfashion.netlify.app/',
    desc: 'A full-scale modern fashion retail e-commerce platform offering an intuitive shopping experience with curated clothing collections.',
    features: [
      'Dynamic product catalogs with high-resolution imagery and hover zoom',
      'Category and price filtering with quick product view options',
      'Interactive shopping cart badge and checkout flow simulation',
      'Modern dark/light visual design with seamless mobile responsiveness'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'E-Commerce Architecture', 'Responsive UI']
  },
  music: {
    title: 'AudioStream Music Player Web App',
    badge: 'Live GitHub Project',
    github: 'https://kounain-music-player.netlify.app/',
    desc: 'A feature-rich web-based audio streaming and music player application built with custom interactive player controls.',
    features: [
      'Custom playback controls: Play, Pause, Next, Previous, and Seek Slider',
      'Live track progress bar and real-time audio timecode tracking',
      'Playlist queue management with dynamic track selection',
      'Visual album art displays and interactive volume controls'
    ],
    tech: ['JavaScript (ES6)', 'HTML5 Audio API', 'CSS3 Animations', 'DOM Logic']
  },
  twitter: {
    title: 'X (Twitter) Social Platform Clone',
    badge: 'Live GitHub Project',
    github: 'https://kounain-x.netlify.app/',
    desc: 'A social media web application replicating X (Twitter) with real-time feed styling, post composition, and engagement interactions.',
    features: [
      'Main timeline feed with post creation modal and character counter',
      'Interactive engagement buttons: Like, Repost, Reply, and Share',
      'Trending topics sidebar and recommended profiles section',
      'Cinematic dark mode aesthetics matching X official interface'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Social UI Design', 'Responsive Grid']
  },
  tictactoe: {
    title: 'Interactive Tic Tac Toe Game',
    badge: 'JavaScript Web Game',
    github: 'https://github.com/MD-Kounain-Ansari',
    desc: 'An engaging turn-based two-player browser game built with vanilla JavaScript game state handling.',
    features: [
      'Real-time win pattern detection and tie state validation',
      'Dynamic player turn indicator (Player X vs Player O)',
      'Score counter tracking rounds won and ties',
      'Smooth restart and board reset capabilities'
    ],
    tech: ['JavaScript (ES6)', 'HTML5', 'CSS3', 'Game Logic & DOM']
  },
  rps: {
    title: 'Stone Paper Scissors Arena Game',
    badge: 'JavaScript Web Game',
    github: 'https://md-kounain-ansari.github.io/Stone-Paper-Scissors/',
    desc: 'Classic interactive Rock-Paper-Scissors game featuring live computer opponent randomized decision logic.',
    features: [
      'Player vs. Computer random choice generation',
      'Instant round results with score incrementing system',
      'Animated hand icon states and victory feedback badges',
      'Clean restart system and lightweight execution'
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Math.random Logic']
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const actionBtn = document.getElementById('modal-action-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalBody = document.getElementById('modal-body');
  const modalGithubLink = document.getElementById('modal-github-link');
  const previewBtns = document.querySelectorAll('.btn-preview-modal');

  if (!modal || !previewBtns.length) return;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;

    if (modalGithubLink && data.github) {
      modalGithubLink.href = data.github;
      modalGithubLink.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo`;
    }

    let techTagsHtml = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join(' ');
    let featuresHtml = data.features.map(f => `<li><i class="fa-solid fa-check text-success"></i> ${f}</li>`).join('');

    modalBody.innerHTML = `
      <p style="margin-bottom: 16px;">${data.desc}</p>
      <div class="project-tech-tags" style="margin-bottom: 18px;">${techTagsHtml}</div>
      <h4 style="font-size: 16px; margin-bottom: 8px; color: var(--text-primary);">Key Highlights & Features:</h4>
      <ul class="check-list">${featuresHtml}</ul>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (actionBtn) actionBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Quick Copy Email with Toast Notification
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

function initCopyEmail() {
  const copyBtn = document.getElementById('quick-copy-email');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'kounainansari00@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email address copied to clipboard!');
    }).catch(() => {
      showToast('Email: kounainansari00@gmail.com');
    });
  });
}

/* --------------------------------------------------------------------------
   9. Interactive Contact Form with Validation & Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    // Submit state animation
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    try {
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(object)
      });

      const result = await response.json();

      if (result.success) {
        submitBtn.innerHTML = `<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>`;
        showToast(`Thank you, ${name}! Your message has been sent to my email.`);
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      submitBtn.innerHTML = `<span>Failed to Send</span> <i class="fa-solid fa-xmark"></i>`;
      showToast('Oops! Something went wrong. Please try again later.');
      console.error('Web3Forms Error:', error);
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
      }, 3000);
    }
  });
}

/* --------------------------------------------------------------------------
   10. Back to Top Smooth Scroll
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
