document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchUserForm');
    
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            
            if (!email) {
                alert('Por favor, insira um e-mail.');
                return;
            }

            const accessToken = localStorage.getItem('accessToken'); 
            const url = `http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`;
            
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-access-token': accessToken 
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    window.location.href = `editardados.html?email=${encodeURIComponent(email)}`;
                } else if (response.status === 403) {
                    throw new Error('Não autorizado. Verifique se você está autenticado.');
                } else if (response.status === 404) {
                    throw new Error('Não foi possível encontrar o usuário. Verifique o e-mail e tente novamente.');
                } else {
                    throw new Error('Erro ao buscar o usuário.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert(error.message);
            }
        });
    }
});
