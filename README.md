# Automação de API com Cypress (ServeRest)

Testes automatizados de API para o ServeRest ('https://serverest.dev') cobrindo autenticação (JWT) e CRUD de usuários.

## Requisitos
- Node.js 18+
- npm 9+

## Instalação
npm install

## Executando testes
- Headless (gera relatórios Mochawesome):
npm test

- Interativo (GUI):
npm run cypress:open

Relatórios são salvos em 'cypress/reports'. Para mesclar e gerar HTML manualmente:
npm run report:merge && npm run report:generate

## Configuração
- Base URL padrão: 'https://serverest.dev'
- Para direcionar para outra URL usar: 'CYPRESS_BASE_URL=https://minha.api.com npm test'

## Cobertura de Cenários
- Login usando JWT (sucesso) e login inválido (negativo)
- Retornar listagem de usuários
- CRUD completo de usuários autenticado: criar, validar por id, atualizar e deletar
- Criar com email duplicado (negativo)

## Estrutura
.github/
  workflows/
    ci.yml              # Executa testes e publica relatório como artefato; permite execução manual
cypress/
  e2e/
    usuarios.cy.js      # Testes ServeRest (auth + CRUD usuários)
  support/
    e2e.js              # Comandos customizados (retry e login)
cypress.config.js       # Config do Cypress (baseUrl, reporter)
package.json            # Scripts e dependências
README.md               # Este guia
.gitignore

## CI (GitHub Actions)
- Dispara automaticamente fazendo 'push'/'pull_request' para 'main'.
- Execução manual: aba “Actions” > workflow “CI” > botão “Run workflow”.
- Artefatos: relatório Mochawesome em 'cypress/reports' (JSON/HTML).

## Notas
- Dados de usuário padrão usadas para login: 'fulano@qa.com' / 'teste' (Dados fornecidos pela ServeRest)
- Campos obrigatórios para criação de usuário: 'nome', 'email', 'password', 'administrador' ('true'/'false')
