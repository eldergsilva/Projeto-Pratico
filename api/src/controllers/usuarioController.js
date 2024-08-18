const UsuarioService = require('../services/usuarioService');
const usuarioService = new UsuarioService();

class UsuarioController {

    static async cadastrar(req, res) {
        const { nome, email, senha, cpf, dataNascimento, role } = req.body;

        try {

            if (role && role !== 'user' && role !== 'admin') {
                return res.status(400).send({ message: 'Role inválido.' });
            }

            const usuario = await usuarioService.cadastrar({
                nome,
                email,
                senha,
                cpf,
                dataNascimento,
                role 
            });

            res.status(201).send(usuario);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarTodosUsuarios(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Permissão negada.' });
        }

        try {
            const usuarios = await usuarioService.buscarTodosUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarUsuarioPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuarioService.buscarUsuarioPorId(id);

            if (req.user.role !== 'admin' && req.user.id !== id) {
                return res.status(403).send({ message: 'Permissão negada.' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarUsuarioPorEmail(req, res) {
        try {
            const { email } = req.params;
            const usuario = await usuarioService.buscarUsuarioPorEmail(email);

            if (req.user.role !== 'admin' && req.user.email !== email) {
                return res.status(403).send({ message: 'Permissão negada.' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }

    static async editarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, cpf, senha, dataNascimento } = req.body;

        try {
            if (req.user.id !== id && req.user.role !== 'admin') {
                return res.status(403).send({ message: 'Você não tem permissão para editar este usuário.' });
            }

            const usuario = await usuarioService.editarUsuario({ id, nome, email, cpf, dataNascimento, senha });
            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deletarUsuario(req, res) {
        const { id } = req.params;

        try {
            if (req.user.id !== id && req.user.role !== 'admin') {
                return res.status(403).send({ message: 'Você não tem permissão para deletar este usuário.' });
            }

            await usuarioService.deletarUsuario(id);
            res.status(200).send({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = UsuarioController;
