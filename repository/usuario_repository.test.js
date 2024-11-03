const usuario_repository = require("../../TrabUmAPIv3/repository/usuario_repository.js");

//Cenário de sucesso
test('Quando inserir o usuário, deve retornar e conter na lista o usuario com id=1'
    , () => {
        //usuario que se espera ser cadastrado (com id)
        const usuarioInseridoEsperado = {
            id: 1,
            nome: "Pedro",
            cpf: 111,
            email: "PedroEdirlei@email.com"
        };
        //Inserindo o usuario no repositorio
        const usuarioInserido = usuario_repository.inserir({
            nome: "Pedro",
            cpf: 111,
            email: "PedroEdirlei@email.com"
        });
        //Verificando se o usuario inserido que retornou está correto
        expect(usuarioInserido).toEqual(usuarioInseridoEsperado);
        //Verificando se o usuario foi inserido no repositório
        expect(usuario_repository.listar()).toContainEqual(usuarioInseridoEsperado);
    })
//Cenário de exceção
test('Quando inserir o usuario sem cpf, não deve retornar e não insere na lista'
    , () => {
        //Criado o cenário (com id=2 porque conta o teste anterior) para o usuario inserido sem cpf
        const usuarioInseridoErrado = {
            id: 2,
            nome: "Edirlei",
            email: "PedroEdirlei@email.com"
        };
        //Inserindo o usuario sem cpf
        const usuarioInserido = usuario_repository.inserir({
            nome: "Edirlei",
            email: "PedroEdirlei@email.com"
        });
        //O usuario não deve retornar
        expect(usuarioInserido).toEqual(undefined);
        //Não deve inserir na lista o usuario errado
        expect(usuario_repository.listar()).not.toContainEqual(usuarioInseridoErrado);
    })
//Cenário de sucesso - buscarPorId()
test('Quando buscar por um id existente, deve retornar o dado corretamente', () => {
    //Vou inserir um segundo usuario para o teste (id=2)
    const usuarioInserido = usuario_repository.inserir({
        nome: "Kipper",
        cpf: 222,
        email: "bomdiakipper@email.com"
    });
    const resultado = usuario_repository.buscarPorId(usuarioInserido.id);
    //Podemos fazer testes mais simples:
    expect(resultado).toBeDefined();
    expect(resultado.nome).toBe("Kipper")
});
//Cenário de exceção - buscarPorId()
test('Quando buscar por id inexistente, deve retornar undefined', () => {
    const resultado = usuario_repository.buscarPorId(10);
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - deletar()
test('Quando deletar um id existente, deve remover e retornar o dado', () => {
    const usuarioDeletadoEsperado = {
        nome: "Kipper",
        cpf: 222,
        email: "bomdiakipper@email.com",
        id: 2
    };
    const quantidadeEsperada = 1;
    resultado = usuario_repository.deletar(2);
    expect(resultado).toEqual(usuarioDeletadoEsperado);
    expect(usuario_repository.listar().length).toBe(quantidadeEsperada);

})

//Cenário de exceção - deletar()
test('Quando deletar um usuario com id inexistente, deve retornar undefined', () => {
    const resultado = usuario_repository.deletar(10);
    expect(resultado).toBeUndefined();
});
