document.addEventListener('DOMContentLoaded', async function () {
    const produtoLista = document.querySelector('#produtoLista');
    
    if (!produtoLista) {
        console.error('Elemento #produtoLista não encontrado.');
        return;
    }

    // Obtém o token de autenticação do localStorage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        console.error('Token de autenticação não encontrado.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken // Usa o cabeçalho correto para autenticação
            }
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura dados de erro
            throw new Error(errorData.message || 'Erro ao buscar produtos.');
        }

        const produtos = await response.json();

        // Cria o HTML para a lista de produtos
        produtoLista.innerHTML = produtos.map(produto => `
            <div class="produto">
                <p>Código: ${produto.codigo}</p>
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                <p>Descrição: ${produto.descricao || 'Não disponível'}</p>
                <p>Quantidade: ${produto.quantidade}</p>
            </div>
        `).join('');

    } catch (error) {
        console.error('Erro:', error);
    }
});
