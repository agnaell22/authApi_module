const express = require('express');
const { 
  cadastrar, 
  login, 
  listarUsuarios, 
  obterUsuario, 
  atualizarUsuario, 
  deletarUsuario,
  obterPerfil,
  alterarSenha
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const { 
  validarCadastro, 
  validarLogin, 
  validarAtualizacao,
  handleValidationErrors 
} = require('../middlewares/validation');

const router = express.Router();

/**
 * @swagger
 * /auth/cadastrar:
 *   post:
 *     summary: Cadastrar novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, telefone, matricula, equipe, cargo, senha]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               telefone:
 *                 type: string
 *                 example: "11999999999"
 *               matricula:
 *                 type: string
 *                 example: "001"
 *               equipe:
 *                 type: string
 *                 example: TI
 *               cargo:
 *                 type: string
 *                 example: Desenvolvedor
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Email ou matrícula já existe
 *       500:
 *         description: Erro ao cadastrar usuário
 */
router.post('/cadastrar', validarCadastro, handleValidationErrors, cadastrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao fazer login
 */
router.post('/login', validarLogin, handleValidationErrors, login);

/**
 * @swagger
 * /auth/usuarios:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro ao listar usuários
 */
router.get('/usuarios', authMiddleware, listarUsuarios);

/**
 * @swagger
 * /auth/usuarios/{id}:
 *   get:
 *     summary: Obter usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao obter usuário
 */
router.get('/usuarios/:id', authMiddleware, obterUsuario);

/**
 * @swagger
 * /auth/usuarios/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               equipe:
 *                 type: string
 *               cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */
router.put('/usuarios/:id', authMiddleware, validarAtualizacao, handleValidationErrors, atualizarUsuario);

/**
 * @swagger
 * /auth/usuarios/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
router.delete('/usuarios/:id', authMiddleware, deletarUsuario);

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     summary: Obter perfil do usuário autenticado
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao obter perfil
 */
router.get('/perfil', authMiddleware, obterPerfil);

/**
 * @swagger
 * /auth/alterar-senha:
 *   put:
 *     summary: Alterar senha do usuário autenticado
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [senhaAtual, novaSenha]
 *             properties:
 *               senhaAtual:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Senha atual incorreta
 *       500:
 *         description: Erro ao alterar senha
 */
router.put('/alterar-senha', authMiddleware, alterarSenha);

module.exports = router;
