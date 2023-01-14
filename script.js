let mewtwoCounter = 1
let evolutionToken = 0
let modeSelected = ''
let G1pokemon = []
let mewtwo = ''
let enemy = ''
let difficultyPercentage = 0
let combatStarted = 0
let pokedexMode = 'pokedex'
let bossLevel = 1
let bossfight = 0

document.getElementById('evolutionTokens').innerHTML = evolutionToken

var shiny = ['s','h','i','n','y'];
var homelander = ['h','o','m','e','l','a','n','d','e','r'];
var currentShiny = 0;
var currenthomelander = 0;

var shinyDetector = function (event) {
	if (shiny.indexOf(event.key) < 0 || event.key !== shiny[currentShiny] || shiny.length < currentShiny) {
		current = 0;
		return;
	}
	currentShiny++;
	if (shiny.length === currentShiny) {
		currentShiny = 0;
        let shinySound = document.querySelector('#oh_shiny')
        shinySound.currentTime = 0
        shinySound.play()
        generateMewtwo()
        mewtwo.img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png'
        document.getElementById('generate_mewtwo_img').src = mewtwo.img
        document.getElementById('generate_mewtwo_stats').innerHTML = `name : ${mewtwo.name}<br>hp : ${mewtwo.hp}<br>attack : ${mewtwo.attack}<br>defense : ${mewtwo.defense}<br>speed : ${mewtwo.speed}`
	}
};

var homelanderDetector = function (event) {
	if (homelander.indexOf(event.key) < 0 || event.key !== homelander[currenthomelander] || homelander.length < currenthomelander) {
		currenthomelander = 0;
		return;
	}
	currenthomelander++;
	if (homelander.length === currenthomelander) {
		currenthomelander = 0;
        let homelanderSound = document.querySelector('#homelander')
        homelanderSound.currentTime = 0
        homelanderSound.play()
        generateMewtwo()
        mewtwo.img = './imgs/homelander.png'
        mewtwo.name = 'Homelander'
        mewtwo.hp = 100000
        mewtwo.attack = 100000
        mewtwo.defense = 100000
        mewtwo.speed = 100000
        document.getElementById('generate_mewtwo_img').src = mewtwo.img
        document.getElementById('generate_mewtwo_stats').innerHTML = `name : ${mewtwo.name}<br>hp : ${mewtwo.hp}<br>attack : ${mewtwo.attack}<br>defense : ${mewtwo.defense}<br>speed : ${mewtwo.speed}`
	}
};
document.addEventListener('keydown', shinyDetector, false);
document.addEventListener('keydown', homelanderDetector, false);

class Pokemon{
    constructor(name,hp,attack,defense,speed,img){
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.img = img;
    }
}

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
        ,pokemon.stats[0].base_stat
        ,pokemon.stats[1].base_stat
        ,pokemon.stats[2].base_stat
        ,pokemon.stats[5].base_stat,
        pokemon.sprites.front_default)
        G1pokemon.push(result)
    })
}

