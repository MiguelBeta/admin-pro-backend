const { response } = require("express");
//const { models, model } = require("mongoose");

const Hospital = require('../models/hospital')



const getHospital = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'getHospitales'
  })
}

const crearHospital = async( req, res = response ) => {

  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {

    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

}

const actualizarHospital = ( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'Actualizar Hospitales'
  })
}

const borrarHospital = ( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'Borrar Hospitales'
  })
}

module.exports = {
  getHospital,
  crearHospital,
  actualizarHospital,
  borrarHospital
}
