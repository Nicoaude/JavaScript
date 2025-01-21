import { usersData } from "./db.js";

const urlParams = new URLSearchParams(window.location.search)
const profileId = urlParams.get('id')

const user = usersData.find(user => user.id === profileId)

if (user) {
    const profileBox = document.createElement("div")
    profileBox.classList.add("profile__box")
    profileBox.innerHTML = `
        <img src="/img/profile.jpg" alt="Profile picture">
        <h1>${user.name} ${user.lastname}</h1>
        <h3>ID:</h3> <p>${user.id}</p>
        <h3>EDAD:</h3> <p>${user.age}</p>
        <h3>BANCO:</h3> <p>${user.money}</p>
    `;

    const profile = document.querySelector(".profile")
    profile.appendChild(profileBox)
} else {
    console.error("Usuario no encontrado")
}
