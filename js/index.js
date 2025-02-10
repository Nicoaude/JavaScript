const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const loginBtn = document.getElementById("login__btn")
const logoutBtn = document.getElementById("logout__btn")
const userNameSpan = document.getElementById("username")

window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user && window.location.pathname === "/index.html") {
        window.location.href = "/pages/apv.html"
    }
});

function showProfile() {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
        if (userNameSpan) {
            userNameSpan.textContent = `${user.username}`
        }
    } else {
        window.location.href = "/index.html"
    }
}

function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    setTimeout(() => {
        fetch("/data/dbAccess.json")
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
                    window.location.href = "/pages/apv.html";
                } else {
                    Toastify({
                        text: "Usuario y/o contraseña incorrecto.",
                        duration: 3000,
                        backgroundColor: "#c45c5c",
                        close: true,
                        gravity: "bottom",
                        position: "right",
                        style: {
                            fontFamily: "'Arial', sans-serif"
                        }
                    }).showToast();
                }
            })
            .catch(error => {
                console.error(error);
                Toastify({
                    text: "Surgió un error en el inicio de sesión.",
                    duration: 3000,
                    backgroundColor: "#c45c5c",
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    style: {
                        fontFamily: "'Arial', sans-serif"
                    }
                }).showToast();
            });
    }, 2000);
}


function logout() {
    localStorage.removeItem("user");
    window.location.href = "/index.html"
}

if (window.location.pathname.includes("/pages/apv.html")) {
    showProfile()
}

if (loginBtn) {
    loginBtn.addEventListener("click", login)
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}
