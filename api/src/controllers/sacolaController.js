const SacolaService = require('../services/sacolaService');
const sacolaService = new SacolaService();

class SacolaController {
    static async adicionarProduto(req, res) {
        const usuarioId = req.userId;  // Obtido do middleware autenticado
        const { produtoId, quantidade } = req.body;

        try {
            const sacola = await sacolaService.adicionarProduto(usuarioId, produtoId, quantidade);
            res.status(200).json(sacola);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async removerProduto(req, res) {
        const usuarioId = req.userId;  // Obtido do middleware autenticado
        const { produtoId } = req.params;

        try {
            const sacola = await sacolaService.removerProduto(usuarioId, produtoId);
            res.status(200).json(sacola);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async listarSacola(req, res) {
        const usuarioId = req.userId;  // Obtido do middleware autenticado

        try {
            const sacola = await sacolaService.listarSacola(usuarioId);
            res.status(200).json(sacola);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = SacolaController;
