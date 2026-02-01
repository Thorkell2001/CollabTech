import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Protect dashboard
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("userEmail").textContent =
      `Logged in as: ${user.email}`;
    loadModules();
  }
});

function loadModules() {
  const container = document.getElementById("moduleHistory");
  const modules = JSON.parse(localStorage.getItem("openedModules")) || [];

  if (modules.length === 0) {
    container.innerHTML = "<p>No modules opened yet.</p>";
    return;
  }

  modules.forEach((mod) => {
    const div = document.createElement("div");
    div.className = "feature-card";
    div.innerHTML = `<h3>${mod}</h3><p>Viewed</p>`;
    container.appendChild(div);
  });
}

window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
