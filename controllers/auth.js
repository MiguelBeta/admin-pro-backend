// Importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { JWT } = require('google-auth-library');
const { getMenuFronEnd } = require('../helpers/menu-frontend');




const login = async (req, res = response) => {

  // Obtenemos el email y el password del body
  const { email, password } = req.body;

  try {

    const usurioDB = await Usuario.findOne({ email });

    // Verifica email
    if (!usurioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      });
    }

    // Verifica password que ingresa el usuario con el guardado en BD
    const validPassword = bcrypt.compareSync(password, usurioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password no valida'
      })
    }

    // Generar el JWK ( Token )
    const token = await generateJWT(usurioDB.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFronEnd( usurioDB.role )
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const googleSignIn = async (req, res = response) => {

  const googleToken = req.body.token;

  try {

   const { email, name, picture } = await googleVerify( googleToken );

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
      // usuario.password = '@@';
    }

    // Guardar Usuario
    await usuario.save();

    // Generar el TOKEN - JWT
    const token = await generateJWT( usuario.id );


    res.json({
      ok: true,
      token,
      menu: getMenuFronEnd( usuario.role )
    });

  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'Token de Google no es correcto'
    });
  }



}

const renewToken = async ( req, res = response ) => {

  const uid = req.uid;

  // Generar el TOKEN - JWT
  const token = await generateJWT( uid );

  // Obtener el usuario por UID
  const usuario = await Usuario.findById( uid );

  res.json({
    ok: true,
    token,
    usuario,
    menu: getMenuFronEnd( usuario.role )
  });

}

module.exports = {
  login,
  googleSignIn,
  renewToken
}
