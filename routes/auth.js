/*

  Ruta: /api/login'

*/

// Importaciones
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos.js')

const router = Router();


router.post( '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);


router.post( '/google',
    [
        check('token', 'El Token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);





module.exports = router;
