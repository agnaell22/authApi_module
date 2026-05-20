# Deploy com Render.com (Recomendado - Gratuito)

## 📋 Pré-requisitos

1. ✅ Repositório GitHub com seu código
2. ✅ Conta MongoDB Atlas (gratuita)
3. ✅ Conta Render.com (gratuita)

## 🚀 Passo a Passo

### Passo 1: Preparar o Repositório

```bash
# Inicializar Git (se não tiver)
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "API Auth Pronta para Produção"

# Push para GitHub
git push -u origin main
```

### Passo 2: Criar Conta Render

1. Acesse https://render.com
2. Clique em "Sign Up"
3. Autentique com GitHub
4. Autorize o Render a acessar seus repositórios

### Passo 3: Criar Web Service no Render

1. **Dashboard** → **New** → **Web Service**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: `api-auth`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Passo 4: Adicionar Variáveis de Ambiente

Na seção "Environment":

```
PORT=5000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/api_auth?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta_muito_forte_e_unica_aqui_123456789
NODE_ENV=production
API_URL=https://seu-app-name.onrender.com
```

### Passo 5: Deploy

1. Clique em **Create Web Service**
2. Aguarde 3-5 minutos
3. Pronto! Sua API estará em: `https://seu-app-name.onrender.com`

## ✅ Verificar Deploy

```bash
# Health Check
curl https://seu-app-name.onrender.com/health

# Documentação
https://seu-app-name.onrender.com/api-docs
```

## 🔗 URL Após Deploy

```
API: https://seu-app-name.onrender.com
Docs: https://seu-app-name.onrender.com/api-docs
```

## 💡 Dicas

### Configurar Auto-Deploy

Por padrão, Render faz deploy automático quando você faz push para main.

### Verificar Logs

No dashboard Render → seu app → **Logs**

### Reiniciar App

Dashboard → seu app → **Manual Deploy** → **Deploy latest commit**

## 🌐 Alternativas (Railway, Heroku, etc)

### Railway.app

1. Acesse https://railway.app
2. Conecte seu GitHub
3. Configure variáveis de ambiente
4. Deploy automático

### Heroku (Requer cartão de crédito)

```bash
heroku login
heroku create seu-app-name
heroku config:set MONGO_URI="..."
heroku config:set JWT_SECRET="..."
git push heroku main
```

## 📊 Monitoramento

### Adicionar Nova Relic (Grátis)

1. Crie conta em https://newrelic.com
2. Instale: `npm install newrelic`
3. Configure em seu app

### Alertas Render

Configure alertas de downtime em:
Dashboard → seu app → **Alerts** → **Create Alert**

## 🔒 Segurança em Produção

- ✅ Use HTTPS (Render oferece automaticamente)
- ✅ Altere JWT_SECRET para algo único
- ✅ Whitelist de IPs no MongoDB Atlas
- ✅ Habilite 2FA na sua conta GitHub
- ✅ Mantenha dependências atualizadas

## 📱 Usar API em Seus Projetos

### No Frontend (React, Vue, etc)

```javascript
const API_URL = "https://seu-app-name.onrender.com";

// Login
const login = async (email, senha) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
};

// Usar em requisição protegida
const getUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/auth/usuarios`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};
```

### No Backend (Node.js)

```javascript
const axios = require("axios");

const authAPI = axios.create({
  baseURL: "https://seu-app-name.onrender.com/auth",
});

const login = async (email, senha) => {
  const response = await authAPI.post("/login", { email, senha });
  return response.data.token;
};
```

## 🎓 Próximos Passos

1. ✅ Deploy em produção
2. ⬜ Integrar em seus projetos
3. ⬜ Adicionar OAuth (Google, GitHub)
4. ⬜ Implementar Refresh Tokens
5. ⬜ Adicionar 2FA

---

**Sua API está pronta para o mundo! 🌍**
