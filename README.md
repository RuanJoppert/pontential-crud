# devApp
> Potencial para um crud

Api REST bem simples mas seguindo as boas praticas do SOLID, TDD e Clean Architeture (*sem overkill*)

## Instalação

Clone o repositório
```sh
git clone https://github.com/RuanJoppert/pontential-crud.git
``` 

## Execução
### Para rodar o projeto no docker:
```sh
docker-compose up --build
``` 
>O comando acima irá criar o banco de dados com a estrutura correta e popular com alguns registros utilizando o [faker](https://github.com/Marak/faker.js)

### Para em modo de desenvolvimento:
entre na pasta **developers**
```sh
cd ./developers
```

instale as dependências
```sh
npm install
```

inicie o desenvolvimento
```sh
npm run dev
```
>Também é possivel rodar as migrations utlilizando o comando **npm run knex migrate:latest** popular a base usando o comando **npm run knex seed:run**

para rodar o build
```sh
npm run build
```

## testes

Para rodar a suite de testes
```
cd ./developers && run npm test
``` 

## Rotas

A documentação das rotas podem ser [acessadas aqui](https://github.com/nelsonptobias/pontential-crud)
