const userBoxContainer = document.querySelector(".box__container");
const searchInput = document.getElementById("search__input");
const userName = document.getElementById("username");

// Función para simular la carga de datos (con un retraso)
function simulateDataLoad() {
    return new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos de retraso
}

// Función para obtener y mostrar los usuarios
async function loadUsers() {
    await simulateDataLoad(); // Simulamos la espera de una conexión al servidor

    // Intentamos obtener los usuarios desde el localStorage o del archivo JSON
    const storedUsersData = JSON.parse(localStorage.getItem('usersData'));

    if (!storedUsersData) {
        try {
            const response = await fetch("./data/dbUsers.json"); // Aquí debes colocar la URL de tu archivo JSON
            const usersData = await response.json();
            localStorage.setItem('usersData', JSON.stringify(usersData)); // Guardamos los datos en localStorage
            renderUsers(usersData);
        } catch (error) {
            console.error("Error al cargar los datos de usuarios:", error);
        }
    } else {
        renderUsers(storedUsersData);
    }
}

// Función para renderizar los usuarios
function renderUsers(users) {
    userBoxContainer.innerHTML = ""; // Limpiar contenedor antes de mostrar los usuarios
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
            window.location.href = `../pages/user.html?id=${user.id}`;
        });

        userBoxContainer.appendChild(userBox);
    });
}

// Cargar los usuarios al inicio
window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../index.html";
    } else {
        if (userName) {
            userName.textContent = `${user.username}`;
        }
    }
    loadUsers(); // Cargar los usuarios después de iniciar sesión
});

// Función para filtrar usuarios por el texto de búsqueda
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredUsers = JSON.parse(localStorage.getItem('usersData')).filter(user => {
        return (
            user.name.toLowerCase().includes(searchText) ||
            user.lastname.toLowerCase().includes(searchText) ||
            user.id.toLowerCase().includes(searchText)
        );
    });
    renderUsers(filteredUsers); // Renderizar los usuarios filtrados
});
