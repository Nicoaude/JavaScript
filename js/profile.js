// Cargar los datos de usersData desde un archivo JSON en lugar de un módulo
fetch('./data/dbUsers.json')
    .then(response => response.json())
    .then(usersData => {
        const urlParams = new URLSearchParams(window.location.search);
        const profileID = urlParams.get('id');

        // Obtener los datos desde localStorage o el JSON cargado
        const storedUsersData = JSON.parse(localStorage.getItem('usersData')) || usersData;

        const user = storedUsersData.find(user => user.id === profileID);

        if (user) {
            user.antecedentes = user.antecedentes || [];
            user.deudas = user.deudas || [];
            user.vehiculos = user.vehiculos || [];
            user.propiedades = user.propiedades || [];

            const profileBox = document.createElement("div");
            profileBox.classList.add("profile__box");

            const savedImage = localStorage.getItem(`profileImg-${user.id}`);
            const profileImg = savedImage ? savedImage : "../img/profile.jpg";

            profileBox.innerHTML = `
                <img src="${profileImg}" alt="Profile picture" id="profile-image">
                <h1>${user.name} ${user.lastname}</h1>
                <div class="profile-item">
                    <h3>ID: </h3><p> ${user.id}</p>
                </div>
                <div class="profile-item">
                    <h3>EDAD: </h3><p> ${user.age}</p>
                </div>
                <div class="profile-item">
                    <h3>BANCO: </h3><p> ${user.money}</p>
                </div>
                <div class="profile-item">
                    <h3>NOTA: </h3><p id="user-note">${user.note || 'No hay notas.'}</p>
                </div>
            `;

            const profile = document.querySelector(".profile");
            profile.appendChild(profileBox);

            document.getElementById('photo__update').addEventListener('click', () => {
                const photoUrl = prompt('Ingresa el nuevo link de la foto:');
                if (photoUrl) {
                    user.img = photoUrl;
                    document.getElementById('profile-image').src = photoUrl;
                    localStorage.setItem(`profileImg-${user.id}`, photoUrl);
                    localStorage.setItem('usersData', JSON.stringify(storedUsersData));
                }
            });

            document.getElementById('search__update').addEventListener('click', () => {
                user.byc = !user.byc;
                alert(`Búsqueda y Captura: ${user.byc ? 'Activado' : 'Desactivado'}`);
                localStorage.setItem('usersData', JSON.stringify(storedUsersData));
            });

            document.getElementById('danger__update').addEventListener('click', () => {
                user.danger = !user.danger;
                alert(`Peligroso: ${user.danger ? 'Activado' : 'Desactivado'}`);
                localStorage.setItem('usersData', JSON.stringify(storedUsersData));
            });

            document.getElementById('notes__update').addEventListener('click', () => {
                const newNote = prompt('Ingresar nota (máximo 100 caracteres):');
                if (newNote && newNote.length <= 100) {
                    user.note = newNote;
                    document.getElementById('user-note').textContent = newNote;
                    alert('Nota actualizada: ' + newNote);
                    localStorage.setItem('usersData', JSON.stringify(storedUsersData));
                } else {
                    alert('El máximo es de 100 caracteres.');
                }
            });

            document.getElementById('notes__delete').addEventListener('click', () => {
                user.note = '';
                document.getElementById('user-note').textContent = 'No hay notas.';
                alert('Nota eliminada.');
                localStorage.setItem('usersData', JSON.stringify(storedUsersData));
            });

            const antecedentesTable = document.getElementById('antecedentes').getElementsByTagName('tbody')[0];
            user.antecedentes.forEach(antecedente => {
                const row = antecedentesTable.insertRow();
                row.insertCell(0).textContent = antecedente.year;
                row.insertCell(1).textContent = antecedente.description;
            });

            const deudasTable = document.getElementById('deudas').getElementsByTagName('tbody')[0];
            user.deudas.forEach(deuda => {
                const row = deudasTable.insertRow();
                row.insertCell(0).textContent = deuda.entity;
                row.insertCell(1).textContent = deuda.amount;
                row.insertCell(2).textContent = deuda.paid ? 'Sí' : 'No';
            });

            const vehiculosTable = document.getElementById('vehiculos').getElementsByTagName('tbody')[0];
            user.vehiculos.forEach(vehiculo => {
                const row = vehiculosTable.insertRow();
                row.insertCell(0).textContent = vehiculo.brand;
                row.insertCell(1).textContent = vehiculo.model;
                row.insertCell(2).textContent = vehiculo.year;
            });

            const propiedadesTable = document.getElementById('propiedades').getElementsByTagName('tbody')[0];
            user.propiedades.forEach(propiedad => {
                const row = propiedadesTable.insertRow();
                row.insertCell(0).textContent = propiedad.type;
                row.insertCell(1).textContent = propiedad.address;
            });

        } else {
            console.error("Usuario no encontrado");
        }
    })
    .catch(error => {
        console.error("Error al cargar los datos del JSON:", error);
    });