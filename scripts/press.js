
  // Page-specific animation
  var pressMain = document.querySelector('.press-main');
  if (pressMain) {
    pressMain.classList.add('animated');
  }

  // Mobile menu toggle functionality
  const hamburgerBtn = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  hamburgerBtn.addEventListener('click', function() {
    // Toggle the menu
    navLinks.classList.toggle('active');
    
    // Toggle between hamburger and cancel button
    this.classList.toggle('active');
    
    // Change the spans to form an X when active
    if (this.classList.contains('active')) {
      this.setAttribute('aria-label', 'Close menu');
    } else {
      this.setAttribute('aria-label', 'Open menu');
    }
  });

  // Reaction button logic
  document.querySelectorAll('.press-reactions').forEach(function(reactionBar) {
    reactionBar.addEventListener('click', function(e) {
      if (e.target.closest('.reaction-btn')) {
        var btn = e.target.closest('.reaction-btn');
        var countSpan = btn.querySelector('.count');
        var type = btn.getAttribute('data-type');
        // Only allow one like/love per session per card (demo, not persistent)
        if (type === 'like' || type === 'love') {
          if (!btn.classList.contains('active')) {
            btn.classList.add('active');
            countSpan.textContent = parseInt(countSpan.textContent) + 1;
          } else {
            btn.classList.remove('active');
            countSpan.textContent = Math.max(0, parseInt(countSpan.textContent) - 1);
          }
        } else if (type === 'comment') {
          // Simple comment popup (demo only)
          var comment = prompt('Leave a comment:');
          if (comment && comment.trim()) {
            countSpan.textContent = parseInt(countSpan.textContent) + 1;
            alert('Thank you for your comment!');
          }
        }
      }
    });
  });
