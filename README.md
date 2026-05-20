# 🔐 API de Autenticação - Módulo Reutilizável

Uma API robusta, segura e bem documentada para autenticação e gerenciamento de usuários. Pronta para produção e fácil de integrar em múltiplos projetos.

## ✨ Características

- ✅ **Autenticação JWT** - Tokens seguros com expiração configurável
- ✅ **CRUD Completo** - Gerenciar usuários facilmente
- ✅ **Validações** - Dados validados em todas as rotas
- ✅ **Segurança** - Helmet, Rate Limiting, Senhas criptografadas
- ✅ **Swagger/OpenAPI** - Documentação interativa
- ✅ **Docker** - Deploy containerizado
- ✅ **MongoDB Atlas** - Integração nativa com banco de dados em nuvem

## 📋 Pré-requisitos

- Node.js v18+
- npm ou yarn
- MongoDB Atlas (gratuito) ou MongoDB local
- Docker (opcional, para containerização)

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone <seu-repositório>
cd api_auth
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000

# MongoDB
MONGO_URI=mongodb+srv://usuario:senha@cluster0.mongodb.net/api_auth?retryWrites=true&w=majority

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui_123456789
```

**Obter conexão MongoDB:**

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Crie um usuário do banco
4. Copie a connection string
5. Substitua `<username>` e `<password>` pelos seus dados

### 4. Iniciar o servidor

**Desenvolvimento (com auto-reload):**

```bash
npm run dev
```

**Produção:**

```bash
npm start
```

O servidor iniciará em `http://localhost:5000`

## 📚 Documentação da API

A documentação interativa está disponível em:

```
http://localhost:5000/api-docs
```

### Endpoints Principais

#### Autenticação

| Método | Rota                  | Descrição               | Autenticação |
| ------ | --------------------- | ----------------------- | ------------ |
| POST   | `/auth/cadastrar`     | Registrar novo usuário  | ❌           |
| POST   | `/auth/login`         | Fazer login             | ❌           |
| GET    | `/auth/perfil`        | Obter perfil do usuário | ✅           |
| PUT    | `/auth/alterar-senha` | Alterar senha           | ✅           |

#### Gerenciamento de Usuários

| Método | Rota                 | Descrição                | Autenticação |
| ------ | -------------------- | ------------------------ | ------------ |
| GET    | `/auth/usuarios`     | Listar todos os usuários | ✅           |
| GET    | `/auth/usuarios/:id` | Obter usuário por ID     | ✅           |
| PUT    | `/auth/usuarios/:id` | Atualizar usuário        | ✅           |
| DELETE | `/auth/usuarios/:id` | Deletar usuário          | ✅           |

#### Health Check

| Método | Rota      | Descrição                    |
| ------ | --------- | ---------------------------- |
| GET    | `/health` | Verificar status do servidor |

## 🔑 Usando a API

### Exemplo 1: Cadastrar Usuário

```bash
curl -X POST http://localhost:5000/auth/cadastrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "11999999999",
    "matricula": "001",
    "equipe": "TI",
    "cargo": "Desenvolvedor",
    "senha": "senha123"
  }'
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "usuario": {
    "id": "6a0dc2ef1814ed4127933cd",
    "nome": "João Silva",
    "email": "joao@example.com",
    "matricula": "001"
  }
}
```

### Exemplo 2: Fazer Login

```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "6a0dc2ef1814ed4127933cd",
    "nome": "João Silva",
    "email": "joao@example.com",
    "matricula": "001"
  }
}
```

### Exemplo 3: Usar Token em Requisição Protegida

```bash
curl -X GET http://localhost:5000/auth/usuarios \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Resposta (200):**

```json
{
  "success": true,
  "total": 5,
  "usuarios": [
    {
      "id": "6a0dc2ef1814ed4127933cd",
      "nome": "João Silva",
      "email": "joao@example.com",
      "matricula": "001",
      "equipe": "TI",
      "cargo": "Desenvolvedor",
      "createdAt": "2024-05-20T14:19:27.000Z",
      "updatedAt": "2024-05-20T14:19:27.000Z"
    }
  ]
}
```

## 🐳 Deploy com Docker

### Build da imagem

```bash
docker build -t api_auth .
```

### Rodar container

```bash
docker run -p 5000:5000 \
  -e MONGO_URI="mongodb+srv://user:pass@cluster.mongodb.net/api_auth" \
  -e JWT_SECRET="sua_chave_secreta" \
  api_auth
