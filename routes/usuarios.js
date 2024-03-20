/*

  Ruta: /api/usuarios

*/

//Importaciones de modulos
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-capos')

const { getUsuarios, crearUsuario, actualizarUsuarios } = require('../controllers/usuarios')
const router = Router();

// Lee la info del usuario
router.get('/', getUsuarios);

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
router.put('/:id',
  [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "El password es obligatorio").not().isEmpty(),
    check('role', "El rol es obligatorio").isEmail(),
  ],
  actualizarUsuarios
);


module.exports = router;
