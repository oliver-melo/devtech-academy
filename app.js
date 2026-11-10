// Armazenamento em memória (array de objetos)
let alunos = [];
let indiceEdicao = null;

function salvarAluno() {
    const nomeInput = document.getElementById('nome');
    const idadeInput = document.getElementById('idade');
    const cursoInput = document.getElementById('curso');
    const notaFinalInput = document.getElementById('notaFinal');

    const nome = nomeInput.value.trim();
    const idade = Number(idadeInput.value);
    const curso = cursoInput.value;
    const notaFinal = Number(notaFinalInput.value);

    if (!nome || !idadeInput.value || !curso || !notaFinalInput.value) {
        alert('Preencha todos os campos!');
        return;
    }

    const alunoObj = {
        nome: nome,
        idade: idade,
        curso: curso,
        notaFinal: notaFinal
    };

    if (indiceEdicao === null) {
        // Cadastrar novo aluno
        alunos.push(alunoObj);
    } else {
        // Atualizar aluno existente
        alunos[indiceEdicao] = alunoObj;
        indiceEdicao = null;
        document.getElementById('btn-salvar').innerText = 'Cadastrar';
    }

    limparFormulario();
    renderizarTabela();
}

function renderizarTabela() {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '';

    for (let i = 0; i < alunos.length; i++) {
        const aluno = alunos[i];
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button type="button" onclick="editarAluno(${i})">Editar</button>
                <button type="button" onclick="excluirAluno(${i})">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    }
}

function editarAluno(index) {
    const aluno = alunos[index];

    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;

    indiceEdicao = index;
    document.getElementById('btn-salvar').innerText = 'Atualizar';
}

function excluirAluno(index) {
    alunos.splice(index, 1);

    // Se excluir o registro que estava sendo editado, reseta o formulário
    if (indiceEdicao === index) {
        limparFormulario();
        indiceEdicao = null;
        document.getElementById('btn-salvar').innerText = 'Cadastrar';
    } else if (indiceEdicao !== null && index < indiceEdicao) {
        indiceEdicao--;
    }

    renderizarTabela();
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('notaFinal').value = '';
}
