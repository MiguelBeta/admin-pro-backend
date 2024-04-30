/*

  Ruta: /api/usuarios

*/

//Importaciones de modulos
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos')

const { getUsuarios, crearUsuario, actualizarUsuarios, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_oMismoUsuario } = require('../middlewares/validar-jwt');


const router = Router();

// Lee la info del usuario
router.get( '/', validarJWT , getUsuarios );

// Crear un usuario y recibe los datos obligatorios
router.post('/',
  [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "El password es obligatorio").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    // Se llama despues de que los campos tengan la informacion para validarla
    validarCampos
  ],
  crearUsuario
);

// Actualizar información
router.put( '/:id',
  [
    validarJWT,
    validarADMIN_ROLE_oMismoUsuario,
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    check('role', "El rol es obligatorio").not().isEmpty(),
    // Se llama despues de que los campos tengan la informacion para validarla
    validarCampos
  ],
  actualizarUsuarios
);

// Eliminar usuario
router.delete('/:id',
    [ validarJWT, validarADMIN_ROLE ],
    borrarUsuario,
  );


module.exports = router;
