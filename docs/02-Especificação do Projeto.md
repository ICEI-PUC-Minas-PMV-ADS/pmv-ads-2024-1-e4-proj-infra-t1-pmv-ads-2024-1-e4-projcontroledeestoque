# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

A empresa de varejo enfrenta desafios críticos relacionados ao gerenciamento de estoque, incluindo excesso ou falta de produtos, ineficiências logísticas, dificuldades na previsão de demanda e na reposição de estoque, impactando negativamente a operação e a experiência do cliente.

O objetivo deste projeto é desenvolver um sistema de gerenciamento de estoque integrado, capaz de transformar a maneira como uma empresa de varejo opera, tornando-a mais eficiente, responsiva e adaptável às demandas do mercado. A solução proposta visa abordar diversos desafios enfrentados pela empresa, melhorando significativamente a gestão de estoque.

## Personas

### Sayori - Gerente de Operações </h2>
 
 ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dist-temp/assets/81201021/c55b19bd-9a72-4938-8875-a8f8e1b6b5de)

 
> ### História de usuário
> Sayori, Gerente de Operações em uma empresa de varejo, utiliza um sistema de gerenciamento de estoque para manter a disponibilidade de produtos e minimizar perdas. Ela inicia o dia analisando relatórios e dashboards que mostram os níveis de estoque, produtos mais vendidos e itens com baixo estoque, recebendo notificações automáticas para reabastecimentos necessários. Em reuniões estratégicas, ela emprega esses dados para otimizar o estoque, ajustando os pedidos conforme a demanda sazonal. Esse sistema permite a Sayori tomar decisões informadas, equilibrando oferta e demanda e contribuindo significativamente para o sucesso da empresa.

 
 - Acesso fácil e rápido às informações do estoque.
 - Relatórios detalhados para tomar decisões estratégicas.
 - Notificações automáticas para reabastecimento de produtos. 


### Carlos - Coordenador de Logística 

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dist-temp/assets/81201021/8ad06031-a0de-465e-8c65-a7712bd08304)

> ### História de usuário
> Carlos é responsável pela logística de uma empresa de distribuição. Ele precisa de um sistema que o ajude a otimizar a movimentação de produtos, garantindo entregas pontuais e eficientes.
Um Coordenador de Logística, busca um sistema de gerenciamento de estoque que o auxilie na otimização da movimentação de produtos para garantir entregas pontuais. Ele necessita de funcionalidades como rastreamento em tempo real, integração com sistemas de transporte e alertas automáticos para enfrentar desafios logísticos. Ao utilizar essas funcionalidades, Carlos consegue coordenar eficientemente as entregas, planejar rotas adequadas e tomar ações proativas diante de possíveis atrasos, contribuindo para a eficiência operacional e satisfação dos clientes. O sistema torna-se uma peça fundamental para o sucesso da cadeia de distribuição da empresa.
 
 - Rastreamento em tempo real do estoque e movimentação de produtos.
 - Integração com sistemas de transporte para coordenar entregas.
 - Alertas automáticos para possíveis atrasos ou problemas logísticos.


### Mateus - Analista de Compras 

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dist-temp/assets/81201021/fc0fc049-b2b4-4e59-8fab-62fdb5bbaa25)

> ### História de usuário
> Mateus, Analista de Compras, busca um sistema que o ajude a gerenciar eficientemente os estoques e a realizar pedidos de forma assertiva. Com funcionalidades como rastreamento em tempo real, integração com transporte e alertas automáticos, ele garante reposições oportunas e ações proativas diante de possíveis desafios logísticos. O sistema torna-se essencial para a eficiência do departamento de compras e contribui para um fluxo contínuo no processo de abastecimento.

 - Rastreamento em tempo real do estoque e movimentação de produtos.
 - Integração com sistemas de transporte para coordenar entregas.
 - Alertas automáticos para possíveis atrasos ou problemas logísticos.

### Rafaela - Operadora de Caixa

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dist-temp/assets/81201021/2134f704-d2c9-42aa-a0ef-de7a2c4977ab)

