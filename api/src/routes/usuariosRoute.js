const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController');
const autenticado = require('../middleware/autenticado');

const router = Router();
router.post('/usuarios', UsuarioController.cadastrar);
router.use(autenticado);

router.get('/usuarios', UsuarioController.buscarTodosUsuarios);
router.get('/usuarios/id/:id', UsuarioController.buscarUsuarioPorId);
router.put('/usuarios/id/:id', UsuarioController.editarUsuario);
router.delete('/usuarios/id/:id', UsuarioController.deletarUsuario);

module.exports = router;
