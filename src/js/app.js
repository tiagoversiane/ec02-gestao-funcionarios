// todos os funcionários cadastrados ficam aqui
let funcionarios = [];

const formulario = document.getElementById('formulario-funcionario');
const campoNome = document.getElementById('nome');
const campoIdade = document.getElementById('idade');
const campoCargo = document.getElementById('cargo');
const campoSalario = document.getElementById('salario');
const botaoSalvar = document.getElementById('botao-salvar');
const corpoTabela = document.getElementById('corpo-tabela');

function lerFormulario() {
  return [
    campoNome.value.trim(),
    Number(campoIdade.value),
    campoCargo.value.trim(),
    Number(campoSalario.value),
  ];
}

// tabela

function criarCelula(texto) {
  const celula = document.createElement('td');
  celula.textContent = texto;
  return celula;
}

function renderizarTabela() {
  corpoTabela.innerHTML = '';

  if (funcionarios.length === 0) {
    const celula = criarCelula('Nenhum funcionário cadastrado.');
    celula.colSpan = 5;
    const linha = document.createElement('tr');
    linha.appendChild(celula);
    corpoTabela.appendChild(linha);
    return;
  }

  funcionarios.forEach(function (funcionario) {
    const linha = document.createElement('tr');
    linha.appendChild(criarCelula(funcionario.id));
    linha.appendChild(criarCelula(funcionario.nome));
    linha.appendChild(criarCelula(funcionario.idade));
    linha.appendChild(criarCelula(funcionario.cargo));
    linha.appendChild(criarCelula(formatarMoeda(funcionario.salario)));
    corpoTabela.appendChild(linha);
  });
}

// botão do formulário

function salvarFuncionario(evento) {
  // se tiver campo errado deixa o navegador avisar
  if (!formulario.checkValidity()) {
    return;
  }
  evento.preventDefault();

  funcionarios.push(new Funcionario(...lerFormulario()));

  formulario.reset();
  renderizarTabela();
}

botaoSalvar.addEventListener('click', salvarFuncionario);

renderizarTabela();
