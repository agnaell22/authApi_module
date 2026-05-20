const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @desc Cadastrar novo usuário
 * @route POST /auth/cadastrar
 * @access Public
 */
exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, telefone, matricula, equipe, cargo, senha } = req.body;

    // Verificar se o email ou matrícula já existe
    const emailExistente = await Usuario.findOne({ email });
    const matriculaExistente = await Usuario.findOne({ matricula });

    if (emailExistente || matriculaExistente) {
      return res.status(400).json({ 
        success: false,
        message: 'Email ou matrícula já existe' 
      });
    }

    // Criptografar a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Criar um novo usuário
    const novoUsuario = new Usuario({
      nome,
      email,
      telefone,
      matricula,
      equipe,
      cargo,
      senha: hashedSenha,
    });

    await novoUsuario.save();

    res.status(201).json({ 
      success: true,
      message: 'Usuário cadastrado com sucesso',
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        matricula: novoUsuario.matricula
      }
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro ao cadastrar usuário',
      erro: error.message 
    });
  }
};

/**
 * @desc Login de usuário
 * @route POST /auth/login
 * @access Public
 */
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Encontrar o usuário pelo email
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciais inválidas' 
      });
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciais inválidas' 
      });
    }

    // Gerar um token JWT
    const token = jwt.sign(
      { userId: usuario._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(200).json({ 
      success: true,
      message: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        matricula: usuario.matricula
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro ao fazer login',
      erro: error.message 
    });
  }
};

/**
 * @desc Listar todos os usuários
 * @route GET /auth/usuarios
 * @access Private
 */
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha');
    
    res.status(200).json({
      success: true,
      total: usuarios.length,
      usuarios
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar usuários',
      erro: error.message
    });
  }
};

/**
 * @desc Obter usuário por ID
 * @route GET /auth/usuarios/:id
 * @access Private
 */
exports.obterUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id).select('-senha');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      usuario
    });
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter usuário',
      erro: error.message
    });
  }
};

/**
 * @desc Atualizar usuário
 * @route PUT /auth/usuarios/:id
 * @access Private
 */
exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, equipe, cargo } = req.body;

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      { nome, telefone, equipe, cargo },
      { new: true }
    ).select('-senha');

    if (!usuarioAtualizado) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      usuario: usuarioAtualizado
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar usuário',
      erro: error.message
    });
  }
};

/**
 * @desc Deletar usuário
 * @route DELETE /auth/usuarios/:id
 * @access Private
 */
exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioDeletado = await Usuario.findByIdAndDelete(id);

    if (!usuarioDeletado) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar usuário',
      erro: error.message
    });
  }
};

/**
 * @desc Obter perfil do usuário autenticado
 * @route GET /auth/perfil
 * @access Private
 */
exports.obterPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.userId).select('-senha');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      usuario
    });
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter perfil',
      erro: error.message
    });
  }
};

/**
 * @desc Alterar senha
 * @route PUT /auth/alterar-senha
 * @access Private
 */
exports.alterarSenha = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const usuario = await Usuario.findById(req.userId);

    // Verificar senha atual
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual incorreta'
      });
    }

    // Criptografar nova senha
    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
    usuario.senha = novaSenhaHash;
    await usuario.save();

    res.status(200).json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao alterar senha',
      erro: error.message
    });
  }
};

