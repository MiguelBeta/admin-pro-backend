/*

  Ruta: /api/uploads/

 */

//Importaciones de modulos
const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');



const router = Router();

router.use( expressfileUpload() );

// Subir img
router.put( '/:tipo/:id', validarJWT, fileUpload );

// Ver imagen
router.get('/:tipo/:foto', retornaImagen );






module.exports = router;

