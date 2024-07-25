const UsuarioService = require('../services/usuarioService')

const usuarioService = new UsuarioService()

class UsuarioController {
    static async cadastrar(req, res) {
        const { nome, email, senha, cpf, dataNascimento } = req.body

        try {
            const usuario = await usuarioService.cadastrar({ nome, email, senha, cpf, dataNascimento })
            res.status(201).send(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosUsuarios(req, res) {
        try {
            const usuarios = await usuarioService.buscarTodosUsuarios()
            res.status(200).json(usuarios)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarUsuarioPorId(req, res) {
        try {
            const { id } = req.params
            const usuario = await usuarioService.buscarUsuarioPorId(id)
            res.status(200).json(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarUsuario(req, res) {
        const { id } = req.params
        const { nome, email, cpf, dataNascimento } = req.body

        try {
            const usuario = await usuarioService.editarUsuario({ id, nome, email, cpf, dataNascimento })
            res.status(200).json(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarUsuario(req, res) {
        const { id } = req.params

        try {
            await usuarioService.deletarUsuario(id)
            res.status(200).send({ message: 'Usuário deletado com sucesso!' })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = UsuarioController
