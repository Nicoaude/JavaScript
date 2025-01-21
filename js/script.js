import { usersData } from "./db.js";

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