const userBoxContainer = document.querySelector(".box__container");
const searchInput = document.getElementById("search__input");
const userName = document.getElementById("username");
const loadingMessage = document.getElementById('loadingMessage');

function simulateDataLoad() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

async function loadUsers() {
    await simulateDataLoad();

    const storedUsersData = JSON.parse(localStorage.getItem('usersData'));

    if (!storedUsersData) {
        try {
            const response = await fetch("../data/dbUsers.json");
            const usersData = await response.json();
            localStorage.setItem('usersData', JSON.stringify(usersData));
            renderUsers(usersData);
        } catch (error) {
            console.error("Error al cargar los datos de usuarios:", error);
        }
    } else {
        renderUsers(storedUsersData);
    }
    loadingMessage.style.display = "none";
}

function renderUsers(users) {
    userBoxContainer.innerHTML = "";
    users.forEach(user => {
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
            window.location.href = `./JavaScript/pages/user.html?id=${user.id}`;
        });

        userBoxContainer.appendChild(userBox);
    });
}

window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../index.html";
    } else {
        if (userName) {
            userName.textContent = `${user.username}`;
        }
    }
    loadUsers();
});

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredUsers = JSON.parse(localStorage.getItem('usersData')).filter(user => {
        return (
            user.name.toLowerCase().includes(searchText) ||
            user.lastname.toLowerCase().includes(searchText) ||
            user.id.toLowerCase().includes(searchText)
        );
    });
    renderUsers(filteredUsers);
});
