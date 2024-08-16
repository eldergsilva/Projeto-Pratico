document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#search');
    const confirmDeleteButton = document.querySelector('#confirmDelete');
    const cancelDeleteButton = document.querySelector('#cancelDelete');
    const productInfo = document.querySelector('#productInfo');
    const productDetails = document.querySelector('#productDetails');
    const productCodeInput = document.querySelector('#productCode');
    const errorSpan = document.querySelector('.mensagem-erro');

    if (!searchButton || !confirmDeleteButton || !cancelDeleteButton || !errorSpan) {
        console.error('Elementos necessários não encontrados.');
        return;
    }

    // Função para buscar o produto pelo código
    const fetchProduct = async (code) => {
        try {
            const response = await fetch(`http://localhost:3000/produtos/codigo/${code}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('accessToken') // Usar o token de autenticação
                }
            });

            if (!response.ok) {
                const errorData = await response.json(); // Captura dados de erro
                throw new Error(errorData.message || 'Erro ao buscar produto.');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null; // Retorna null se ocorrer um erro
        }
    };

    // Função para excluir o produto
    const deleteProduct = async (code) => {
        try {
            const response = await fetch(`http://localhost:3000/produtos/codigo/${code}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('accessToken') // Usar o token de autenticação
                }
            });

            if (!response.ok) {
                const errorData = await response.json(); // Captura dados de erro
                throw new Error(errorData.message || 'Erro ao excluir produto.');
            }

            alert('Produto excluído com sucesso.');
            productInfo.style.display = 'none'; // Ocultar a seção de confirmação após exclusão
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir produto.');
        }
    };

    // Buscar o produto ao clicar no botão "Buscar"
    searchButton.addEventListener('click', async () => {
        const productCode = productCodeInput.value.trim();

        // Limpar mensagem de erro anterior
        errorSpan.textContent = '';
        productInfo.style.display = 'none';

        if (!productCode) {
            errorSpan.textContent = 'Código do produto não pode ser vazio.';
            errorSpan.style.color = 'red';
            return;
        }

        const product = await fetchProduct(productCode);

        if (product) {
            productDetails.innerHTML = `
                <p>Código: ${product.codigo}</p>
                <p>Nome: ${product.nome}</p>
                <p>Preço: R$ ${product.preco.toFixed(2)}</p>
                <p>Descrição: ${product.descricao || 'Não disponível'}</p>
                <p>Quantidade: ${product.quantidade}</p>
            `;
            productInfo.style.display = 'block'; // Exibir a seção de confirmação
        } else {
            errorSpan.textContent = 'Produto não encontrado.';
            errorSpan.style.color = 'red';
        }
    });

    // Excluir o produto ao clicar no botão "Excluir Produto"
    confirmDeleteButton.addEventListener('click', () => {
        const productCode = productCodeInput.value.trim();

        if (productCode) {
            deleteProduct(productCode);
        }
    });

    // Cancelar a exclusão e ocultar a seção de confirmação
    cancelDeleteButton.addEventListener('click', () => {
        productInfo.style.display = 'none';
    });
});
