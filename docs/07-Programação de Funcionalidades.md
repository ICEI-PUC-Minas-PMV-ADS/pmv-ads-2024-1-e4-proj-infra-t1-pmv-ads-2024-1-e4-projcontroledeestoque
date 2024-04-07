# Programação de Funcionalidades

## Visão Geral
A API do Stock Flow permite aos usuários gerenciar seu estoque de produtos, visualizar relatórios de entradas e saídas dos produtos e autenticação dos usuários.

## Documentação da API - Stock Flow
A documentação completa está disposta no swagger do projeto e pode ser encontrada: https://stock-flow.azurewebsites.net/swagger/index.html

## Configuração em Nuvem
- **Banco de Dados:** MongoDB rodando numa instância do AzureCosmos DB, chaves já configuradas no projeto.
- **Servidor:** rodando numa instância do Azure AppServices, endereço: https://stock-flow.azurewebsites.net/.

## Configuração Local
- **Banco de Dados:** MongoDB rodando localmente. Certifique-se de que o MongoDB está instalado e que você tem uma pasta `C:\data\db` para armazenar os dados.
- **Servidor:** API desenvolvida em .NET, pode rodar localmente com IIS Express na porta 8080.


## RF-1

**Descrição:**

Permitir que o usuário gerencie produtos

**Artefatos:**

- src\stock-flow\Controllers\ProdutoController.cs
- src\stock-flow\Dtos\Categoria.cs
- src\stock-flow\Dtos\Produto.cs
- src\stock-flow\Models\ApplicationCategory.cs
- src\stock-flow\Models\ApplicationProduct.cs

**Estrutura de dados utilizada:**

- Classe `produtos`: Armazena informações de gerenciamento de produtos.
- Banco MongoDB: Armazena os dados dos produtos.

**Acesso e verificação:**

- GET, POST /api/v1/produtos
- PUT, DELETE /api/v1/produtos/{id}

## RF-2

**Descrição:**

Permitir que o usuário faça login.

**Artefatos:**

- src\stock-flow\Controllers\AuthController.cs
- src\stock-flow\Controllers\Requests\LoginRequest.cs
- src\stock-flow\Controllers\Requests\RegisterRequest.cs
- src\stock-flow\Controllers\Requests\RoleRequest.cs
- src\stock-flow\Controllers\Responses\AuthResponse.cs
- src\stock-flow\Controllers\Responses\LoginResponse.cs
- src\stock-flow\Dtos\LoginDto.cs
- src\stock-flow\Models\ApplicationRole.cs
- src\stock-flow\Models\ApplicationUser.cs
- src\stock-flow\Services\AuthService.cs
- src\stock-flow\Services\lmpl\IAuthService.cs


**Estrutura de dados utilizada:**

- Classe `users`: Armazena informações de usuários.
- Classe `roles`: Armazena permissões de usuários.
- Banco MongoDB: Armazena os dados dos usuários e permissões.


**Acesso e verificação:**

- POST /api/v1/auth/roles
- POST /api/v1/auth/register
- POST /api/v1/auth/login

## RF-3
**Descrição:**

Emitir um relatório a cada movimentação

**Artefatos:**

- src\stock-flow\Controllers\RelatoriosController.cs
- src\stock-flow\Dtos\FiltroDto.cs
- src\stock-flow\Models\Movimentacoes.cs
- src\stock-flow\Services\IMovimentacoesaService.cs
- src\stock-flow\Services\lmpl\IMovimentacoesService.cs

**Estrutura de dados utilizada:**

- Classe `movimentacoes`: Armazena informações de entradas e saídas de produtos.
- Banco MongoDB: Armazena os dados das movimentações.

**Acesso e verificação:**

- GET /api/v1/relatorios/movimentacoes?dataInicio=&dataFim=&produto=&tipo=&usuario=&quatidade=&valor=

## RF-4 e RF-5

**Descrição:**

RF - 04: Registrar produtos de compra/adição realizada.

RF - 05: Registrar produtos de venda/baixa realizada.


**Artefatos:**

- src\stock-flow\Configs\MovimentacoesDatabaseSettings.cs
- src\stock-flow\Controllers\MovimentacoesController.cs
- src\stock-flow\Dtos\MovimentacoesDto.cs
- src\stock-flow\Models\Movimentacoes.cs
- src\stock-flow\Services\IMovimentacoesaService.cs
- src\stock-flow\Services\lmpl\IMovimentacoesService.cs

**Estrutura de dados utilizada:**

- Classe `movimentacoes`: Armazena informações de entradas e saídas de produtos.
- Banco MongoDB: Armazena os dados de entradas e saídas cadastrados.


**Acesso e verificação:**

- GET, POST /api/v1/movimentacoes
- PUT, DELETE /api/v1/movimentacoes/{id}

## RF-6

**Descrição:**

Notificar o usuário sobre produtos que foram zerados.

**Artefatos:**

- src/stock-flow/Services/Impl/ProdutoService.cs


**Estrutura de dados utilizada:**

- Classe `produto`: agora consegue recuperar informações de produtos com quantidade zero
- Banco MongoDB: devolve informações sobre as quantidades de todos os produtos


**Acesso e verificação:**

- /api/v1/produtos/quantidade-zero



## RF-7

**Descrição:**

Permitir que o usúario gerencie fornecedores.


**Artefatos:**

- src/stock-flow/Configs/FornecedoresDatabaseSettings.cs
- src/stock-flow/Controllers/FornecedoresController.cs
- src/stock-flow/Dtos/FornecedorDto.cs
- src/stock-flow/Models/Fornecedores.cs
- src/stock-flow/Services/Impl/FornecedorService.cs
- src/stock-flow/Services/IFornecedorService.cs

**Estrutura de dados utilizada:**

- Classe `fornecedores`: Armazena informações de fornecedores e está relacionada aos produtos
- Banco MongoDB: Armazena os dados dos fornecedores cadastrados.

**Acesso e verificação:**

- GET, POST /api/v1/fornecedores
- PUT, DELETE /api/v1/fornecedores/{id}

## RF-8

**Descrição:**

Permitir que o usúario encontre fornecedores por produtos.

**Artefatos:**

- src/stock-flow/Services/Impl/ProdutoService.cs

**Estrutura de dados utilizada:**

- Classe `produto`: agora consegue recuperar informações de fornecedores de um produto
- Banco MongoDB: devolve informações sobre os fornecedores de um produto


**Acesso e verificação:**

- GET /api/v1/produtos/{id_produto}/fornecedores

