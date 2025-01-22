import { userAccess } from "./db.js"

const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const loginBtn = document.getElementById("login__btn")
const logoutBtn = document.getElementById("logout__btn")
const userNameSpan = document.getElementById("userNameSpan")

window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user && window.location.pathname === "/index.html") {
        window.location.href = "../pages/apv.html"
    }
});

function showProfile() {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
        if (userNameSpan) {
            userNameSpan.textContent = `${user.username}`
        }
    } else {
        window.location.href = "./index.html"
    }
}

function login() {
    const username = usernameInput.value
    const password = passwordInput.value

    const user = userAccess.find(u => u.username === username && u.password === password)

    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "../pages/apv.html"
    } else {
        alert("Usuario y/o contraseña incorrecto.");
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "./index.html"
}

if (window.location.pathname.includes("../pages/apv.html")) {
    showProfile()
}

if (loginBtn) {
    loginBtn.addEventListener("click", login)
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}
