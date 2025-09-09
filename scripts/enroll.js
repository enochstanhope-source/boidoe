document.addEventListener('DOMContentLoaded', () => {
    const enrollmentForm = document.getElementById('enrollmentForm');
    const sendRequestBtn = enrollmentForm.querySelector('.send-request');
    
    // Get the selected course from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCourse = urlParams.get('course');
    
    // Set the selected course in the input field
    const courseInput = document.getElementById('selectedCourse');
    if (selectedCourse) {
        courseInput.value = decodeURIComponent(selectedCourse);
    } else {
        // If no course is selected, redirect back to index
        window.location.href = 'index.html';
    }

    // Handle form submission
    enrollmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const course = document.getElementById('selectedCourse').value.trim();

        // Format the WhatsApp message
        const message = `Good day sir,\nI'm ${firstName} ${lastName}.\nI want to enroll for the ${course}.\nWhat's the next move?`;

        // Create WhatsApp URL with the new phone number
        const whatsappUrl = `https://wa.me/2347035474918?text=${encodeURIComponent(message)}`;

        // Add loading state to button
        sendRequestBtn.disabled = true;
        sendRequestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Short delay for better UX
        setTimeout(() => {
            // Open WhatsApp
            window.location.href = whatsappUrl;
            
            // Reset button state
            sendRequestBtn.disabled = false;
            sendRequestBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
        }, 800);
    });

    enrollmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const course = document.getElementById('courseSelect').value;

        // Validate form
        if (!firstName || !lastName || !phone || !course) {
            alert('Please fill in all fields');
            return;
        }

        // Show loading state
        sendRequestBtn.classList.add('loading');
        sendRequestBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';

        // Format full name
        const fullName = `${firstName} ${lastName}`;

        // Format WhatsApp message
        const message = `Good day sir ! I am ${fullName} contacting from the website and i'm interested in ${course} needing your reply on it soon thanks`;

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/2347035474918?text=${encodeURIComponent(message)}`;

        // Simulate loading for better UX
        setTimeout(() => {
            // Remove loading state
            sendRequestBtn.classList.remove('loading');
            sendRequestBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';

            // Redirect to WhatsApp
            window.location.href = whatsappUrl;
        }, 1000);
    });

    // Add input validation and formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Format the phone number
        if (value.length > 0) {
            if (value.length <= 11) {
                // Format as: 0801-234-5678
                value = value.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
            }
        }
        
        e.target.value = value;
    });

    // Add animation when form fields are focused
    const formFields = document.querySelectorAll('.form-field input, .form-field select');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.style.transform = 'translateY(-2px)';
            field.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });

        field.addEventListener('blur', () => {
            field.parentElement.style.transform = 'none';
            field.style.boxShadow = 'none';
        });
    });
});
