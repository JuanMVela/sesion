const auth = async (req, res, next) => {
  if (req.session.usuario && req.session.admin === true) {
    return next();
  } else {
    return res.send("error de autenticacion");
  }
};

module.exports = auth;
