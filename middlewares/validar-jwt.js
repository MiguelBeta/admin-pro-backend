const jwt = require("jsonwebtoken");


const validarJWT = (req, res, next) => {

  // Leer el token que esta en los headers
  // const token = req.query('x-token');
  const token = req.query['x-token'];


  // Verificar si hay token
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'
    });
  }

  try {

    const { uid } = jwt.verify( token, process.env.JWT_SECRET );
    req.uid = uid;

    // Es la funcion que se llama si todo esta correctamente
    next();


  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }


}

module.exports = {
  validarJWT
}
