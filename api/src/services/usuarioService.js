const { hash } = require('bcryptjs');
const uuid = require('uuid');
const { UsuarioModel } = require('../models');

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await UsuarioModel.findOne({ email: dto.email });

        if (usuario) {
            throw new Error('Usuario ja cadastrado');
        }

        try {
            const senhaHash = await hash(dto.senha, 8);

            const novoUsuario = new UsuarioModel({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
                cpf: dto.cpf,
                dataNascimento: dto.dataNascimento
            });

            await novoUsuario.save();
            return novoUsuario;
        } catch (error) {
            throw new Error('Erro ao cadastrar usuario');
        }
    }

    async buscarTodosUsuarios() {
        const usuarios = await UsuarioModel.find();
        return usuarios;
    }

    async buscarUsuarioPorId(id) {
        const usuario = await UsuarioModel.findById(id);

        if (!usuario) {
            throw new Error('Usuario informado não cadastrado!');
        }

        return usuario;
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id);

        try {
            usuario.nome = dto.nome;
            usuario.email = dto.email;
            usuario.cpf = dto.cpf;
            usuario.dataNascimento = dto.dataNascimento;

            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error('Erro ao editar usuario!');
        }
    }

    async deletarUsuario(id) {
        await this.buscarUsuarioPorId(id);

        try {
            await UsuarioModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuario!');
        }
    }
}

module.exports = UsuarioService;
