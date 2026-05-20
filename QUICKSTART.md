# 🎯 Resumo da API - Comandos e URLs de Teste

## ✅ Status da API

- ✅ **Servidor**: Rodando em `http://localhost:5000`
- ✅ **Banco de Dados**: Conectado ao MongoDB Atlas
- ✅ **Documentação**: `http://localhost:5000/api-docs`
- ✅ **Health Check**: `http://localhost:5000/health`

## 🚀 Comandos Prontos para Usar

### 1. Testar Health Check

```powershell
$response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing
$response.Content
```

### 2. Cadastrar Novo Usuário

```powershell
$body = @{
    "nome"="João Silva"
    "email"="joao@example.com"
    "telefone"="11999999999"
    "matricula"="001"
    "equipe"="TI"
    "cargo"="Desenvolvedor"
    "senha"="senha123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/auth/cadastrar" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 3. Fazer Login

```powershell
$body = @{
    "email"="joao@example.com"
    "senha"="senha123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body `
  -UseBasicParsing

$response.Content
$token = ($response.Content | ConvertFrom-Json).token
Write-Host "Token: $token"
```

### 4. Listar Todos os Usuários (Requer Token)

```powershell
$token = "COLE_SEU_TOKEN_AQUI"

Invoke-WebRequest -Uri "http://localhost:5000/auth/usuarios" `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"} `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 5. Obter Perfil do Usuário Autenticado

```powershell
$token = "COLE_SEU_TOKEN_AQUI"

Invoke-WebRequest -Uri "http://localhost:5000/auth/perfil" `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"} `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 6. Atualizar Usuário

```powershell
$token = "COLE_SEU_TOKEN_AQUI"
$userId = "COLE_ID_DO_USUARIO"

$body = @{
    "nome"="João Silva Atualizado"
    "equipe"="Gerência"
    "cargo"="Gerente"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/auth/usuarios/$userId" `
  -Method PUT `
  -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"} `
  -Body $body `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 7. Deletar Usuário

```powershell
$token = "COLE_SEU_TOKEN_AQUI"
$userId = "COLE_ID_DO_USUARIO"

Invoke-WebRequest -Uri "http://localhost:5000/auth/usuarios/$userId" `
  -Method DELETE `
  -Headers @{"Authorization"="Bearer $token"} `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 8. Alterar Senha

```powershell
$token = "COLE_SEU_TOKEN_AQUI"

$body = @{
    "senhaAtual"="senha123"
    "novaSenha"="novaSenha456"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/auth/alterar-senha" `
  -Method PUT `
  -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"} `
  -Body $body `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

## 📚 URLs Importantes

| Recurso                  | URL                                          |
| ------------------------ | -------------------------------------------- |
| **Documentação Swagger** | http://localhost:5000/api-docs               |
| **Health Check**         | http://localhost:5000/health                 |
| **Cadastro**             | POST http://localhost:5000/auth/cadastrar    |
| **Login**                | POST http://localhost:5000/auth/login        |
| **Listar Usuários**      | GET http://localhost:5000/auth/usuarios      |
| **Perfil**               | GET http://localhost:5000/auth/perfil        |
| **Alterar Senha**        | PUT http://localhost:5000/auth/alterar-senha |

## 🔑 Resposta de Exemplo (Login)

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBkYzJlZjE4MTRlZDQxMjc5MzMwY2QiLCJpYXQiOjE3NzkyODY4NzIsImV4cCI6MTc3OTM3MzQ3Mn0.2XJYDhj3J1zo5xbwgMNoLm3fHIRXz5ndOYF8unun9KA",
  "usuario": {
    "id": "6a0dc2ef1814ed4127933cd",
    "nome": "João Silva",
    "email": "joao@example.com",
    "matricula": "001"
  }
}
```

## 🐳 Deploy com Docker

### Build

```bash
docker build -t api_auth .
```

### Rodar

```bash
docker run -p 5000:5000 \
  -e MONGO_URI="mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/api_auth" \
  -e JWT_SECRET="sua_chave_secreta" \
  api_auth
```

### Com Docker Compose

```bash
docker-compose up -d
```

## 🌐 Deploy em Produção

### Opção 1: Render (Recomendado)

1. Push para GitHub
2. Conectar repositório em https://render.com
3. Criar Web Service
4. Adicionar variáveis de ambiente

### Opção 2: Railway

1. Push para GitHub
2. Conectar em https://railway.app
3. Deploy automático

## 📝 Variáveis de Ambiente Necessárias

Certifique-se que seu arquivo `.env` contém:

```env
PORT=5000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/api_auth?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta_muito_forte_aqui
```

## 🎓 Próximas Funcionalidades

Para evoluir esta API, você pode adicionar:

1. **Autenticação OAuth** (Google, GitHub)
2. **Two-Factor Authentication (2FA)**
3. **Refresh Tokens** (renovar token sem fazer login)
4. **Roles e Permissões** (Admin, User, etc)
5. **Auditoria de Ações** (log de quem fez o quê)
6. **Recuperação de Senha** (via email)
7. **Testes Automatizados** (Jest, Mocha)

## ✨ Estrutura de Pastas

```
api_auth/
├── controllers/
│   └── authController.js       # Lógica de negócio
├── middlewares/
│   ├── auth.js                # Autenticação JWT
│   └── validation.js          # Validações
├── models/
│   └── usuarios.js            # Schema MongoDB
├── routes/
│   └── auth.js                # Definição de rotas
├── app.js                     # Aplicação principal
├── package.json               # Dependências
├── Dockerfile                 # Build Docker
├── docker-compose.yml         # Orquestração
├── .env                       # Variáveis (não commitir)
├── .env.example               # Template
├── .gitignore                 # Ignorar arquivos
├── README.md                  # Documentação
└── QUICKSTART.md              # Este arquivo
```

---

**Tudo pronto! 🚀 Sua API de autenticação está 100% funcional e pronta para produção!**
