const socket = io();

// Targets de Formualarios
let formularioRegistro = document.querySelector(".formularioRegistro");
let userPassword = document.querySelector("#password");
let userEmail = document.querySelector("#email");
let loginRealTime = document.querySelector("#loginRealTime");

// Funcion AGREGAR nuevo producto con FORM
const nuevoUser = () => {
  formularioRegistro.onsubmit = (e) => {
    e.preventDefault();

    let newUser = {
      email: userEmail.value,
      password: userPassword.value,
    };
    console.log(newUser);
    socket.emit("newUser", newUser);
  };
};

// Actualizar productos en tiempo real luego de AGREGAR/ELIMINAR
socket.on("newUser", nuevoUser());

const cargaUsers = () => {
  socket.on("cargaUsers", (data) => {
    loginRealTime.innerHTML = "";

    data.forEach((e) => {
      loginRealTime.innerHTML += `<ul>
            <li>email: ${e.email}</li>
            <li>password: ${e.password} </li>                   
         </ul>`;
    });
  });
};

cargaUsers();
nuevoUser();
