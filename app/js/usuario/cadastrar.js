document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form[data-formulario]');
    const botaoEnviar = document.querySelector('#enviar');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const dadosFormulario = new FormData(formulario);
        const dados = {
            nome: dadosFormulario.get('nome').trim(),
            email: dadosFormulario.get('email').trim(),
            senha: dadosFormulario.get('senha').trim(),
            cpf: dadosFormulario.get('cpf').trim(),
            dataNascimento: dadosFormulario.get('aniversario').trim()
        };

        try {
            const resposta = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('accessToken')  
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

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
