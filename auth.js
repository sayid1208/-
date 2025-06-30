// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login form
document?.getElementById('login-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = 'dashboard.html')
    .catch(err => alert(err.message));
});

// Register form
document?.getElementById('register-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target['reg-email'].value;
  const password = e.target['reg-password'].value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => window.location.href = 'dashboard.html')
    .catch(err => alert(err.message));
});

// Auth state
auth.onAuthStateChanged(user => {
  if (user) {
    const emailSpan = document.getElementById('user-email');
    if (emailSpan) emailSpan.textContent = user.email;
  } else {
    if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
      window.location.href = 'login.html';
    }
  }
});

// Logout
document?.getElementById('logout-btn')?.addEventListener('click', () => {
  auth.signOut();
});