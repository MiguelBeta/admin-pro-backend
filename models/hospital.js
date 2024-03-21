const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

  nombre: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  // Usuario que lo creo
  usuario: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
  },

  // Cambia el nombre como se quiera que aparezca en la BD
}, { collection: 'hospitales' } );


// Cambiar la forma en que se muestra el _id por uid
// Desestructura el objeto y excluye los campo __v, password
HospitalSchema.method('toJSON', function(){
  const { __v, ...object } = this.toObject();
  return object;
})

module.exports = model( 'Hospital', HospitalSchema );
