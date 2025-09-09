// Form authentication and feedback logic
document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('supportForm');
	const sendBtn = document.getElementById('sendBtn');
	const sendBtnText = document.getElementById('sendBtnText');
	const successModal = document.getElementById('successModal');
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		// Validate all fields
		const name = document.getElementById('name').value.trim();
		const email = document.getElementById('email').value.trim();
		const message = document.getElementById('message').value.trim();
		if (!name || !email || !message) {
			alert('Please fill in all fields.');
			return;
		}
		// Show sending state
		sendBtn.disabled = true;
		sendBtnText.textContent = 'Sending...';
		// Simulate sending
		setTimeout(function() {
			sendBtnText.textContent = 'Send Request';
			sendBtn.disabled = false;
			successModal.style.display = 'flex';
			setTimeout(function() {
				successModal.style.display = 'none';
				form.reset();
			}, 3000);
		}, 2000);
	});
});
