let PokemonRandomBtn = document.querySelector("#RandomPokemonBtn")
let pokeId = 0
let Whos = document.querySelector('#whos')
let pouet = []
let whos_answer = document.querySelector('.whos-answer')
let ImgRandomPokemon = document.querySelector('#randomPokemon')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

PokemonRandomBtn.addEventListener("click", function(){
    pouet = []
    whos_answer.innerHTML = ''
    ImgRandomPokemon.style.filter = 'brightness(0%)'
    let guessSound = document.querySelector('#guess')
    pokeId = getRandomInt(900)
    getRandom()
    guessSound.currentTime = 0
    guessSound.play()
    console.log(getRandomInt(900))
})

async function getRandom() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokeId.toString();
    console.log(url);

    let res = await fetch(url);
    let pokemon = await res.json();

    console.log(pokemon);
    console.log(pokemon['name']);
    document.getElementById('randomPokemon').src = pokemon['sprites']['front_default']
    pouet.push(pokemon['name'])
    console.log(pouet)
    return pokemon
}

Whos.addEventListener("keydown", function(){
    console.log(Whos.value)
    if (Whos.value == pouet[0]) {
        whos_answer.innerHTML += `<h2>🎉It's ${pouet} !👏</h2>`
        ImgRandomPokemon.style.filter = 'brightness(100%)'
    }
})