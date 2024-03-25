const fs = require('fs');

const Usuario = require('../models/usuarios');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {


      if( fs.existsSync( path ) ){
        // Borar la imagen anterior
        fs.unlinkSync( path );
      }

}


const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

  let pathViejo = '';

  switch ( tipo ) {
    case 'medicos':

      const medico = await Medico.findById( id );
      if( !medico ){
        console.log('No es un medico por id');
        return false;
      }

      // Borrar imagen anterior
      pathViejo = `./uploads/medicos/${ medico.img }`;
      borrarImagen( pathViejo  );



      medico.img = nombreArchivo;
      await medico.save();
      return true;


    case 'hospitales':

    const hospital = await Hospital.findById( id );
    if( !hospital ){
      console.log('No es un hospital por id');
      return false;
    }

    // Borrar imagen anterior
    pathViejo = `./uploads/hospitales/${ hospital.img }`;
    borrarImagen( pathViejo  );



    hospital.img = nombreArchivo;
    await hospital.save();
    return true;


    case 'usuarios':

      const usuario = await Usuario.findById( id );
      if( !usuario ){
        console.log('No es un usuario por id');
        return false;
      }

      // Borrar imagen anterior
      pathViejo = `./uploads/usuarios/${ usuario.img }`;
      borrarImagen( pathViejo );



      usuario.img = nombreArchivo;
      await usuario.save();
      return true;

    default:
      break;
  }

}

module.exports = {
  actualizarImagen
}
