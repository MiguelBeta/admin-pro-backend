/*

  Ruta: /api/usuarios

*/

//Importaciones de modulos
const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios')
const router = Router();

// Lee ña info del usuario
router.get( '/', getUsuarios );

// Crear un usuario
router.post( '/', crearUsuario );


module.exports = router;
