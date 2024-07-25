const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    dataNascimento: { type: Date, required: true }
}, { timestamps: true })

const UsuarioModel = mongoose.model('Usuario', usuarioSchema)

module.exports = UsuarioModel
