const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const firstGenButton = document.getElementById('firstGeneration');
const secondGenButton = document.getElementById('secondGeneration');
const allGenButton = document.getElementById('allGeneration');

const maxRecords = 600;
const limit = 1;
let offset = 0;

function resetAndLoadPokemonItems(newOffset, newLimit) {
  offset = newOffset;
  pokemonList.innerHTML = '';
  loadPokemonItems(offset, newLimit);
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
          <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join('')}
              </ol>
              <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
          </li>
        `
      )
      .join('');
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});

firstGenButton.addEventListener('click', () => {
  const newMax = 151;
  resetAndLoadPokemonItems(0, newMax);
});

secondGenButton.addEventListener('click', () => {
  const newMax = 100;
  resetAndLoadPokemonItems(151, newMax);
});

allGenButton.addEventListener('click', () => {
  const newMax = 600;
  resetAndLoadPokemonItems(0, newMax);
});
