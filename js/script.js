import { usersData } from "./db.js";

// Verificar si el usuario está logueado al cargar la página en apv.html
window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Si no hay un usuario logueado, redirigir a index.html
    if (!user) {
        window.location.href = "/index.html";  // Redirigir al login
    } else {
        // Mostrar el nombre de usuario en el perfil si está logueado
        if (userNameSpan) {
            userNameSpan.textContent = `${user.username}`;
        }
    }
});


const userBoxContainer = document.querySelector(".box__container")

usersData.forEach(user => {
    const userBox = document.createElement("div");
    userBox.classList.add("box");
    userBox.innerHTML += `
                        <img src="/img/profile.jpg" alt="Profile picture">
                        <h1>${user.name} ${user.lastname}</h1>
                        <p>${user.id}</p>
    `

    userBox.addEventListener("click", () => {
        window.location.href = `/pages/user.html?id=${user.id}`;
    });

    userBoxContainer.appendChild(userBox);
})