function generateMewtwo(){
    combatStarted = 0
    let min = 50
    let max = 90
    mewtwo = new Pokemon('Mewtwo-'+mewtwoCounter,
    randomBetween(min,max),
    randomBetween(min,max),
    randomBetween(min,max),
    randomBetween(min,max),
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png')
    
    document.getElementById('generate_mewtwo_img').src = mewtwo.img
    document.getElementById('generate_mewtwo_stats').innerHTML = `name : ${mewtwo.name}<br>hp : ${mewtwo.hp}<br>attack : ${mewtwo.attack}<br>defense : ${mewtwo.defense}<br>speed : ${mewtwo.speed}`

    mewtwoCounter ++
    clearZones('evolution')
    clearZones('combat')
}

function createEvolutionButton(){
    let combatMod = document.getElementById('combatMod')
    combatMod
}

function clearZones(name){
    if(name != ''){
        if(name == 'evolution'){
            document.getElementById('evolution_mewtwo_img').src = ''
            document.getElementById('evolution_mewtwo_stats').innerHTML = ''
        }else if(name == 'combat'){
            document.getElementById('combat_mewtwo_img').src = ''
            document.getElementById('combat_mewtwo_stats').innerHTML = ''
            document.getElementById('combat_enemy_img').src = ''
            document.getElementById('combat_enemy_stats').innerHTML = ''
        }else if(name == 'generate'){
            document.getElementById('generate_mewtwo_img').src = ''
            document.getElementById('generate_mewtwo_stats').innerHTML = ''
        }
    }
}
function switchToEvolution(){
    if(mewtwo != ''){
        combatStarted = 0
        modeSelected = 'evolution'
        clearZones('generate')
        clearZones('combat')
        document.getElementById('tokenNumber').value = evolutionToken
    
        document.getElementById('evolution_mewtwo_img').src = mewtwo.img
        document.getElementById('evolution_mewtwo_stats').innerHTML = `name : ${mewtwo.name}<br>hp : ${mewtwo.hp}<br>attack : ${mewtwo.attack}<br>defense : ${mewtwo.defense}<br>speed : ${mewtwo.speed}`    
    }
}

function difficultyScaling(mewtowAttack){
    if(mewtowAttack > 60){
        return 0.05
    }else if(mewtowAttack > 100){
        return 0.1
    }else if(mewtowAttack > 130){
        return 0.15
    }else if(mewtowAttack > 180){
        return 0.25
    }else if(mewtowAttack > 250){
        return 0.5
    }else if(mewtowAttack > 400){
        return 0.8
    }else{
        return 0
    }
}

async function startEvolution(){
    let tokenNumber = document.getElementById('tokenNumber').value
    if(tokenNumber <= evolutionToken && tokenNumber != 0 && modeSelected == 'evolution'){
        evolutionToken -= tokenNumber
        document.getElementById('evolutionTokens').innerHTML = evolutionToken
        
        enemy = G1pokemon[randomBetween(0,149)]
        difficultyPercentage = difficultyScaling(mewtwo.attack)

        document.getElementById('evolution_enemy_img').src = enemy.img
        document.getElementById('evolution_enemy_stats').innerHTML = `name : ${enemy.name}<br>hp : ${enemy.hp}<br>attack : ${enemy.attack}<br>defense : ${enemy.defense}<br>speed : ${enemy.speed}`

        let mewtwoGainedHp = 0
        let mewtwoGainedAttack = 0
        let mewtwoGainedDefense = 0
        let mewtwoGainedSpeed = 0

        let percentageGained = 0.05

        while(0 < tokenNumber){
            console.log(tokenNumber+' token(s) left')
            await delay(200);
            enemy = G1pokemon[randomBetween(0,149)]
            difficultyPercentage = difficultyScaling(mewtwo.attack)

            document.getElementById('evolution_enemy_img').src = enemy.img
            document.getElementById('evolution_enemy_stats').innerHTML = `name : ${enemy.name}<br>hp : ${enemy.hp}<br>attack : ${enemy.attack}<br>defense : ${enemy.defense}<br>speed : ${enemy.speed}`

            mewtwo.hp += Math.round(enemy.hp*percentageGained)
            mewtwo.attack += Math.round(enemy.attack*percentageGained)
            mewtwo.defense += Math.round(enemy.defense*percentageGained)
            mewtwo.speed += Math.round(enemy.speed*percentageGained)

            mewtwoGainedHp += Math.round(enemy.hp*percentageGained)
            mewtwoGainedAttack += Math.round(enemy.attack*percentageGained)
            mewtwoGainedDefense += Math.round(enemy.defense*percentageGained)
            mewtwoGainedSpeed += Math.round(enemy.speed*percentageGained)

            document.getElementById('evolution_mewtwo_img').src = mewtwo.img
            document.getElementById('evolution_mewtwo_stats').innerHTML = `name : ${mewtwo.name}<br>hp : ${mewtwo.hp}<br>attack : ${mewtwo.attack}<br>defense : ${mewtwo.defense}<br>speed : ${mewtwo.speed}`

            console.log('Mewtwo evolved \n(+'+Math.round(enemy.hp*percentageGained)+' hp|+'+Math.round(enemy.attack)+' attack|+'+Math.round(enemy.defense)+' defense|+'+Math.round(enemy.speed)+' speed)')

            tokenNumber--
            document.getElementById('tokenNumber').value = tokenNumber
            if(tokenNumber <= 0){
                break
            }
        }
        document.getElementById('evolution_enemy_img').src = ''
        document.getElementById('evolution_enemy_stats').innerHTML = ''
        
        console.log('### Evolution process finished ### \n'
        +'Total Gained Stats :\n(+'+mewtwoGainedHp+' hp|+'+mewtwoGainedAttack+' attack|+'+mewtwoGainedDefense+' defense|+'+mewtwoGainedSpeed+' speed|)')
        mewtwoGainedHp = 0
        mewtwoGainedAttack = 0
        mewtwoGainedDefense = 0
        mewtwoGainedSpeed = 0
    }
}

function addtoken(){
    evolutionToken += 1
    document.getElementById('evolutionTokens').innerHTML = evolutionToken
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function escapeCombat(){
    if(combatStarted == 1){
        enemy = G1pokemon[randomBetween(0,149)]
        document.getElementById('combat_enemy_img').src = enemy.img
        document.getElementById('combat_enemy_stats').innerHTML = ''
        difficultyPercentage = difficultyScaling(mewtwo.attack)
    }
}

function switchToCombat(){
    if(mewtwo != ''){
        combatStarted = 1
        enemy = G1pokemon[randomBetween(0,149)]
        difficultyPercentage = difficultyScaling(mewtwo.attack)

        enemy.hp += Math.round(enemy.hp*difficultyPercentage)
        enemy.attack += Math.round(enemy.attack*difficultyPercentage)
        enemy.defense += Math.round(enemy.defense*difficultyPercentage)
        enemy.speed += Math.round(enemy.speed*difficultyPercentage)

        modeSelected = 'combat'
        clearZones('generate')
        clearZones('evolution')
        if(mewtwo.img != './imgs/homelander.png'){
            if(mewtwo.img != 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png'){
                document.getElementById('combat_mewtwo_img').src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/150.png'
            }else{
                document.getElementById('combat_mewtwo_img').src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/150.png'
            }
        }else{
            document.getElementById('combat_mewtwo_img').src = './imgs/homelander.png'
        }
        document.getElementById('combat_mewtwo_stats').innerHTML = `name : ${mewtwo.name}<br>hp : ${mewtwo.hp}<br>attack : ${mewtwo.attack}<br>defense : ${mewtwo.defense}<br>speed : ${mewtwo.speed}`
        document.getElementById('combat_enemy_img').src = enemy.img
    }
}

async function startCombat(){
    if(combatStarted == 1 || bossfight == 1){
        combatStarted = 2

        console.log(enemy)

        document.getElementById('combat_enemy_stats').innerHTML = `name : ${enemy.name}<br>hp : ${enemy.hp}<br>attack : ${enemy.attack}<br>defense : ${enemy.defense}<br>speed : ${enemy.speed}`

        let saveMewtwoHp = mewtwo.hp

        while(mewtwo.hp >= 0 && enemy.hp >= 0){
            if(mewtwo.speed <= enemy.speed){
                if(mewtwo.defense - enemy.attack < 0){
                    mewtwo.hp -= Math.abs(mewtwo.defense - enemy.attack)
                }else{
                    mewtwo.hp -= Math.round(enemy.attack*0.1)
                }
                if(mewtwo.hp <= 0){
                    mewtwo.hp = 0
                    break
                }else{
                    if(enemy.defense - mewtwo.attack < 0){
                        enemy.hp -= Math.abs(enemy.defense - mewtwo.attack)
                    }else{
                        enemy.hp -= Math.round(mewtwo.attack*0.1)
                    }
                    if(enemy.hp <= 0){
                        enemy.hp = 0
                        break
                    }
                }
            }else{
                if(enemy.defense - mewtwo.attack < 0){
                    enemy.hp -= Math.abs(enemy.defense - mewtwo.attack)
                }else{
                    enemy.hp -= Math.round(mewtwo.attack*0.1)
                }
                if(enemy.hp <= 0){
                    enemy.hp = 0
                    break
                }else{
                    if(mewtwo.defense - enemy.attack < 0){
                        mewtwo.hp -= Math.abs(mewtwo.defense - enemy.attack)
                    }else{
                        mewtwo.hp -= Math.round(enemy.attack*0.1)
                    }
                    if(mewtwo.hp <= 0){
                        mewtwo.hp = 0
                        break
                    }
                }
            }
        }
        combatStarted = 1
        if(mewtwo.hp <= 0){
            await delay(1000)
            generateMewtwo()
            document.getElementById('combat_mewtwo_stats').innerHTML = ''
            
            document.getElementById('combat_enemy_img').src = ''
            document.getElementById('combat_enemy_stats').innerHTML = ''

            evolutionToken = 0
            document.getElementById('evolutionTokens').innerHTML = evolutionToken
        }else{
            mewtwo.hp = saveMewtwoHp
            if(mewtwo.img == './imgs/homelander.png'){
                let homelanderAttackSound = document.querySelector('#homelander_attack')
                homelanderAttackSound.currentTime = 0
                homelanderAttackSound.play()
                await delay(100)
                document.getElementById('combat_mewtwo_img').src = './imgs/homelander_laser_eyes.png'
                await delay(300)
                document.getElementById('combat_mewtwo_img').src = './imgs/homelander.png'
            }else{
                await delay(1000)
            }
            escapeCombat()
            if(bossfight == 1){
                evolutionToken += 10
                bossLevel++
                if(bossLevel <= 6){
                    document.getElementById('boss_'+bossLevel).style.backgroundColor = ''
                }else if(bossLevel >= 6){
                    alert("Well done you beat them all !");
                }
                bossfight = 0
            }else{
                evolutionToken++
            }
            document.getElementById('evolutionTokens').innerHTML = evolutionToken
        }
    }
}

let pokeId = 0
let pouet = []
let ImgRandomPokemon = document.querySelector('.img-view')
let guessName = document.querySelector('.afficher')

function switchPokedexMode(mode){
    pokedexMode = mode
    ImgRandomPokemon.innerHTML = ''
    guessName.innerHTML = ''
    ImgRandomPokemon.style.filter = 'brightness(100%)'
    if(mode == 'guess'){
        pouet = []
        document.getElementById("pokedexInput").innerHTML = ''
        ImgRandomPokemon.style.filter = 'brightness(0%)'
        let guessSound = document.querySelector('#guess')
        pokeId = randomBetween(1,900)
        getRandom()
        guessSound.currentTime = 0
        guessSound.play()
        console.log(pokeId)
    }
}

let checkEnter = document.getElementById("pokedexInput")
checkEnter.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if(pokedexMode == 'pokedex'){
            getPokemonPokedex()
        }else if(pokedexMode == 'guess'){
            console.log(checkEnter.value)
            if (checkEnter.value == pouet[0]) {
                guessName.innerHTML += `<h2>🎉It's ${pouet} !👏</h2>`
                ImgRandomPokemon.style.filter = 'brightness(100%)'
            }
        }
    }
});

