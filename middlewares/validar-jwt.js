const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios')


const validarJWT = (req, res, next) => {

  // Leer el token que esta en los headers
  // const token = req.query('x-token');
  const token = req.headers['x-token'];

  try {

    // Verificar si hay token
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la peticióon',
        token
      });
    }

    // try {

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
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

const validarADMIN_ROLE = async (req, res, next) => {

  try {

    // Extraigo el uid del usuario
    const uid = req.uid;

    //extraemos el usuario
    const usuarioDB = await Usuario.findById(uid);

    // Me aseguro de que el usuario exista
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe'
      });
    }


    // Si es un usuario diferente de admin
    if (usuarioDB.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        msg: 'No tiene privilegios para hacer eso'
      });
    }

    // Si es un admin o pasa las validaciones permite hacer los cambios y llama la funcion next
    next();




  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

}



module.exports = {
  validarJWT,
  validarADMIN_ROLE
}
