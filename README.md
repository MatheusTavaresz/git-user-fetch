
## _Git Repo Fetch_

Git Repo Fetch é uma aplicação full-stack desenvolvida com Next.js, RabbitMQ e NestJS. Ela permite aos usuários buscar informações sobre perfis de usuários e repositórios do GitHub, além de gerenciar seus próprios repositórios salvos. A comunicação entre os serviços é facilitada pelo RabbitMQ, garantindo uma arquitetura microserviços eficiente e escalável.

### Passo a passo para execução do projeto:

``` gitclone https://github.com/MatheusTavaresz/git-user-fetch.git ```

##### Front End
- cd front end 
- npm install
- npm run build

##### Back End
###### consumer
- cd backend
- cd consumer
- npm install
- npm run start:dev

###### producer
- cd back end
- cd producer
- npm install
- npm run start:dev

# Endpoints
##### Pesquisar usuario
URL: ```/findUser```
- Método: POST
- Corpo da Requisição: { "username": "<nome_do_usuário>" }
>  Descrição: Este endpoint busca informações do perfil do usuário no GitHub pelo nome de usuário fornecido e processa essas informações antes de salvar no banco de dados.

##### Obter dados do perfil do usuário
URL: ```/get-userProfile```
- Método: GET
> Descrição: Retorna os dados do perfil do usuário armazenados no banco de dados.

##### Obter repositórios do usuário pelo nome de usuário do GitHub
URL: ```/:username/repositories```
- Método: GET
- Parâmetros: username=<nome_do_usuário>
> Descrição: Retorna a lista de repositórios do usuário especificado pelo nome de usuário do GitHub.

##### Excluir o repositório específico
URL: ```/repositories/:id```
- Método: DELETE
- Parâmetros: Id do repositório
> Descrição: Deleta o repositório especificado pela requisição ou pelo evento de clique no front end.

##### Tecnologias utilizadas
- Front-end: Next.js
- Back-end: NestJS
- Mensageria: RabbitMQ
- Banco de Dados: MariaDB

#### Considerações finais

###### Sobre obstáculos no projeto:
 Devido a falta de familiaridade com o RabbitMQ, encontrei diversas dificuldades que acabaram atrasando o progresso do projeto. No entanto, estou confiante de que com mais prática e estudo, conseguirei dominar essa tecnologia e evitar esses contratempos no futuro. Além disso, tive dificuldades para subir a aplicação no Docker, não por falta de conhecimento, mas por enfrentar constantes erros de conexão com o banco de dados MariaDB. Esse problema de conectividade me impediu de avançar em outras funcionalidades planejadas, como a implementação de filtros e notificações.
Apesar desses desafios, estou determinado a superar essas barreiras. A experiência adquirida durante este processo é valiosa e será essencial para meu desenvolvimento contínuo como profissional.

###### Link alternativo para o consumo de filas no RabbitMQ caso o container não consiga subir a aplicação via Docker:
```amqps://kodzweir:Ud9jC53AqsaniN5tv49gWocQLCk9n-E7@rat.rmq2.cloudamqp.com/kodzweir```
