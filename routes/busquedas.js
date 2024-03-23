/*

  Ruta: /api/todo/:busqueda

 */

//Importaciones de modulos
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos')

const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo } = require('../controllers/busquedas');


const router = Router();

// Lee la info del usuario
router.get( '/:busqueda', validarJWT ,getTodo );



module.exports = router;

