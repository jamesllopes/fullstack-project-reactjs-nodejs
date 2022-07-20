const express = require('express');
const { verificarToken } = require('./filtro/verificar-token');
const { cadastrarUsuario } = require('./controllers/users/cadastrar-usuario');
const { login } = require('./controllers/users/login');
const { detalharUsuario } = require('./controllers/users/detalhar-usuario');
const { atualizarUsuario } = require('./controllers/users/atualizar-usuario');
const { listarCategorias } = require('./controllers/categories/listar-categorias');
const { listarTransacoes } = require('./controllers/transaction/listar-transacoes');
const { cadastrarTransacao } = require('./controllers/transaction/cadastrar-transacao');
const { detalharTransacao } = require('./controllers/transaction/detalhar-transacao');
const { atualizarTransacao } = require('./controllers/transaction/atualizar-transacao');
const { excluirTransacao } = require('./controllers/transaction/excluir-transacao');
const { extratoTransacoes } = require('./controllers/transaction/extrato-transacoes');
const { verificaEmailSenha, verificaNomeEmailSenha } = require('./middleware/verificaInfosUsuarios')
const { verificaTransacao } = require('./middleware/verificaInfosTransacoes')
const rotas = express();

rotas.post('/usuario', verificaNomeEmailSenha, cadastrarUsuario);
rotas.post('/login', verificaEmailSenha, login);

rotas.use(verificarToken);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', verificaNomeEmailSenha, atualizarUsuario);

rotas.get('/categoria', listarCategorias);

rotas.get('/transacao', listarTransacoes);
rotas.post('/transacao', verificaTransacao, cadastrarTransacao);
rotas.get('/transacao/extrato', extratoTransacoes);
rotas.get('/transacao/:id', detalharTransacao);
rotas.put('/transacao/:id', verificaTransacao, atualizarTransacao);
rotas.delete('/transacao/:id', excluirTransacao);

module.exports = rotas;