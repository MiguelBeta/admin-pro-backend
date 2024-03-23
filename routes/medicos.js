/*
    Medico
    ruta: '/api/medico'
*/


//Importaciones de modulos
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const  { getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');


const router = Router();

// Lee la info del usuario
router.get( '/', getMedico );

// Crear un usuario y recibe los datos obligatorios
router.post('/',
  [
      validarJWT,
      check('nombre', 'El nombre del medico debe ser necesario').not().isEmpty(),
      check('hospital', 'El id debe ser valido').isMongoId(),
      validarCampos
  ],
  crearMedico
);

// Actualizar información
router.put('/:id',
  [ ],
  actualizarMedico
);

// Eliminar usuario
router.delete('/:id',
    borrarMedico
  );


module.exports = router;
