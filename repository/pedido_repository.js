let listaPedidos = [];
let idGerador = 1;

function listar() {
    return listaPedidos;
}

function inserir(pedido) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!pedido || !pedido.idUsuario || !pedido.nomeUsuario 
        || !pedido.idProduto || !pedido.nomeProduto || !pedido.dataPedido) {
            return;
    }
    // pedido.id = idGerador++;
    pedido.id = idGerador++;
    //Adicionar regras de negocio
    listaPedidos.push(pedido);
    return pedido;
}

function buscarPorId(id) {
    return (listaPedidos.find(
        function(pedido) {
            return (pedido.id == id);
        }
    ));
}

// function atualizar(id, pedido) {
//     //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
//     if(!pedido || !pedido.idUsuario || !pedido.idProduto 
//         || !pedido.dataPedido) {
//             return;
//     }
//     let indicepedido = listaPedidos.findIndex(function(pedido) {
//         return (pedido.id == id);
//     })

//     if(indicepedido == -1) return;
//     //alterar o pedido direto
//     pedido.id = id;
//     listaPedidos[indicepedido] = pedido;
//     return pedido;
// }

function atualizar(id, pedidoAtualizado) {
    const indicePedido = listaPedidos.findIndex(pedido => pedido.id == id);
    if (indicePedido === -1) return undefined; // Pedido não encontrado

    // Atualiza o pedido na lista
    listaPedidos[indicePedido] = pedidoAtualizado;
    return pedidoAtualizado;
}

function deletar(id) {
    let indicepedido = listaPedidos.findIndex(function(pedido) {
        return (pedido.id == id);
    })
    if(indicepedido == -1) return;
    return (listaPedidos.splice(indicepedido, 1))[0];
}

// function pesquisarPorCategoria(categoria) {
//     return listaPedidos.filter( (pedido) => pedido.categoria == categoria )
// }

// function pesquisarPorNomeLike(nome) {
//     return listaPedidos.filter ( (pedido) => {
//         const pedidoNomeUpper = pedido.nome.toUpperCase();
//         const nomeUpper = nome.toUpperCase();
//         return (pedidoNomeUpper.search(nomeUpper) >= 0);
//     })
// }

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
}