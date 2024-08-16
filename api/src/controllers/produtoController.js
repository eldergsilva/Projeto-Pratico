const ProdutoModel = require('../models/produtoModel');
const ProdutoService = require('../services/produtoService');
const produtoService = new ProdutoService();

class ProdutoController {
    static async cadastrar(req, res) {
        const { nome, preco, descricao, quantidade, imagem } = req.body;

        try {
            // Verificar se já existe um produto com o mesmo nome
            const produtoExistente = await ProdutoModel.findOne({ nome }).exec();
            if (produtoExistente) {
                return res.status(400).send({ message: 'Já existe um produto com esse nome.' });
            }

            // Gerar código do produto
            const codigoProduto = await produtoService.gerarCodigoProduto();

            // Criar novo produto
            const novoProduto = new ProdutoModel({
                codigo: codigoProduto,
                nome,
                preco,
                descricao,
                quantidade,
                imagem
            });

            // Salvar produto
            await novoProduto.save();
            res.status(201).json(novoProduto);
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
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

    static async buscarProdutoPorCodigo(req, res) {
        try {
            const { codigo } = req.params;
            const produto = await produtoService.buscarProdutoPorCodigo(codigo);
            if (!produto) {
                return res.status(404).send({ message: 'Produto não encontrado.' });
            }
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deletarProdutoPorCodigo(req, res) {
        try {
            const { codigo } = req.params;
            const resultado = await produtoService.deletarProdutoPorCodigo(codigo);
            if (resultado.deletedCount === 0) {
                return res.status(404).send({ message: 'Produto não encontrado.' });
            }
            res.status(200).send({ message: 'Produto deletado com sucesso!' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
    
    static async buscarProdutoPorNome(req, res) {
        try {
            const { nome } = req.query;
            const produto = await produtoService.buscarProdutoPorNome(nome);
            if (!produto) {
                return res.status(404).send({ message: 'Produto não encontrado.' });
            }
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async editarProduto(req, res) {
        const { codigo } = req.params;
        const { nome, preco, descricao, quantidade, imagem } = req.body;

        try {
            // Verificar se já existe um produto com o mesmo nome
            if (nome) {
                const produtoExistente = await ProdutoModel.findOne({ nome }).exec();
                if (produtoExistente && produtoExistente.codigo !== codigo) {
                    return res.status(400).send({ message: 'Já existe um produto com esse nome.' });
                }
            }

            // Editar produto
            const produto = await produtoService.editarProduto(codigo, { nome, preco, descricao, quantidade, imagem });
            if (!produto) {
                return res.status(404).send({ message: 'Produto não encontrado.' });
            }
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = ProdutoController;
