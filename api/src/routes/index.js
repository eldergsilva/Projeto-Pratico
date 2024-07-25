const bodyParser = require('body-parser') 

const usuario = require('./usuariosRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),    
    usuario
  )
}