const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');
const jsonSecret = require('../config/jsonSecret');

class AuthService {
    async login(dto) {
        const usuario = await UsuarioModel.findOne({ email: dto.email });

        if (!usuario) {
            throw new Error('Usuário não cadastrado');
        }

        const senhaIguais = await compare(dto.senha, usuario.senha);

        if (!senhaIguais) {
            throw new Error('Usuário ou senha inválidos');
        }

        const accessToken = sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            jsonSecret.secret,
            {
                expiresIn: 86400 // 24 horas
            }
        );

        return { accessToken };
    }
}

module.exports = AuthService;
