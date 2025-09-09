// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9-SeBMqujxMleatSd23FM5vlLWdOVUPA",
  authDomain: "grandpa-523e1.firebaseapp.com",
  projectId: "grandpa-523e1",
  storageBucket: "grandpa-523e1.firebasestorage.app",
  messagingSenderId: "1049062266843",
  appId: "1:1049062266843:web:6f8b23c5a1f20a7836f9fe"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Check auth state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User is signed in:', user.email);
    // Redirect to index.html or dashboard
    window.location.href = 'index.html';
  }
});// Signup logic
document.addEventListener('DOMContentLoaded', function() {
	const signupForm = document.getElementById('signupForm');
	if (signupForm) {
			signupForm.addEventListener('submit', function(e) {
				e.preventDefault();
				const email = document.getElementById('email').value;
				const password = document.getElementById('password').value;
				const confirmPassword = document.getElementById('confirm-password').value;
				if (password !== confirmPassword) {
					alert('Passwords do not match!');
					return;
				}
				// Show loader modal
				if (typeof showSignupLoader === 'function') showSignupLoader();
				auth.createUserWithEmailAndPassword(email, password)
					.then((userCredential) => {
						// Hide loader modal
						if (typeof hideSignupLoader === 'function') hideSignupLoader();
						// Create success overlay
						let successOverlay = document.createElement('div');
						successOverlay.id = 'accountSuccessOverlay';
						successOverlay.innerHTML = `
							<div class="account-success-overlay">
								<div class="account-success-container">
									<div class="account-success-animations">
										<div class="account-success-spinner">
											<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
												<circle cx="24" cy="24" r="20" stroke="#3f020b" stroke-width="6" opacity="0.2"/>
												<circle cx="24" cy="24" r="20" stroke="#ff1a1a" stroke-width="6" stroke-dasharray="100" stroke-dashoffset="60" style="animation:spinSvg 1s linear infinite;"/>
											</svg>
										</div>
										<div class="account-success-check">
											<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="#3f020b" stroke-width="3" fill="#fff"/><path d="M15 26.5L22 33L33 19" stroke="#3f020b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
										</div>
									</div>
									<div class="account-success-label">Account Created Successfully!</div>
								</div>
							</div>
						`;
						document.body.appendChild(successOverlay);
						// Add styles for overlay
															if (!document.getElementById('accountSuccessStyle')) {
																const style = document.createElement('style');
																style.id = 'accountSuccessStyle';
																style.innerHTML = `
																	.account-success-overlay {
																		position: fixed;
																		top: 0; left: 0;
																		width: 100vw; height: 100vh;
																		background: rgba(30, 30, 60, 0.45);
																		z-index: 99999;
																		display: flex;
																		align-items: center;
																		justify-content: center;
																		backdrop-filter: blur(8px) saturate(180%);
																	}
																	.account-success-container {
																		background: rgba(255,255,255,0.18);
																		border-radius: 24px;
																		box-shadow: 0 8px 32px #3f020b44;
																		padding: 44px 56px;
																		min-width: 340px;
																		display: flex;
																		flex-direction: column;
																		align-items: center;
																		border: 1.5px solid rgba(255,255,255,0.25);
																		animation: popCheck 2.2s cubic-bezier(.4,2,.3,1);
																	}
																	.account-success-animations {
																		display: flex;
																		align-items: center;
																		justify-content: center;
																		gap: 18px;
																		margin-bottom: 24px;
																	}
																	.account-success-spinner {
																		width: 64px;
																		height: 64px;
																		display: flex;
																		align-items: center;
																		justify-content: center;
																		background: rgba(255,255,255,0.7);
																		border-radius: 50%;
																		box-shadow: 0 2px 8px #3f020b22;
																	}
																	.account-success-check {
																		width: 64px;
																		height: 64px;
																		display: flex;
																		align-items: center;
																		justify-content: center;
																		background: rgba(255,255,255,0.7);
																		border-radius: 50%;
																		box-shadow: 0 2px 8px #3f020b22;
																		animation: popCheck 2.2s cubic-bezier(.4,2,.3,1);
																	}
																	.account-success-label {
																		font-size: 1.35rem;
																		font-weight: 700;
																		color: #3f020b;
																		letter-spacing: 1.5px;
																		text-shadow: 0 2px 12px #fff8, 0 1px 0 #fff;
																	}
																	@keyframes popCheck {
																		0% {transform: scale(0.5); opacity:0;}
																		80% {transform: scale(1.1); opacity:1;}
																		100% {transform: scale(1); opacity:1;}
																	}
																	@keyframes spinSvg {
																		100% { stroke-dashoffset: 0; transform: rotate(360deg); }
																	}
																`;
																document.head.appendChild(style);
															}
										// Remove overlay after 2.5s and optionally redirect
										setTimeout(() => {
											if (successOverlay) successOverlay.remove();
											// window.location.href = 'login.html'; // Uncomment to redirect
										}, 15000); // 15 seconds for a more delayed signup
								})
								.catch((error) => {
										alert(error.message);
								});
		});
	}
});
