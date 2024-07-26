const AuthService = require('../services/authService');
const authService = new AuthService();

class AuthController {
    static async login(req, res) {
        const { email, senha } = req.body;

        try {
            const token = await authService.login({ email, senha });
            res.status(200).json(token);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = AuthController;
