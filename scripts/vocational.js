// vocational.js - for vocational.html page
// Add page-specific JS here if needed

document.addEventListener('DOMContentLoaded', function() {
  // Example: Fade in hero image
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.style.opacity = 0;
    setTimeout(() => {
      heroImg.style.transition = 'opacity 1.2s';
      heroImg.style.opacity = 1;
    }, 300);
  }

  // Example: Fade in content images
  document.querySelectorAll('.content-img').forEach(img => {
    img.style.opacity = 0;
    setTimeout(() => {
      img.style.transition = 'opacity 1.2s';
      img.style.opacity = 1;
    }, 600);
  });
});
