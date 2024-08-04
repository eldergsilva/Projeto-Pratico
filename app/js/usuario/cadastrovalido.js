const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get('nome');
const nomeElement = document.getElementById('nome');
nomeElement.textContent = nome;