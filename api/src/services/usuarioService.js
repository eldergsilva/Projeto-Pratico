const { hash } = require('bcryptjs');
const { UsuarioModel, CarrinhoModel } = require('../models');

class UsuarioService {
    async cadastrar(dto) {
        const usuarioExistente = await UsuarioModel.findOne({ email: dto.email });
        if (usuarioExistente) {
            throw new Error('Usuário já cadastrado com este e-mail.');
        }

        const usuarioPorCpf = await UsuarioModel.findOne({ cpf: dto.cpf });
        if (usuarioPorCpf) {
            throw new Error('Usuário já cadastrado com este CPF.');
        }

        try {
            const senhaHash = await hash(dto.senha, 8);

            const novoUsuario = new UsuarioModel({
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
                cpf: dto.cpf,
                dataNascimento: dto.dataNascimento,
                role: dto.role || 'user' // Define o papel padrão como 'user'
            });

            await novoUsuario.save();

            // Se for um usuário, criar um carrinho
            if (novoUsuario.role === 'user') {
                await CarrinhoModel.create({ usuario_id: novoUsuario._id, itens: [] });
            }

            return novoUsuario;
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário: ' + error.message);
        }
    }
    async buscarTodosUsuarios() {
        const usuarios = await UsuarioModel.find();
        return usuarios;
    }

    async buscarUsuarioPorId(id) {
        const usuario = await UsuarioModel.findById(id);

        if (!usuario) {
            throw new Error('Usuário informado não cadastrado!');
        }

        return usuario;
    }

    async buscarUsuarioPorEmail(email) {
        const usuario = await UsuarioModel.findOne({ email });

        if (!usuario) {
            throw new Error('Usuário não encontrado com este e-mail.');
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
            throw new Error('Erro ao editar usuário!');
        }
    }

    async deletarUsuario(id) {
        await this.buscarUsuarioPorId(id);

        try {
            await UsuarioModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuário!');
        }
    }
}

module.exports = UsuarioService;
