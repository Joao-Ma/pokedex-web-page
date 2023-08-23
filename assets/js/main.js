function convertPokemonToHTML(pokemon, pokedexNumber, number, type){
    return `
    <li class="pokemon">
        <span class="number">#00${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ul class="types">
                ${convertTypeToLiElement(pokemon.types).join(``)}
            </ul>
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        </div>
    </li>
    `
}



function convertTypeToLiElement(pokemonTypeSlot){
    return pokemonTypeSlot.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) =>{
    /*para cada pokemon na lista pokemons usada como parametro acima: o metodo map ira converte-los em 
    html utilizando o metodo que 'convertPokemonToHTML' e após isso o metodo join irá transformar em 
    uma única string, depois essa string será adicionada ao HTML com o metodo innerHTML.*/
    const newHtml = pokemonList.innerHTML += pokemons.map(convertPokemonToHTML).join('')
    pokemonList.innerHTML = newHtml
})