const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next ) => {

  // Atrapamos los errores de la req (peticion o repsuesta)
  const errores = validationResult( req );

  if ( !errores.isEmpty() ){
    return res.status(400).json({
      ok:false,
      errors: errores.mapped()
    });
  }

  // Si no hay errores la función sigue
  next();
}

// Exportamos modulos para utilizarlo por fuera
module.exports = {
  validarCampos
}
