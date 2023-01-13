let mewtwoCounter = 1
let evolutionToken = 0
let modeSelected = ''
let G1pokemon = []
let mewtwo = ''
let enemy = ''
let difficultyPercentage = 0
let combatStarted = 0

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

const isLocalStorageEnabled = () => {
    try {
      const key = `__storage__test`;
      window.localStorage.setItem(key, null);
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  };

  console.log('LS : '+isLocalStorageEnabled())

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
    let min = 80
    let max = 120
    mewtwo = new Pokemon('Mewtwo-'+mewtwoCounter,
    randomBetween(min,max),
    randomBetween(min,max),
    randomBetween(min,max),
    randomBetween(min,max),
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png')
    for(const key in mewtwo){
        if(key == 'img'){
            document.getElementById('generate_mewtwo_img').style.backgroundImage = "url("+mewtwo[key]+")"
        }else{
            document.getElementById('generate_mewtwo_' + key).innerHTML = `${key} : `+mewtwo[key]
        }
    }
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
            for(const key in mewtwo){
                evolution_mewtwo = document.getElementById('evolution_mewtwo_' + key)
                if(evolution_mewtwo != null){
                    evolution_mewtwo.innerHTML = ''
                }
                evolution_mewtwo = document.getElementById('evolution_mewtwo_' + key)
                if(evolution_mewtwo != null){
                    evolution_mewtwo.style.backgroundImage = ''
                }
            }
        }else if(name == 'combat'){
            for(const key in mewtwo){
                combat_mewtwo = document.getElementById('combat_mewtwo_' + key)
                if(combat_mewtwo != null){
                    combat_mewtwo.innerHTML = ''
                }
                combat_mewtwo = document.getElementById('combat_mewtwo_' + key)
                if(combat_mewtwo != null){
                    combat_mewtwo.style.backgroundImage = ''
                }
            }
        }else if(name == 'generate'){
            for(const key in mewtwo){
                generate_mewtwo = document.getElementById('generate_mewtwo_' + key)
                if(generate_mewtwo != null){
                    generate_mewtwo.innerHTML = ''
                }
                generate_mewtwo = document.getElementById('generate_mewtwo_' + key)
                if(generate_mewtwo != null){
                    generate_mewtwo.style.backgroundImage = ''
                }
            }
        }
    }
}
function switchToEvolution(){
    modeSelected = 'evolution'
    clearZones('generate')
    clearZones('combat')
    document.getElementById('tokenNumber').value = evolutionToken
    for(const key in mewtwo){
        if(key == 'img'){
            document.getElementById(modeSelected+'_mewtwo_' + key).style.backgroundImage = "url("+mewtwo[key]+")"
        }else{
            document.getElementById(modeSelected+'_mewtwo_' + key).innerHTML = `${key} : `+mewtwo[key]
        }
    }
}

