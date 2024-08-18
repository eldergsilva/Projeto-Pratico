const CarrinhoService = require('../services/carrinhoService');
const carrinhoService = new CarrinhoService();

class CarrinhoController {
    static async criarCarrinho(req, res) {
        try {
            const usuario_id = req.user.id; // Obtém o ID do usuário autenticado
            const carrinho = await carrinhoService.criarCarrinho(usuario_id);
            res.status(201).json(carrinho);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async adicionarItem(req, res) {
        try {
            const { carrinhoId, produtoId } = req.params;
            const { quantidade } = req.body;
            const carrinho = await carrinhoService.adicionarItem(carrinhoId, produtoId, quantidade);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async removerItem(req, res) {
        try {
            const { carrinhoId, produtoId } = req.params;
            const carrinho = await carrinhoService.removerItem(carrinhoId, produtoId);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async buscarCarrinhoPorUsuario(req, res) {
        try {
            const usuario_id = req.user.id; // Obtém o ID do usuário autenticado
            const carrinho = await carrinhoService.buscarCarrinhoPorUsuario(usuario_id);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async buscarCarrinhoPorId(req, res) {
        try {
            const { carrinhoId } = req.params;
            const carrinho = await carrinhoService.buscarCarrinhoPorId(carrinhoId);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = CarrinhoController;
