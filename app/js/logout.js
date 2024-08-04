
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
         
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
         
        window.location.href = '../pages/login.html';
      });
    }
  });
  