const socket = io();

// Targets de Formualarios
let formulario = document.querySelector(".formulario");
let formularioEliminar = document.querySelector(".formularioEliminar");
let productsRealTime = document.querySelector("#productsRealTime");

// Targets value Formualario "cargar productos"
let title = document.querySelector("#nombre");
let description = document.querySelector("#descripcion");
let price = document.querySelector("#precio");
let thumbnail = document.querySelector("#url");
let code = document.querySelector("#codigo");
let stock = document.querySelector("#stock");

// Target value Formualario "eliminar"
let IdDeleteProducto = document.querySelector("#idDelete");

// Funcion VISUALIZAR productos en tiempo real
const cargaDeProductos = () => {
  socket.on("cargaDeProductos", (data) => {
    productsRealTime.innerHTML = "";

    data.forEach((e) => {
      productsRealTime.innerHTML += `<ul style="background-color: gray;
    border:4px solid black;">
            <li style="font-size:20px;"><h3>Nombre: ${e.title}</h3></li>
            <li>Description: ${e.description} </li>
            <li>Precio: ${e.price} </li>
            <li>Imagenes: ${e.thumbnail} </li>
            <li>Codigo: ${e.code} </li>
            <li>Stock: ${e.stock} </li>
            <li>ID: ${e._id} </li>
         </ul>`;
    });
  });
};

// Funcion AGREGAR nuevo producto con FORM
const nuevoProducto = () => {
  formulario.onsubmit = (e) => {
    e.preventDefault();

    let productoNuevo = {
      title: title.value,
      description: description.value,
      price: price.value,
      thumbnail: thumbnail.value,
      code: code.value,
      stock: stock.value,
    };
    console.log(productoNuevo);
    socket.emit("nuevoProducto", productoNuevo);
  };
};

// Funcion ELIMINAR producto con ID de FORM
const eliminarProducto = () => {
  formularioEliminar.onsubmit = (e) => {
    e.preventDefault();
    let id = IdDeleteProducto.value;
    socket.emit("eliminarProducto", id);
  };
};

// Actualizar productos en tiempo real luego de AGREGAR/ELIMINAR
socket.on("cargaDeProductos", cargaDeProductos());

cargaDeProductos();
nuevoProducto();
eliminarProducto();
