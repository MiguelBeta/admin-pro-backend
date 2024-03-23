
// GetTodo

const { response } = require("express");
//const { models, model } = require("mongoose");

// const Hospital = require('../models/hospital')



const getTodo = ( req, res = response ) => {

  const busqueda = req.params.busqueda;

  res.json({
    ok: true,
    msg: 'getTodo',
    busqueda
  })


}


module.exports = {
    getTodo
}
