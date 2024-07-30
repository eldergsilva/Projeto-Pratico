const { Router } = require('express');
const ProdutoController = require('../controllers/produtoController');
const autenticado = require('../middleware/autenticado');

const router = Router();
router.use(autenticado); // Garante que todas as rotas abaixo exijam autenticação

router
    .post('/produtos', ProdutoController.cadastrar)
    .get('/produtos', ProdutoController.buscarTodosProdutos)
    .get('/produtos/id/:id', ProdutoController.buscarProdutoPorId)
    .put('/produtos/id/:id', ProdutoController.editarProduto)
    .delete('/produtos/id/:id', ProdutoController.deletarProduto);

module.exports = router;
