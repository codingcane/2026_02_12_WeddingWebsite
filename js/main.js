// Main JavaScript - Global utilities, navigation, countdown timer

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initCountdown();
  initSmoothScroll();
  highlightActiveNavLink();
});

/**
 * Initialize mobile navigation menu
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);

    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Hide header on scroll down, show on scroll up
  let lastScroll = 0;
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        header.classList.remove('hidden');
        return;
      }

      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.classList.add('hidden');
      } else {
        // Scrolling up
        header.classList.remove('hidden');
      }

      lastScroll = currentScroll;
    });
  }
}

/**
 * Initialize countdown timer to wedding date
 */
function initCountdown() {
  const countdownElement = document.querySelector('.countdown');

  if (!countdownElement) return;

  function updateCountdown() {
    const weddingDate = new Date(CONFIG.WEDDING_DATE);
    const now = new Date();
    const difference = weddingDate - now;

    if (difference <= 0) {
      countdownElement.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;">The wedding day is here!</p>';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
      <div class="countdown-item">
        <div class="countdown-number">${days}</div>
        <div class="countdown-label">Days</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-number">${hours}</div>
        <div class="countdown-label">Hours</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-number">${minutes}</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-number">${seconds}</div>
        <div class="countdown-label">Seconds</div>
      </div>
    `;
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Ignore empty anchors
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Highlight active navigation link based on current page
 */
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Utility: Validate email format
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Utility: Validate phone format (basic)
 */
function isValidPhone(phone) {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Check if it's between 10-15 digits (international formats)
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Utility: Sanitize input to prevent XSS
 */
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Utility: Show loading overlay
 */
function showLoading(message = 'Loading...') {
  let overlay = document.querySelector('.loading-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div class="spinner"></div>
      <div class="loading-text">${message}</div>
    `;
    document.body.appendChild(overlay);
  } else {
    overlay.querySelector('.loading-text').textContent = message;
    overlay.classList.remove('hidden');
  }
}

/**
 * Utility: Hide loading overlay
 */
function hideLoading() {
  const overlay = document.querySelector('.loading-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

/**
 * Utility: Show alert message
 */
function showAlert(message, type = 'info', container = null) {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;

  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };

  alert.innerHTML = `
    <div class="alert-icon">${icons[type]}</div>
    <div class="alert-content">
      <div class="alert-message">${message}</div>
    </div>
  `;

  const targetContainer = container || document.querySelector('main');
  if (targetContainer) {
    targetContainer.insertBefore(alert, targetContainer.firstChild);

    // Scroll to alert
    alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      alert.style.transition = 'opacity 0.3s ease';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 300);
    }, 5000);
  }
}
