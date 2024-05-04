# Plano de Testes de Software

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.


| **Caso de Teste** 	| **CT-01 – Login de usuário.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-002 -  Permitir que o usuário faça login  |
| Objetivo do Teste 	| Verificar se o usuário consegue realizar login. |
| Passos 	| - Acessar a aplicação <br> - Preencher os campos obrigatórios <br> - Aguardar o direcionamento para a página inicial. 
|Critério de Êxito | - O usuário conseguiu acessar os componentes da aplicação com sucesso. 


| **Caso de Teste** 	| **CT-02 – Gestão de produtos.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-001	- Permitir que o usuário gerencie produtos. |
| Objetivo do Teste 	| VVerificar se o usuário consegue gerenciar produtos. |
| Passos 	| - Acessar a aplicação <br> - Inserir os dados de login. <br> - Aguardar o direcionamento para a página inicial. <br> Acessar a página de produtos. <br> - Acessar o produto desejado. <br> - Efetuar alterações(nome, quantidade). <br> - Salvar alterações.|
|Critério de Êxito | - Usuário obteve sucesso ao gerenciar produtos. |


| **Caso de Teste** 	| **CT-03 – Gestão de fornecedores.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-007	Permitir que o usúario gerencie fornecedores. |
| Objetivo do Teste 	| Verificar se o usuário consegue gerenciar fornecedores. |
| Passos 	| - Acessar a aplicação <br> - Inserir os dados de login. <br> - Aguardar o direcionamento para a página inicial. <br> Acessar a página de fornecedores. <br> - Efetuar cadastro e/ou exclusão de fornecedores. <br> - Efetuar alterações(nome, quantidade). <br> - Salvar alterações.|
|Critério de Êxito | - Usuário obteve sucesso ao gerenciar fornecedores. |


| **Caso de Teste** 	| **CT-04 – Estoque zerado.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-006	 Notificar o usuario sobre produtos que foram zerados. |
| Objetivo do Teste 	| Verificar se o usuário será notificado sobre produtos zerados. |
| Passos 	| - Acessar a aplicação <br> - Inserir os dados de login. <br> - Aguardar o direcionamento para a página inicial. <br> Acessar a página de produtos. <br> - Aguardar o Pop-up informando que existem produtos zerados em seu estoque. <br> - Fechar pop-up.|
|Critério de Êxito | -  Usuário recebeu a informação de que o produto se encontra sem estoque. |


| **Caso de Teste** 	| **CT-05 – Busca de fornecedores.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-008 Permitir que o usúario encontre fornecedores por produtos. |
| Objetivo do Teste 	| Verificar se o usuário consegue encontrar fornecedor através do produto. |
| Passos 	| - Acessar a aplicação <br> - Inserir os dados de login. <br> - Aguardar o direcionamento para a página inicial. <br> Acessar a página de produtos. <br> - Realizar a busca de algum produto de determinado fornecedor. <br> - Receber a lista de fornecedores que possuem aquele produto. <br> Escolher o fornecedor desejado.|
|Critério de Êxito | -  Usuário conseguiu encontrar o fornecedor desejado. |

