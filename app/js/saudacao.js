document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    const userFirstNameElement = document.getElementById('userFirstName');
  
    if (userName) {
       
      const nomes = userName.split(' ');
  
       
      const primeiroNome = nomes[0];
  
       
      userFirstNameElement.textContent = `${primeiroNome}!`;
    } else {
       
      userFirstNameElement.textContent = 'Olá!';
    }
  });