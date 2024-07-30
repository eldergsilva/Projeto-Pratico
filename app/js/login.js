document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector('[data-formulario]');

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.elements["email"].value;
        const senha = e.target.elements["senha"].value;

        try {
            const resposta = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            if (!resposta.ok) {
                throw new Error(`Erro na resposta do servidor: ${resposta.status}`);
            }

            const dados = await resposta.json();
            localStorage.setItem("accessToken", dados.accessToken);
            window.location.href = "../index.html";
        } catch (erro) {
            console.error(erro);
            alert("Falha no login. Verifique suas credenciais e tente novamente.");
        }
    });
});
