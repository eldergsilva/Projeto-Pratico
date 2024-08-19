const { verify } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

function autenticado(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }

    verify(token, jsonSecret.secret, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar o token:', err);
            return res.status(403).send({ message: 'Token inválido' });
        }

        req.user = decoded;  
        next();  
    });
}

module.exports = autenticado;
