let listaProdutos = [];
let idGerador = 1;

function listar() {
    return listaProdutos;
}

function inserir(produto) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!produto || !produto.nome || !produto.categoria 
        || !produto.preco) {
            return;
    }
    produto.id = idGerador++;
    listaProdutos.push(produto);
    return produto;
}

function buscarPorId(id) {
    return (listaProdutos.find(
        function(produto) {
            return (produto.id == id);
        }
    ));
}

function atualizar(id, produto) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!produto || !produto.nome || !produto.categoria 
        || !produto.preco) {
            return;
    }
    let indiceProduto = listaProdutos.findIndex(function(produto) {
        return (produto.id == id);
    })

    if(indiceProduto == -1) return;
    //alterar o produto direto
    produto.id = id;
    listaProdutos[indiceProduto] = produto;
    return produto;
}

function deletar(id) {
    let indiceProduto = listaProdutos.findIndex(function(produto) {
        return (produto.id == id);
    })
    if(indiceProduto == -1) return;
    return (listaProdutos.splice(indiceProduto, 1))[0];
}

// function pesquisarPorCategoria(categoria) {
//     return listaProdutos.filter( (produto) => produto.categoria == categoria )
// }

// function pesquisarPorNomeLike(nome) {
//     return listaProdutos.filter ( (produto) => {
//         const produtoNomeUpper = produto.nome.toUpperCase();
//         const nomeUpper = nome.toUpperCase();
//         return (produtoNomeUpper.search(nomeUpper) >= 0);
//     })
// }

const produtoRepository = {
    produtos: [],
    
    deletarTodos: async function() {
        this.produtos = [];
    },

    listar: async function() {
        return this.produtos;
    },

    inserir: async function(produto) {
        if (!produto.categoria) {
            return undefined; // ou lançar um erro
        }
        produto.id = this.produtos.length + 1; // Atribuindo ID simples
        this.produtos.push(produto);
        return produto;
    },

    // Outros métodos, como atualizar e deletar...
};

module.exports = produtoRepository; // Exportar o repositório


module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    produtoRepository,
}