document.addEventListener('DOMContentLoaded', async function() {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId) {
        alert('Usuário não encontrado. Por favor, faça a busca novamente.');
        window.location.href = 'buscar.html'; // Redireciona de volta para a página de busca
        return;
    }

    try {
        // Busca os dados do usuário
        const response = await fetch(`http://localhost:3000/usuarios/id/${userId}`, {
            headers: {
                'x-access-token': accessToken
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar dados do usuário');

        const user = await response.json();

        // Função para formatar a data no formato yyyy-MM-dd
        function formatDateForInput(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        // Preenche os campos do formulário com os dados do usuário
        document.getElementById('nome').value = user.nome;
        document.getElementById('email').value = user.email;
        document.getElementById('cpf').value = user.cpf;
        document.getElementById('aniversario').value = formatDateForInput(user.dataNascimento);

    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao carregar dados do usuário.');
    }

    // Adiciona o listener de evento para o formulário de edição
    document.getElementById('editandoUsuario').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const cpf = document.getElementById('cpf').value;
        const aniversario = document.getElementById('aniversario').value;

        // Cria um objeto com os dados que serão enviados
        const updatedData = {};
        if (nome) updatedData.nome = nome;
        if (email) updatedData.email = email;
        if (senha) updatedData.senha = senha; // Senha será atualizada somente se fornecida
        if (cpf) updatedData.cpf = cpf;
        if (aniversario) updatedData.dataNascimento = aniversario;

        try {
            const response = await fetch(`http://localhost:3000/usuarios/id/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) throw new Error('Erro ao atualizar dados do usuário');

            // Armazena os dados atualizados no localStorage
            localStorage.setItem('userData', JSON.stringify(updatedData));

            // Redireciona para a página editado.html
            window.location.href = 'editado.html';
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            alert('Erro ao atualizar dados do usuário.');
        }
    });
});
