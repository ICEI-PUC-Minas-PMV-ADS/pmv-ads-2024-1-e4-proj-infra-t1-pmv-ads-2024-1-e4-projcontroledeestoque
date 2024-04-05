# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

A metodologia de trabalho do grupo para atacar o problema consiste em seguir um processo de desenvolvimento ágil, com ciclos curtos de desenvolvimento e testes frequentes para garantir a qualidade do software. Para isso, utilizamos a ferramenta GitHub project para gerenciar o backlog de tarefas e realizamos a documentação no repositório do projeto.

Em relação aos ambientes de trabalho, utilizamos uma variedade de plataformas e tecnologias, dependendo das necessidades do projeto. Para desenvolvimento de backend e frontend, utilizamos a ferramenta de edição de código Visual Studio Code, as linguagens que serão utilizadas são C# e Node.js.

Para gestão do código fonte, utilizamos o Git com o GitHub para versionamento e controle de mudanças, permitindo a colaboração entre os membros da equipe e o gerenciamento de branches e merges de forma eficiente.

Em relação à gestão de times, utilizamos uma abordagem baseada em Scrum, com adaptações temos sprints semanais e retrospectivas para avaliar e melhorar continuamente o processo de desenvolvimento. Para comunicação e colaboração, utilizamos ferramentas como o WhatApp e o Microsoft teams para videoconferências e chats em tempo real.

## Ambiente de trabalho

