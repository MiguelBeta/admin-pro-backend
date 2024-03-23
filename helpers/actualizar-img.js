const fs = require('fs');

const Usuario = require('../models/usuarios');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

  switch ( tipo ) {
    case 'medicos':
      const medico = await Medico.findById( id );
      if( !medico ){
        console.log('No es un medico por id');
        return false;
      }

      const pathViejo = `./uploads/medicos/${ medico.img }`;

      console.log(fs.existsSync( pathViejo ));
      console.log(pathViejo);



      if( fs.existsSync( pathViejo ) ){
        // Borar la imagen anterior
        fs.unlinkSync( pathViejo );
      }

      medico.img = nombreArchivo;
      await medico.save();
      return true;


    case 'hospitales':
      break;

    case 'usuarios':
      break;

    default:
      break;
  }

}

module.exports = {
  actualizarImagen
}
