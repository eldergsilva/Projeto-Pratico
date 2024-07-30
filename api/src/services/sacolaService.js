const SacolaModel = require('../models/sacolaModel');
const ProdutoModel = require('../models/produtoModel');

class SacolaService {
    async adicionarProduto(usuarioId, produtoId, quantidade) {
        const produto = await ProdutoModel.findById(produtoId);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        if (quantidade > produto.quantidade) {
            throw new Error('Quantidade solicitada excede a quantidade disponível');
        }

        let sacola = await SacolaModel.findOne({ usuarioId });
        if (sacola) {
            const item = sacola.itens.find(item => item.produtoId.equals(produtoId));
            if (item) {
                item.quantidade += quantidade;
            } else {
                sacola.itens.push({ produtoId, quantidade });
            }
            await sacola.save();
        } else {
            sacola = new SacolaModel({
                usuarioId,
                itens: [{ produtoId, quantidade }]
            });
            await sacola.save();
        }

        return sacola;
    }

    async removerProduto(usuarioId, produtoId) {
        const sacola = await SacolaModel.findOne({ usuarioId });
        if (!sacola) {
            throw new Error('Sacola não encontrada');
        }

        sacola.itens = sacola.itens.filter(item => !item.produtoId.equals(produtoId));
        await sacola.save();

        return sacola;
    }

    async listarSacola(usuarioId) {
        const sacola = await SacolaModel.findOne({ usuarioId }).populate('itens.produtoId');
        if (!sacola) {
            throw new Error('Sacola não encontrada');
        }

        return sacola;
    }
}

module.exports = SacolaService;
