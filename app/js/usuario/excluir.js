document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#deleteUserForm');
    const botaoBuscar = document.querySelector('#search');
    const botaoExcluir = document.querySelector('#confirmDelete');
    const botaoCancelar = document.querySelector('#cancelDelete');
    const userInfoDiv = document.querySelector('#userInfo');
    const userNameEmail = document.querySelector('#userNameEmail');

    let userId = null;

    botaoBuscar.addEventListener('click', async () => {
        const email = document.querySelector('#email').value;
        const accessToken = localStorage.getItem('accessToken');
        
        try {
            const respostaEmail = await fetch(`http://localhost:3000/usuarios/email/${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'x-access-token': accessToken
                }
            });

            if (!respostaEmail.ok) throw new Error('Erro ao buscar o usuário pelo e-mail');
            const usuario = await respostaEmail.json();

            if (!usuario) throw new Error('Usuário não encontrado');

            userId = usuario._id;

            
            userNameEmail.textContent = `Nome: ${usuario.nome}, Email: ${usuario.email}`;
            userInfoDiv.style.display = 'block';
        } catch (erro) {
            console.error('Erro:', erro);
            document.querySelector('.mensagem-erro').textContent = erro.message;
            userInfoDiv.style.display = 'none';
        }
    });

    botaoExcluir.addEventListener('click', async () => {
        const accessToken = localStorage.getItem('accessToken');
        
        try {
            if (!userId) throw new Error('ID do usuário não encontrado');

            const respostaExcluir = await fetch(`http://localhost:3000/usuarios/id/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                }
            });

            if (respostaExcluir.ok) {
                alert('Usuário excluído com sucesso');
                window.location.href = 'listar.html';
            } else {
                throw new Error(`Erro ao excluir o usuário: ${await respostaExcluir.text()}`);
            }
        } catch (erro) {
            console.error('Erro:', erro);
            document.querySelector('.mensagem-erro').textContent = erro.message;
        }
    });

    botaoCancelar.addEventListener('click', () => {
        userInfoDiv.style.display = 'none';
    });
});
