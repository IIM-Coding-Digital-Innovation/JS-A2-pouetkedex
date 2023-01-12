let mewtwoCounter = 1

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
console.log(G1pokemon)

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

function generateMewtwo(){
    let mewtwo = new Pokemon('Mewtwo-'+mewtwoCounter,
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
    randomBetween(40,60),
    randomBetween(30,50),
    randomBetween(20,50),
    randomBetween(70,100))
    document.getElementById('generateMewtwoImage').style.backgroundImage = "url("+mewtwo.img+")"
    document.getElementById('mewtwoName').innerHTML = 'name : '+mewtwo.name
    document.getElementById('mewtwoHp').innerHTML = 'hp : '+mewtwo.hp
    document.getElementById('mewtwoAttack').innerHTML = 'attack : '+mewtwo.attack
    document.getElementById('mewtwoDefense').innerHTML = 'defense : '+mewtwo.defense
    document.getElementById('mewtwoSpeed').innerHTML = 'speed : '+mewtwo.speed
    createCombatButton(0)
    mewtwoCounter ++
}

function createCombatButton(destroy){
    let combatMod = document.getElementById('combatMod')
    let check = document.getElementById('combatButton');
    if(destroy == 1){
        check.remove()
    }else{
        if(check == null){
            let combatButton = document.createElement("button");
            combatButton.id = "combatButton";
            combatButton.innerText = "Start Fight"
            combatMod.appendChild(combatButton);
        }
    }
}

function createEvolutionButton(){
    let combatMod = document.getElementById('combatMod')
    combatMod
}

function destroyMewtwo(){
    delete mewtwo
    document.getElementById('combatButton').destroy()
    document.getElementById('evolutionButton').destroy()
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  