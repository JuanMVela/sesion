const express = require("express");
const session = express.Router();
const { auth } = require("../middlewares/auth");
const { userModel } = require("../models/user.model");
const { hash, compare } = require("bcrypt");

session.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send("login", `bienvenido por ${req.session.counter} vez`);
  } else {
    req.session.counter = 1;
    res.send("login", "bienvenido");
  }
});

session.get("/clearsession", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("Error al cerrar sesion");
    } else {
      res.send("sesion Cerrada");
    }
  });
});

session.post("/registro", async (req, res) => {
  const emailUser = req.body.email;
  const passwordUser = req.body.password;

  const hashPassword = await hash(passwordUser, 10);

  const nuevoUsaurio = await userModel.create({
    email: emailUser,
    password: hashPassword,
  });

  console.log("Nuevo usuario creado", nuevoUsaurio);

  res.redirect("http://localhost:8080");
});

session.post("/login", async (req, res) => {
  const emailUserLogin = req.body.email;
  const passwordUserLogin = req.body.password;

  const usuario = await userModel.findOne({ email: emailUserLogin });

  const verificarPass = compare(passwordUserLogin, usuario.password);

  if (!usuario) res.send("El usuario no existe");
  if (!verificarPass) res.send("La constraseña es incorrecta");

  req.session.email = emailUserLogin;
  req.session.admin = true;

  res.send(`Te autenticaste con el Usuario ${emailUserLogin}`);
});

session.get("/rutaprivada", auth, (req, res) => {
  res.send("Usuario autorizado y autenticado ");
  res.redirect("http://localhost:8080/views");
});

module.exports = session;
