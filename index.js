/**
 * Arcalac Yogurt Griego  - Interactive Script
 * Premium UX/UI enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHeaderScroll();
  initSaborSelector();
  initAccordion();
  initAddToCart();
});

/**
 * 1. Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
  const animElements = document.querySelectorAll('.fade-in-up, .reveal-item');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    animElements.forEach(el => el.classList.add('active'));
  }
}

/**
 * 2. Header Style modification on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 3. Flavor selector interaction
 */
function initSaborSelector() {
  const saborCards = document.querySelectorAll('.sabor-card');
  const priceDisplay = document.getElementById('product-price');
  const heroImage = document.getElementById('hero-product-img');

  saborCards.forEach(card => {
    const selectBtn = card.querySelector('button');

    selectBtn.addEventListener('click', () => {
      // Remove active states
      saborCards.forEach(c => c.classList.remove('active'));

      // Add active state to clicked
      card.classList.add('active');

      // Update price display with selected sabor price
      const newPrice = card.getAttribute('data-price');
      if (priceDisplay && newPrice) {
        priceDisplay.textContent = newPrice;
      }

      // Smooth dynamic highlight based on flavor
      const sabor = card.getAttribute('data-sabor');
      const root = document.documentElement;

      if (sabor === 'natural') {
        root.style.setProperty('--sabor-theme-glow', 'var(--color-accent-sage)');
        // Hero image opacity transition
        heroImage.style.opacity = '0.7';
        setTimeout(() => {
          heroImage.src = 'file:///C:/Users/HAYDER/.gemini/antigravity-ide/brain/0365baf6-127b-4f1d-bade-70719314e91d/yogurt_griego_colageno_1780088633992.png';
          heroImage.style.opacity = '1';
        }, 200);
      } else if (sabor === 'frutos-rojos') {
        root.style.setProperty('--sabor-theme-glow', '#D36B7F');
        // Smooth color simulation / change if they want different colors
        heroImage.style.opacity = '0.7';
        setTimeout(() => {
          // Keep the main product image but add visual filter/blend for demo or path
          heroImage.src = 'file:///C:/Users/HAYDER/.gemini/antigravity-ide/brain/0365baf6-127b-4f1d-bade-70719314e91d/yogurt_griego_colageno_1780088633992.png';
          heroImage.style.opacity = '1';
        }, 200);
      } else if (sabor === 'melocoton') {
        root.style.setProperty('--sabor-theme-glow', '#F4A261');
        heroImage.style.opacity = '0.7';
        setTimeout(() => {
          heroImage.src = 'file:///C:/Users/HAYDER/.gemini/antigravity-ide/brain/0365baf6-127b-4f1d-bade-70719314e91d/yogurt_griego_colageno_1780088633992.png';
          heroImage.style.opacity = '1';
        }, 200);
      }
    });
  });
}

/**
 * 4. Nutrition Accordion controls
 */
function initAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const panel = trigger.nextElementSibling;
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close other items
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          item.querySelector('.accordion-panel').style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        parent.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        parent.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

/**
 * 5. Mock Cart Actions (Notifications)
 */
function initAddToCart() {
  const buyBtn = document.getElementById('btn-hero-buy');
  const headerBuyBtn = document.getElementById('btn-compra-rapida');
  const cartToast = document.getElementById('cart-notification');
  const toastDetails = document.getElementById('toast-details');

  function triggerCartNotification() {
    // Get currently active sabor
    const activeCard = document.querySelector('.sabor-card.active');
    const saborName = activeCard ? activeCard.querySelector('h3').textContent : 'Natural Cremoso';
    const saborPrice = activeCard ? activeCard.getAttribute('data-price') : '$7,900 COP';

    if (toastDetails) {
      toastDetails.textContent = `${saborName} - ${saborPrice}`;
    }

    if (cartToast) {
      cartToast.classList.add('show');

      // Automatically hide after 4 seconds
      setTimeout(() => {
        cartToast.classList.remove('show');
      }, 4000);
    }
  }

  if (buyBtn) {
    buyBtn.addEventListener('click', triggerCartNotification);
  }

  if (headerBuyBtn) {
    headerBuyBtn.addEventListener('click', triggerCartNotification);
  }
}
