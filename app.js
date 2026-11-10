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

let alunos = [];
let indiceEdicao = null;

// Arrow functions para manipulação dos dados e interface
const limparFormulario = () => {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('notaFinal').value = '';
};

const salvarAluno = () => {
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

    const novoAluno = new Aluno(nome, idade, curso, notaFinal);

    if (indiceEdicao === null) {
        alunos.push(novoAluno);
        console.log(`Cadastrado -> ${novoAluno.toString()}`);
        alert(`Aluno "${novoAluno.nome}" cadastrado com sucesso!`);
    } else {
        alunos[indiceEdicao] = novoAluno;
        console.log(`Editado (índice ${indiceEdicao}) -> ${novoAluno.toString()}`);
        alert(`Dados do aluno "${novoAluno.nome}" atualizados com sucesso!`);
        indiceEdicao = null;
        document.getElementById('btn-salvar').innerText = 'Cadastrar';
    }

    limparFormulario();
    renderizarTabela();
};

const editarAluno = (index) => {
    const aluno = alunos[index];

    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;

    indiceEdicao = index;
    document.getElementById('btn-salvar').innerText = 'Atualizar';
    console.log(`Modo de edição ativado para -> ${aluno.toString()}`);
};

const excluirAluno = (index) => {
    const alunoRemovido = alunos[index];
    alunos.splice(index, 1);

    console.log(`Excluído -> ${alunoRemovido.toString()}`);
    alert(`Aluno "${alunoRemovido.nome}" excluído com sucesso!`);

    if (indiceEdicao === index) {
        limparFormulario();
        indiceEdicao = null;
        document.getElementById('btn-salvar').innerText = 'Cadastrar';
    } else if (indiceEdicao !== null && index < indiceEdicao) {
        indiceEdicao--;
    }

    renderizarTabela();
};

const renderizarTabela = () => {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '';

    // Uso de arrow function na iteração dos dados
    alunos.forEach((aluno, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>${aluno.isAprovado() ? 'Aprovado' : 'Reprovado'}</td>
            <td>
                <button type="button" class="btn-editar">Editar</button>
                <button type="button" class="btn-excluir">Excluir</button>
            </td>
        `;

        // Escutadores de eventos nos botões da tabela usando funções anônimas
        const btnEditar = tr.querySelector('.btn-editar');
        const btnExcluir = tr.querySelector('.btn-excluir');

        btnEditar.addEventListener('click', function () {
            editarAluno(index);
        });

        btnExcluir.addEventListener('click', function () {
            excluirAluno(index);
        });

        tbody.appendChild(tr);
    });
};

// Escutadores de eventos do formulário com funções anônimas
document.getElementById('form-aluno').addEventListener('submit', function (event) {
    event.preventDefault();
});

document.getElementById('btn-salvar').addEventListener('click', function () {
    salvarAluno();
});
