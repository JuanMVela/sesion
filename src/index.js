// import Rutas
const products = require("./routers/products");
const carts = require("./routers/carts");
const viewsRouters = require("./routers/viewsRouter");
const login = require("./routers/login");

// Modelos

const { productModel } = require("./models/products.model");
const { userModel } = require("./models/user.model");

const express = require("express");
const app = express();

const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");

const dotenv = require("dotenv");
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("codersecret"));
app.use(
  session({
    secret: "secretcoder",
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://jmv:jmv@codercluster.o6km6wj.mongodb.net/session",
      mongoOptions: { useNewUrlparser: true, useUnifiedTopology: true },
      ttl: 30,
    }),
  })
);
// Vistas
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("public"));
// console.log(__dirname);

// Rutas
app.use("/productos", products);
app.use("/carts", carts);
app.use("/views", viewsRouters);
app.use("/login", login);

// Puerto servidor
const PORT = 8080;

app.get("/", (req, res) => {
  res.render("login");
});

// Activacion servidor
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Websockets
const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("nuevo cliente");

  // Almacenar los "productos" desde MongoDB en una variable
  const products = await productModel.find().lean();

  // Socket VISUALIZAR productos en tiempo real
  socket.emit("cargaDeProductos", products);

  // Socket AGREGAR nuevo producto
  socket.on("nuevoProducto", async (data) => {
    await productModel.create(data);
    const actualizados = await productModel.find();
    socket.emit("cargaDeProductos", actualizados);
  });

  // Socket ELIMINAR producto con ID de FORM
  socket.on("eliminarProducto", async (id) => {
    if (id) {
      await productModel.deleteOne({ _id: id });
      const actualizados = await productModel.find();
      // console.log(actualizados);
      socket.emit("cargaDeProductos", actualizados);
      // res.send(`Producto "${id}" eliminado`);
    } else {
      // res.status(404).send("El producto no existe");
    }
  });

  // WEBSOCKETS USUARIOS------------------------------------------

  // Almacenar los "usuarios" desde MongoDB en una variable
  const users = await userModel.find().lean();

  // Socket AGREGAR nuevo usuario
  // socket.on("newUser", async (data) => {
  //   console.log(data);
  //   await userModel.create(data);
  //   const usersAct = await userModel.find();
  //   socket.emit("cargaUsers", usersAct);
  // });
  // Socket VISUALIZAR usuarios en tiempo real
  socket.emit("cargaUsers", users);
});

// Conexion a MongoDB
const dbMongoConnect = require("./mongo");
