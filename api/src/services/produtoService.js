const ProdutoModel = require('../models/produtoModel');
const ContadorModel = require('../models/contadorModel');

class ProdutoService {
    async gerarCodigoProduto() {
        try {
            const contador = await ContadorModel.findOneAndUpdate(
                { nome: 'produto' },
                { $inc: { valor: 1 } },
                { new: true, upsert: true }
            );

            return `PRD${contador.valor.toString().padStart(4, '0')}`;
        } catch (error) {
            console.error('Erro ao gerar código do produto:', error);
            throw new Error('Erro ao gerar código do produto: ' + error.message);
        }
    }

    async cadastrar(dto) {
        try {
            const { nome, preco, descricao, quantidade, imagem } = dto;

            
            if (!nome || !preco || quantidade === undefined) {
                throw new Error('Nome, preço e quantidade são obrigatórios.');
            }

            
            const produtoExistente = await ProdutoModel.findOne({ nome }).exec();
            if (produtoExistente) {
                throw new Error('Já existe um produto com esse nome.');
            }

            
            const codigoProduto = await this.gerarCodigoProduto();

            
            const novoProduto = new ProdutoModel({
                codigo: codigoProduto,
                nome,
                preco,
                descricao,
                quantidade,
                imagem
            });

            
            await novoProduto.save();
            return novoProduto;
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            throw new Error('Erro ao cadastrar produto: ' + error.message);
        }
    }

    async buscarTodosProdutos() {
        try {
            return await ProdutoModel.find();
        } catch (error) {
            console.error('Erro ao buscar todos os produtos:', error);
            throw new Error('Erro ao buscar todos os produtos: ' + error.message);
        }
    }

    async buscarProdutoPorNome(nome) {
        try {
            return await ProdutoModel.findOne({ nome: new RegExp(`^${nome}$`, 'i') }).exec();
        } catch (error) {
            console.error('Erro ao buscar produto por nome:', error);
            throw new Error('Erro ao buscar produto por nome: ' + error.message);
        }
    }

    async buscarProdutoPorId(id) {
        try {
            const produto = await ProdutoModel.findById(id);
            if (!produto) {
                throw new Error('Produto não encontrado');
            }
            return produto;
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
            throw new Error('Erro ao buscar produto por ID: ' + error.message);
        }
    }

    async editarProduto(codigo, dto) {
        try {
            const produto = await ProdutoModel.findOne({ codigo });
            if (!produto) {
                throw new Error('Produto não encontrado');
            }

            
            if (dto.nome) produto.nome = dto.nome;
            if (dto.preco) produto.preco = dto.preco;
            if (dto.descricao) produto.descricao = dto.descricao;
            if (dto.quantidade) produto.quantidade = dto.quantidade;
            if (dto.imagem) produto.imagem = dto.imagem;

            
            if (dto.nome) {
                const produtoExistente = await ProdutoModel.findOne({ nome: dto.nome }).exec();
                if (produtoExistente && produtoExistente.codigo !== codigo) {
                    throw new Error('Já existe um produto com o mesmo nome.');
                }
            }

            
            await produto.save();
            return produto;
        } catch (error) {
            console.error('Erro ao editar produto:', error);
            throw new Error('Erro ao editar produto: ' + error.message);
        }
    }

    async deletarProdutoPorCodigo(codigo) {
        try {
            const resultado = await ProdutoModel.deleteOne({ codigo });
            if (resultado.deletedCount === 0) {
                throw new Error('Produto não encontrado');
            }
            return resultado;
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw new Error('Erro ao deletar produto: ' + error.message);
        }
    }

    async buscarProdutoPorCodigo(codigo) {
        try {
            return await ProdutoModel.findOne({ codigo });
        } catch (error) {
            console.error('Erro ao buscar produto por código:', error);
            throw new Error('Erro ao buscar produto por código: ' + error.message);
        }
    }
}

module.exports = ProdutoService;
