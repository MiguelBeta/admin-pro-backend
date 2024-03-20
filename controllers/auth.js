// Importaciones
const { response } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');



const login = async( req, res = response ) => {

  // Obtenemos el email y el password del body
  const { email, password } = req.body;

  try {

    const usurioDB = await Usuario.findOne({ email });

    // Verifica email
    if ( !usurioDB ){
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      });
    }

    // Verifica password que ingresa el usuario con el guardado en BD
    const validPassword = bcrypt.compareSync( password, usurioDB.password );
    if ( !validPassword ){
      return res.status(400).json({
        ok: false,
        msg: 'Password no valida'
      })
    }

    // Generar el JWK ( Token )
    const token = await generateJWT( usurioDB.id );

    res.json({
      ok: true,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  login
}
