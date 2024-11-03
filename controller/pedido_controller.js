const pedidoService = require('../service/pedido_service');

// Funções do Controller

const listar = (req, res) => {
  res.json(pedidoService.listar());
};

const buscarPorId = (req, res) => {
  const id = +req.params.id;
  try {
    res.json(pedidoService.buscarPorId(id));
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const inserir = (req, res) => {
  const pedido = req.body;
  try {
    const pedidoInserido = pedidoService.inserir(pedido);
    res.status(201).json(pedidoInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const atualizar = (req, res) => {
  const id = +req.params.id;
  const pedido = req.body;
  try {
    const pedidoAtualizado = pedidoService.atualizar(id, pedido);
    res.json(pedidoAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const deletar = (req, res) => {
  const id = +req.params.id;
  try {
    res.json(pedidoService.deletar(id));
  } catch (err) {
    res.status(err.id).json(err);
  }
};

// Exportando as funções para uso em `app.js`
module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar
};
