// Initialize EmailJS (wait for script to load since it's deferred)
document.addEventListener('DOMContentLoaded', function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("euyy_dhHmVC2Mgkv5");
  }
});

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target.id);
  }
});

// Close modal on Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      closeModal(activeModal.id);
    }
  }
});

// Form submission handler
async function handleFormSubmit(event, modalId) {
  event.preventDefault();

  // Get form data
  const form = event.target;
  const submitButton = form.querySelector(".btn-submit");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Add metadata
  data.formType = modalId.replace("Modal", "");
  data.timestamp = new Date().toLocaleString();

  // Disable submit button during submission
  submitButton.disabled = true;
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Sending...";

  try {
    // ===== EMAILJS CONFIGURATION =====
    const EMAILJS_SERVICE_ID = "service_n965k06";
    const EMAILJS_TEMPLATE_ID = "template_ekk9kgu";
    const EMAILJS_PUBLIC_KEY = "euyy_dhHmVC2Mgkv5";

    // Format the email parameters
    // Build message field - combine current-process with additional details for automation form
    console.log("Form data:", data); // Debug logging
    let messageContent = "N/A";

    // Check if current-process exists and has content (trim to handle whitespace)
    const currentProcess = data["current-process"]?.trim();
    if (currentProcess) {
      messageContent = currentProcess;
      const additionalDetails = data.details?.trim();
      if (additionalDetails) {
        messageContent += "\n\nAdditional Details:\n" + additionalDetails;
      }
    } else {
      // Fallback for other forms
      messageContent = data.details || data.challenges || data.message || "N/A";
    }

    console.log("Final message content:", messageContent); // Debug logging

    const emailParams = {
      form_type: getFormTypeName(data.formType),
      from_name: data.name || "N/A",
      from_email: data.email || "N/A",
      phone: data.phone || "N/A",
      company: data.company || "N/A",
      project_type:
        data["project-type"] ||
        data["automation-type"] ||
        data["consulting-area"] ||
        data.interest ||
        "N/A",
      message: messageContent,
      timeline: data.timeline || "N/A",
      budget: data.budget || "N/A",
      tools: data.tools || "N/A",
      website: data.website || "N/A",
      goals: data.goals || "N/A",
      timestamp: data.timestamp,
      to_email: "fifthstonedev@outlook.com",
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log("Email sent successfully:", response);

    // Show success message
    showNotification(
      "Thank you for your request! We'll get back to you within 24 hours.",
      "success"
    );

    // Reset form and close modal
    form.reset();
    closeModal(modalId);
  } catch (error) {
    console.error("Form submission error:", error);
    showNotification(
      "There was an error sending your message. Please email us directly at fifthstonedev@outlook.com",
      "error"
    );
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

// Helper function to get readable form type names
function getFormTypeName(formType) {
  const names = {
    webDev: "Web Development Request",
    automation: "Process Automation Request",
    consulting: "Strategic Consulting Request",
    contact: "General Contact Form",
  };
  return names[formType] || "Form Submission";
}

// Notification system
function showNotification(message, type = "success") {
  // Remove any existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add to page
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add("show"), 10);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !menuToggle.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }
});

// Portfolio Carousel
let currentSlide = 0;
let cachedItemWidth = null;

function getItemsPerSlide() {
  return window.innerWidth <= 768 ? 1 : 2;
}

function updateCarouselDots() {
  const items = document.querySelectorAll('.portfolio-item');
  const dotsContainer = document.querySelector('.carousel-dots');
  const itemsPerSlide = getItemsPerSlide();
  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === currentSlide ? ' active' : '');
      dot.setAttribute('onclick', `goToSlide(${i})`);
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);
      dotsContainer.appendChild(dot);
    }
  }
}

