const Usuario = require('../models/usuarios');



const getUsuarios = async( req, res) => {

  // Llama la informacion de todos los usuarios
  const usuarios = await Usuario.find( {}, 'nombre email role google' );

  res.json({
    ok: true,
    usuarios
  });

}

const crearUsuario = async( req, res) => {

  // Obtiene los valores del body requeridos
  const { email, password, nombre } = req.body;

  // Asigna los valores requeridos al usuario
  const usuario = new Usuario( req.body );

  // Guarda en la BD
  await usuario.save();

  res.json({
    ok: true,
    usuario
  });

}

module.exports = {
  getUsuarios,
  crearUsuario,
}
