const pokeApi = {}

pokeApi.getPokemonDetails = (pokemon) =>{
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 15, limit = 15) => { 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json()) //captura a resposta recebida pelo get na url acima, e transforma em json
        .then((jsonBody) => jsonBody.results) 
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}

//metodo para converter um objeto recebido pela pokeapi em um pokemon
function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.order = pokeDetail.id
    
    //atribui a variavel types os tipos mapeados trazidos pela requisicao na api
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    //nesse caso, o [type] representa o elemento 0 da lista, caso houvessem mais elementos [type, type2, type3] também funciona.
    const [type] = types 

    pokemon.types = types
    pokemon.type = type

    pokemon.sprite = pokeDetail.sprites.other.home.front_default

    return pokemon;
}

