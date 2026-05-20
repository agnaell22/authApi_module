const { body, validationResult } = require('express-validator');

/**
 * Validações para cadastro
 */
exports.validarCadastro = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),
  body('email')
    .trim()
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('telefone')
    .trim()
    .notEmpty().withMessage('Telefone é obrigatório')
    .matches(/^\d{10,11}$/).withMessage('Telefone deve ter 10 ou 11 dígitos'),
  body('matricula')
    .trim()
    .notEmpty().withMessage('Matrícula é obrigatória')
    .isLength({ min: 3 }).withMessage('Matrícula deve ter no mínimo 3 caracteres'),
  body('equipe')
    .trim()
    .notEmpty().withMessage('Equipe é obrigatória'),
  body('cargo')
    .trim()
    .notEmpty().withMessage('Cargo é obrigatório'),
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
];

/**
 * Validações para login
 */
exports.validarLogin = [
  body('email')
    .trim()
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória'),
];

/**
 * Validações para atualizar usuário
 */
exports.validarAtualizacao = [
  body('nome')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),
  body('telefone')
    .optional()
    .trim()
    .matches(/^\d{10,11}$/).withMessage('Telefone deve ter 10 ou 11 dígitos'),
  body('equipe')
    .optional()
    .trim()
    .notEmpty().withMessage('Equipe não pode ser vazia'),
  body('cargo')
    .optional()
    .trim()
    .notEmpty().withMessage('Cargo não pode ser vazio'),
];

/**
 * Middleware para tratar erros de validação
 */
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Erro na validação dos dados',
      errors: errors.array(),
    });
  }
  next();
};
