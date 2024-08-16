document.addEventListener('DOMContentLoaded', async () => {
    // Seleciona o h1 onde o código do produto será exibido
    const tituloCodigo = document.querySelector('.formulario__titulo-codigo');
    // Outras variáveis e funções
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get('codigo');
    const atualizarProdutoForm = document.querySelector('#atualizarProdutoForm');
    const produtoCodigo = document.querySelector('#codigo');
    const produtoNome = document.querySelector('#nome');
    const produtoPreco = document.querySelector('#preco');
    const produtoDescricao = document.querySelector('#descricao');
    const produtoQuantidade = document.querySelector('#quantidade');
    const mensagemErro = document.querySelector('.mensagem-erro');

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
    const produto = await loadProductData(codigo);

    if (produto) {
        // Atualiza o texto do h1 com o código do produto
        tituloCodigo.textContent = `Código do Produto: ${produto.codigo}`;
        
        // Preenche os campos do formulário
        produtoCodigo.value = produto.codigo;
        produtoNome.value = produto.nome;
        produtoPreco.value = produto.preco;
        produtoDescricao.value = produto.descricao;
        produtoQuantidade.value = produto.quantidade;
    } else {
        window.location.href = 'buscarProduto.html';
    }

    // Atualizar o produto ao enviar o formulário
    atualizarProdutoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = produtoNome.value.trim();
        const preco = parseFloat(produtoPreco.value);
        const descricao = produtoDescricao.value.trim();
        const quantidade = parseInt(produtoQuantidade.value, 10);

        if (!nome || isNaN(preco) || isNaN(quantidade)) {
            mensagemErro.textContent = 'Todos os campos devem ser preenchidos corretamente.';
            mensagemErro.style.color = 'red';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/produtos/codigo/${codigo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('accessToken') // Usar o token de autenticação
                },
                body: JSON.stringify({ nome, preco, descricao, quantidade })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar produto.');
            }

            const produtoAtualizado = await response.json();

            // Redirecionar para a página de produto atualizado com os dados
            const produtoAtualizadoURL = `produtoAtualizado.html?codigo=${produtoAtualizado.codigo}`;
            window.location.href = produtoAtualizadoURL;
        } catch (error) {
            console.error('Erro:', error);
            mensagemErro.textContent = error.message;
            mensagemErro.style.color = 'red';
        }
    });
});
