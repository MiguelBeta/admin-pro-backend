const { response } = require("express");
// const { models, model } = require("mongoose");

// Importanción del modelo
const Medico = require('../models/medico');


const getMedico = async ( req, res = response ) => {


  const medicos = await Medico.find()
                                   .populate( 'usuario', 'nombre img' )
                                   .populate( 'hospital', 'nombre img' )


  res.json({
    ok: true,
    medicos
  })
}

const crearMedico = async( req, res = response ) => {

  // Extraemos uid del medico
  const uid = req.uid;

  // Instancia
  const medico = new Medico({
    usuario: uid,
    ...req.body
  });

  try {

    // Guardamos el medico en BD
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    })

  }

}

const actualizarMedico = ( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'Actualizar Medico'
  })
}

const borrarMedico = ( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'Borrar Medico'
  })
}

module.exports = {
  getMedico,
  crearMedico,
  actualizarMedico,
  borrarMedico
}
