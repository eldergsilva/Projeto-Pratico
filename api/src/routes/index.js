const bodyParser = require('body-parser');
const usuario = require('./usuariosRoute');
const auth = require('./authRoute');
const sacola = require('./sacolaRoute');  

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    usuario,
    sacola
  );
};
