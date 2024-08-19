document.addEventListener('DOMContentLoaded', () => {
    const codigoInput = document.getElementById('codigo');
    const formFields = document.querySelectorAll('.formulario__campo.editar');
    const form = document.getElementById('editarProdutoForm');

     
    codigoInput.addEventListener('input', async () => {
        const codigo = codigoInput.value.trim();

        if (codigo.length >= 3) {
            try {
                const response = await fetch(`/produtos/${codigo}`);
                if (response.ok) {
                    const produto = await response.json();

                     
                    document.getElementById('nome').value = produto.nome;
                    document.getElementById('preco').value = produto.preco;
                    document.getElementById('descricao').value = produto.descricao;
                    document.getElementById('quantidade').value = produto.quantidade;

                    
                    formFields.forEach(field => field.style.display = 'block');
                } else {
                    throw new Error('Produto não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
                alert(error.message);
                
                formFields.forEach(field => field.style.display = 'none');
            }
        } else {
            
            formFields.forEach(field => field.style.display = 'none');
        }
    });
});
