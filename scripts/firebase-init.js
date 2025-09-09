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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Add auth state observer
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user.email);
    // You can add any global authentication state handling here
  } else {
    console.log('User is signed out');
  }
});
