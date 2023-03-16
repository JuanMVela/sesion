const mongoose = require("mongoose");

const dbMongoConnect = async () => {
  const RUTADB = process.env.RUTA_DB;
  // console.log(RUTADB);
  mongoose.set("strictQuery", true);

  mongoose.connect(RUTADB, (error) => {
    if (!error) {
      console.log("CONEXION EXITOSA");
    } else {
      console.log("ERROR DE CONEXION");
    }
  });

  // Probando Paginate------------------------------------------

  // const response = await productModel.paginate(
  //   { description: "Bebida" },
  //   { page: 2, limit: 2 }
  // );

  // Probando Paginate------------------------------------------
};

module.exports = dbMongoConnect();
