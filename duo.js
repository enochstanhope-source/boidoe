document.addEventListener('DOMContentLoaded', function() {
    // Handle cancel button click
    const cancelButton = document.getElementById('cancelButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back(); // Go back to previous page
            // If there's no previous page, you might want to redirect to a specific page
            setTimeout(() => {
                if (document.location.href === window.location.href) {
                    window.location.href = '/index.html';
                }
            }, 100);
        });
    }

    // Clear all input fields on page load
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => {
        input.value = '';
    });

    // Force clear form data
    window.setTimeout(() => {
        document.querySelectorAll('form').forEach(form => {
            form.reset();
        });
    }, 10);

    // Admin credentials (in real application, this would be handled server-side)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin'
    };

    // Driver credentials (in real application, this would be handled server-side)
    const DRIVER_CREDENTIALS = {
        username: 'driver',
        password: 'driver'
    };

    // Form elements
    const adminForm = document.getElementById('adminForm');
    const driverForm = document.getElementById('driverForm');
    const modal = document.getElementById('alertModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.querySelector('.close-modal');

    // Password toggle functionality
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Admin form submission
    adminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            showModal('Login successful! Redirecting to admin dashboard...');
            // Redirect to admin dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html'; // Change this to your admin dashboard URL
            }, 2000);
        } else {
            showModal('Invalid admin credentials. Please try again.');
            clearForm(adminForm);
        }
    });

    // Driver form submission
    driverForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('driverUsername').value;
        const password = document.getElementById('driverPassword').value;

        if (username === DRIVER_CREDENTIALS.username && password === DRIVER_CREDENTIALS.password) {
            showModal('Login successful! Redirecting to driver portal...');
            // Redirect to driver portal after 2 seconds
            setTimeout(() => {
                window.location.href = 'driver-portal.html'; // Change this to your driver portal URL
            }, 2000);
        } else {
            showModal('Invalid driver credentials. Please try again.');
            clearForm(driverForm);
        }
    });

    // Forgot password link
    document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('Please contact system administrator to reset your password.');
    });

    // Modal functions
    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    function closeModalFunc() {
        modal.style.display = 'none';
    }

    // Close modal when clicking the close button or outside the modal
    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Helper function to clear form inputs
    function clearForm(form) {
        form.reset();
        form.querySelector('input:first-of-type').focus();
    }

    // Input validation and real-time feedback
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });

        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        
        if (value === '') {
            setInputError(input, 'This field is required');
        } else if (value.length < 4) {
            setInputError(input, 'Minimum 4 characters required');
        } else {
            removeInputError(input);
        }
    }

    function setInputError(input, message) {
        input.classList.add('input-error');
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            const div = document.createElement('div');
            div.className = 'error-message';
            div.textContent = message;
            input.parentElement.appendChild(div);
        }
    }

    function removeInputError(input) {
        input.classList.remove('input-error');
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Handle loading states
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const button = this.querySelector('button');
            button.classList.add('loading');
            button.textContent = 'Logging in';
        });
    });
});
