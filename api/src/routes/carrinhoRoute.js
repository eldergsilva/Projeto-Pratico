const { Router } = require('express');
const CarrinhoController = require('../controllers/carrinhoController');
const autenticado = require('../middleware/autenticado');
const validarJSON = require('../middleware/validarJSON');
const validarQuantidade = require('../middleware/validarQuantidade');

const router = Router();
router.post('/carrinho', autenticado,CarrinhoController.criarCarrinho);

router.get('/carrinho/:usuario_id', autenticado, CarrinhoController.buscarCarrinhoPorUsuario);

router.put('/carrinho/:carrinhoId/produto/:produtoId', autenticado,validarJSON, validarQuantidade, CarrinhoController.adicionarItem);

router.delete('/carrinho/:carrinhoId/produto/:produtoId', autenticado, CarrinhoController.removerItem);

router.get('/carrinho/id/:carrinhoId', autenticado, CarrinhoController.buscarCarrinhoPorId);

module.exports = router;
