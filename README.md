# Refund Web

Frontend React para solicitacao e consulta de reembolsos, com autenticacao por perfil e integracao com API REST.

## Visao Geral

Este projeto possui dois fluxos principais:

- `employee`: cria solicitacoes de reembolso e envia comprovante.
- `manager`: visualiza lista paginada de solicitacoes e abre os detalhes de cada item.

A aplicacao controla sessao com `localStorage` e envia token JWT no header `Authorization`.

## Stack

- React 19 + TypeScript
- Vite 7
- React Router 7
- Axios
- Zod
- Tailwind CSS 4

## Funcionalidades

- Login e cadastro de usuario
- Controle de sessao (`@refund:user` e `@refund:token`)
- Roteamento condicional por perfil (`employee` / `manager`)
- Cadastro de reembolso com validacao de formulario
- Upload de comprovante (`/uploads`)
- Tela de confirmacao apos envio
- Dashboard de solicitacoes com busca por nome e paginacao
- Visualizacao de detalhes de solicitacao (manager)

## Rotas

### Publicas (nao autenticado)

- `/` -> login
- `/signup` -> cadastro

### Employee

- `/` -> formulario de solicitacao
- `/confirm` -> confirmacao de envio

### Manager

- `/` -> dashboard de solicitacoes
- `/refund/:id` -> detalhe da solicitacao (somente leitura)

## Requisitos

- Node.js 20+
- npm 10+
- API backend rodando em `http://localhost:3333`

Endpoints esperados pela UI:

- `POST /users`
- `POST /sessions`
- `POST /uploads`
- `POST /refunds`
- `GET /refunds`
- `GET /refunds/:id`

## Como Rodar

```bash
# 1) instalar dependencias
npm install

# 2) ambiente de desenvolvimento
npm run dev

# 3) build de producao
npm run build

# 4) preview do build
npm run preview
```

## Scripts

- `npm run dev`: sobe o servidor de desenvolvimento Vite
- `npm run build`: compila TypeScript e gera build de producao
- `npm run preview`: serve localmente o build gerado

## Estrutura do Projeto

```text
src/
  assets/        # icones e imagens
  components/    # componentes reutilizaveis de UI
  context/       # contexto de autenticacao
  dtos/          # tipagens de contratos da API
  hooks/         # hooks customizados
  pages/         # paginas da aplicacao
  routes/        # composicao de rotas por perfil
  services/      # clientes HTTP (axios)
  utils/         # utilitarios gerais
```

## Observacoes Tecnicas

- A base da API esta fixa em `src/services/api.ts`:
  - `baseURL: "http://localhost:3333"`
- O logout limpa sessao local e redireciona para `/`.
- O acesso inicial mostra um `Loading` enquanto a sessao eh carregada do storage.

## Troubleshooting

- Erro de CORS:
  - confirme se o backend permite origem do frontend (`http://localhost:5173` por padrao do Vite).
- Login funciona mas rotas nao liberam:
  - valide se a resposta de `/sessions` retorna `token` e `user.role` com `employee` ou `manager`.
- Upload falha:
  - confirme se o endpoint `/uploads` aceita `multipart/form-data` com campo `file`.

## Proximos Passos (sugestoes)

- Mover `baseURL` para variavel de ambiente (`VITE_API_URL`)
- Adicionar testes de componentes e rotas
- Adicionar tratamento centralizado de erros HTTP
