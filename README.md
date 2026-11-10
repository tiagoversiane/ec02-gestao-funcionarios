# EC02 - Gestão de Funcionários

Sistema em JavaScript para cadastrar, listar, editar e excluir funcionários e gerar relatórios.

## Como rodar

```
docker compose up --build
```

Depois é só abrir http://localhost:8081

## Função anônima tradicional x arrow function

Antes:

```js
const buscarPorId = function (id) {
  return funcionarios.find(function (funcionario) {
    return funcionario.id === id;
  });
};
```

Depois:

```js
const buscarPorId = (id) => funcionarios.find((funcionario) => funcionario.id === id);
```
