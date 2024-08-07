document.addEventListener('DOMContentLoaded', function() {
    const updatedUser = JSON.parse(localStorage.getItem('updatedUser'));
    
    if (!updatedUser) {
        alert('Nenhum dado atualizado encontrado.');
        window.location.href = 'editar.html';
        return;
    }
    
    // Exibir dados atualizados
    document.getElementById('nome').textContent = updatedUser.nome;
    document.getElementById('email').textContent = updatedUser.email;
    document.getElementById('telefone').textContent = updatedUser.telefone;
    
    // Limpar os dados do localStorage após exibir
    localStorage.removeItem('updatedUser');
});
