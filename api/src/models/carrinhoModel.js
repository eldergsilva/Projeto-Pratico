const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carrinhoSchema = new Schema({
    usuario_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true, 
        unique: true 
    },
    itens: [{
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
    }]
}, { timestamps: true });

carrinhoSchema.index({ usuario_id: 1 }, { unique: true });

const CarrinhoModel = mongoose.model('Carrinho', carrinhoSchema);

module.exports = CarrinhoModel;
