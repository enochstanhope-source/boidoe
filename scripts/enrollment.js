// Enrollment functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all enroll buttons
    const enrollButtons = document.querySelectorAll('.enroll');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if user is logged in by checking Firebase auth state
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, allow enrollment
                    const card = e.target.closest('.product-card');
                    const courseName = card.querySelector('h3').textContent;
                    window.location.href = `enroll.html?course=${encodeURIComponent(courseName)}`;
                } else {
                    // User is not signed in, show message on the card
                    const card = e.target.closest('.product-card');
                    
                    // Create message element if it doesn't exist
                    let messageEl = card.querySelector('.login-message');
                    if (!messageEl) {
                        messageEl = document.createElement('div');
                        messageEl.className = 'login-message';
                        messageEl.style.color = '#ff4444';
                        messageEl.style.fontSize = '0.9rem';
                        messageEl.style.marginTop = '10px';
                        messageEl.style.textAlign = 'center';
                        messageEl.style.padding = '8px';
                        messageEl.style.borderRadius = '4px';
                        messageEl.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                        card.querySelector('.product-info').appendChild(messageEl);
                    }
                    
                    messageEl.textContent = 'Please login to access this feature';
                    
                    // Remove message after 3 seconds
                    setTimeout(() => {
                        if (messageEl && messageEl.parentNode) {
                            messageEl.remove();
                        }
                    }, 3000);
                }
            });
        });
    });
});
