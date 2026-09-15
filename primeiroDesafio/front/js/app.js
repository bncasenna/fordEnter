document.addEventListener('DOMContentLoaded', () => {
    const conta = {
        saldo: 1500.00,
        taxaSaque: 2.50,
        taxaRendimento: 0.005,
        limiteEmprestimo: 5000.00,
        tipo: 'corrente'
    };

    const el = {
        nome: document.getElementById('nomeUsuario'),
        avatar: document.getElementById('avatarInicial'),
        saldo: document.getElementById('valorSaldo'),
        selectConta: document.getElementById('tipoContaSelect'),
        labelTipo: document.getElementById('labelTipoConta'),
        descRegra: document.getElementById('descricaoRegra'),
        tituloExtra: document.getElementById('tituloRegraExtra'),
        conteudoExtra: document.getElementById('conteudoRegraExtra'),
        valInput: document.getElementById('valorOperacao'),
        btnDepositar: document.getElementById('btnDepositar'),
        btnSacar: document.getElementById('btnSacar'),
        btnRendimento: document.getElementById('btnRendimento'),
        btnEmprestimo: document.getElementById('btnEmprestimo'),
        profileTrigger: document.getElementById('profileTrigger'),
        dropdown: document.getElementById('profileDropdown'),
        modal: document.getElementById('modalPerfil'),
        editNome: document.getElementById('editNome')
    };

    const carregarPerfil = () => {
        const usuario = localStorage.getItem('usuarioNome') || 'Cliente';
        if (el.nome) el.nome.innerText = usuario;
        if (el.avatar) el.avatar.innerText = usuario.charAt(0).toUpperCase();
        if (el.editNome) el.editNome.value = usuario;
    };

    const atualizarUI = () => {
        if (el.saldo) el.saldo.innerText = conta.saldo.toFixed(2);
        if (el.btnRendimento) el.btnRendimento.classList.add('hidden');
        if (el.btnEmprestimo) el.btnEmprestimo.classList.add('hidden');

        if (conta.tipo === 'corrente') {
            if (el.labelTipo) el.labelTipo.innerText = 'Conta Corrente';
            if (el.descRegra) el.descRegra.innerText = `Taxa de saque: R$ ${conta.taxaSaque.toFixed(2)}`;
            if (el.tituloExtra) el.tituloExtra.innerText = 'Regra da Conta';
            if (el.conteudoExtra) el.conteudoExtra.innerHTML = `<p class="rule-highlight">Taxa Fixa</p><p class="rule-desc">Cada saque possui taxa administrativa de R$ 2,50.</p>`;
        } else if (conta.tipo === 'poupanca') {
            if (el.labelTipo) el.labelTipo.innerText = 'Conta Poupança';
            if (el.descRegra) el.descRegra.innerText = 'Saque isento de taxas. Rendimento de 0,5% m/m.';
            if (el.tituloExtra) el.tituloExtra.innerText = 'Regra da Conta';
            if (el.conteudoExtra) el.conteudoExtra.innerHTML = `<p class="rule-highlight">Rendimento</p><p class="rule-desc">Sem taxa por saque. Simule rendimento no botão abaixo.</p>`;
            if (el.btnRendimento) el.btnRendimento.classList.remove('hidden');
        } else if (conta.tipo === 'empresarial') {
            if (el.labelTipo) el.labelTipo.innerText = 'Conta Empresarial';
            if (el.descRegra) el.descRegra.innerText = `Limite disponível: R$ ${conta.limiteEmprestimo.toFixed(2)}`;
            if (el.tituloExtra) el.tituloExtra.innerText = 'Regra da Conta';
            if (el.conteudoExtra) el.conteudoExtra.innerHTML = `<p class="rule-highlight">Crédito Extra</p><p class="rule-desc">Limite de empréstimo disponível: R$ ${conta.limiteEmprestimo.toFixed(2)}</p>`;
            if (el.btnEmprestimo) el.btnEmprestimo.classList.remove('hidden');
        }
    };

    const lerValor = () => {
        const val = parseFloat(el.valInput.value);
        if (isNaN(val) || val <= 0) {
            alert('Digite um valor válido maior que zero.');
            return null;
        }
        el.valInput.value = '';
        return val;
    };

    if (el.selectConta) {
        el.selectConta.addEventListener('change', (e) => {
            conta.tipo = e.target.value;
            atualizarUI();
        });
    }

    if (el.btnDepositar) {
        el.btnDepositar.addEventListener('click', () => {
            const v = lerValor();
            if (v) {
                conta.saldo += v;
                atualizarUI();
            }
        });
    }

    if (el.btnSacar) {
        el.btnSacar.addEventListener('click', () => {
            const v = lerValor();
            if (!v) return;

            const taxa = (conta.tipo === 'corrente') ? conta.taxaSaque : 0;
            const total = v + taxa;

            if (total > conta.saldo) {
                alert('Saldo insuficiente!');
                return;
            }

            conta.saldo -= total;
            atualizarUI();
        });
    }

    if (el.btnRendimento) {
        el.btnRendimento.addEventListener('click', () => {
            conta.saldo += conta.saldo * conta.taxaRendimento;
            atualizarUI();
        });
    }

    if (el.btnEmprestimo) {
        el.btnEmprestimo.addEventListener('click', () => {
            const v = lerValor();
            if (!v) return;

            if (v > conta.limiteEmprestimo) {
                alert('Valor excede o limite disponível.');
                return;
            }

            conta.saldo += v;
            conta.limiteEmprestimo -= v;
            atualizarUI();
        });
    }

    if (el.profileTrigger) {
        el.profileTrigger.addEventListener('click', () => el.dropdown.classList.toggle('hidden'));
    }

    window.addEventListener('click', (e) => {
        if (!e.target.closest('.header-user-area') && el.dropdown) {
            el.dropdown.classList.add('hidden');
        }
    });

    const btnAbrirPerfil = document.getElementById('btnAbrirPerfil');
    if (btnAbrirPerfil) {
        btnAbrirPerfil.addEventListener('click', () => {
            el.modal.classList.remove('hidden');
            el.dropdown.classList.add('hidden');
        });
    }

    const fecharModal = () => el.modal.classList.add('hidden');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnCancelarModal = document.getElementById('btnCancelarModal');

    if (btnCloseModal) btnCloseModal.addEventListener('click', fecharModal);
    if (btnCancelarModal) btnCancelarModal.addEventListener('click', fecharModal);

    const btnSalvarPerfil = document.getElementById('btnSalvarPerfil');
    if (btnSalvarPerfil) {
        btnSalvarPerfil.addEventListener('click', async () => {
            const novoNome = el.editNome.value.trim();
            const cpfUsuario = "123.456.789-00";

            if (!novoNome) {
                alert("O nome não pode ser vazio!");
                return;
            }

            try {
                const resposta = await fetch('/api/cliente/perfil', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf: cpfUsuario, novoNome: novoNome })
                });

                const resultado = await resposta.json();

                if (resposta.ok && resultado.sucesso) {
                    el.nome.innerText = resultado.novoNome;
                    el.avatar.innerText = resultado.novoNome.charAt(0).toUpperCase();
                    localStorage.setItem('usuarioNome', resultado.novoNome);

                    alert(resultado.mensagem);
                    fecharModal();
                } else {
                    alert(resultado.mensagem || "Erro ao atualizar perfil.");
                }
            } catch (erro) {
                console.error("Erro na comunicação com a API C#:", erro);
            }
        });
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = './index.html';
        });
    }

    // Inicializar
    carregarPerfil();
    atualizarUI();
});