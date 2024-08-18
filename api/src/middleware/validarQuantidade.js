function validarQuantidade(req, res, next) {
    const { quantidade } = req.body;
    if (isNaN(quantidade) || quantidade <= 0) {
        return res.status(400).json({ message: 'Quantidade deve ser um número positivo.' });
    }
    next();
}

module.exports = validarQuantidade;