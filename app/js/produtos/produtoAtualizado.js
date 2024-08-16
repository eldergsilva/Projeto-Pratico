document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get('codigo');
    const produtoCodigo = document.querySelector('#produtoCodigo');
    const produtoNome = document.querySelector('#produtoNome');
    const produtoPreco = document.querySelector('#produtoPreco');
    const produtoDescricao = document.querySelector('#produtoDescricao');
    const produtoQuantidade = document.querySelector('#produtoQuantidade');

    if (!codigo) {
        window.location.href = 'buscarProduto.html';
        return;
    }

    // Função para carregar os dados do produto
    const loadProductData = async (codigo) => {
        try {
            const response = await fetch(`http://localhost:3000/produtos/codigo/${codigo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('accessToken') // Usar o token de autenticação
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao carregar dados do produto.');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    };

    // Carregar os dados do produto ao carregar a página
    loadProductData(codigo).then(produto => {
        if (produto) {
            produtoCodigo.textContent = produto.codigo;
            produtoNome.textContent = produto.nome;
            produtoPreco.textContent = produto.preco.toFixed(2);
            produtoDescricao.textContent = produto.descricao;
            produtoQuantidade.textContent = produto.quantidade;
        } else {
            window.location.href = 'buscarProduto.html';
        }
    });
});
