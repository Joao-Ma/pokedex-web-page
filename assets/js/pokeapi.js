const pokeApi = {}

pokeApi.getPokemonDetails = (pokemon) =>{
    return fetch(pokemon.url).then((response) => response.json())
}

pokeApi.getPokemons = (offset = 0, limit = 5) => { 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json()) //captura a resposta recebida pelo get na url acima, e transforma em json
        .then((jsonBody) => jsonBody.results) 
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .catch((error) => console.error(error))
}