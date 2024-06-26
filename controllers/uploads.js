const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-img");


const fileUpload = ( req, res = response) => {

  const tipo = req.params.tipo;
  const id = req.params.id;

  // Validar tipo
  const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(404).json({
      ok: false,
      msg: 'No es un medico, usuario u hospital (tipo)'
    });
  }

  // Validar que exista un archivo subido (img)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningun archivo'
    });
  }

  // Procesar la img...
  const file = req.files.imagen;

  // Corta el nombre apartir del ultimo punto
  const nombreCortado = file.name.split('.'); //wolverine.1.3.jpg
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar entension
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
  if (!extensionArchivo.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es una extension permitida'
    });
  }

  // Nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar la img
  const path = `./uploads/${tipo}/${nombreArchivo}`;
  // Mover la imagen con el metodo mv()
  file.mv( path, (err) => {
    console.log(err)
    if (err){
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen'
      });
    }

    // Actualizar BD
    actualizarImagen( tipo, id, nombreArchivo );

    res.json({
      ok: true,
      msg: 'Archivo subido',
      nombreArchivo
    });

  });


}

const retornaImagen = ( req, res = response ) => {

  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

  // imagen por defecto
  if ( fs.existsSync( pathImg ) ) {
      res.sendFile( pathImg );
  } else {
      const pathImg = path.join( __dirname, `../uploads/no-img.png` );
      res.sendFile( pathImg );
  }

}


module.exports = {
  fileUpload,
  retornaImagen
}
