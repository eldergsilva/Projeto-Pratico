const CarrinhoService = require('../services/carrinhoService');
const carrinhoService = new CarrinhoService();

class CarrinhoController {
    // Cria um novo carrinho para o usuário
    static async criarCarrinho(req, res) {
        const { usuario_id } = req.body;
        try {
            const carrinho = await carrinhoService.criarCarrinho(usuario_id);
            res.status(201).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    // Adiciona um item ao carrinho
    static async adicionarItem(req, res) {
        const { carrinhoId, produtoId } = req.params; // Obtém os IDs da URL
        const { quantidade } = req.body; // Obtém a quantidade do corpo da requisição
        try {
            const carrinho = await carrinhoService.adicionarItem(carrinhoId, produtoId, quantidade);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    // Remove um item do carrinho
    static async removerItem(req, res) {
        const { carrinhoId, produtoId } = req.params; // Obtém os IDs da URL
        try {
            const carrinho = await carrinhoService.removerItem(carrinhoId, produtoId);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    // Busca o carrinho de um usuário
    static async buscarCarrinhoPorUsuario(req, res) {
        const { usuario_id } = req.params; // Obtém o ID do usuário da URL
        try {
            const carrinho = await carrinhoService.buscarCarrinhoPorUsuario(usuario_id);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    // Busca um carrinho pelo ID
    static async buscarCarrinhoPorId(req, res) {
        const { carrinhoId } = req.params; // Obtém o ID do carrinho da URL
        try {
            const carrinho = await carrinhoService.buscarCarrinhoPorId(carrinhoId);
            res.status(200).json(carrinho);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = CarrinhoController;
