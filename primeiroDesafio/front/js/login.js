document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const cpfInput = document.getElementById('cpf').value;
    const pwdInput = document.getElementById('pwd').value;
    const mensagemEl = document.getElementById('mensagem');

    mensagemEl.style.color = "#051F40";
    mensagemEl.innerText = "Verificando...";

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf: cpfInput,
                senha: pwdInput
            })
        });

        const data = await response.json();

        if (response.ok && data.sucesso) {
            mensagemEl.style.color = "green";
            mensagemEl.innerText = "Login realizado! Redirecionando...";

            localStorage.setItem('usuarioNome', data.nome);

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 800);

        } else {
            mensagemEl.style.color = "red";
            mensagemEl.innerText = data.mensagem;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        mensagemEl.style.color = "red";
        mensagemEl.innerText = "Erro ao conectar com o servidor!";
    }
});