const BuscadorService = {
    buscarLivros: function() {
        return fetch('/books.csv')
        .then(response => response.text())
        .then(conversor)
        .catch(handleError);
    },

    buscarRevistas: function () {
        return fetch('/magazines.csv')
        .then(response => response.text())
        .then(conversor)
        .catch(handleError);
    }
};

function conversor(arquivo) {
    const linhas = arquivo.split('\n')
    const retorno = []
    const cabecalho = linhas[0].split(';')

    for (let i = 1; i < linhas.length; i++) {
        if (!linhas[i])
        continue
        const objeto = {}
        const linhaAtual = linhas[i].split(';')

        for (let j = 0; j < cabecalho.length; j++) {
            objeto[cabecalho[j]] = linhaAtual[j]
        }

        retorno.push(objeto)
    }
    return retorno;
}

function handleError(error) {
    alert('inconsistência: ', error);
}

export default BuscadorService;