function difficultyScaling(mewtowAttack){
    if(mewtwo.attack > 60){
        return 0.05
    }else if(mewtwo.attack > 100){
        return 0.1
    }else if(mewtwo.attack > 130){
        return 0.15
    }else if(mewtwo.attack > 180){
        return 0.25
    }else if(mewtwo.attack > 250){
        return 0.5
    }else if(mewtwo.attack > 400){
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
        for(const key in enemy){
            if(key == 'img'){
                document.getElementById('evolution_enemy_' + key).style.backgroundImage = "url("+enemy[key]+")"
            }else{
                if(key != 'name'){
                    enemy[key] += Math.round(mewtwo[key]*difficultyPercentage)
                }
                document.getElementById('evolution_enemy_' + key).innerHTML = `${key} : `+enemy[key]
            }
        }

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

            for(const key in enemy){
                if(key == 'img'){
                    document.getElementById('evolution_enemy_' + key).style.backgroundImage = "url("+enemy[key]+")"
                }else{
                    if(key != 'name'){
                        enemy[key] += Math.round(mewtwo[key]*difficultyPercentage)
                    }
                    document.getElementById('evolution_enemy_' + key).innerHTML = `${key} : `+enemy[key]
                }
            }

            mewtwo.hp += Math.round(enemy.hp*percentageGained)
            mewtwo.attack += Math.round(enemy.attack*percentageGained)
            mewtwo.defense += Math.round(enemy.defense*percentageGained)
            mewtwo.speed += Math.round(enemy.speed*percentageGained)

            mewtwoGainedHp += Math.round(enemy.hp*percentageGained)
            mewtwoGainedAttack += Math.round(enemy.attack*percentageGained)
            mewtwoGainedDefense += Math.round(enemy.defense*percentageGained)
            mewtwoGainedSpeed += Math.round(enemy.speed*percentageGained)

            for(const key in mewtwo){
                if(key == 'img'){
                    document.getElementById('evolution_mewtwo_' + key).style.backgroundImage = "url("+mewtwo[key]+")"
                }else{
                    document.getElementById('evolution_mewtwo_' + key).innerHTML = `${key} : `+mewtwo[key]
                }
            }
            console.log('Mewtwo evolved \n(+'+Math.round(enemy.hp*percentageGained)+' hp|+'+Math.round(enemy.attack*percentageGained)+' attack|+'+Math.round(enemy.defense*percentageGained)+' defense|+'+Math.round(enemy.speed*percentageGained)+' speed)')

            tokenNumber--
            document.getElementById('tokenNumber').value = tokenNumber
            if(tokenNumber <= 0){
                break
            }
        }
        for(const key in enemy){
            if(key == 'img'){
                document.getElementById('evolution_enemy_' + key).style.backgroundImage = ''
            }else{
                document.getElementById('evolution_enemy_' + key).innerHTML = ''
            }
        }
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
        difficultyPercentage = difficultyScaling(mewtwo.attack)
        document.getElementById('combat_enemy_img').style.backgroundImage = "url("+enemy.img+")"
    }
}

function switchToCombat(){
    combatStarted = 1
    enemy = G1pokemon[randomBetween(0,149)]
    difficultyPercentage = difficultyScaling(mewtwo.attack)
    modeSelected = 'combat'
    clearZones('generate')
    clearZones('evolution')
    for(const key in mewtwo){
        if(key == 'img'){
            document.getElementById(modeSelected+'_mewtwo_' + key).style.backgroundImage = "url("+mewtwo[key]+")"
        }else{
            document.getElementById(modeSelected+'_mewtwo_' + key).innerHTML = `${key} : `+mewtwo[key]
        }
    }
    // document.getElementById(modeSelected+'_enemy_img').style.backgroundImage = "url("+enemy.img+")"
    for(const key in enemy){
        if(key == 'img'){
            document.getElementById(modeSelected+'_enemy_' + key).style.backgroundImage = "url("+enemy[key]+")"
        }else{
            document.getElementById(modeSelected+'_enemy_' + key).innerHTML = `${key} : `+enemy[key]
        }
    }
}

async function startCombat(){
    combatStarted = 2
    for(const key in enemy){
        if(key == 'img'){
            continue
        }else{
            document.getElementById(modeSelected+'_enemy_' + key).innerHTML = `${key} : `+enemy[key]
        }
    }
    
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
                    continue
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
                continue
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
    combatStarted = 0
    if(mewtwo.hp == 0){
        for(const key in mewtwo){
            if(key == 'img'){
                document.getElementById(modeSelected+'_mewtwo_' + key).style.backgroundImage = "url("+mewtwo[key]+")"
            }else{
                document.getElementById(modeSelected+'_mewtwo_' + key).innerHTML = `${key} : `+mewtwo[key]
            }
        }
        await delay(1000)
        generateMewtwo()
        for(const key in mewtwo){
            if(key == 'img'){
                document.getElementById(modeSelected+'_mewtwo_' + key).style.backgroundImage = ''
            }else{
                document.getElementById(modeSelected+'_mewtwo_' + key).innerHTML = ''
            }
        }
        for(const key in enemy){
            if(key == 'img'){
                document.getElementById(modeSelected+'_enemy_' + key).style.backgroundImage = ''
            }else{
                document.getElementById(modeSelected+'_enemy_' + key).innerHTML = ''
            }
        }
    }else{
        for(const key in enemy){
            if(key == 'img'){
                document.getElementById(modeSelected+'_enemy_' + key).style.backgroundImage = "url("+enemy[key]+")"
            }else{
                document.getElementById(modeSelected+'_enemy_' + key).innerHTML = `${key} : `+enemy[key]
            }
        }
        await delay(1000)
        escapeCombat()
    }
}