document.addEventListener('DOMContentLoaded', async function() {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        alert('ID do usuário não encontrado.');
        window.location.href = 'editar.html';
        return;
    }
    
    try {
        // Solicitar dados do usuário
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
        if (!response.ok) throw new Error('Usuário não encontrado');
        
        const user = await response.json();
        
        // Preencher o formulário com os dados do usuário
        document.getElementById('nome').value = user.nome;
        document.getElementById('email').value = user.email;
        document.getElementById('telefone').value = user.telefone;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao carregar dados do usuário.');
    }
});

document.getElementById('edit-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const userId = localStorage.getItem('userId');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    
    const data = {
        nome,
        email,
        telefone,
        ...(senha && { senha }) // Adiciona a senha apenas se fornecida
    };
    
    try {
        // Enviar solicitação de atualização
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Erro ao atualizar usuário');
        
        const updatedUser = await response.json();
        
        // Redirecionar para uma página de sucesso com os dados atualizados
        localStorage.setItem('updatedUser', JSON.stringify(updatedUser));
        window.location.href = 'editado.html';
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        alert('Erro ao atualizar dados.');
    }
});
