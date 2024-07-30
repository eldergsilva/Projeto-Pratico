const ProdutoService = require('../services/produtoService');
const produtoService = new ProdutoService();

class ProdutoController {
    static async cadastrar(req, res) {
        const { nome, preco, descricao, quantidade, imagem } = req.body;

        try {
            const produto = await produtoService.cadastrar({ nome, preco, descricao, quantidade, imagem });
            res.status(201).send(produto);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarTodosProdutos(req, res) {
        try {
            const produtos = await produtoService.buscarTodosProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarProdutoPorId(req, res) {
        try {
            const { id } = req.params;
            const produto = await produtoService.buscarProdutoPorId(id);
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async editarProduto(req, res) {
        const { id } = req.params;
        const { nome, preco, descricao, quantidade, imagem } = req.body;

        try {
            const produto = await produtoService.editarProduto(id, { nome, preco, descricao, quantidade, imagem });
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deletarProduto(req, res) {
        const { id } = req.params;

        try {
            await produtoService.deletarProduto(id);
            res.status(200).send({ message: 'Produto deletado com sucesso!' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = ProdutoController;
