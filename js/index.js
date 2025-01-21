// USUARIO PARA INGRESAR AL "SISTEMA"
import { userAccess } from "./db.js";

// Obtener los elementos del DOM
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login__btn");
const logoutBtn = document.getElementById("logout__btn");
const userNameSpan = document.getElementById("userNameSpan");  // Elemento donde mostrar el nombre de usuario (ej. <span id="userNameSpan"></span>)

// Verificar si el usuario ya está autenticado al cargar la página en login (index.html)
window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && window.location.pathname === "/index.html") {
        // Si el usuario ya está logueado y está en index.html, redirigir a apv.html
        window.location.href = "/pages/apv.html";  // Redirigir al perfil
    }
});

// Función para mostrar el perfil (solo debe ejecutarse en la página de perfil)
function showProfile() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        // Mostrar nombre de usuario en el perfil
        if (userNameSpan) {
            userNameSpan.textContent = `${user.username}`;  // Suponiendo que quieres mostrar el nombre de usuario
        }
    } else {
        // Si no hay usuario en localStorage, redirigir al login
        window.location.href = "login.html";
    }
}

// Función para iniciar sesión
function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Buscar usuario en el array de usuarios
    const user = userAccess.find(u => u.username === username && u.password === password);

    if (user) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/pages/apv.html";  // Redirigir al perfil
    } else {
        alert("Credenciales incorrectas.");
    }
}

// Función para cerrar sesión
function logout() {
    // Eliminar datos del usuario de localStorage
    localStorage.removeItem("user");
    window.location.href = "login.html";  // Redirigir al login
}

// Solo ejecuta showProfile en el perfil, no en login
if (window.location.pathname.includes("apv.html")) {
    showProfile();
}

// Evento para el botón de login
if (loginBtn) {
    loginBtn.addEventListener("click", login);
}

// Evento para el botón de logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}
