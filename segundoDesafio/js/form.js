class Contato {
    constructor(nome, email, telefone, tipoContato, mensagem) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.tipoContato = tipoContato;
        this.mensagem = mensagem;
    }
}

function Post(form) {
    let data = new Contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("email").value,
        form.elements.namedItem("telefone").value,
        form.elements.namedItem("tipoContato").value,
        form.elements.namedItem("mensagem").value);
    
    console.log("Aí ó Marcelo:", data);
    console.log("------------------------------------------------");
    console.log(`-> Nome do usuário: ${data.nome}`);
    console.log(`-> E-mail capturado: ${data.email}`);
    console.log(`-> Telefone capturado: ${data.telefone}`);
    console.log(`-> Categoria do Contato: ${data.tipoContato}`);
    console.log(`-> Mensagem digitada: ${data.mensagem}`);
    console.log("------------------------------------------------");

    return data;
}

function Enviar(event) {
    event.preventDefault();

    const form = event.target;
    
    const nomeInput = document.getElementById("nome");
    const nomeValue = nomeInput ? nomeInput.value.trim() : "";

    if (nomeValue !== "") {
        Post(form);

        alert('Obrigado sr(a) ' + nomeValue + ' os seus dados foram encaminhados com sucesso');
        
        form.reset();
    } else {
        alert("Por favor, preencha o campo Nome.");
    }
}