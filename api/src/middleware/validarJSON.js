function validarJSON(req, res, next) {
    try {
        JSON.parse(JSON.stringify(req.body));  
    } catch (error) {
        res.status(400).json({ message: 'Corpo da requisição deve ser um JSON válido.' });
    }
}

module.exports = validarJSON;