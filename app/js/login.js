async function handleSubmit(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
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
  
        // Armazenar as informações do usuário no localStorage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userEmail', data.usuario.email); // Armazenar o ID do usuário
        localStorage.setItem('userName', data.usuario.nome);
  
        // Redirecionar para a página user-home.html
        window.location.href = '../pages/user-home.html';
      } else {
        console.error('Erro ao fazer login:', response.statusText);
        // Exibir uma mensagem de erro para o usuário
        alert('Email ou senha inválidos. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
    }
  }
  
  // Adicionar o event listener ao formulário (se necessário)
  document.getElementById('loginForm').addEventListener('submit', handleSubmit);
  