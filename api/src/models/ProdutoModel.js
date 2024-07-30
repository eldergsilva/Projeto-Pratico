const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String, required: false },  // Torna a descrição opcional
    quantidade: { type: Number, required: true },
    imagem: { type: String, required: false }      // Torna a imagem opcional
}, { timestamps: true });

const ProdutoModel = mongoose.model('Produto', produtoSchema);

module.exports = ProdutoModel;
