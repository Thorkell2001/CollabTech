// CollabTech – Simple Navigation Script

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');

  sections.forEach(section => {
    section.classList.remove('active');
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
  }
}

// Ensure Home is visible on page load
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
});
