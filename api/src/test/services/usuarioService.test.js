const { describe } = require("@jest/globals");

const UsuarioService = require('../../services/usuarioService');
const usuarioService = new UsuarioService();

describe('Testando a usuarioService.cadastrar', () => {
    it('O usuario deve possuir nome, email, senha, cpf, dataNascimento', async () => {
        const usuarioMock = {
            nome: "Joao da Silva",
            email: "joao@email",
            senha: "123456",
            cpf: "12345678900"
            
        };

        
        await expect(usuarioService.cadastrar(usuarioMock)).rejects.toThrow('Dados obrigatórios não fornecidos.');
    });
});
