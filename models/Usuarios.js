const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  matricula: {
    type: String,
    required: true,
    unique: true,
  },
  equipe: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
}, { timestamps: true });
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;