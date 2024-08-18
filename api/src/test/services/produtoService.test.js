const { describe } = require("@jest/globals");

const ProdutoService = require('../../services/produtoService');
const produtoService = new ProdutoService();

describe('Testando ProdutoService.cadastrar', () => {
    it('Deve lançar um erro se o nome do produto estiver faltando', async () => {
        const produtoMock = {
            preco: 100,
            quantidade: 10
        };

        await expect(produtoService.cadastrar(produtoMock)).rejects.toThrow('Nome, preço e quantidade são obrigatórios.');
    });

    it('Deve lançar um erro se o preço do produto estiver faltando', async () => {
        const produtoMock = {
            nome: 'Produto Teste',
            quantidade: 10
        };

        await expect(produtoService.cadastrar(produtoMock)).rejects.toThrow('Nome, preço e quantidade são obrigatórios.');
    });

    it('Deve lançar um erro se a quantidade do produto estiver faltando', async () => {
        const produtoMock = {
            nome: 'Produto Teste',
            preco: 100
        };

        await expect(produtoService.cadastrar(produtoMock)).rejects.toThrow('Nome, preço e quantidade são obrigatórios.');
    });
});
