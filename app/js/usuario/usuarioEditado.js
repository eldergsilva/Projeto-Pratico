document.addEventListener('DOMContentLoaded', async function() {
    const userId = localStorage.getItem('userId');  
    const accessToken = localStorage.getItem('accessToken');  localStorage

    if (!userId) {
        alert('Usuário não encontrado. Por favor, faça a busca novamente.');
        window.location.href = 'buscar.html';  
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuarios/id/${userId}`, {
            headers: {
                'x-access-token': accessToken
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar dados do usuário');

        const user = await response.json();

         
        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

       
        document.querySelector('.listar').innerHTML = `
            <h2 class="listar__titulo">Dados Atualizados com Sucesso!</h2>
            <div class="user-card">
                <h3>Nome: ${user.nome}</h3>
                <p>Email: ${user.email}</p>
                <p>CPF: ${user.cpf}</p>
                <p>Data Nasc: ${formatDate(user.dataNascimento)}</p>
            </div>
            <a href="../user-home.html" class="listar__link">Voltar para a página inicial</a>
        `;

    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao carregar dados do usuário.');
    }
});
