import { minhaFuncao } from './script.js'; // Ajuste o caminho conforme necessário
import { validarCPF } from './valida-cpf.js';
import { validaIdade } from './valida-idade.js';
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form[data-formulario]');
    const botaoEnviar = document.querySelector('#enviar');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const dadosFormulario = new FormData(formulario);
        const dados = {
            nome: dadosFormulario.get('nome'),
            email: dadosFormulario.get('email'),
            senha: dadosFormulario.get('senha'),
            cpf: dadosFormulario.get('cpf'),
            dataNascimento: dadosFormulario.get('aniversario')
        };

        console.log('Dados enviados:', dados);

        try {
            const resposta = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();
            console.log('Resposta do servidor:', resultado);

            if (resposta.ok) {
                window.location.href = `cadastrovalido.html?nome=${encodeURIComponent(dados.nome)}`;
            } else {
                console.error('Erro na resposta do servidor:', resposta.status, resultado.message);
                document.querySelector('.mensagem-erro').textContent = resultado.message;
            }
        } catch (erro) {
            console.error('Erro ao enviar os dados:', erro);
            document.querySelector('.mensagem-erro').textContent = 'Erro ao enviar os dados. Tente novamente.';
        }
    });
});
