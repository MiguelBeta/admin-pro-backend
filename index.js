require('dotenv').config();

const express = require( 'express' );
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors()) ;

// Base de datos
dbConnection();

console.log( process.env );

// Uq5gxcdzJDp3PqmU
// mean_user

// Rutas
app.get( '/', ( req, res) => {

  res.json({
    ok: true,
    msg: 'Hola Mundo'
  });
});


// Define el puerto por donde esta navegando
app.listen( process.env.PORT, () => {
  console.log( 'Servidor coriendo en puerto ' + process.env.PORT );
} )
