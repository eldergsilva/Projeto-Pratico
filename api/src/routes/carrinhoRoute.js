const { Router } = require('express');
const CarrinhoController = require('../controllers/carrinhoController');
const autenticado = require('../middleware/autenticado');

const router = Router();

router.post('/carrinho', autenticado, CarrinhoController.criarCarrinho);
router.get('/carrinho/:usuario_id', autenticado, CarrinhoController.buscarCarrinhoPorUsuario);
router.put('/carrinho/:carrinhoId/produto/:produtoId', autenticado, CarrinhoController.adicionarItem);

router.delete('/carrinho/:carrinhoId/produto/:produtoId', autenticado, CarrinhoController.removerItem);
module.exports = router;
