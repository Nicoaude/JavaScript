const userReg = "user2442"
const passwordReg = "12345!"

let bienvenida = prompt("Bienvenid@ a Login 2.0! Si ya estas registrado presioná 1 sino registrate presionando 2.")
let login = false
let block = false

while (bienvenida == "1" || bienvenida == "2" && !login || !block) {
    if (bienvenida == "1") {
        let userLog = prompt("Ingresa tu nombre de usuario")
        if (userLog !== userReg) {
            alert("Erorr: Usuario incorrecto")
        } else {
            let passwordLog;
            let intentos = 3

            while (intentos > 0) {
                passwordLog = prompt("Ingresa tu contraseña")
                if (passwordLog == passwordReg) {
                    alert(`Bienvenido ${userReg}`)
                    login = true
                    break;
                } else {
                    intentos--;
                    alert(`Error: Contraseña incorrecta, restan ${intentos} intentos.`)
                }

                if (intentos == 0) {
                    alert("Agotaste los 3 intentos, volvé dentro de 1 hora.")
                    block = true
                    break;
                }
            }
        }
    } else if (bienvenida == "2") {
        let userNew = prompt("Bienvenido al registro de usuario. Por favor, ingresa un nombre de usuario")
        let passwordNew = prompt("Ingresa una contraseña")
        if (userNew && passwordNew) {
            alert(`Bienvenido ${userNew}, esperamos que disfrutes de nuestra comunidad.`)
            break;
        } else {
            alert("Hay campos vacios.")
        }
    }


    if (login || block) { //Condicional para cerrar el ciclo por si se inicia sesión o si supera los 3 intentos.
        break;
    }
}