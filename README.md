# Automação de API com Cypress (ServeRest)

Testes automatizados de API para o ServeRest (`https://serverest.dev`) cobrindo autenticação (JWT) e CRUD de usuários.

## Requisitos
- Node.js 18+
- npm 9+

## Instalação
```bash
npm install
```

## Executando testes
- Headless (gera relatórios Mochawesome):
```bash
npm test
```
- Interativo (GUI):
```bash
npm run cypress:open
```

Relatórios são salvos em `cypress/reports`. Para mesclar e gerar HTML manualmente:
```bash
npm run report:merge && npm run report:generate
```

## Configuração
- Base URL padrão: `https://serverest.dev`
- Para sobrescrever: `CYPRESS_BASE_URL=https://minha.api.com npm test`

## Cobertura de Cenários
- Login com JWT (sucesso) e login inválido (401)
- Retornar listagem de usuários
- CRUD completo de usuários autenticado: criar, obter por id, atualizar e deletar
- Negativo: tentativa de criar com email duplicado
- Resiliência contra `429 Too Many Requests` com retry simples (comando `cy.apiRequest`)

## Estrutura
```
.github/
  workflows/
    ci.yml              # Executa testes e publica relatório como artefato; permite execução manual
    ci.yml              # Executa testes e publica relatório como artefato; permite execução manual
cypress/
  e2e/
    usuarios.cy.js      # Testes ServeRest (auth + CRUD usuários)
    usuarios.cy.js      # Testes ServeRest (auth + CRUD usuários)
  support/
    e2e.js              # Comandos customizados (retry 429 e login)
    e2e.js              # Comandos customizados (retry 429 e login)
cypress.config.js       # Config do Cypress (baseUrl, reporter)
package.json            # Scripts e dependências
README.md               # Este guia
.gitignore
```

## CI (GitHub Actions)
- Dispara automaticamente em `push`/`pull_request` para `main`/`master`.
- Execução manual: aba “Actions” → workflow “CI” → botão “Run workflow”.
- Artefatos: relatório Mochawesome em `cypress/reports` (JSON/HTML).
## CI (GitHub Actions)
- Dispara automaticamente em `push`/`pull_request` para `main`/`master`.
- Execução manual: aba “Actions” → workflow “CI” → botão “Run workflow”.
- Artefatos: relatório Mochawesome em `cypress/reports` (JSON/HTML).

## Notas
- Credenciais padrão usadas para login: `fulano@qa.com` / `teste` (públicas do ServeRest)
- Campos obrigatórios para criação de usuário: `nome`, `email`, `password`, `administrador` (string 'true'/'false')
