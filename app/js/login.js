document.querySelector('form[data-formulario]').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
  
    // Validação básica (adicione mais validações conforme necessário)
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '../pages/user-home.html';
      } else {
        const errorData = await response.json();
        alert('Login falhou: ' + errorData.message); // Exibe mensagem de erro detalhada
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro inesperado. Por favor, tente novamente.');
    }
  });
  