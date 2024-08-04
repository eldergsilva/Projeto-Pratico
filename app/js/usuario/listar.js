document.addEventListener('DOMContentLoaded', function() {
    // Função para criar cartões de usuário
    function createUserCards(users) {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Limpa o conteúdo existente

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h3>Nome: ${user.nome}</h3>
                <p>Email: ${user.email}</p>
                <p>CPF: ${user.cpf}</p>
                <p>Data de Nascimento: ${user.dataNascimento}</p>
            `;
            userList.appendChild(card);
        });
    }

    // Função para buscar dados dos usuários
    async function fetchUsers() {
        const accessToken = localStorage.getItem('accessToken'); // Obtém o token do localStorage

        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'GET',
                headers: {
                    'x-access-token': accessToken  // Usando 'x-access-token' para enviar o token
                }
            });

            if (!response.ok) throw new Error('Erro na requisição');
            const users = await response.json();
            createUserCards(users);
        } catch (error) {
            console.error('Erro ao buscar dados dos usuários:', error);
        }
    }

    // Chama a função para buscar e exibir os usuários
    fetchUsers();
});
