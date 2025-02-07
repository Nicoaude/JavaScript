const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const loginBtn = document.getElementById("login__btn")
const logoutBtn = document.getElementById("logout__btn")
const userNameSpan = document.getElementById("username")

window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user && window.location.pathname === "/JavaScript/index.html") {
        window.location.href = "/JavaScript/pages/apv.html"
    }
});

function showProfile() {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
        if (userNameSpan) {
            userNameSpan.textContent = `${user.username}`
        }
    } else {
        window.location.href = "/JavaScript/index.html"
    }
}

function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    setTimeout(() => {
        fetch("/JavaScript/data/userAccess.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar el archivo JSON");
                }
                return response.json();
            })
            .then(userAccess => {
                const user = userAccess.find(u => u.username === username && u.password === password);

                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location.href = "/JavaScript/pages/apv.html";
                } else {
                    alert("Usuario y/o contraseña incorrecto.");
                }
            })
            .catch(error => {
                console.error(error);
                alert("Ocurrió un error al intentar iniciar sesión.");
            });
    }, 2000);
}


function logout() {
    localStorage.removeItem("user");
    window.location.href = "/JavaScript/index.html"
}

if (window.location.pathname.includes("/JavaScript/pages/apv.html")) {
    showProfile()
}

if (loginBtn) {
    loginBtn.addEventListener("click", login)
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}