async function getPokemonPokedex() {
    let pokeId = document.getElementById('pokedexInput').value
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
        <img src="${pokemon['sprites']['front_default']}" alt="" id="pokemon" height="250px">
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

async function getRandom() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokeId.toString();
    console.log(url);

    let res = await fetch(url);
    let pokemon = await res.json();

    console.log(pokemon);
    console.log(pokemon['name']);
    ImgRandomPokemon.innerHTML = `
        <img src="${pokemon['sprites']['front_default']}" alt="" id="pokemon" height="250px">
    `
    pouet.push(pokemon['name'])
    console.log(pouet)
    return pokemon
}

let boss_1 = new Pokemon('Entei',250,200,180,100,'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png')
let boss_2 = new Pokemon('Dialga',400,350,360,250,'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png')
let boss_3 = new Pokemon('Giratina',650,580,600,300,'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png')
let boss_4 = new Pokemon('Regigigas',900,1000,970,400,'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/486.png')
let boss_5 = new Pokemon('Rayquaza',1200,1425,1305,1200,'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png')
let boss_6 = new Pokemon('Groudon',1800,1675,1980,300,'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png')

function boss(bossNum){
    if(mewtwo != '' && bossNum == bossLevel){
        switch(bossNum){
            case 1:
                enemy = boss_1;
                let enteiSound = document.querySelector('#entei')
                enteiSound.currentTime = 0
                enteiSound.play()
                break;
            case 2:
                enemy = boss_2;
                let dialgaSound = document.querySelector('#dialga')
                dialgaSound.currentTime = 0
                dialgaSound.play()
                break;
            case 3:
                enemy = boss_3;
                let giratinaSound = document.querySelector('#giratina')
                giratinaSound.currentTime = 0
                giratinaSound.play()
                break;
            case 4:
                enemy = boss_4;
                let regigigasSound = document.querySelector('#regigigas')
                regigigasSound.currentTime = 0
                regigigasSound.play()
                break;
            case 5:
                enemy = boss_5;
                let rayquazaSound = document.querySelector('#rayquaza')
                rayquazaSound.currentTime = 0
                rayquazaSound.play()
                break;
            case 6:
                enemy = boss_6;
                let groudonSound = document.querySelector('#groudon')
                groudonSound.currentTime = 0
                groudonSound.play()
                break;
        }
        bossfight = 1
        modeSelected = 'combat'
        clearZones('generate')
        clearZones('evolution')
        if(mewtwo.img != './imgs/homelander.png'){
            if(mewtwo.img != 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png'){
                document.getElementById('combat_mewtwo_img').src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/150.png'
            }else{
                document.getElementById('combat_mewtwo_img').src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/150.png'
            }
        }else{
            document.getElementById('combat_mewtwo_img').src = './imgs/homelander.png'
        }
        document.getElementById('combat_mewtwo_stats').innerHTML = `name : ${mewtwo.name}<br>hp : ${mewtwo.hp}<br>attack : ${mewtwo.attack}<br>defense : ${mewtwo.defense}<br>speed : ${mewtwo.speed}`
        document.getElementById('combat_enemy_stats').innerHTML = `name : ${enemy.name}<br>hp : ${enemy.hp}<br>attack : ${enemy.attack}<br>defense : ${enemy.defense}<br>speed : ${enemy.speed}`
        document.getElementById('combat_enemy_img').src = enemy.img
    }
}