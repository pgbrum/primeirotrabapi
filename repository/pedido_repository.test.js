const pedidoRepository = require('./pedido_repository.js');
// const { expect, jest, test } = require('jest');


// Cenário de sucesso: Inserir pedido   

describe('Rotas de pedido', () => {
    test('Quando inserir um pedido válido, deve retornar e conter na lista o pedido com id=1', () => {
        const pedidoEsperado = {
            id: 1,
            idUsuario: 1,
            nomeUsuario: "João",
            idProduto: 1,
            nomeProduto: "Arroz",
            dataPedido: new Date().toISOString()
        };
    
        const pedidoInserido = pedidoRepository.inserir({
            idUsuario: 1,
            nomeUsuario: "João",
            idProduto: 1,
            nomeProduto: "Arroz",
            dataPedido: pedidoEsperado.dataPedido
        });
    
        // Verifica se o pedido inserido e retornado está correto
        expect(pedidoInserido).toEqual(pedidoEsperado);
        // Verifica se o pedido foi adicionado na lista
        expect(pedidoRepository.listar()).toContainEqual(pedidoEsperado);
    });
    
    // Cenário de exceção: Inserir pedido sem dados obrigatórios
    test('Quando inserir um pedido sem dados obrigatórios, não deve retornar e não deve ser inserido na lista', () => {
        const pedidoInvalido = {
            idUsuario: 2,
            nomeUsuario: "Maria"
        };
    
        const pedidoInserido = pedidoRepository.inserir(pedidoInvalido);
    
        // Verifica se o pedido não foi retornado (undefined)
        expect(pedidoInserido).toBeUndefined();
        // Verifica se o pedido não foi inserido na lista
        expect(pedidoRepository.listar()).not.toContainEqual(pedidoInvalido);
    });
    
    // Cenário de sucesso: Buscar pedido por ID
    test('Quando buscar por um ID existente, deve retornar o pedido corretamente', () => {
        const pedido = {
            idUsuario: 3,
            nomeUsuario: "Carlos",
            idProduto: 2,
            nomeProduto: "Feijão",
            dataPedido: new Date().toISOString()
        };
    
        const pedidoInserido = pedidoRepository.inserir(pedido);
    
        const resultado = pedidoRepository.buscarPorId(pedidoInserido.id);
    
        expect(resultado).toBeDefined();
        expect(resultado.nomeProduto).toBe("Feijão");
    });
    
    // Cenário de exceção: Buscar pedido por ID inexistente
    test('Quando buscar por um ID inexistente, deve retornar undefined', () => {
        const resultado = pedidoRepository.buscarPorId(999);
        expect(resultado).toBeUndefined();
    });
    
    // Cenário de sucesso: Atualizar pedido com ID existente
    test('Quando atualizar um pedido com ID existente, deve retornar o pedido atualizado', () => {
        const pedido = {
            idUsuario: 4,
            nomeUsuario: "Ana",
            idProduto: 3,
            nomeProduto: "Leite",
            dataPedido: new Date().toISOString()
        };
    
        const pedidoInserido = pedidoRepository.inserir(pedido);
    
        const pedidoAtualizado = {
            id: pedidoInserido.id,
            idUsuario: 4,
            nomeUsuario: "Ana",
            idProduto: 3,
            nomeProduto: "Leite Integral",
            dataPedido: new Date().toISOString()
        };
    
        const resultado = pedidoRepository.atualizar(pedidoInserido.id, pedidoAtualizado);
        
        // Verifica se o pedido foi atualizado corretamente
        expect(resultado).toEqual(pedidoAtualizado);
        expect(pedidoRepository.listar()).toContainEqual(pedidoAtualizado);
    });
    
    // Cenário de exceção: Atualizar pedido com ID inexistente
    test('Quando atualizar um pedido com ID inexistente, deve retornar undefined', () => {
        const pedidoAtualizado = {
            idUsuario: 5,
            nomeUsuario: "Pedro",
            idProduto: 4,
            nomeProduto: "Café",
            dataPedido: new Date().toISOString()
        };
    
        const resultado = pedidoRepository.atualizar(999, pedidoAtualizado);
    
        expect(resultado).toBeUndefined();
    });
    
    // Cenário de sucesso: Deletar pedido com ID existente
    test('Quando deletar um pedido com ID existente, deve removê-lo e retornar o pedido', () => {
        const pedido = {
            idUsuario: 6,
            nomeUsuario: "Marcos",
            idProduto: 5,
            nomeProduto: "Açúcar",
            dataPedido: new Date().toISOString()
        };
    
        const pedidoInserido = pedidoRepository.inserir(pedido);
    
        const resultado = pedidoRepository.deletar(pedidoInserido.id);
    
        // Verifica se o pedido foi removido e retornado
        expect(resultado).toEqual(pedidoInserido);
        expect(pedidoRepository.listar()).not.toContainEqual(pedidoInserido);
    });
    
    // Cenário de exceção: Deletar pedido com ID inexistente
    test('Quando deletar um pedido com ID inexistente, deve retornar undefined', () => {
        const resultado = pedidoRepository.deletar(999);
        expect(resultado).toBeUndefined();
    });
        
})
// test('Quando inserir um pedido válido, deve retornar e conter na lista o pedido com id=1', () => {
//     const pedidoEsperado = {
//         id: 1,
//         idUsuario: 1,
//         nomeUsuario: "João",
//         idProduto: 1,
//         nomeProduto: "Arroz",
//         dataPedido: new Date().toISOString()
//     };

