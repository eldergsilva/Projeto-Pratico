document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('#searchUserForm');
    const editForm = document.querySelector('#editUserForm');
    const userDetails = document.querySelector('#userDetails');
    const errorSpan = document.querySelector('.mensagem-erro');

    let userId = ''; // Variável para armazenar o ID do usuário buscado
    const loggedInUserId = localStorage.getItem('loggedInUserId'); // ID do usuário logado

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.querySelector('#emailSearch').value;
        const accessToken = localStorage.getItem('accessToken');
        
        try {
            // Buscar o usuário pelo e-mail
            const response = await fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'x-access-token': accessToken
                }
            });

            if (!response.ok) throw new Error('Erro ao buscar o usuário pelo e-mail');
            const users = await response.json();

            if (users.length === 0) throw new Error('Usuário não encontrado');

            const user = users[0];
            userId = user._id; // Armazena o ID do usuário buscado

            // Preencher o formulário de edição com os dados do usuário
            document.querySelector('#nome').value = user.nome;
            document.querySelector('#emailEdit').value = user.email;
            document.querySelector('#cpf').value = user.cpf;
            document.querySelector('#dataNascimento').value = user.dataNascimento.split('T')[0];

            userDetails.style.display = 'block';
        } catch (error) {
            console.error('Erro:', error);
            errorSpan.textContent = error.message;
        }
    });

    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.querySelector('#nome').value;
        const email = document.querySelector('#emailEdit').value;
        const senha = document.querySelector('#senha').value;
        const cpf = document.querySelector('#cpf').value;
        const dataNascimento = document.querySelector('#dataNascimento').value;
        const accessToken = localStorage.getItem('accessToken');

        try {
            // Verifica se o ID do usuário logado corresponde ao ID do usuário buscado
            if (loggedInUserId !== userId) {
                throw new Error('Você não tem permissão para atualizar este usuário.');
            }

            // Atualizar o usuário com base no ID do usuário logado
            const response = await fetch(`http://localhost:3000/usuarios/id/${loggedInUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    cpf,
                    dataNascimento
                })
            });

            if (response.ok) {
                // Armazena os dados atualizados no localStorage
                localStorage.setItem('updatedUser', JSON.stringify({
                    nome,
                    email,
                    cpf,
                    dataNascimento
                }));
                // Redirecionar para editado.html
                window.location.href = 'editado.html';
            } else {
                throw new Error(`Erro ao atualizar o usuário: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            errorSpan.textContent = error.message;
        }
    });
});