```

### Com Docker Compose

```bash
docker-compose up -d
```

Acesse: `http://localhost:5000`

## 🌐 Deploy em Servidores Gratuitos

### Opção 1: Render (Recomendado)

1. **Criar conta:** https://render.com
2. **Conectar repositório GitHub**
3. **Criar Web Service:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables:
     - `MONGO_URI`: Sua string MongoDB
     - `JWT_SECRET`: Chave secreta

### Opção 2: Railway

1. **Criar conta:** https://railway.app
2. **Conectar GitHub**
3. **Deploy automático**
4. **Adicionar variáveis de ambiente**

### Opção 3: Heroku (Com plano pago)

```bash
heroku login
heroku create seu-app-name
heroku config:set MONGO_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="..."
git push heroku main
```

## 📁 Estrutura do Projeto

```
api_auth/
├── controllers/
│   └── authController.js      # Lógica de negócio
├── middlewares/
│   ├── auth.js               # Middleware JWT
│   └── validation.js         # Validações
├── models/
│   └── usuarios.js           # Schema do usuário
├── routes/
│   └── auth.js               # Definição de rotas
├── app.js                    # Aplicação principal
├── Dockerfile                # Build Docker
├── docker-compose.yml        # Orquestração
├── .env                      # Variáveis de ambiente
├── .env.example              # Template de .env
├── package.json              # Dependências
└── README.md                 # Este arquivo
```

## 🔒 Segurança

- **Senhas:** Hash com bcrypt (10 rounds)
- **Tokens JWT:** Expiração em 24h
- **Rate Limiting:** 100 req/IP/15min (5 req para login)
- **Helmet:** Headers de segurança HTTP
- **CORS:** Configurável
- **Validações:** Express-validator em todos os endpoints

## 🛠️ Variáveis de Ambiente

```env
# Servidor
PORT=5000
NODE_ENV=development/production
API_URL=http://localhost:5000

# Banco de Dados
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/database

# Autenticação
JWT_SECRET=chave-super-secreta-minimo-32-caracteres
```

## 📦 Integrar em Seus Projetos

### Método 1: Como NPM Package (Futuro)

```javascript
const auth = require("api_auth");

app.use("/auth", auth.router);
```

### Método 2: Usar a API via HTTP

```javascript
// No seu projeto
const axios = require("axios");

const authAPI = axios.create({
  baseURL: "http://seu-servidor-auth.com/auth",
});

// Login
const login = async (email, senha) => {
  const response = await authAPI.post("/login", { email, senha });
  return response.data.token;
};

// Usar token
const getUsuario = async (token) => {
  const response = await authAPI.get("/perfil", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
```

## 🧪 Testando

### Com cURL

```bash
# Cadastro
curl -X POST http://localhost:5000/auth/cadastrar \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@test.com","telefone":"11999999999","matricula":"999","equipe":"TI","cargo":"Dev","senha":"senha123"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@test.com","senha":"senha123"}'
```

### Com Postman

1. Importe a coleção (em breve disponível)
2. Configure as variáveis de ambiente
3. Execute os testes

### Com Swagger UI

Abra: `http://localhost:5000/api-docs`

## 🐛 Troubleshooting

| Erro                                         | Solução                                  |
| -------------------------------------------- | ---------------------------------------- |
| `MongoParseError: options are not supported` | Remova opções antigas da conexão         |
| `Cannot find module 'express'`               | Execute `npm install`                    |
| `Token inválido ou expirado`                 | Verifique JWT_SECRET e validade do token |
| `MongoDB connection error`                   | Verifique MONGO_URI e whitelist de IPs   |

## 📝 Licença

ISC

## 👥 Suporte

Para problemas ou dúvidas, abra uma issue no repositório.

## 🚀 Roadmap

- [ ] Autenticação com Google/GitHub
- [ ] Two-Factor Authentication (2FA)
- [ ] Refresh Tokens
- [ ] Roles e Permissões
- [ ] Auditoria de ações
- [ ] Recuperação de senha por email

---

**Desenvolvido com ❤️ para facilitar sua vida**
