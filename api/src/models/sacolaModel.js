const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSacolaSchema = new Schema({
    produtoId: { type: Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true }
});

const sacolaSchema = new Schema({
    usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    itens: [itemSacolaSchema]
}, { timestamps: true });

const SacolaModel = mongoose.model('Sacola', sacolaSchema);

module.exports = SacolaModel;
