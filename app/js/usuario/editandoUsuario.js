document.addEventListener('DOMContentLoaded', async function() {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId) {
        alert('Usuário não encontrado. Por favor, faça a busca novamente.');
        window.location.href = 'editandoUsuario.html'; 
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

        
        function formatDateForInput(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

         
        document.getElementById('nome').value = user.nome;
        document.getElementById('email').value = user.email;
        document.getElementById('cpf').value = user.cpf;
        document.getElementById('aniversario').value = formatDateForInput(user.dataNascimento);

    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao carregar dados do usuário.');
    }

     
    document.getElementById('editandoUsuario').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const aniversario = document.getElementById('aniversario').value.trim();

        
        const updatedData = {};
        if (nome) updatedData.nome = nome;
        if (email) updatedData.email = email;
        if (senha) updatedData.senha = senha; 
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

            localStorage.setItem('userData', JSON.stringify(updatedData));

            
            window.location.href = 'usuarioAtualizado.html';
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            alert('Erro ao atualizar dados do usuário.');
        }
    });
});