//     const pedidoInserido = pedidoRepository.inserir({
//         idUsuario: 1,
//         nomeUsuario: "João",
//         idProduto: 1,
//         nomeProduto: "Arroz",
//         dataPedido: pedidoEsperado.dataPedido
//     });

//     // Verifica se o pedido inserido e retornado está correto
//     expect(pedidoInserido).toEqual(pedidoEsperado);
//     // Verifica se o pedido foi adicionado na lista
//     expect(pedidoRepository.listar()).toContainEqual(pedidoEsperado);
// });

// // Cenário de exceção: Inserir pedido sem dados obrigatórios
// test('Quando inserir um pedido sem dados obrigatórios, não deve retornar e não deve ser inserido na lista', () => {
//     const pedidoInvalido = {
//         idUsuario: 2,
//         nomeUsuario: "Maria"
//     };

//     const pedidoInserido = pedidoRepository.inserir(pedidoInvalido);

//     // Verifica se o pedido não foi retornado (undefined)
//     expect(pedidoInserido).toBeUndefined();
//     // Verifica se o pedido não foi inserido na lista
//     expect(pedidoRepository.listar()).not.toContainEqual(pedidoInvalido);
// });

// // Cenário de sucesso: Buscar pedido por ID
// test('Quando buscar por um ID existente, deve retornar o pedido corretamente', () => {
//     const pedido = {
//         idUsuario: 3,
//         nomeUsuario: "Carlos",
//         idProduto: 2,
//         nomeProduto: "Feijão",
//         dataPedido: new Date().toISOString()
//     };

//     const pedidoInserido = pedidoRepository.inserir(pedido);

//     const resultado = pedidoRepository.buscarPorId(pedidoInserido.id);

//     expect(resultado).toBeDefined();
//     expect(resultado.nomeProduto).toBe("Feijão");
// });

// // Cenário de exceção: Buscar pedido por ID inexistente
// test('Quando buscar por um ID inexistente, deve retornar undefined', () => {
//     const resultado = pedidoRepository.buscarPorId(999);
//     expect(resultado).toBeUndefined();
// });

// // Cenário de sucesso: Atualizar pedido com ID existente
// test('Quando atualizar um pedido com ID existente, deve retornar o pedido atualizado', () => {
//     const pedido = {
//         idUsuario: 4,
//         nomeUsuario: "Ana",
//         idProduto: 3,
//         nomeProduto: "Leite",
//         dataPedido: new Date().toISOString()
//     };

//     const pedidoInserido = pedidoRepository.inserir(pedido);

//     const pedidoAtualizado = {
//         id: pedidoInserido.id,
//         idUsuario: 4,
//         nomeUsuario: "Ana",
//         idProduto: 3,
//         nomeProduto: "Leite Integral",
//         dataPedido: new Date().toISOString()
//     };

//     const resultado = pedidoRepository.atualizar(pedidoInserido.id, pedidoAtualizado);
    
//     // Verifica se o pedido foi atualizado corretamente
//     expect(resultado).toEqual(pedidoAtualizado);
//     expect(pedidoRepository.listar()).toContainEqual(pedidoAtualizado);
// });

// // Cenário de exceção: Atualizar pedido com ID inexistente
// test('Quando atualizar um pedido com ID inexistente, deve retornar undefined', () => {
//     const pedidoAtualizado = {
//         idUsuario: 5,
//         nomeUsuario: "Pedro",
//         idProduto: 4,
//         nomeProduto: "Café",
//         dataPedido: new Date().toISOString()
//     };

//     const resultado = pedidoRepository.atualizar(999, pedidoAtualizado);

//     expect(resultado).toBeUndefined();
// });

// // Cenário de sucesso: Deletar pedido com ID existente
// test('Quando deletar um pedido com ID existente, deve removê-lo e retornar o pedido', () => {
//     const pedido = {
//         idUsuario: 6,
//         nomeUsuario: "Marcos",
//         idProduto: 5,
//         nomeProduto: "Açúcar",
//         dataPedido: new Date().toISOString()
//     };

//     const pedidoInserido = pedidoRepository.inserir(pedido);

//     const resultado = pedidoRepository.deletar(pedidoInserido.id);

//     // Verifica se o pedido foi removido e retornado
//     expect(resultado).toEqual(pedidoInserido);
//     expect(pedidoRepository.listar()).not.toContainEqual(pedidoInserido);
// });

// // Cenário de exceção: Deletar pedido com ID inexistente
// test('Quando deletar um pedido com ID inexistente, deve retornar undefined', () => {
//     const resultado = pedidoRepository.deletar(999);
//     expect(resultado).toBeUndefined();
// });
