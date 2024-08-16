document.addEventListener('DOMContentLoaded', () => {
    const codigoInput = document.getElementById('codigo');
    const formFields = document.querySelectorAll('.formulario__campo.editar');
    const form = document.getElementById('editarProdutoForm');

    // Adiciona um evento de input no campo de código
    codigoInput.addEventListener('input', async () => {
        const codigo = codigoInput.value.trim();

        if (codigo.length >= 3) {
            try {
                const response = await fetch(`/produtos/${codigo}`);
                if (response.ok) {
                    const produto = await response.json();

                    // Preenche os campos com os dados do produto
                    document.getElementById('nome').value = produto.nome;
                    document.getElementById('preco').value = produto.preco;
                    document.getElementById('descricao').value = produto.descricao;
                    document.getElementById('quantidade').value = produto.quantidade;

                    // Exibe os campos de edição
                    formFields.forEach(field => field.style.display = 'block');
                } else {
                    throw new Error('Produto não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
                alert(error.message);
                // Oculta os campos de edição em caso de erro
                formFields.forEach(field => field.style.display = 'none');
            }
        } else {
            // Oculta os campos se o código for menor que 3 caracteres
            formFields.forEach(field => field.style.display = 'none');
        }
    });
});
