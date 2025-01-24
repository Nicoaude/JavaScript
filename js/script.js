import { usersData } from "./db.js";

const userBoxContainer = document.querySelector(".box__container");
const searchInput = document.getElementById("search__input");
const userName = document.getElementById("username");

const storedUsersData = JSON.parse(localStorage.getItem('usersData')) || usersData;

storedUsersData.forEach(user => {
    const userBox = document.createElement("div");
    userBox.classList.add("box");

    let statusText = "";
    if (user.danger) {
        statusText += "<p class='status danger'>Peligroso</p>";
    }
    if (user.byc) {
        statusText += "<p class='status byc'>Búsqueda y Captura</p>";
    }
    userBox.innerHTML = `
        <img src="${user.img || '../img/profile.jpg'}" alt="Profile picture" class="profile-img">
        <h1>${user.name} ${user.lastname}</h1>
        <p>${user.id}</p>
        <div class="status-container">
            ${user.danger ? `<span class="status danger">Peligroso</span>` : ''}
            ${user.byc ? `<span class="status byc">Búsqueda y Captura</span>` : ''}
        </div>
    `;
    userBox.addEventListener("click", () => {
        window.location.href = `../pages/user.html?id=${user.id}`;
    });
    userBoxContainer.appendChild(userBox);
});

window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../index.html";
    } else {
        if (userName) {
            userName.textContent = `${user.username}`;
        }
    }
});

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredUsers = usersData.filter(user => {
        return (
            user.name.toLowerCase().includes(searchText) || 
            user.lastname.toLowerCase().includes(searchText) ||
            user.id.toLowerCase().includes(searchText)
        );
    });
    userBoxContainer.innerHTML = "";
    filteredUsers.forEach(user => {
        const userBox = document.createElement("div");
        userBox.classList.add("box");
        userBox.innerHTML += `
            <img src="${user.img || '../img/profile.jpg'}" alt="Profile picture" class="profile-img">
        <h1>${user.name} ${user.lastname}</h1>
        <p>${user.id}</p>
        <div class="status-container">
            ${user.danger ? `<span class="status danger">Peligroso</span>` : ''}
            ${user.byc ? `<span class="status byc">Búsqueda y Captura</span>` : ''}
        </div>
        `;

        userBox.addEventListener("click", () => {
            window.location.href = `../pages/user.html?id=${user.id}`;
        });

        userBoxContainer.appendChild(userBox);
    });
});