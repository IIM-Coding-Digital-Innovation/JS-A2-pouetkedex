class Pokemon{
    constructor(name,img,hp,attack,defense,speed){
        this.name = name;
        this.img = img;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
    }
}

let G1pokemon = []

for(let i = 1; i <= 151; i++){
    if(i == 150){
        i = 151
    }
    generatePokemon(i)
}
console.log('ok')

async function getPokemonFromApi(id) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + id.toString();
    let res = await fetch(url);
    let pokemon = await res.json();
    return pokemon
}

function generatePokemon(id){
    getPokemonFromApi(id).then(pokemon => {
        let result = new Pokemon(pokemon.forms[0].name
        ,pokemon.sprites.front_default
        ,pokemon.stats[0].base_stat
        ,pokemon.stats[1].base_stat
        ,pokemon.stats[2].base_stat
        ,pokemon.stats[5].base_stat)
        G1pokemon.push(result)
    })
}

function returnPokelist(){
    console.log(G1pokemon);
}