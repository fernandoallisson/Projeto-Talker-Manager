# :construction: Projeto Talker Manager :construction:
Este projeto consiste em uma aplicação backend para gerenciar informações sobre palestrantes. A aplicação é construída com o framework Express.js, utilizando Node.js. Ela fornece endpoints para realizar operações CRUD (Create, Read, Update, Delete) em uma lista de palestrantes, armazenada em um arquivo JSON.

## Tecnologias Utilizadas:
### Node.js: 
Ambiente de execução JavaScript do lado do servidor, utilizado para desenvolver a aplicação backend.

### Express.js: 
Framework web minimalista para Node.js, utilizado para criar APIs RESTful e manipular requisições HTTP.

## Funcionalidades:
### Endpoint de Login: 
Permite que os usuários façam login na aplicação fornecendo um email e senha. Após a autenticação bem-sucedida, um token de acesso é gerado e retornado para o cliente.

### Endpoint de Palestrantes: 
Fornece operações CRUD para gerenciar informações sobre palestrantes. Os endpoints incluem:

##### GET /talker: Retorna a lista de todos os palestrantes cadastrados.
##### GET /talker/:id: Retorna os detalhes de um palestrante específico com base no ID fornecido.
##### POST /talker: Cria um novo palestrante com base nos dados fornecidos no corpo da requisição.
##### PUT /talker/:id: Atualiza as informações de um palestrante existente com base no ID fornecido e nos dados fornecidos no corpo da requisição.
##### DELETE /talker/:id: Exclui um palestrante existente com base no ID fornecido.
### Middlewares:
A aplicação utiliza middlewares para realizar validações antes de processar as requisições dos clientes. Alguns dos middlewares incluem:

##### validateEmail: Valida se o email fornecido tem o formato correto.
##### validateToken: Valida o token de acesso enviado no cabeçalho da requisição para verificar se o usuário está autenticado.
##### validateTalkers: Realiza diversas validações nos dados fornecidos para criar ou atualizar um palestrante, como verificar se o nome tem pelo menos 3 caracteres, se a idade é um número inteiro maior que 18, etc.
### Arquivos de Middleware:
A aplicação também possui arquivos de middleware que contêm funções para realizar operações específicas, como gerar tokens de acesso, ler e escrever dados em um arquivo JSON, e validar emails.

### Funcionalidade de Teste:
Endpoint /talker: Um endpoint adicional que retorna um status HTTP 200 OK. Este endpoint não executa nenhuma operação de CRUD, mas é utilizado pelo avaliador para verificar se a aplicação está online.
### Observações Importantes:
O projeto utiliza um arquivo JSON chamado talker.json para armazenar os dados dos palestrantes. Esse arquivo é lido e atualizado conforme necessário pelas operações CRUD.

##### A porta de comunicação padrão da aplicação é a porta 3001, mas pode ser definida através da variável de ambiente PORT.


## Conclusão
Este projeto fornece uma base sólida para criar uma aplicação backend para gerenciar informações sobre palestrantes. Ele demonstra como criar endpoints RESTful, implementar autenticação básica, realizar validações de dados e interagir com um arquivo JSON para armazenar e recuperar informações.