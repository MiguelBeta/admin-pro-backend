const { response } = require("express");
//const { models, model } = require("mongoose");

const Hospital = require('../models/hospital')



const getHospital = async ( req, res = response ) => {

  const hospitales = await Hospital.find()
                                   .populate( 'usuario', 'nombre img' )

  res.json({
    ok: true,
    hospitales
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

const actualizarHospital = async ( req, res = response ) => {

  // Id del hospital actualizar
  const id = req.params.id;
  // Id del usuario que va hacer la actualización
  const uid = req.uid;

  try {

    // Obtener refencia del id que esta llegando del hospital
    const hospital = await Hospital.findById( id );

    if ( !hospital ){
      return res.status(500).json({
        ok: true,
        msg: 'Hospital no encontrado por id',
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );


    res.json({
      ok: true,
      hospital: hospitalActualizado
    })

  } catch (error) {

    console.log( error );

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })

  }

}

const borrarHospital = async ( req, res = response ) => {

    // Id del hospital que se va a borrar
    const id = req.params.id;

    try {

      // Obtener refencia del id que esta llegando del hospital
      const hospital = await Hospital.findById( id );

      if ( !hospital ){
        return res.status(500).json({
          ok: true,
          msg: 'Hospital no encontrado por id',
        });
      }

      await Hospital.findByIdAndDelete( id );

      res.json({
        ok: true,
        msg: 'Hospital Eliminado'
      })

    } catch (error) {

      console.log( error );

      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
      })

    }



}

module.exports = {
  getHospital,
  crearHospital,
  actualizarHospital,
  borrarHospital
}
