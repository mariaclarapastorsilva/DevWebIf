const form = document.querySelector('#busca-form');
const inputBusca = document.querySelector('#busca');
const resultados = document.querySelector('#resultados');
const mensagem = document.querySelector('#mensagem');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const termo = inputBusca.value.trim();

  if (termo === '') {
    mensagem.textContent = 'Digite um nome para buscar.';
    return;
  }

  resultados.innerHTML = '';
  mensagem.textContent = 'Carregando...';

  try {
    const resposta = await fetch('https://api.tvmaze.com/search/shows?q=' + encodeURIComponent(termo));
    const dados = await resposta.json();

    mensagem.textContent = '';

    if (dados.length === 0) {
      mensagem.textContent = 'Nenhuma série encontrada.';
      return;
    }

    dados.forEach(function(item) {
      const serie = item.show;
      const score = item.score ? item.score.toFixed(2) : 'N/A';

      const col = document.createElement('div');
      col.classList.add('col');

      col.innerHTML = `
        <div class="card h-100">
          ${serie.image
            ? `<img src="${serie.image.medium}" class="card-img-top" alt="${serie.name}" />`
            : `<div class="card-sem-img">Sem imagem</div>`
          }
          <div class="card-body">
            <h6 class="card-title">${serie.name}</h6>
            <p class="card-text text-muted small">Score: ${score}</p>
          </div>
        </div>
      `;

      resultados.appendChild(col);
    });

  } catch (erro) {
    mensagem.textContent = 'Erro ao buscar.';
    console.error(erro);
  }
});