import { userAccess } from "./db.js";

// Obtener los elementos del DOM
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");

// Verificar si el usuario ya está autenticado al cargar la página
window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        // Si ya hay un usuario logueado, redirigir al perfil
        window.location.href = "/apv.html"; 
    }
});

// Función para iniciar sesión
function login(event) {
    event.preventDefault();  // Prevenir el envío del formulario

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Buscar usuario en el array de usuarios
    const user = userAccess.find(u => u.username === username && u.password === password);

    if (user) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/apv.html";  // Redirigir al perfil
    } else {
        alert("Credenciales incorrectas.");
    }
}

// Evento para el botón de login
loginBtn.addEventListener("click", login);
