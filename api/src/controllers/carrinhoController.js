const CarrinhoService = require('../services/carrinhoService');
const carrinhoService = new CarrinhoService();

class CarrinhoController {
    static async criarCarrinho(req, res) {
        const { usuario_id } = req.body;
        try {
            const carrinho = await carrinhoService.criarCarrinho(usuario_id);
            res.status(201).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async adicionarItem(req, res) {
        const { carrinhoId, produtoId } = req.params;
        const { quantidade } = req.body;
        try {
            const carrinho = await carrinhoService.adicionarItem(carrinhoId, produtoId, quantidade);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async removerItem(req, res) {
        const { carrinhoId, produtoId } = req.params;
        try {
            const carrinho = await carrinhoService.removerItem(carrinhoId, produtoId);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarCarrinhoPorUsuario(req, res) {
        const { usuario_id } = req.params;
        try {
            const carrinho = await carrinhoService.buscarCarrinhoPorUsuario(usuario_id);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarCarrinhoPorId(req, res) {
        const { carrinhoId } = req.params;
        try {
            const carrinho = await carrinhoService.buscarCarrinhoPorId(carrinhoId);
            if (carrinho) {
                res.status(200).json(carrinho);
            } else {
                res.status(404).send({ message: 'Carrinho não encontrado' });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = CarrinhoController;
