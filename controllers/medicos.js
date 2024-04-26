const { response } = require("express");
// const { models, model } = require("mongoose");

// Importanción del modelo
const Medico = require('../models/medico');


const getMedico = async (req, res = response) => {


  const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img')


  res.json({
    ok: true,
    medicos
  })
}

const getMedicoById = async (req, res = response) => {

  const id = req.params.id;

  try {
    const medico = await Medico.findById(id)
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img')


    res.json({
      ok: true,
      medico
    })

  } catch (error) {
    console.log(error);
    res.json({
      ok: true,
      msg: 'Hable con el administrador'
    })
  }

}

const crearMedico = async (req, res = response) => {

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

const actualizarMedico = async (req, res = response) => {

  // Id del hospital medico
  const id = req.params.id;
  // Id del usuario que va hacer la actualización
  const uid = req.uid;

  try {

    // Obtener refencia del id que esta llegando del hospital
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(500).json({
        ok: true,
        msg: 'Medico no encontrado por id',
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });


    res.json({
      ok: true,
      medico: medicoActualizado
    })

  } catch (error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })

  }


}

const borrarMedico = async (req, res = response) => {


  // Id del medico que se va a borrar
  const id = req.params.id;

  try {

    // Obtener refencia del id que esta llegando del hospital
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(500).json({
        ok: true,
        msg: 'Medico no encontrado por id',
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'Medico Eliminado'
    })

  } catch (error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })

  }

}

module.exports = {
  getMedico,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById
}
