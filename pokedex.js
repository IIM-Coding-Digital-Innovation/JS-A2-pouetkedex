let checkEnter = document.getElementById("pokeId")
checkEnter.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getPokemon()
    }
});

async function getPokemon() {
    let pokeId = document.getElementById('pokeId').value
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokeId.toString();
    let PokemonView = document.querySelector(".afficher")
    let ImgView = document.querySelector('.img-view')
    let res = await fetch(url);
    let pokemon = await res.json();
    
    PokemonView.innerHTML = ''
    ImgView.innerHTML = ''

    let vide = ''
    let count = 0

    pokemon.types.forEach (e =>{
        let alltypes = e.type.name
        vide += e.type.name
        if (count < pokemon.types.length - 1) {
            vide += ', '
        }
        count ++
    })

    console.log(vide)



    console.log(pokemon)
    ImgView.innerHTML += `
        <img src="${pokemon['sprites']['front_default']}" alt="" id="pokemon">
    `
    PokemonView.innerHTML += `
        <h2>Name : ${pokemon['name']}</h2>
        <div></div>
        <h2>Height : ${pokemon['height'] / 10}m</h2>
        <div></div>
        <h2>Weight : ${pokemon['weight'] / 10}kg</h2>
        <div></div>
        <h2>Type : ${vide}</h2>
        <div></div>
    `

    return pokemon
}

function generatePokemon(id){
    getPokemon(id)
}