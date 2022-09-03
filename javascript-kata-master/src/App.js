import React from 'react';
import BuscadorService from './service/buscador.service';

export default function App() {
  const [carregar, definirCarregamento] = React.useState(false);
  const [items, definirItens] = React.useState([]);
  const [todosItens, definirTodosItens] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      BuscadorService.buscarLivros(),
      BuscadorService.buscarRevistas()
    ]).then(function (lista) {
      const dado = lista[0].concat(lista[1]);

      dado.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }

        if (a.title > b.title) {
          return 1;
        }

        return 0;
      });

      definirTodosItens(dado.slice());
      definirCarregamento(true);
      definirItens(dado);
    });
  }, []);

  if (!carregar) {
    return <div>Carregando...</div>;
  } else {
    return (
        <div> 
          <input type="text" onKeyUp={buscarPorChave} placeholder="Buscar por Autor, Título ou ISBN" />
          <ul>
            {items.map(item => (
              <li key={item.isbn}>
                <strong>Título:</strong> {item.title}<br />
                <strong>Autor:</strong> {item.authors}<br />
                <strong>Descrição:</strong> {item.description}<br />
                <strong>ISBN:</strong> {item.isbn}<br />
              </li>
            ))}
          </ul>
      </div>
    );
  }

  function buscarPorChave(chave) {
    const valor = chave.target.value;

    if (valor) {
      const filtrados = items.filter((item) => {
        return item.title.toUpperCase().indexOf(chave.target.value.toUpperCase()) > -1 ||
          item.isbn.toUpperCase().indexOf(chave.target.value.toUpperCase()) > -1 ||
          item.authors.toUpperCase().indexOf(chave.target.value.toUpperCase()) > -1
      });

      definirItens(filtrados);
    } else {
      definirItens(todosItens);
    }
  }

}