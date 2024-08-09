document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('email-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await fetch(`http://localhost:3000/usuarios/email/${email}`, {
                headers: {
                    'x-access-token': accessToken
                }
            });

            if (!response.ok) throw new Error('Email não encontrado');

            const user = await response.json();
            
            localStorage.setItem('userId', user._id);
            window.location.href = 'editando.html';
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            alert('Email não encontrado ou erro na solicitação.');
        }
    });
});
