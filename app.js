const express = require('express')
const produtoService = require('./service/produto_service')
const usuarioService = require('./service/usuario_service')

const app = express()
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//API para testar se a URL está no ar (http://localhost:3000)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Listar Produtos
app.get('/produtos', (req, res)=> {
    res.json(produtoService.listar())
})

app.get('/produtos/:id', (req, res) => {
  // O + antes converte o valor para number (na URL vem como string)
  const id = +req.params.id;
  try {
    res.json(produtoService.buscarPorId(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
})

app.post('/produtos', (req, res)=> {
    const produto = req.body;
    try{
      const produtoInserido = produtoService.inserir(produto);
      res.status(201).json(produtoInserido)
    }
    catch(err){
      res.status(err.id).json(err)
    }
})

app.put('/produtos/:id', (req, res) => {
  const id = +req.params.id;
  const produto = req.body;
  try{
    const produtoAtualizado = produtoService.atualizar(id, produto);
    res.json(produtoAtualizado)
  }
  catch(err){
    res.status(err.id).json(err)
  }
})

app.delete('/produtos/:id', (req, res) => {
  const id = +req.params.id;
  try {
    res.json(produtoService.deletar(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
})

//Usuário

app.get('/usuarios', (req, res)=> {
  res.json(usuarioService.listar())
})

app.get('/usuarios/:id', (req, res) => {
  // O + antes converte o valor para number (na URL vem como string)
  const id = +req.params.id;
  try {
    res.json(usuarioService.buscarPorId(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
})

app.post('/usuarios', (req, res)=> {
  const usuario = req.body;
  try{
    const usuarioInserido = usuarioService.inserir(usuario);
    res.status(201).json(usuarioInserido)
  }
  catch(err){
    res.status(err.id).json(err)
  }
})

app.put('/usuarios/:id', (req, res) => {
  const id = +req.params.id;
  const usuario = req.body;
  try{
    const usuarioAtualizado = usuarioService.atualizar(id, usuario);
    res.json(usuarioAtualizado)
  }
  catch(err){
    res.status(err.id).json(err)
  }
})

app.delete('/usuarios/:id', (req, res) => {
  const id = +req.params.id;
  try {
    res.json(usuarioService.deletar(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
})

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`)
})
