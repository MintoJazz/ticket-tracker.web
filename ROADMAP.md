**Fase 1: Fundações & Infraestrutura**

* **Setup do Projeto:** Inicializar o repositório com Vite e TypeScript.
* **Tipagem Universal:** Configurar o Zod em `src/schemas` e exportar a inferência para `src/types`, garantindo que toda a aplicação fale a mesma língua.
* **Mock API:** Implementar o setup do MSW que desenhamos, garantindo que o `localStorage` esteja persistindo os dados para não perder o estado a cada reload no Neovim.

**Fase 2: Sistema de Design & Autenticação**

* **Estilização:** Configurar Tailwind CSS e os componentes base do Shadcn UI (botões, inputs, modais e tabelas).
* **Roteamento:** Estabelecer a estrutura de rotas públicas e privadas.
* **Estado de Sessão:** Criar o contexto de autenticação consumindo os endpoints mockados `POST /auth/login` e `GET /auth/me`, protegendo as rotas internas.

**Fase 3: Visão Geral & Gestão de Chamados**

* **Dashboard e Relatórios:** Montar a tela inicial consumindo `/reports/dashboard` para os cards de métricas e `/reports/ranking` para a tabela de produtividade.
* **Listagem de Tickets:** Construir a interface principal consumindo `GET /tickets`, implementando os filtros por status e workspace.
* **Criação de Demandas:** Desenvolver o formulário acoplado ao schema do Zod para disparar o `POST /tickets`.

**Fase 4: Regra de Negócio (Worklogs)**

* **Detalhes do Ticket:** Criar a visualização individual da demanda (`GET /tickets/:id`), exibindo a descrição e informações do criador.
* **Controle de Tempo:** Implementar a lógica de iniciar atendimento (`POST /tickets/:id/worklogs`) e a mutação de encerramento (`PATCH /worklogs/:id`).
* **Timeline:** Renderizar o histórico temporal de worklogs dentro da visualização do ticket.

**Fase 5: Desacoplamento e Backend Real**

* **Centralização de Requests:** Garantir que todas as chamadas HTTP utilizem uma instância base configurada, facilitando a troca da `BASE_URL`.
* **Desligamento do MSW:** Desativar o *service worker* no ambiente de produção e apontar a aplicação para a futura API real que você irá construir.
