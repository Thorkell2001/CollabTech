// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAAN9t4uz6ZJHCDq-9tTWJ_ej72_ZSCz3U",
  authDomain: "collabtech-c6e3b.firebaseapp.com",
  projectId: "collabtech-c6e3b",
  storageBucket: "collabtech-c6e3b.firebasestorage.app",
  messagingSenderId: "833329211783",
  appId: "1:833329211783:web:3a692628df2edea19e4b22"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* =====================
   SIGN UP
===================== */
window.signupUser = function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user);
      alert("Signup successful! Check your email for verification.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

/* =====================
   LOGIN
===================== */
window.loginUser = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (!userCredential.user.emailVerified) {
        alert("Please verify your email first.");
        signOut(auth);
        return;
      }
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

/* =====================
   LOGOUT
===================== */
window.logoutUser = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

/* =====================
   PROTECT DASHBOARD
===================== */
window.checkAuth = function () {
  onAuthStateChanged(auth, (user) => {
    if (!user || !user.emailVerified) {
      window.location.href = "login.html";
    }
  });
};
