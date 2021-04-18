
const poke_container = document.getElementById('poke_container');
const pokemons_number = 600;

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FC7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#FDDFDF',
  poison: '#98d7a5',
  bug: '#f8d5a5',
  dragon: '#97b3e6',
  psychic: '#EAEDA1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
}

const main_types = Object.keys(colors);


const createPokemonCard = async (pokemon) => {
  
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
  
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const poke_types = pokemon.types.map(el => el.type.name);
  
  
  const type = main_types.find(type => poke_types.indexOf(type) > - 1);
  
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;
  
  const pokeInnerHTML = `
    <div class="img-container">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
    </div>
    <div class="info">
      <span class="number"> #${pokemon.id.toString().padStart(3, '0')} </span>
      <h3 class="name"> ${pokemon.name} </h3>
      <small class="type">Type: <span>${type}</span></small>
    </div>
    
  `;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
}

const fetchPokemons = async () => {
  for (let i=1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
}

const getPokemon = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
  }
  catch (err) {
    console.loj("Occoreu um erro ao listar PkM", err);
  }
}


console.log('Consultando');
fetchPokemons();


