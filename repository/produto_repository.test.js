const produtoRepository = require("./produto_repository.js");
const request = require('supertest');
const app = require('../app.js');

// Cenário de sucesso

describe('Rota de produto', () => {
    
   test('Quando inserir o produto arroz, deve retornar e conter na lista o produto com id=1', async () => {
       const produtoInseridoEsperado = {
           id: 1,
           nome: "Arroz",
           categoria: "alimento",
           preco: 4.00
       };
       
       const response = await request(app)
           .post('/produtos')
           .send(produtoInseridoEsperado)
           .expect(201); // Verifica se o status code é 201 (Created)

       // Verificando se o produto foi inserido no repositório
       const produtos = await produtoRepository.listar();
       expect(produtos).toContainEqual(produtoInseridoEsperado);
   });

   // Cenário de exceção
   test('Quando inserir o produto sem categoria, não deve retornar e não insere na lista', async () => {
       const produtoInseridoErrado = {
           id: 2,
           nome: "Massa",
           preco: 4.00
       };

       const response = await request(app)
           .post('/produtos')
           .send(produtoInseridoErrado)
           .expect(400); // Verifica se o status code é 400 (Bad Request)

       // Não deve inserir na lista o produto errado
       const produtos = await produtoRepository.listar();
       expect(produtos).not.toContainEqual(produtoInseridoErrado);
   });

   test('Quando deletar um produto com id inexistente, deve retornar undefined', async () => {
       const resultado = await produtoRepository.deletar(10);
       expect(resultado).toBeUndefined();
   });

   test('Quando deletar um produto com id existente, deve retornar statuscode 200', async () => {
       await request(app)
           .post('/produtos')
           .send({
               nome: "Feijao",
               categoria: "alimento",
               preco: 7.00,
               id: 1
           })
           .expect(201);

       const produtoId = 1; // ID do produto inserido

       await request(app)
           .delete(`/produtos/${produtoId}`)
           .expect(200);
   });

   test('Quando buscar por id inexistente, deve retornar 404', async () => {
       const produtoId = 1000;
       await request(app)
           .get(`/produtos/${produtoId}`)
           .expect(404);
   });

   test('Quando buscar por um id existente, deve retornar o dado corretamente', async () => {
       const produtoId = 2;
       await request(app)
           .get(`/produtos/${produtoId}`)
           .expect(200);
   });

   test('Quando atualizar um produto existente, deve retornar o produto atualizado', async () => {
       const produtoAtualizado = {
           nome: "Arroz Integral",
           categoria: "alimento",
           preco: 5.00
       };

       const response = await request(app)
           .put('/produtos/2') // Supondo que o id do produto a ser atualizado é 1
           .send(produtoAtualizado)
           .expect(200); // Verifica se o status code é 200 (OK)

       // Verificando se o produto foi atualizado no repositório
       const produtoAtual = await produtoRepository.listar();
       expect(produtoAtual).toContainEqual({
           id: 2,
           ...produtoAtualizado
       });
   });

   test('Quando atualizar um produto com id inexistente, deve retornar 404', async () => {
       const produtoAtualizado = {
           nome: "Produto Inexistente",
           categoria: "alimento",
           preco: 10.00
       };

       await request(app)
           .put('/produtos/9999') // ID que não existe
           .send(produtoAtualizado)
           .expect(404); // Verifica se o status code é 404 (Not Found)
   });
});
