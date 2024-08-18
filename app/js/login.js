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

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userEmail', data.usuario.email);
      localStorage.setItem('userName', data.usuario.nome);

      const role = data.usuario.role || 'user'; // Ajuste para usar 'user' como padrão

      if (role === 'admin') {
        window.location.href = '../pages/admHome.html';
      } else if (role === 'user') {
        window.location.href = '../pages/user-home.html';
      } else {
        console.error('Role do usuário não reconhecida:', role);
        alert('Role do usuário não reconhecida.');
      }
    } else {
      console.error('Erro ao fazer login:', response.statusText);
      alert('Email ou senha inválidos. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
  }
}

document.getElementById('loginForm').addEventListener('submit', handleSubmit);
