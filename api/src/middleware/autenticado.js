const { verify } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

const autenticado = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'Access token não informado' });
    }

    try {
        const decoded = verify(token, jsonSecret.secret);
        req.userId = decoded.id;   
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido' });
    }
};

module.exports = autenticado;
