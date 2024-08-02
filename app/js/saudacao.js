document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    const userFirstNameElement = document.getElementById('userFirstName');
  
    if (userName) {
      // Separar o nome completo em um array de palavras
      const nomes = userName.split(' ');
  
      // Extrair o primeiro nome
      const primeiroNome = nomes[0];
  
      // Exibir a saudação com o primeiro nome
      userFirstNameElement.textContent = `${primeiroNome}!`;
    } else {
      // Exibir mensagem alternativa (opcional)
      userFirstNameElement.textContent = 'Olá!';
    }
  });