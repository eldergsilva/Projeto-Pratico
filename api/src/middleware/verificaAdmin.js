const { verify } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

const verificaAdmin = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    // Verifica e decodifica o token
    verify(token, jsonSecret.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }

        // Verifica se o usuário tem o papel de administrador
        if (decoded.role !== 'admin') {
            return res.status(403).json({ mensagem: 'Acesso negado' });
        }

        // Adiciona as informações do usuário ao objeto de requisição
        req.user = decoded;
        next();  
    });
};

module.exports = verificaAdmin;
