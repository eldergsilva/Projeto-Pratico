const mongoose = require('mongoose');
const Contador = require('./contadorModel');

const produtoSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nome: { type: String, required: true, unique: true,trim: true },
    preco: { type: Number, required: true },
    descricao: { type: String },
    quantidade: { 
        type: Number, 
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} não é um número inteiro.'
        }
    },
    imagem: { type: String }
});

produtoSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const contador = await Contador.findOneAndUpdate(
                { nome: 'produto' },
                { $inc: { valor: 1 } },
                { new: true, upsert: true }
            );
            this.codigo = `PROD${String(contador.valor).padStart(3, '0')}`;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('Produto', produtoSchema);
