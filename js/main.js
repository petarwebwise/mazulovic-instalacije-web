/* ============================================
   MAZULOVIC INSTALACIJE - Main JavaScript
   ============================================ */

(function() {
  'use strict';

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-item__question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-item__answer');
      var isOpen = item.classList.contains('open');

      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function(other) {
        other.classList.remove('open');
        other.querySelector('.faq-item__answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll to Top ---
  var scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Cookie Banner ---
  var cookieBanner = document.querySelector('.cookie-banner');
  var cookieAccept = document.getElementById('cookie-accept');
  var cookieDecline = document.getElementById('cookie-decline');

  if (cookieBanner && !localStorage.getItem('mazulovic_cookies')) {
    cookieBanner.classList.add('show');
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function() {
      localStorage.setItem('mazulovic_cookies', 'accepted');
      cookieBanner.classList.remove('show');
      loadGA4();
    });
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', function() {
      localStorage.setItem('mazulovic_cookies', 'declined');
      cookieBanner.classList.remove('show');
    });
  }

  if (localStorage.getItem('mazulovic_cookies') === 'accepted') {
    loadGA4();
  }

  // --- GA4 Loading ---
  function loadGA4() {
    var GA4_ID = 'G-BRL0E1KHT8';

    if (document.querySelector('script[src*="gtag"]')) return;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID);
  }

  // --- GA4 Click Tracking ---
  function trackClick(category, action, label) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }

  // Track phone clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      trackClick('Contact', 'phone_click', link.href);
    });
  });

  // Track email clicks
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      trackClick('Contact', 'email_click', link.href);
    });
  });

  // Track WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
    link.addEventListener('click', function() {
      trackClick('Contact', 'whatsapp_click', link.href);
    });
  });

  // Track CTA button clicks
  document.querySelectorAll('[data-track]').forEach(function(el) {
    el.addEventListener('click', function() {
      trackClick('CTA', 'cta_click', el.getAttribute('data-track'));
    });
  });

})();