|    **Ambiente** 	|   **Plataforma** 	|    **Link de Acesso** 	|
|:---:	|:---:	|:---:	|
|Repositório de código fonte/Documentação|GitHub|https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-pmv-ads-2024-1-e4-projcontroledeestoque/tree/main |
|Projeto de Interface e Wireframes|Figma|https://www.figma.com/team_invite/redeem/ztwfVRcumkiUg33arHpjsT|
|Gerenciamento do Projeto|github project|https://github.com/orgs/ICEI-PUC-Minas-PMV-ADS/projects/831|

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [Github](https://github.com) foi utilizado para hospedagem do repositório. Será clonando em cada ambiente de desenvolvimento da equipe. Em seguida, foram definidas as permissões de acesso ao repositório para cada membro da equipe, de acordo com suas funções e responsabilidades.

A gerência de branches é realizada de forma a permitir uma gestão eficiente do desenvolvimento do software em diferentes frentes. São criados branches para as funcionalidades em desenvolvimento, correção de bugs e para releases. Cada branch é gerenciado de forma a manter um histórico claro e organizado, com merges realizados de forma periódica para garantir a integração do código desenvolvido por diferentes membros da equipe. O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `release`: versão em testes do software quase finalizada
- `dev`: versão de desenvolvimento do software

A gerência de issues é realizada utilizando a funcionalidade de issues do GitHub, onde cada problema ou tarefa a ser realizada é descrita de forma clara e concisa, com atribuição de responsabilidade a um membro da equipe e com sua prioridade definida de acordo com a necessidade do projeto. Cada issue é gerenciada de forma a garantir sua resolução e atualização periódica do seu status. Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- 📄`documentation`: melhorias ou acréscimos à documentação
- 🐛 `bug`: uma funcionalidade encontra-se com problemas
- 🔨 `enhancement`: uma funcionalidade precisa ser melhorada ou de um rápido ajuste
- 🚀 `feature`: uma nova funcionalidade precisa ser introduzida

A gerência de tags (marcadores) é realizada criando uma tag no momento em que uma nova versão do software é lançada, permitindo uma fácil identificação das versões e a possibilidade de voltar a versões anteriores caso necessário. O merge de branches é realizado utilizando a funcionalidade de pull request do GitHub, onde um membro da equipe pode solicitar que suas mudanças sejam mescladas com o branch principal após a revisão por outros membros da equipe.

A gerência de commits é realizada de forma a manter um histórico claro e organizado do desenvolvimento do software. Cada commit é descrito de forma clara e concisa, explicando as mudanças realizadas e sua finalidade.



## Gerenciamento de Projeto

### Divisão de Papéis

Utilizando de metodologias ágeis, e tendo escolhido o Scrum como base para definição do
processo de desenvolvimento.

A equipe está organizada da seguinte maneira: <br>
`Scrum Master:` <br>
Gabriel <br>
`Product Owner:` <br>
Nayra <br>
`Equipe de Desenvolvimento:`<br>
Marcelo <br>
Samuel <br>
`Equipe de Design:`<br>
Iugor<br>
Silvestre 


> Para organização e distribuição das tarefas do projeto, a equipe está utilizando o github project estruturado com as seguintes listas:

`Backlog:` recebe todas as tarefas a serem trabalhadas e representa o Product Backlog. Qualquer adição de atividades que necessite ser aplicada no projeto deve ser adicionada nesta lista. <br>
`To do:` recebe as tarefas que foram separadas na sprint e representa o Sprint Backlog. São as tarefas que serão trabalhadas dentro da sprint. <br>
`Doing:` recebe qualquer tarefa que foi iniciada por um membro da equipe. <br>
`Code Review:` recebe qualquer tarefa que precisa de uma avaliação de outro membro da equipe. <br>
`Testing:` recebe as atividades concluidas que possuem a etiqueta de Test e passaram pelo controle de qualidade. Todas tarefas nessa lista precisam de uma checagem mais rigorosa para checar se a solução possui problema e/ou falha. <br>
`Done:` recebe todas as tarefas que passaram pelos testes e controle de qualidade e estão prontas para serem entregues ao usuário. Não existem mais alterações a serem feitas as tarefas nessa lista.

O quadro kanban do grupo no github project está disponível através da URL [Github_Projects](https://github.com/orgs/ICEI-PUC-Minas-PMV-ADS/projects/831).

### Processo

O grupo segue o framework Scrum para gerenciar o processo de desenvolvimento de software. O processo começou com a criação do backlog do produto, que é uma lista de tarefas e requisitos a serem desenvolvidos. O backlog do produto é gerenciado pelo proprietário do produto, que trabalha em estreita colaboração com a equipe de desenvolvimento para garantir que as necessidades do cliente e do produto sejam atendidas.

As tarefas do backlog do produto são então organizadas em sprints, que são ciclos de desenvolvimento curtos que duram cerca de três semanas. No início de cada sprint, a equipe realiza uma reunião de planejamento de sprint, onde o backlog da sprint é criado. Durante esta reunião, a equipe seleciona as tarefas do backlog do produto a serem realizadas durante a sprint atual e estima o tempo necessário para concluí-las.

Durante a sprint, a equipe realiza conversas diárias, onde cada membro relata o seu progresso e discute quaisquer impedimentos ou problemas que estejam enfrentando. Ao final da sprint, a equipe realiza uma revisão da sprint, onde as tarefas realizadas são revisadas e apresentadas ao proprietário do produto. A equipe também realiza uma retrospectiva da sprint, onde discute o que funcionou bem durante a sprint e o que pode ser melhorado.

A gestão de times é realizada de forma a garantir uma comunicação clara e colaborativa entre os membros da equipe. O proprietário do produto é responsável por garantir que as necessidades do cliente e do produto sejam atendidas, enquanto o Scrum Master é responsável por garantir que o processo de desenvolvimento esteja ocorrendo de acordo com os princípios do Scrum. Cada membro da equipe é responsável por suas tarefas e por colaborar com os outros membros da equipe para garantir que as tarefas sejam concluídas de forma eficiente.


### Ferramentas

As ferramentas empregadas no projeto são:

- Editor de código. (Visual Studio Code)<br>
O Visual Studio Code foi escolhido devido à sua grande comunidade de usuários, que desenvolve diversas extensões e plugins para aprimorar ainda mais a experiência de desenvolvimento. Além disso, ele oferece integração com serviços de controle de versão como o Git, o que facilita a gestão do código fonte e o trabalho colaborativo em equipe.<br>
- Ferramentas de comunicação (WhatsApp e Microsoft Teams)<br>
O WhatsApp foi escolhido por ser uma ferramenta de mensagens instantâneas amplamente utilizada em todo o mundo, o que torna sua utilização bastante familiar para a maioria das pessoas. Ele é fácil de usar, rápido e oferece recursos como chamadas de voz e vídeo, o que pode facilitar a comunicação entre os membros da equipe em caso de necessidade.<br>
Já o Microsoft Teams foi escolhido porque oferece recursos avançados de comunicação, colaboração e gerenciamento de projetos. Além oferece recursos como videoconferências, compartilhamento de tela, gerenciamento de tarefas e integração com outras ferramentas da Microsoft, como o Office 365 (documentação do projeto). <br>
- Ferramentas de desenho de tela (Marvel App, figma)<br>
O Marvel App foi escolhido por possuir uma interface bastante intuitiva e fácil de usar, o que torna a criação do wireframe mais rápida e eficiente. Além de permitir que várias pessoas trabalhem em um mesmo projeto simultaneamente, o que é muito útil para equipes que precisam colaborar em um mesmo projeto.<br>
- Ferramenta de gestão de projeto, quadro kanban (GitHub Project)<br>
O GitHub Project foi escolhido por ser muito flexível, que pode ser utilizada para gerenciar projetos de diferentes tamanhos e tipos. É possível criar quadros personalizados, adicionar etiquetas, comentários e anexos, entre outras funcionalidades. E por ser uma ferramenta baseada na web e ter aplicativos para celular, o que significa que pode ser acessada de qualquer lugar e a qualquer momento.<br>
- Ferramenta de criação de fluxograma, diagramas e modelos (Mermaid.js, Draw.io)<br>
Todas as ferramentas foram escolhidas pois possuem interfaces intuitivas e fáceis de usar e permitem criar modelos rapidamente e com facilidade, oferece suporte a uma ampla variedade de diagramas, incluindo diagramas de classe, diagramas de sequência, diagramas de atividades, diagrams de fluxo entre outros, tornando-as ferramentas abrangentes para modelagem de software.
