document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form[data-formulario]');
    const mensagemErro = document.querySelector('.mensagem-erro'); // Seleciona o elemento para exibir a mensagem de erro

    if (formulario) {
        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            let nome = document.querySelector('#nome').value.trim(); // Remove espaços no início e no final
            const preco = parseFloat(document.querySelector('#preco').value);
            const descricao = document.querySelector('#descricao').value;
            const quantidade = parseInt(document.querySelector('#quantidade').value, 10);

            // Verifica se todos os campos obrigatórios estão preenchidos
            if (!nome || isNaN(preco) || isNaN(quantidade)) {
                mensagemErro.textContent = 'Todos os campos são obrigatórios e devem ser preenchidos corretamente.';
                mensagemErro.style.display = 'block'; // Exibe a mensagem de erro
                return;
            }

            // Obtém o token de autenticação do localStorage
            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await fetch('http://localhost:3000/produtos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': accessToken // Adiciona o token de autenticação
                    },
                    body: JSON.stringify({
                        nome,
                        preco,
                        descricao,
                        quantidade
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json(); // Captura dados de erro
                    throw new Error(errorData.message || 'Erro ao adicionar produto.');
                }

                alert('Produto adicionado com sucesso!');
                window.location.href = 'listarProdutos.html'; // Redireciona para a página de listagem de produtos

            } catch (error) {
                mensagemErro.textContent = error.message; // Define a mensagem de erro
                mensagemErro.style.display = 'block'; // Exibe a mensagem de erro
                console.error('Erro:', error);
            }
        });
    }
});
