const { hash } = require('bcryptjs')
const UsuarioModel = require('../models/usuarioModel')

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await UsuarioModel.findOne({ email: dto.email })

        if (usuario) {
            throw new Error('Usuário já cadastrado')
        }

        try {
            const senhaHash = await hash(dto.senha, 8)

            const novoUsuario = new UsuarioModel({
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
                cpf: dto.cpf,
                dataNascimento: dto.dataNascimento
            })

            await novoUsuario.save()
            return novoUsuario
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário')
        }
    }

    async buscarTodosUsuarios() {
        const usuarios = await UsuarioModel.find()
        return usuarios
    }

    async buscarUsuarioPorId(id) {
        const usuario = await UsuarioModel.findById(id)

        if (!usuario) {
            throw new Error('Usuário informado não cadastrado!')
        }

        return usuario
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id)

        try {
            usuario.nome = dto.nome
            usuario.email = dto.email
            usuario.cpf = dto.cpf
            usuario.dataNascimento = dto.dataNascimento

            await usuario.save()
            return usuario
        } catch (error) {
            throw new Error('Erro ao editar usuário!')
        }
    }

    async deletarUsuario(id) {
        await this.buscarUsuarioPorId(id)

        try {
            await UsuarioModel.findByIdAndDelete(id)
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuário!')
        }
    }
}

module.exports = UsuarioService
