// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target.id);
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
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
  const submitButton = form.querySelector('.btn-submit');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Add metadata
  data.formType = modalId.replace('Modal', '');
  data.timestamp = new Date().toISOString();
  
  // Disable submit button during submission
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';
  
  try {
    // ===== GOOGLE SHEETS INTEGRATION =====
    // Replace YOUR_GOOGLE_APPS_SCRIPT_URL with your actual deployment URL
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    // Note: mode: 'no-cors' means we won't get response data back
    // The submission will still work, but we can't check response.ok
    // This is a limitation of Google Apps Script with cross-origin requests
    
    // Log for debugging
    console.log('Form submitted to Google Sheets:', data);
    
    // Simulate brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success message
    showNotification('Thank you for your request! We\'ll get back to you shortly.', 'success');
    
    // Reset form and close modal
    form.reset();
    closeModal(modalId);
    
  } catch (error) {
    console.error('Form submission error:', error);
    showNotification('There was an error submitting your request. Please try again or contact us directly.', 'error');
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Request';
  }
}

// Notification system
function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
});
