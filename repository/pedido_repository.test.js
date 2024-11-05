const request = require('supertest');
const { app } = require('../app');
const { inserir: inserirUsuario } = require('../repository/usuario_repository');
const { inserir: inserirProduto } = require('../repository/produto_repository');

let usuario;
let produto;

beforeAll(() => {
    // Inserindo um usuário e um produto antes de rodar os testes
    usuario = inserirUsuario({ nome: "Usuario Teste", cpf: "12345678901", email: "usuario@teste.com" });
    produto = inserirProduto({ nome: "Produto Teste", categoria: "Categoria Teste", preco: 100.0 });
});

describe('Testes de Pedido', () => {
    let pedido;

    test('Deve inserir um novo pedido', async () => {
        const novoPedido = {
            idUsuario: usuario.id,
            nomeUsuario: usuario.nome,
            idProduto: produto.id,
            nomeProduto: produto.nome,
            dataPedido: new Date().toISOString()
        };

        const response = await request(app)
            .post('/pedido')
            .send(novoPedido);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.idUsuario).toBe(usuario.id);
        expect(response.body.idProduto).toBe(produto.id);

        pedido = response.body; // Salvando o pedido para os próximos testes
    });

    test('Deve listar todos os pedidos', async () => {
        const response = await request(app).get('/pedido');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    test('Deve buscar pedido por ID', async () => {
        const response = await request(app).get(`/pedido/${pedido.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(pedido.id);
    });

    test('Deve atualizar um pedido', async () => {
        const pedidoAtualizado = {
            idUsuario: usuario.id,
            nomeUsuario: usuario.nome,
            idProduto: produto.id,
            nomeProduto: produto.nome,
            dataPedido: new Date().toISOString()
        };

        const response = await request(app)
            .put(`/pedido/${pedido.id}`)
            .send(pedidoAtualizado);

        expect(response.status).toBe(200);
        expect(response.body.dataPedido).toBe(pedidoAtualizado.dataPedido);
    });

    test('Deve deletar um pedido', async () => {
        const response = await request(app).delete(`/pedido/${pedido.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(pedido.id);
    });
});
