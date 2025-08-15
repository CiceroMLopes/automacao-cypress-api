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
- Login JWT (sucesso) e login inválido (401)
- Listagem de usuários
- CRUD completo de usuários autenticado: criar, obter por id, atualizar e deletar
- Negativo: tentativa de criar com email duplicado
- Resiliência contra `429 Too Many Requests` com retry exponencial simples (comando `cy.apiRequest`)

## Estrutura
```
.github/
  workflows/
    ci.yml              # Executa testes e publica relatório como artefato
cypress/
  e2e/
    users.cy.js         # Testes ServeRest (auth + CRUD usuários)
  support/
    e2e.js              # Comandos customizados (retry 429)
cypress.config.js       # Config do Cypress (baseUrl, reporter)
package.json            # Scripts e dependências
README.md               # Este guia
.gitignore
```

## CI
- GitHub Actions: job executa `npm test` e envia `cypress/reports` como artefato.

## Notas
- Credenciais padrão usadas para login: `fulano@qa.com` / `teste` (públicas do ServeRest)
- Campos obrigatórios para criação de usuário: `nome`, `email`, `password`, `administrador` (string 'true'/'false')