const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios');
const { generateJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {

  const desde = Number(req.query.desde) || 0;

  // Llama la informacion de todos los usuarios
  // const usuarios = await Usuario
  //   .find({}, 'nombre email role google')
  //   .skip(desde)
  //   .limit(5);

  // // Total de usuarios
  // const total = await Usuario.countDocuments();

  // Para qu usuarios y total trabajen en simultaneo
  const [ usuarios, total ] = await Promise.all([
      Usuario
          .find({}, 'nombre email role google img')
          .skip(desde)
          .limit(5),

      Usuario.countDocuments()

  ]);


res.json({
  ok: true,
  usuarios,
  total
});

}

const crearUsuario = async (req, res = response) => {

  // Obtiene los valores del body requeridos
  const { email, password } = req.body;



  // Manejo de error cuando hay un valor requerido duplicado
  try {

    // finOne = busca y devuelve un solo valor que cumple los criterios de consulta (no repetido)
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado'
      });
    }

    // Asigna los valores requeridos al usuario
    //const usuario = new Usuario(req.body);
    const usuario = new Usuario(req.body);

    // Encripta contraseña antes de guardar
    // Genera el password con datos aleatorios
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    // Guarda en la BD
    await usuario.save();

    // Generar el JWT ( Token )
    const token = await generateJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token
    });


  } catch (error) {
    console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const actualizarUsuarios = async (req, res = response) => {

  // TODO: validar token y comprobar si es el usuario correcto

  const uid = req.params.id;

  try {

    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usario por ese id'
      });
    }

    // Actualizaciones elimina estos campos que no puede actualizar en la petición
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email'
        });
      }
    }

    campos.email = email;
    // Actualiza por uid y se envian los campos que puede actualizar
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


    res.json({
      ok: true,
      usuario: usuarioActualizado
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }

}

const borrarUsuario = async (req, res = response) => {

  const uid = req.params.id;

  try {

    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usario por ese id'
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: 'Usuario eliminado'
    })

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

}

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuarios,
  borrarUsuario
}
