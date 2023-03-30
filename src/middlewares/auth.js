const auth = async (req, res, next) => {
  if (req.session.email && req.session.admin === true) {
    return next();
  }
  return res.send("error de autenticacion");
};

module.exports = { auth };
