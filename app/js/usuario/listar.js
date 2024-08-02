document.addEventListener('DOMContentLoaded', function() {
    const accessToken = localStorage.getItem('accessToken');
    const userList = document.getElementById('userList');

    fetch('http://localhost:3000/usuarios', {
        method: 'GET',
        headers: {
            'x-access-token': accessToken  // Usando 'x-access-token' para enviar o token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao listar usuários: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Limpar a lista antes de adicionar novos itens
        userList.innerHTML = '';

        data.forEach(user => {
            // Converter a data de nascimento para o formato desejado
            const dataNascimentoFormatada = new Date(user.dataNascimento).toLocaleDateString('pt-BR');

            // Criar o item da lista
            const listItem = document.createElement('li');
            listItem.textContent = `Nome: ${user.nome}, Email: ${user.email}, CPF: ${user.cpf}, Data de Nascimento: ${dataNascimentoFormatada}`;

            // Adicionar o item à lista
            userList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error(error);
        userList.innerHTML = 'Erro ao carregar usuários.';
    });
});
