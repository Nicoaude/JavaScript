import { userAccess } from "./db.js";

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");

window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        window.location.href = "/apv.html";
    }
});

function login(event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    const user = userAccess.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/apv.html";
    } else {
        alert("Credenciales incorrectas.");
    }
}

loginBtn.addEventListener("click", login);