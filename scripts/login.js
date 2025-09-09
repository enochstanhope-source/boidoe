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
});// Login logic
document.addEventListener('DOMContentLoaded', function() {
	const loginForm = document.getElementById('loginForm');
	const loaderContainer = document.querySelector('.loader-container');
	const loader = document.querySelector('.loader');

	function showLoader() {
		loaderContainer.style.display = 'flex';
	}

	function hideLoader() {
		loaderContainer.style.display = 'none';
		loader.classList.remove('success');
	}

	function showSuccessAndRedirect() {
		loader.classList.add('success');
		setTimeout(() => {
			window.location.href = 'index.html';
		}, 3000);
	}

	if (loginForm) {
		loginForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const email = document.getElementById('email').value;
			const password = document.getElementById('password').value;
			
			showLoader();
			
			auth.signInWithEmailAndPassword(email, password)
				.then((userCredential) => {
					showSuccessAndRedirect();
				})
				.catch((error) => {
					hideLoader();
					alert(error.message);
				});
		});
	}
});
