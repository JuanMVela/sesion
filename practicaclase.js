// PRACTICA CLASE RUTA SESSION-------------------------------------

// const express = require("express");
// const cookies = express.Router();

// cookies.get("/", async (req, res) => {
//   res.render("cookies");
// });

// cookies.post("/", (req, res) => {
//   const { first_name, email } = req.body;

//   res.cookie("first_name", first_name, { maxAge: 20000 });
//   res.cookie("email", email, { maxAge: 20000 });
//   res.send({ Message: "cookie seteada" });
// });

// cookies.get("/getCookies", (req, res) => {
//   res.send(req.cookies);
// });

// cookies.get("/session", (req, res) => {
//   if (req.session.counter) {
//     req.session.counter++;
//     res.send(`bienvenido por ${req.session.counter} vez`);
//   } else {
//     req.session.counter = 1;
//     res.send("bienvenido");
//   }
// });

// cookies.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       res.send("Error al cerrar sesion");
//     } else {
//       res.send("sesion Cerrada");
//     }
//   });
// });

// cookies.get("/root", (req, res) => {
//   const { name } = req.query;
//   if (req.session.counter) {
//     req.session.counter++;
//     res.send(`bienvenido ${req.session.name} por ${req.session.counter} vez`);
//   } else {
//     req.session.counter = 1;
//     req.session.name = name;
//     res.send(`bienvenido ${name !== undefined ? name : "anonimo"}`);
//   }
// });

// module.exports = cookies;

// PRACTICA CLASE RUTA SESSION-------------------------------------

// Cookies------------------------------------------------------------------------------------

// app.get("/setCookie", (req, res) => {
//   res
//     .cookie("Coder", "soy una cookie", { maxAge: 20000 })
//     .send("Cookie Fronted");
// });

// app.get("/setSignedCookie", (req, res) => {
//   res
//     .cookie("signedCoder", "soy una cookie firmada", {
//       maxAge: 20000,
//       signed: true,
//     })
//     .send("Cookie Fronted firmada");
// });

// app.get("/getSignedCookie", (req, res) => {
//   res.send(req.signedCookies);
// });

// app.get("/getCookie", (req, res) => {
//   res.send(req.cookies);
// });

// app.get("/clearCookie", (req, res) => {
//   // PARA BORRAR TODAS LAS COOKIES
//   // const getCoikies = req.cookies;
//   // for (const key in getCoikies) {
//   //   res.clearCookie(key);
//   // }
//   res.clearCookie("Coder").send("cookie borrada Fronted");
// });
// -------------------------------------------------------------------------------------------------
