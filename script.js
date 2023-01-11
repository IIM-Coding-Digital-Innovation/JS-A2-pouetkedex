class Pokemon{
    constructor(name,img,health,abilities){
        this.name = name;
        this.img = img;
        this.health = health;
        this.abilities = abilities
    }
}

for(let i = 1; i < 151; i++){

}

let checkEnter = document.getElementById("pokeId")
checkEnter.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getPokemon()
    }
});

async function getPokemon() {
    let pokeId = document.getElementById('pokeId').value
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokeId.toString();
    console.log(url);

    let res = await fetch(url);
    let pokemon = await res.json();

    console.log(pokemon);
    console.log(pokemon['name']);
    document.getElementById('pokemon').src = pokemon['sprites']['front_default']
    return pokemon
}

function generatePokemon(id){
    getPokemon(id)
}