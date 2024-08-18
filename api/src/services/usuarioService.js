const { hash } = require('bcryptjs');
const { UsuarioModel, CarrinhoModel } = require('../models');

class UsuarioService {
    async cadastrar(dto) {
        if (!dto.nome || !dto.email || !dto.senha || !dto.cpf || !dto.dataNascimento) {
            throw new Error('Dados obrigatórios não fornecidos.');
        }

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
                role: dto.role || 'user'
            });

            await novoUsuario.save();

            if (novoUsuario.role === 'user') {
                await CarrinhoModel.create({ usuario_id: novoUsuario._id, itens: [] });
            }

            return novoUsuario;
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário: ' + error.message);
        }
    }

    async buscarTodosUsuarios() {
        try {
            const usuarios = await UsuarioModel.find();
            return usuarios;
        } catch (error) {
            throw new Error('Erro ao buscar usuários: ' + error.message);
        }
    }

    async buscarUsuarioPorId(id) {
        if (!id) {
            throw new Error('ID não fornecido.');
        }

        try {
            const usuario = await UsuarioModel.findById(id);
            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }
            return usuario;
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + error.message);
        }
    }

    async buscarUsuarioPorEmail(email) {
        if (!email) {
            throw new Error('Email não fornecido.');
        }

        try {
            const usuario = await UsuarioModel.findOne({ email });
            if (!usuario) {
                throw new Error('Usuário não encontrado com este e-mail.');
            }
            return usuario;
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + error.message);
        }
    }

    async editarUsuario(dto) {
        const { id } = dto;
        if (!id) {
            throw new Error('ID não fornecido.');
        }

        try {
            const usuario = await this.buscarUsuarioPorId(id);
            usuario.nome = dto.nome || usuario.nome;
            usuario.email = dto.email || usuario.email;
            usuario.cpf = dto.cpf || usuario.cpf;
            usuario.dataNascimento = dto.dataNascimento || usuario.dataNascimento;
            if (dto.senha) {
                usuario.senha = await hash(dto.senha, 8);
            }

            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error('Erro ao editar usuário: ' + error.message);
        }
    }

    async deletarUsuario(id) {
        if (!id) {
            throw new Error('ID não fornecido.');
        }

        try {
            await UsuarioModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Erro ao deletar usuário: ' + error.message);
        }
    }
}

module.exports = UsuarioService;
