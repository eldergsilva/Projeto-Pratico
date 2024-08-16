const bodyParser = require('body-parser');
const usuario = require('./usuariosRoute');
const auth = require('./authRoute');
const produtos = require('./produtoRoute');  
const carrinho = require('./carrinhoRoute');
module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    usuario,
    produtos,
    carrinho  
  );
};
