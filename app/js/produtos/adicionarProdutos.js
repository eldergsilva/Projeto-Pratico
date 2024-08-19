document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form[data-formulario]');
    const mensagemErro = document.querySelector('.mensagem-erro');

    if (formulario) {
        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            let nome = document.querySelector('#nome').value.trim(); 
            const preco = parseFloat(document.querySelector('#preco').value);
            const descricao = document.querySelector('#descricao').value;
            const quantidade = parseInt(document.querySelector('#quantidade').value, 10);

            
            if (!nome || isNaN(preco) || isNaN(quantidade)) {
                mensagemErro.textContent = 'Todos os campos são obrigatórios e devem ser preenchidos corretamente.';
                mensagemErro.style.display = 'block'; 
                return;
            }

            
            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await fetch('http://localhost:3000/produtos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': accessToken 
                    },
                    body: JSON.stringify({
                        nome,
                        preco,
                        descricao,
                        quantidade
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json(); 
                    throw new Error(errorData.message || 'Erro ao adicionar produto.');
                }

                alert('Produto adicionado com sucesso!');
                window.location.href = 'listarProdutos.html'; 

            } catch (error) {
                mensagemErro.textContent = error.message; 
                mensagemErro.style.display = 'block'; 
                 
            }
        });
    }
});
