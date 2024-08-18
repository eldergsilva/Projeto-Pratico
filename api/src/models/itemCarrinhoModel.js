const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemCarrinhoSchema = new Schema({
    carrinho_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Carrinho', 
        required: true 
    },
    produto_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Produto', 
        required: true 
    },
    quantidade: { 
        type: Number, 
        required: true, 
        min: 1 
    }
}, { timestamps: true });


itemCarrinhoSchema.index({ carrinho_id: 1, produto_id: 1 }, { unique: true });

const ItemCarrinhoModel = mongoose.model('ItemCarrinho', itemCarrinhoSchema);

module.exports = ItemCarrinhoModel;
