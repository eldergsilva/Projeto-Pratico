document.addEventListener('DOMContentLoaded', () => {
    const buscarProdutoForm = document.querySelector('#buscarProdutoForm');
    const codigoInput = document.querySelector('#codigo');
    const mensagemErro = document.querySelector('#mensagemErro');

    if (!buscarProdutoForm || !codigoInput || !mensagemErro) {
        console.error('Elementos necessários não encontrados.');
        return;
    }

    const fetchProduct = async (codigo) => {
        try {
            const response = await fetch(`http://localhost:3000/produtos/codigo/${codigo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('accessToken')
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao buscar produto.');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    };

    buscarProdutoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const codigo = codigoInput.value.trim();

        mensagemErro.textContent = '';
        mensagemErro.style.display = 'none';  

        if (!codigo) {
            mensagemErro.textContent = 'Código do produto não pode ser vazio.';
            mensagemErro.style.display = 'block';  
            return;
        }

        const produto = await fetchProduct(codigo);

        if (produto) {
            const atualizarProdutoURL = `atualizarProduto.html?codigo=${produto.codigo}`;
            window.location.href = atualizarProdutoURL;
        } else {
            mensagemErro.textContent = 'Produto não encontrado com esse código.';
            mensagemErro.style.display = 'block';  
        }
    });
});
