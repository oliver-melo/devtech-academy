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
    atualizarTodosRelatorios();
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
    atualizarTodosRelatorios();
};

const renderizarTabela = () => {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '';

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

// --- Funções de Relatórios (Exercício 4) ---

// 1. Listar alunos aprovados (filter + map)
const obterRelatorioAprovados = () => {
    const aprovados = alunos
        .filter(aluno => aluno.isAprovado())
        .map(aluno => `${aluno.nome} (Nota: ${aluno.notaFinal})`);

    return aprovados.length > 0
        ? `<strong>Alunos Aprovados (Nota >= 7):</strong> ${aprovados.join(', ')}`
        : '<strong>Alunos Aprovados (Nota >= 7):</strong> Nenhum aluno aprovado.';
};

// 2. Calcular média das notas finais (reduce)
const obterRelatorioMediaNotas = () => {
    if (alunos.length === 0) return '<strong>Média das Notas Finais:</strong> 0.00';
    const somaNotas = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
    const media = (somaNotas / alunos.length).toFixed(2);
    return `<strong>Média das Notas Finais:</strong> ${media}`;
};

// 3. Calcular média das idades (reduce)
const obterRelatorioMediaIdades = () => {
    if (alunos.length === 0) return '<strong>Média das Idades:</strong> 0.0';
    const somaIdades = alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
    const media = (somaIdades / alunos.length).toFixed(1);
    return `<strong>Média das Idades:</strong> ${media} anos`;
};

// 4. Listar nomes dos alunos em ordem alfabética (map + sort)
const obterRelatorioOrdemAlfabetica = () => {
    if (alunos.length === 0) return '<strong>Alunos em Ordem Alfabética:</strong> Nenhum aluno cadastrado.';
    const nomesOrdenados = alunos
        .map(aluno => aluno.nome)
        .sort((a, b) => a.localeCompare(b));
    return `<strong>Alunos em Ordem Alfabética:</strong> ${nomesOrdenados.join(', ')}`;
};

// 5. Mostrar quantidade de alunos por curso (reduce + forEach)
const obterRelatorioQtdPorCurso = () => {
    const contagemInicial = { JavaScript: 0, Python: 0, Java: 0 };
    const contagemPorCurso = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, contagemInicial);

    const itens = [];
    Object.keys(contagemPorCurso).forEach(curso => {
        itens.push(`${curso}: ${contagemPorCurso[curso]}`);
    });

    return `<strong>Quantidade de Alunos por Curso:</strong> ${itens.join(' | ')}`;
};

// Exibição individual ou completa no DOM
const exibirRelatorio = (conteudoHtml) => {
    document.getElementById('resultado-relatorios').innerHTML = `<p>${conteudoHtml}</p>`;
};

const atualizarTodosRelatorios = () => {
    const container = document.getElementById('resultado-relatorios');
    if (alunos.length === 0) {
        container.innerHTML = '<p>Nenhum aluno cadastrado para gerar relatórios.</p>';
        return;
    }

    container.innerHTML = `
        <p>${obterRelatorioAprovados()}</p>
        <p>${obterRelatorioMediaNotas()}</p>
        <p>${obterRelatorioMediaIdades()}</p>
        <p>${obterRelatorioOrdemAlfabetica()}</p>
        <p>${obterRelatorioQtdPorCurso()}</p>
    `;
};

// Escutadores de eventos do formulário
document.getElementById('form-aluno').addEventListener('submit', function (event) {
    event.preventDefault();
});

document.getElementById('btn-salvar').addEventListener('click', function () {
    salvarAluno();
});

// Escutadores de eventos dos botões de relatórios
document.getElementById('btn-rel-aprovados').addEventListener('click', function () {
    exibirRelatorio(obterRelatorioAprovados());
});

document.getElementById('btn-rel-media-notas').addEventListener('click', function () {
    exibirRelatorio(obterRelatorioMediaNotas());
});

document.getElementById('btn-rel-media-idades').addEventListener('click', function () {
    exibirRelatorio(obterRelatorioMediaIdades());
});

document.getElementById('btn-rel-ordem-alfabetica').addEventListener('click', function () {
    exibirRelatorio(obterRelatorioOrdemAlfabetica());
});

document.getElementById('btn-rel-qtd-curso').addEventListener('click', function () {
    exibirRelatorio(obterRelatorioQtdPorCurso());
});

document.getElementById('btn-rel-todos').addEventListener('click', function () {
    atualizarTodosRelatorios();
});
