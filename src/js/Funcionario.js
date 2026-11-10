const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

class Funcionario {
  static #proximoId = 1;

  #id;
  #nome;
  #idade;
  #cargo;
  #salario;

  constructor(nome, idade, cargo, salario) {
    this.#id = Funcionario.#proximoId++;
    this.#nome = nome;
    this.#idade = idade;
    this.#cargo = cargo;
    this.#salario = salario;
  }

  // o id é gerado aqui na classe, por isso só tem get
  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nome) {
    this.#nome = nome;
  }

  get idade() {
    return this.#idade;
  }

  set idade(idade) {
    this.#idade = idade;
  }

  get cargo() {
    return this.#cargo;
  }

  set cargo(cargo) {
    this.#cargo = cargo;
  }

  get salario() {
    return this.#salario;
  }

  set salario(salario) {
    this.#salario = salario;
  }

  atualizar(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  toString() {
    return `Nome: ${this.nome} | Idade: ${this.idade} | Cargo: ${this.cargo} | Salário: ${formatarMoeda(this.salario)}`;
  }
}
