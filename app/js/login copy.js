document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            
            const emailField = loginForm.querySelector('input[name="email"]');
            const passwordField = loginForm.querySelector('input[name="senha"]');

            if (!emailField || !passwordField) {
                console.error('Campos de email ou senha não encontrados.');
                return;
            }

            const email = emailField.value;
            const password = passwordField.value;

            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Erro no login:', errorText);
                    alert('Email ou senha inválidos. Tente novamente.');
                    return;
                }

                const data = await response.json();

               
                const fullName = data.usuario.nome;
                const firstName = fullName.split(' ')[0]; 
               
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('email', data.usuario.email);

                // Redirecionar para a página user-home.html
                window.location.href = '../pages/user-home.html';
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Ocorreu um erro ao tentar fazer login.');
            }
        });
    } else {
        console.error('Formulário não encontrado.');
    }
});