function updateCarousel() {
  const track = document.querySelector('.portfolio-track');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const carousel = document.querySelector('.portfolio-carousel');
  const items = document.querySelectorAll('.portfolio-item');
  const itemsPerSlide = getItemsPerSlide();
  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  
  // Ensure currentSlide is within bounds
  if (currentSlide >= totalSlides) {
    currentSlide = totalSlides - 1;
  }
  
  if (track && carousel && items.length > 0) {
    const gap = 32; // 2rem gap
    // Use cached width or read once, avoiding repeated forced reflows
    if (cachedItemWidth === null) {
      cachedItemWidth = items[0].offsetWidth;
    }
    const slideOffset = currentSlide * (cachedItemWidth * itemsPerSlide + gap * itemsPerSlide);
    track.style.transform = `translateX(-${slideOffset}px)`;
  }
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function moveCarousel(direction) {
  const items = document.querySelectorAll('.portfolio-item');
  const itemsPerSlide = getItemsPerSlide();
  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  
  currentSlide += direction;
  
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }
  
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

// Recalculate on window resize
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    // Invalidate cached width on resize so it gets recalculated
    cachedItemWidth = null;
    updateCarouselDots();
    updateCarousel();
  }, 100);
});

// Initialize dots on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCarouselDots();
});

// Auto-advance carousel (optional)
// setInterval(() => {
//   moveCarousel(1);
// }, 5000);

// ========================================
// Cookie Consent Management
// ========================================

const CookieConsent = {
  // Cookie names
  CONSENT_COOKIE: 'fifthstonedev_cookie_consent',
  
  // Initialize consent system
  init() {
    const banner = document.getElementById('cookie-consent-banner');
    if (!banner) return;
    
    // Check if user has already made a choice
    const consent = this.getConsent();
    
    if (consent === null) {
      // No consent given yet - show banner
      banner.classList.remove('hidden');
    } else {
      // Consent already given - hide banner and load scripts if accepted
      banner.classList.add('hidden');
      if (consent.analytics) {
        this.loadAnalytics();
      }
    }
    
    // Set up event listeners
    this.setupEventListeners();
  },
  
  // Get stored consent from cookie
  getConsent() {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(this.CONSENT_COOKIE + '='));
    
    if (!cookie) return null;
    
    try {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch (e) {
      return null;
    }
  },
  
  // Save consent to cookie (expires in 1 year)
  saveConsent(preferences) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    document.cookie = `${this.CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(preferences))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  },
  
  // Accept all cookies
  acceptAll() {
    const preferences = {
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString()
    };
    
    this.saveConsent(preferences);
    this.hideBanner();
    this.loadAnalytics();
  },
  
  // Reject non-essential cookies
  rejectAll() {
    const preferences = {
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString()
    };
    
    this.saveConsent(preferences);
    this.hideBanner();
  },
  
  // Save custom preferences
  savePreferences() {
    const analyticsCheckbox = document.getElementById('cookie-analytics');
    
    const preferences = {
      essential: true,
      analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
      timestamp: new Date().toISOString()
    };
    
    this.saveConsent(preferences);
    this.hideBanner();
    
    if (preferences.analytics) {
      this.loadAnalytics();
    }
  },
  
  // Hide the banner
  hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.add('hidden');
    }
  },
  
  // Show/hide settings panel
  toggleSettings() {
    const panel = document.getElementById('cookie-settings-panel');
    if (panel) {
      panel.hidden = !panel.hidden;
    }
  },
  
  // Load analytics scripts dynamically
  loadAnalytics() {
    // Only load if not already loaded
    if (window.clarity || window.gtag) return;
    
    // Load Microsoft Clarity
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "uyvg6201g1");
    
    // Load Google Analytics
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-5MMSCWWMBQ';
    document.head.appendChild(gtagScript);
    
    gtagScript.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-5MMSCWWMBQ');
    };
  },
  
  // Set up event listeners
  setupEventListeners() {
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const settingsBtn = document.getElementById('cookie-settings');
    const saveBtn = document.getElementById('cookie-save');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.acceptAll());
    }
    
    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => this.rejectAll());
    }
    
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.toggleSettings());
    }
    
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.savePreferences());
    }
  }
};

// Initialize cookie consent when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  CookieConsent.init();
});
