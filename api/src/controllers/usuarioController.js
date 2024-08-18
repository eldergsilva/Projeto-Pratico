const UsuarioService = require('../services/usuarioService');
const usuarioService = new UsuarioService();

class UsuarioController {

    static async cadastrar(req, res) {
        const { nome, email, senha, cpf, dataNascimento, role } = req.body;

        if (!nome || !email || !senha || !cpf || !dataNascimento) {
            return res.status(400).send({ message: 'Dados obrigatórios não fornecidos.' });
        }

        if (role && role !== 'user' && role !== 'admin') {
            return res.status(400).send({ message: 'Role inválido.' });
        }

        try {
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
            res.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }

    static async buscarUsuarioPorId(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'ID do usuário não fornecido.' });
        }

        try {
            const usuario = await usuarioService.buscarUsuarioPorId(id);

            if (req.user.role !== 'admin' && req.user.id !== id) {
                return res.status(403).send({ message: 'Permissão negada.' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }

    static async buscarUsuarioPorEmail(req, res) {
        const { email } = req.params;

        if (!email) {
            return res.status(400).send({ message: 'Email não fornecido.' });
        }

        try {
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

        if (!id) {
            return res.status(400).send({ message: 'ID do usuário não fornecido.' });
        }

        if (!nome && !email && !cpf && !senha && !dataNascimento) {
            return res.status(400).send({ message: 'Nenhum dado para atualizar fornecido.' });
        }

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

        if (!id) {
            return res.status(400).send({ message: 'ID do usuário não fornecido.' });
        }

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
