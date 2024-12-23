// USUARIO PARA INGRESAR AL "SISTEMA"
const adminUser = "admin";
const adminPassword = "admin123";
let login = false;
let attempts = 3;

// PROCESO WHILE PARA INGRESAR AL "SISTEMA"
while (!login && attempts > 0) {
    const loginUser = prompt("Bienvenido a Advanced Police Verification (A.P.V.)\nA continuación, ingrese su nombre de usuario:");

    if (loginUser === adminUser) {
        const loginPass = prompt("Ingrese su contraseña:");

        if (loginPass === adminPassword) {
            login = true;
            alert("Inicio de sesión exitoso. Bienvenido, Admin.");
            // SI ACCEDES AL "SISTEMA" TE PERMITE UTILIZAR LAS FUNCIONES
            searchUser();
            searchID();
            allUsers();
        } else {
            attempts--;
            alert(`Contraseña incorrecta. Intentos restantes: ${attempts}`);
        }
    } else {
        attempts--;
        alert(`Usuario incorrecto. Intentos restantes: ${attempts}`);
    }
}

if (attempts === 0) {
    alert("Cuenta bloqueada. Has excedido el número de intentos permitidos.");
}



// FUNCIONES DE ORDEN SUPERIOR .FILTER .FIND .MAP
function searchUser() {
    const nameSearch = prompt("Ingresa un nombre o apellido de ciudadano").toLowerCase()
    const citizen = usersData.filter((civil) => civil.name.toLowerCase() == nameSearch || civil.lastname.toLowerCase() == nameSearch);

    if (citizen.length > 0) {
        console.log("Se encontraron los siguientes datos:");
        citizen.forEach(citizen => {
            console.log(`Nombre: ${citizen.name}, Apellido: ${citizen.lastname}, ID: ${citizen.id}, ByC: ${citizen.byc}`);

        });
    } else {
        console.log("Ciudadano(s) no encontrado(s)");
    }
}

function searchID() {
    const idSearch = prompt("Ingresa el ID del ciudadano").toLowerCase()
    const idCitizen = usersData.find((civil) => civil.id.toLowerCase() === idSearch)

    if (idCitizen) {
        console.log(`Se encontraron los siguientes datos con la ID otorgada:\n- Nombre: ${idCitizen.name}\n- Apellido: ${idCitizen.lastname}\n- Edad: ${idCitizen.age}\n- Sujeto peligroso: ${idCitizen.danger}\n- En búsqueda y captura: ${idCitizen.byc}`);
    } else {
        console.log("No se encontraron datos con la ID registrada.");

    }
}

function allUsers() {
    const dbCitizen = parseInt(prompt("¿Quiere cargar toda la base de datos? \n1. Sí\n2. No"))

    if (dbCitizen == 1) {
        const citizens = usersData.map((citizen) => `Nombre: ${citizen.name}, Apellido: ${citizen.lastname}, ID: ${citizen.id}`)
        console.log(citizens)
    } else {
        alert("Carga de datos rechazada.")
    }
}