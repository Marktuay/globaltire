// Minimal JS for mobile menu and form validation
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-navigation');

  if (!btn || !nav) return;

  // create overlay (class controlled by CSS)
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  btn.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.classList.toggle('open', open);
    if (open) {
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  });

  // close when clicking on links inside nav (useful on mobile)
  nav.addEventListener('click', function (e) {
    const target = e.target.closest('a');
    if (target && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('active');
    }
  });

  // close with ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('active');
    }
  });

  // close on click outside (overlay)
  overlay.addEventListener('click', function () {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('active');
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Contact form validation
  const form = document.querySelector('.footer-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous error messages
      const errorMessages = form.querySelectorAll('.error-message');
      errorMessages.forEach(msg => msg.remove());

      let isValid = true;

      // Validate first name
      const firstName = form.querySelector('#footer-first');
      if (firstName && firstName.value.trim() === '') {
        showError(firstName, 'First name is required');
        isValid = false;
      }

      // Validate last name
      const lastName = form.querySelector('#footer-last');
      if (lastName && lastName.value.trim() === '') {
        showError(lastName, 'Last name is required');
        isValid = false;
      }

      // Validate email
      const email = form.querySelector('#footer-email');
      if (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
          showError(email, 'Email is required');
          isValid = false;
        } else if (!emailPattern.test(email.value)) {
          showError(email, 'Enter a valid email');
          isValid = false;
        }
      }

      // Validate phone (optional but if has value, validate format)
      const phone = form.querySelector('#footer-phone');
      if (phone && phone.value.trim() !== '') {
        const phonePattern = /^[\d\s\-\+\(\)]{8,}$/;
        if (!phonePattern.test(phone.value)) {
          showError(phone, 'Enter a valid phone number');
          isValid = false;
        }
      }

      // Validate message
      const message = form.querySelector('#footer-message');
      if (message && message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
      }

      if (isValid) {
        // Simulate successful submission
        showSuccess(form);
        form.reset();
      }
    });
  }

  function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = '#ff6b6b';

    // Remove error on typing
    input.addEventListener('input', function () {
      input.style.borderColor = '';
      const error = input.parentElement.querySelector('.error-message');
      if (error) error.remove();
    }, { once: true });
  }

  function showSuccess(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.background = 'linear-gradient(90deg, #10b981, #059669)';
    successDiv.style.color = '#fff';
    successDiv.style.padding = '12px 16px';
    successDiv.style.borderRadius = '8px';
    successDiv.style.marginTop = '12px';
    successDiv.style.fontWeight = '600';
    successDiv.textContent = 'Message sent successfully! We\'ll contact you soon.';

    form.appendChild(successDiv);

    setTimeout(() => {
      successDiv.style.transition = 'opacity 0.3s ease';
      successDiv.style.opacity = '0';
      setTimeout(() => successDiv.remove(), 300);
    }, 4000);
  }
});
