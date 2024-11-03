const usuarioRepository = require("./usuario_repository.js");
const request = require('supertest');
const app = require('../app.js'); // Apenas o app
// const server = require('../server'); // Importa o servidor

describe('Rotas de usuario', () => {
    
    // beforeAll(async () => {
    //     // O servidor já está em execução
    // });

    
    
    // afterAll(async () => {
    //     await new Promise(resolve => server.close(resolve));
    // });

   test('Quando inserir o usuario, deve retornar e conter na lista o usuario com id=1', async () => {
       const usuarioInseridoEsperado = {
           id: 1,
           nome: "Alfi",
           cpf: 123,
           email: "tetas@email"
       };
       
       const response = await request(app)
           .post('/usuarios')
           .send(usuarioInseridoEsperado)
           .expect(201); // Verifica se o status code é 201 (Created)

       // Verificando se o usuario foi inserido no repositório
       const usuarios = await usuarioRepository.listar();
       expect(usuarios).toContainEqual(usuarioInseridoEsperado);
   });

   // Cenário de exceção
   test('Quando inserir o usuario sem email, não deve retornar e não insere na lista', async () => {
       const usuarioInseridoErrado = {
           id: 2,
           nome: "jonas",
           cpf: 456
       };

       const response = await request(app)
           .post('/usuarios')
           .send(usuarioInseridoErrado)
           .expect(400); // Verifica se o status code é 400 (Bad Request)

       // Não deve inserir na lista o usuario errado
       const usuarios = await usuarioRepository.listar();
       expect(usuarios).not.toContainEqual(usuarioInseridoErrado);
   });

   test('Quando deletar um usuario com id inexistente, deve retornar undefined', async () => {
       const resultado = await usuarioRepository.deletar(10);
       expect(resultado).toBeUndefined();
   });

   test('Quando deletar um usuario com id existente, deve retornar statuscode 200', async () => {
       await request(app)
           .post('/usuarios')
           .send({
               nome: "Lucas",
               cpf: 789,
               email: "pauduro@email",
               id: 1
           })
           .expect(201);

       const usuarioId = 1; // ID do usuario inserido

       await request(app)
           .delete(`/usuarios/${usuarioId}`)
           .expect(200);
   });

   test('Quando buscar por id inexistente, deve retornar 404', async () => {
       const usuarioId = 1000;
       await request(app)
           .get(`/usuarios/${usuarioId}`)
           .expect(404);
   });

   test('Quando buscar por um id existente, deve retornar o dado corretamente', async () => {
       const usuarioId = 2;
       await request(app)
           .get(`/usuarios/${usuarioId}`)
           .expect(200);
   });

   test('Quando atualizar um usuario existente, deve retornar o usuario atualizado', async () => {
       const usuarioAtualizado = {
           nome: "Paulino",
           cpf: 789,
           email: "xotilda@email"
       };

       const response = await request(app)
           .put('/usuarios/2') // Supondo que o id do usuario a ser atualizado é 1
           .send(usuarioAtualizado)
           .expect(200); // Verifica se o status code é 200 (OK)

       // Verificando se o usuario foi atualizado no repositório
       const usuarioAtual = await usuarioRepository.listar();
       expect(usuarioAtual).toContainEqual({
           id: 2,
           ...usuarioAtualizado
       });
   });

   test('Quando atualizar um usuario com id inexistente, deve retornar 404', async () => {
       const usuarioAtualizado = {
           nome: "Carlos",
           cpf: 111,
           email: "vou@gmail"
       };

       await request(app)
           .put('/usuarios/9999') // ID que não existe
           .send(usuarioAtualizado)
           .expect(404); // Verifica se o status code é 404 (Not Found)
   });
});
