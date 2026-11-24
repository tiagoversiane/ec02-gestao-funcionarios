// todos os funcionários cadastrados ficam aqui
let funcionarios = [];

// id do funcionário que está sendo editado (null = cadastro novo)
let idEmEdicao = null;

// guarda qual relatório está aberto pra ele atualizar sozinho
let relatorioAtual = null;

const formulario = document.getElementById('formulario-funcionario');
const campoNome = document.getElementById('nome');
const campoIdade = document.getElementById('idade');
const campoCargo = document.getElementById('cargo');
const campoSalario = document.getElementById('salario');
const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar = document.getElementById('botao-cancelar');
const corpoTabela = document.getElementById('corpo-tabela');
const tituloRelatorio = document.getElementById('titulo-relatorio');
const listaRelatorio = document.getElementById('lista-relatorio');

// funções que mexem no array

// Exercício 3: substituindo uma função anônima tradicional por arrow function.
//
// Antes, com função anônima tradicional:
//
//   const buscarPorId = function (id) {
//     return funcionarios.find(function (funcionario) {
//       return funcionario.id === id;
//     });
//   };
//
// Depois, com arrow function (sem "function", e com uma linha só o return fica implícito):
const buscarPorId = (id) => funcionarios.find((funcionario) => funcionario.id === id);

const removerPorId = (id) => {
  funcionarios = funcionarios.filter((funcionario) => funcionario.id !== id);
};

const atualizarPorId = (id, ...dados) => buscarPorId(id).atualizar(...dados);

// formulário

const lerFormulario = () => [
  campoNome.value.trim(),
  Number(campoIdade.value),
  campoCargo.value.trim(),
  Number(campoSalario.value),
];

const limparFormulario = () => {
  formulario.reset();
  idEmEdicao = null;
  botaoSalvar.textContent = 'Cadastrar';
  botaoCancelar.hidden = true;
};

const carregarNoFormulario = (funcionario) => {
  campoNome.value = funcionario.nome;
  campoIdade.value = funcionario.idade;
  campoCargo.value = funcionario.cargo;
  campoSalario.value = funcionario.salario;

  idEmEdicao = funcionario.id;
  botaoSalvar.textContent = 'Salvar alterações';
  botaoCancelar.hidden = false;
  campoNome.focus();
};

// tabela

const criarCelula = (texto) => {
  const celula = document.createElement('td');
  celula.textContent = texto;
  return celula;
};

// classes do Bootstrap: "btn btn-sm" + a cor (btn-outline-secondary, btn-outline-danger...)
const criarBotao = (rotulo, cor) => {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = `btn btn-sm ${cor}`;
  botao.textContent = rotulo;
  return botao;
};

const renderizarTabela = () => {
  corpoTabela.innerHTML = '';

  if (funcionarios.length === 0) {
    const celula = criarCelula('Nenhum funcionário cadastrado.');
    celula.colSpan = 6;
    celula.className = 'text-center text-muted';
    const linha = document.createElement('tr');
    linha.appendChild(celula);
    corpoTabela.appendChild(linha);
    return;
  }

  funcionarios.forEach((funcionario) => {
    const botaoEditar = criarBotao('Editar', 'btn-outline-secondary');
    botaoEditar.onclick = function () {
      carregarNoFormulario(funcionario);
    };

    const botaoExcluir = criarBotao('Excluir', 'btn-outline-danger');
    botaoExcluir.onclick = function () {
      removerPorId(funcionario.id);
      if (funcionario.id === idEmEdicao) {
        limparFormulario();
      }
      atualizarTela();
    };

    const acoes = document.createElement('td');
    acoes.appendChild(botaoEditar);
    acoes.appendChild(botaoExcluir);

    const linha = document.createElement('tr');
    linha.appendChild(criarCelula(funcionario.id));
    linha.appendChild(criarCelula(funcionario.nome));
    linha.appendChild(criarCelula(funcionario.idade));
    linha.appendChild(criarCelula(funcionario.cargo));
    linha.appendChild(criarCelula(formatarMoeda(funcionario.salario)));
    linha.appendChild(acoes);
    corpoTabela.appendChild(linha);
  });
};

// relatórios

const relatorioSalarioAlto = () => ({
  titulo: 'Funcionários com salário maior que R$ 5000',
  linhas: funcionarios
    .filter((funcionario) => funcionario.salario > 5000)
    .map((funcionario) => funcionario.toString()),
});

const relatorioMediaSalarial = () => {
  // sem funcionários a divisão daria NaN
  if (funcionarios.length === 0) {
    return { titulo: 'Média salarial', linhas: [] };
  }

  const soma = funcionarios.reduce((total, funcionario) => total + funcionario.salario, 0);
  return { titulo: 'Média salarial', linhas: [formatarMoeda(soma / funcionarios.length)] };
};

const relatorioCargosUnicos = () => ({
  titulo: 'Cargos únicos',
  linhas: [...new Set(funcionarios.map((funcionario) => funcionario.cargo))],
});

const relatorioNomesMaiusculos = () => ({
  titulo: 'Nomes em maiúsculo',
  linhas: funcionarios.map((funcionario) => funcionario.nome.toUpperCase()),
});

const renderizarRelatorio = () => {
  if (relatorioAtual === null) {
    return;
  }

  const relatorio = relatorioAtual();
  tituloRelatorio.textContent = relatorio.titulo;
  listaRelatorio.innerHTML = '';

  if (relatorio.linhas.length === 0) {
    listaRelatorio.innerHTML = '<li class="list-group-item text-muted">Nenhum dado para exibir.</li>';
    return;
  }

  relatorio.linhas.forEach((linha) => {
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.textContent = linha;
    listaRelatorio.appendChild(item);
  });
};

const atualizarTela = () => {
  renderizarTabela();
  renderizarRelatorio();
};

// botões do formulário

botaoSalvar.onclick = function (evento) {
  // se tiver campo errado deixa o navegador avisar
  if (!formulario.checkValidity()) {
    return;
  }
  evento.preventDefault();

  const dados = lerFormulario();
  if (idEmEdicao === null) {
    funcionarios.push(new Funcionario(...dados));
  } else {
    atualizarPorId(idEmEdicao, ...dados);
  }

  limparFormulario();
  atualizarTela();
};

botaoCancelar.onclick = function () {
  limparFormulario();
};

// botões dos relatórios

const abrirRelatorio = (relatorio) => {
  relatorioAtual = relatorio;
  renderizarRelatorio();
};

document.getElementById('botao-salario-alto').onclick = function () {
  abrirRelatorio(relatorioSalarioAlto);
};

document.getElementById('botao-media-salarial').onclick = function () {
  abrirRelatorio(relatorioMediaSalarial);
};

document.getElementById('botao-cargos-unicos').onclick = function () {
  abrirRelatorio(relatorioCargosUnicos);
};

document.getElementById('botao-nomes-maiusculos').onclick = function () {
  abrirRelatorio(relatorioNomesMaiusculos);
};

renderizarTabela();
