// todos os funcionários cadastrados ficam aqui
let funcionarios = [];

// id do funcionário que está sendo editado (null = cadastro novo)
let idEmEdicao = null;

const formulario = document.getElementById('formulario-funcionario');
const campoNome = document.getElementById('nome');
const campoIdade = document.getElementById('idade');
const campoCargo = document.getElementById('cargo');
const campoSalario = document.getElementById('salario');
const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar = document.getElementById('botao-cancelar');
const corpoTabela = document.getElementById('corpo-tabela');

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

const criarBotao = (rotulo) => {
  const botao = document.createElement('button');
  botao.textContent = rotulo;
  return botao;
};

const renderizarTabela = () => {
  corpoTabela.innerHTML = '';

  if (funcionarios.length === 0) {
    const celula = criarCelula('Nenhum funcionário cadastrado.');
    celula.colSpan = 6;
    const linha = document.createElement('tr');
    linha.appendChild(celula);
    corpoTabela.appendChild(linha);
    return;
  }

  funcionarios.forEach((funcionario) => {
    const botaoEditar = criarBotao('Editar');
    botaoEditar.onclick = function () {
      carregarNoFormulario(funcionario);
    };

    const botaoExcluir = criarBotao('Excluir');
    botaoExcluir.onclick = function () {
      removerPorId(funcionario.id);
      if (funcionario.id === idEmEdicao) {
        limparFormulario();
      }
      renderizarTabela();
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
  renderizarTabela();
};

botaoCancelar.onclick = function () {
  limparFormulario();
};

renderizarTabela();
