document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#deleteUserForm'); // Seletor atualizado
    const botaoExcluir = document.querySelector('#delete'); // Seletor atualizado
    
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.querySelector('#email').value; // Obtém o e-mail do campo
        const accessToken = localStorage.getItem('accessToken');
        
        try {
            // Buscar o ID pelo e-mail
            const respostaEmail = await fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'x-access-token': accessToken
                }
            });

            if (!respostaEmail.ok) throw new Error('Erro ao buscar o usuário pelo e-mail');
            const usuarios = await respostaEmail.json();

            if (usuarios.length === 0) throw new Error('Usuário não encontrado');

            const id = usuarios[0]._id;

            // Excluir o usuário pelo ID
            const respostaExcluir = await fetch(`http://localhost:3000/usuarios/id/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                }
            });

            if (respostaExcluir.ok) {
                alert('Usuário excluído com sucesso');
                window.location.href = 'listar.html'; // Exemplo de redirecionamento
            } else {
                throw new Error(`Erro ao excluir o usuário: ${await respostaExcluir.text()}`);
            }
        } catch (erro) {
            console.error('Erro:', erro);
            document.querySelector('.mensagem-erro').textContent = erro.message;
        }
    });
});
