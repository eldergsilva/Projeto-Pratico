const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    senha: { type: String, required: true },
    cpf: { type: String, unique: true, required: true, trim: true },
    dataNascimento: { type: Date, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user', required: true },
    carrinho: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carrinho' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);
module.exports = UsuarioModel;
