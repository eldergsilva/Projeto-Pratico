document.addEventListener('DOMContentLoaded', function() {
    // Função para formatar a data no formato dd/mm/yyyy
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Função para criar cartões de produto
    function createProductCards(products) {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Limpa o conteúdo existente

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h3>Nome: ${product.nome}</h3>
                <p>Preço: R$ ${product.preco.toFixed(2)}</p>
                <p>Descrição: ${product.descricao}</p>
                <p>Quantidade: ${product.quantidade}</p>
                <p>Data Adição: ${formatDate(product.dataAdicao)}</p>
            `;
            productList.appendChild(card);
        });
    }

    // Função para buscar dados dos produtos
    async function fetchProducts() {
        const accessToken = localStorage.getItem('accessToken'); // Obtém o token do localStorage

        try {
            const response = await fetch('http://localhost:3000/produtos', {
                method: 'GET',
                headers: {
                    'x-access-token': accessToken  // Usando 'x-access-token' para enviar o token
                }
            });

            if (!response.ok) throw new Error('Erro na requisição');
            const products = await response.json();
            createProductCards(products);
        } catch (error) {
            console.error('Erro ao buscar dados dos produtos:', error);
        }
    }

    // Chama a função para buscar e exibir os produtos
    fetchProducts();
});
