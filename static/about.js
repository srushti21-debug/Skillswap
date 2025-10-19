// FAQ toggle
function toggleFAQ(element) {
  const answer = element.querySelector('.answer');
  answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
}

// Contact form simulation
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = `Thanks, ${name}! Your message has been received.`;
  this.reset();
});
