const { Router } = require('express');
const ProdutoController = require('../controllers/produtoController');
const autenticado = require('../middleware/autenticado');

const router = Router();
router
    .get('/produtos', ProdutoController.buscarTodosProdutos)        
    .get('/produtos/codigo/:codigo', ProdutoController.buscarProdutoPorCodigo)
    .get('/produtos/nome/:nome', ProdutoController.buscarProdutoPorNome) 
router.use(autenticado)

router
    .post('/produtos', ProdutoController.cadastrar)    
    .put('/produtos/codigo/:codigo', ProdutoController.editarProduto)
    .delete('/produtos/codigo/:codigo', ProdutoController.deletarProdutoPorCodigo);;

module.exports = router;
