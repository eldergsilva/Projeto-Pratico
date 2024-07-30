const { Router } = require('express');
const SacolaController = require('../controllers/sacolaController');
const autenticado = require('../middleware/autenticado');

const router = Router();

router.use(autenticado); 

router.post('/sacola', SacolaController.adicionarProduto);
router.delete('/sacola/:produtoId', SacolaController.removerProduto);
router.get('/sacola', SacolaController.listarSacola);

module.exports = router;
