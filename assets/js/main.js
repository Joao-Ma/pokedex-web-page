const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let limit = 10
let offset = 0

function loadPokemonItens(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        /*para cada pokemon na lista pokemons usada como parametro acima: o metodo map ira converte-los em 
        html utilizando o metodo que 'convertPokemonToHTML' e após isso o metodo join irá transformar em 
        uma única string, depois essa string será adicionada ao HTML com o metodo innerHTML.*/
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#0${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ul class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(``)}
                </ul>
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
            </div>
        </li>
        `).join('')

        pokemonList.innerHTML = newHtml
    })
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () => {
    limit = limit +10
    loadPokemonItens(offset, limit)
})