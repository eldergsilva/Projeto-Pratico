const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');
const jsonSecret = require('../config/jsonSecret');

class AuthService {
    async login(dto) {
        // Encontra o usuário pelo email
        const usuario = await UsuarioModel.findOne({ email: dto.email });

        if (!usuario) {
            throw new Error('Usuário não cadastrado');
        }

        // Compara a senha fornecida com a senha armazenada
        const senhaIguais = await compare(dto.senha, usuario.senha);

        if (!senhaIguais) {
            throw new Error('Usuário ou senha inválidos');
        }

        
        const accessToken = sign(
            {
                id: usuario._id,
                email: usuario.email,
                nome: usuario.nome,
                role: usuario.role 
            },
            jsonSecret.secret,
            {
                expiresIn: 86400 
            }
        );

         
        return {
            accessToken,
            usuario: {
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role 
            }
        };
    }
}

module.exports = AuthService;
