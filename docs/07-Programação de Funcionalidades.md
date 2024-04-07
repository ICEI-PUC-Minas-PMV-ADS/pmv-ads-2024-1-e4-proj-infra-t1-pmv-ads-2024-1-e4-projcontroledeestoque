# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.


## RF-1

## RF-2

## RF-3

## RF-4

**Descrição:**

Registrar produtos de compra/adição realizada.


**Artefatos:**

criação de artefato:

- src\stock-flow\Configs\ComprasDatabaseSettings.cs
- src\stock-flow\Controllers\ComprasController.cs
- src\stock-flow\Dtos\CompraDto.cs
- src\stock-flow\Models\Compra.cs
- src\stock-flow\Services\ICompraService.cs
- src\stock-flow\Services\lmpl\ICompraService.cs

**Estrutura de dados utilizada:**

- Classe `compras`: Armazena informações de entradas de produtos.
- Banco MongoDB: Armazena os dados dos entradas cadastrados.


**Acesso e verificação:**

- GET, POST /api/v1/compras
- PUT, DELETE /api/v1/compras/{id}

## RF-5
**Descrição:**

Registrar produtos de venda/baixa realizada.

**Artefatos:**

Artefatos criados:

- src\stock-flow\Configs\VendasDatabaseSettings.cs
- src\stock-flow\Controllers\VendasController.cs
- src\stock-flow\Dtos\VendaDto.cs
- src\stock-flow\Models\Venda.cs
- src\stock-flow\Services\IVendaService.cs
- src\stock-flow\Services\lmpl\IVendaService.cs


**Estrutura de dados utilizada:**

- Classe `vendas`: Armazena informações de vendas.
- Banco MongoDB: Armazena os dados das vendas cadastradas.


**Acesso e verificação:**

- GET, POST /api/v1/vendas
- PUT, DELETE /api/v1/vendas/{id}

## RF-6

**Descrição:**

Notificar o usuario sobre produtos que foram zerados.

**Artefatos:**

Adição em artefato:
- src/stock-flow/Services/Impl/ProdutoService.cs


**Estrutura de dados utilizada:**

- Classe produto: agora consegue recuperar informações de produtos com quantidade zero
- Banco MongoDB: devolve informações sobre as quantidades de todos os produtos


**Acesso e verificação:**

- /api/v1/produtos/quantidade-zero



## RF-7

**Descrição:**

Permitir que o usúario gerencie fornecedores.


**Artefatos:**

Criação de artefatos:
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

Adição em artefato:
- src/stock-flow/Services/Impl/ProdutoService.cs

**Estrutura de dados utilizada:**

- Classe `produto`: agora consegue recuperar informações de fornecedores de um produto
- Banco MongoDB: devolve informações sobre os fornecedores de um produto


**Acesso e verificação:**

- /api/v1/produtos/{id_produto}/fornecedores

