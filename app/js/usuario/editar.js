document.getElementById('email-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    
    try {
        // Solicitar dados do usuário pelo email
        const response = await fetch(`http://localhost:3000/usuarios/email/${email}`);
        if (!response.ok) throw new Error('Email não encontrado');
        
        const user = await response.json();
        
        // Armazenar o ID do usuário no localStorage
        localStorage.setItem('userId', user._id);
        
        // Redirecionar para a página de edição
        window.location.href = 'editando.html';
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        alert('Email não encontrado ou erro na solicitação.');
    }
});
