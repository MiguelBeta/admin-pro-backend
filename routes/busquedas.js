/*

  Ruta: /api/todo/

 */

//Importaciones de modulos
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos')

const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');


const router = Router();

// Lee la info del usuario
router.get( '/:busqueda', validarJWT , getTodo );

router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion );




module.exports = router;

