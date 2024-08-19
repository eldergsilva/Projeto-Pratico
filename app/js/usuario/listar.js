document.addEventListener('DOMContentLoaded', function() {
     
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

     
    function createUserCards(users) {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; 

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h3>Nome: ${user.nome}</h3>
                <p>Email: ${user.email}</p>
                <p>CPF: ${user.cpf}</p>
                <p>Data Nasc: ${formatDate(user.dataNascimento)}</p>
            `;
            userList.appendChild(card);
        });
    }

     
    async function fetchUsers() {
        const accessToken = localStorage.getItem('accessToken');  

        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'GET',
                headers: {
                    'x-access-token': accessToken   
                }
            });

            if (!response.ok) throw new Error('Erro na requisição');
            const users = await response.json();
            createUserCards(users);
        } catch (error) {
            console.error('Erro ao buscar dados dos usuários:', error);
        }
    }

     
    fetchUsers();
});
