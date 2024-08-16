const CarrinhoModel = require('../models/carrinhoModel');
const ProdutoModel = require('../models/produtoModel');

class CarrinhoService {
    async criarCarrinho(usuario_id) {
        const novoCarrinho = new CarrinhoModel({ usuario_id });
        return await novoCarrinho.save();
    }

    async adicionarItem(carrinhoId, produtoId, quantidade) {
        const produto = await ProdutoModel.findById(produtoId);
        if (!produto) throw new Error('Produto não encontrado');
        
        const carrinho = await CarrinhoModel.findById(carrinhoId);
        if (!carrinho) throw new Error('Carrinho não encontrado');

        const itemExistente = carrinho.itens.find(item => item.produto_id.equals(produtoId));
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.itens.push({ produto_id: produtoId, quantidade: quantidade });
        }

        return await carrinho.save();
    }

    async removerItem(carrinhoId, produtoId) {
        const carrinho = await CarrinhoModel.findById(carrinhoId);
        if (!carrinho) throw new Error('Carrinho não encontrado');

        carrinho.itens = carrinho.itens.filter(item => !item.produto_id.equals(produtoId));
        return await carrinho.save();
    }

    async buscarCarrinhoPorUsuario(usuario_id) {
        return await CarrinhoModel.findOne({ usuario_id }).populate('itens.produto_id');
    }

    async buscarCarrinhoPorId(carrinhoId) {
        return await CarrinhoModel.findById(carrinhoId).populate('itens.produto_id');
    }
}

module.exports = CarrinhoService;
