/*
    Hospitales
    ruta: '/api/hospitales'
*/


//Importaciones de modulos
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos')

const { validarJWT } = require('../middlewares/validar-jwt');
const  { getHospital, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');


const router = Router();

// Lee la info del usuario
router.get( '/', getHospital );

// Crear un usuario y recibe los datos obligatorios
router.post('/',
  [
      validarJWT,
      check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
      validarCampos
  ],
  crearHospital
);

// Actualizar información
router.put('/:id',
  [ ],
  actualizarHospital
);

// Eliminar usuario
router.delete('/:id',
    borrarHospital
  );


module.exports = router;
