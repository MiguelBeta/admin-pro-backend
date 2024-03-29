
const { response } = require("express");

const Usuario = require('../models/usuarios');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');




const getTodo = async ( req, res = response ) => {

  const busqueda = req.params.busqueda;
  // expresion regular para buscar el usuario no necesariamente por su nombre compelto
  // o busqueda insencible
  const regex = new RegExp( busqueda, 'i' );

  const [ usuarios, medicos, hospitales ] = await Promise.all([
      Usuario.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
      Hospital.find({ nombre: regex }),

  ]);



  res.json({
    ok: true,
    msg: 'getTodo',
    usuarios,
    medicos,
    hospitales
  })


}

const getDocumentosColeccion = async ( req, res = response ) => {

  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;

  // expresion regular para buscar el usuario no necesariamente por su nombre compelto
  // o busqueda insencible
  const regex = new RegExp( busqueda, 'i' );

  let data = [];

  switch ( tabla ) {
    case 'medicos':
      data = await Medico.find({ nombre: regex })
                          .populate( 'usuario', 'nombre img' )
                          .populate( 'hospital', 'nombre img' );
      break;

    case 'hospitales':
      data = await Hospital.find({ nombre: regex })
                          .populate( 'usuario', 'nombre img' );

      break;

    case 'usuarios':
      data = await Usuario.find({ nombre: regex });
      break;

    default:
      return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
      });

  }

  res.json({
    ok: true,
    resultados: data
  })

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}
