# Programação de Funcionalidades

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="4-Metodologia.md"> Metodologia</a>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="5-Arquitetura da Solução.md"> Arquitetura da Solução</a>

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo

> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)



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