> ### História de usuário
> Rafaela, Operadora de Caixa, busca um sistema que forneça informações instantâneas sobre o estoque para atender clientes de forma eficiente. Com funcionalidades como disponibilidade em tempo real, alertas automáticos para produtos em baixa e facilidade de consulta, Rafaela garante um atendimento ágil, evita falta de produtos e responde prontamente às dúvidas dos clientes, contribuindo para uma experiência positiva no ponto de venda. O sistema torna-se essencial para melhorar a eficiência do atendimento ao cliente no varejo.
 - Disponibilidade em tempo real das informações de estoque.
 - Alertas para produtos fora de estoque ou com quantidade baixa.
 - Facilidade de consulta para responder a dúvidas dos clientes sobre a disponibilidade de produtos.



## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Atualmente, a empresa de varejo enfrenta diversos desafios no gerenciamento de seu estoque, principalmente devido à falta de automação e integração nos processos existentes. A maior parte do controle de estoque é realizada manualmente ou por meio de sistemas isolados, que não se comunicam eficientemente entre si ou com fornecedores e sistemas de logística. Isso resulta em:

 - Desafios de Precisão: Erros humanos na entrada de dados e no acompanhamento de estoque levam a discrepâncias significativas entre o estoque registrado e o físico.
 - Demora na Reação: A falta de dados em tempo real sobre o nível de estoque atrasa a identificação de necessidades de reabastecimento, resultando em excesso de estoque ou, pior, em rupturas que afetam a satisfação do cliente.
 - Ineficiências Operacionais: Sem automação, o tempo gasto para gerenciar o estoque é substancial, desviando recursos de atividades mais estratégicas.
 - Decisões Baseadas em Intuição: A ausência de relatórios analíticos dificulta a tomada de decisão baseada em dados, tornando as compras e o planejamento de estoque menos eficazes

### Descrição Geral da Proposta

A proposta visa desenvolver e implementar um sistema integrado de gerenciamento de estoque que se alinhe com os objetivos estratégicos do negócio e aborde os problemas identificados na análise da situação atual. Este sistema buscará:

 - Automatizar o Controle de Estoque: Utilizando tecnologia para rastrear e gerenciar o inventário em tempo real, reduzindo erros humanos e aumentando a precisão.
 - Integrar com Sistemas Externos: Conectar-se com fornecedores e sistemas de logística para uma cadeia de suprimentos mais eficiente, permitindo reabastecimento automático e otimização da entrega.
 - Fornecer Análise e Relatórios Avançados: Oferecer insights valiosos para a tomada de decisão estratégica, incluindo previsão de demanda e análise de tendências de vendas.
 - Melhorar a Eficiência Operacional: Reduzir o tempo gasto em tarefas manuais de gerenciamento de estoque, liberando a equipe para se concentrar em atividades que agregam mais valor.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor': '#FF6D00', 'edgeLabelBackground':'#FFF', 'tertiaryColor': '#FFD54F'}}}%%
graph TB

subgraph sub1[ ]
    direction TB
    start(Alerta de Nível de Estoque Baixo) --> analise[Análise de Dados de Estoque]
    analise --> previsao[Previsão de Demanda]
    previsao --> aprovação{Aprovação de Pedido}
    aprovação -->|Aprovado| pedido[Pedido Automático ao Fornecedor]
    aprovação -->|Ajustado| ajuste[Ajuste e Reenvio do Pedido]
    ajuste --> pedido
    pedido --> confirmação[Confirmação do Pedido pelo Fornecedor]
    confirmação --> recebimento[Recebimento de Mercadoria]
    recebimento --> verificação[Verificação e Atualização de Estoque]
    verificação --> fim[Estoque Atualizado e Reabastecido]
end

classDef default fill:#f9f,stroke:#333,stroke-width:2px;
classDef decision fill:#ff6,stroke:#333,stroke-width:2px;
classDef startend fill:#9f6,stroke:#333,stroke-width:2px;
class start,fim startend;
class aprovação decision;

```

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Deve ser desenvolvido uma aplicação distribuída       |
|03| Deve ser desenvolvido um módulo de backend        |
|04| Deve ser desenvolvido um módulo de frontend        |
|05| Deve ser desenvolvido um módulo de mobile        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
