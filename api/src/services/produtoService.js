const ProdutoModel = require('../models/produtoModel');

class ProdutoService {
    async cadastrar(dto) {
        try {
            const novoProduto = new ProdutoModel({
                nome: dto.nome,
                preco: dto.preco,
                descricao: dto.descricao,
                quantidade: dto.quantidade,
                imagem: dto.imagem
            });

            await novoProduto.save();
            return novoProduto;
        } catch (error) {
            throw new Error('Erro ao cadastrar produto');
        }
    }

    async buscarTodosProdutos() {
        return await ProdutoModel.find();
    }

    async buscarProdutoPorId(id) {
        const produto = await ProdutoModel.findById(id);

        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        return produto;
    }

    async editarProduto(id, dto) {
        const produto = await this.buscarProdutoPorId(id);

        try {
            produto.nome = dto.nome;
            produto.preco = dto.preco;
            produto.descricao = dto.descricao;
            produto.quantidade = dto.quantidade;
            produto.imagem = dto.imagem;

            await produto.save();
            return produto;
        } catch (error) {
            throw new Error('Erro ao editar produto');
        }
    }

    async deletarProduto(id) {
        const produto = await this.buscarProdutoPorId(id);

        try {
            await produto.deleteOne();
            return { message: 'Produto deletado com sucesso' };
        } catch (error) {
            throw new Error('Erro ao deletar produto');
        }
    }
}

module.exports = ProdutoService;
