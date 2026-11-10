class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = Number(idade);
        this.curso = curso;
        this.notaFinal = Number(notaFinal);
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        const status = this.isAprovado() ? 'Aprovado' : 'Reprovado';
        return `Aluno: ${this.nome} | Idade: ${this.idade} | Curso: ${this.curso} | Nota: ${this.notaFinal} (${status})`;
    }
}

// Armazenamento em memória (array de instâncias de Aluno)
let alunos = [];
let indiceEdicao = null;

function salvarAluno() {
    const nomeInput = document.getElementById('nome');
    const idadeInput = document.getElementById('idade');
    const cursoInput = document.getElementById('curso');
    const notaFinalInput = document.getElementById('notaFinal');

    const nome = nomeInput.value.trim();
    const idade = idadeInput.value;
    const curso = cursoInput.value;
    const notaFinal = notaFinalInput.value;

    if (!nome || !idade || !curso || !notaFinal) {
        alert('Preencha todos os campos!');
        return;
    }

    // Instanciando a classe Aluno
    const novoAluno = new Aluno(nome, idade, curso, notaFinal);
    console.log(novoAluno.toString());

    if (indiceEdicao === null) {
        alunos.push(novoAluno);
    } else {
        alunos[indiceEdicao] = novoAluno;
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
            <td>${aluno.isAprovado() ? 'Aprovado' : 'Reprovado'}</td>
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
