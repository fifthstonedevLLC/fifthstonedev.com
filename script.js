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
function handleFormSubmit(event, modalId) {
  event.preventDefault();
  
  // Get form data
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // In a real implementation, you would send this data to your server
  console.log('Form submitted:', data);
  
  // Show success message (you can customize this)
  alert('Thank you for your request! We\'ll get back to you shortly.');
  
  // Reset form and close modal
  form.reset();
  closeModal(modalId);
}
