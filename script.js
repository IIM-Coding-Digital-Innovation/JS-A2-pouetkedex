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

let evolutionToken = 0
let modeSelected = ''

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

let mewtwo = new Pokemon('Mewtwo',50,50,50,50,
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png')

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

function switchToEvolution(){
    modeSelected = 'evolution'
    for(const key in mewtwo){
        if(key == 'img'){
            continue
        }
        document.getElementById('mewtwo' + key).innerHTML = `${key} : `+mewtwo[key]
    }
}

async function startEvolution(){
    let tokenNumber = document.getElementById('tokenNumber').value
    if(tokenNumber <= evolutionToken && tokenNumber != 0 && modeSelected == 'evolution'){
        evolutionToken -= tokenNumber
        document.getElementById('evolutionTokens').innerHTML = evolutionToken
        let enemy = new Pokemon('Ennemy',randomBetween(10,100),randomBetween(10,100),randomBetween(10,100),randomBetween(10,100),
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png')
        saveEnemy = enemy
        for(const key in enemy){
            if(key == 'img'){
                continue
            }
            document.getElementById('enemy' + key).innerHTML = `${key} : `+enemy[key]
        }
        saveMewtwoHp = mewtwo.hp

        let mewtwoGainedHp = 0
        let mewtwoGainedAttack = 0
        let mewtwoGainedDefense = 0
        let mewtwoGainedSpeed = 0

        let percentageGained = 0.06

        while(0 < tokenNumber){
            console.log(tokenNumber+' token(s) left')
            console.log(saveEnemy.hp)
            await delay(200);
            while(mewtwo.hp > 0){
                if(enemy.hp <= 0){
                    delete enemy
                    delete saveEnemy
                    enemy = new Pokemon('Ennemy',randomBetween(10,100),randomBetween(10,100),randomBetween(10,100),randomBetween(10,100),
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png')
                    saveEnemy = enemy
                    for(const key in enemy){
                        if(key == 'img'){
                            continue
                        }
                        document.getElementById('enemy' + key).innerHTML = `${key} : `+enemy[key]
                    }
                    console.log(saveEnemy.hp)
                    mewtwo.hp = saveMewtwoHp
                    console.log('Mewtwo won')
                    await delay(200);
                }

                if(mewtwo.speed <= enemy.speed){
                    if(mewtwo.defense - enemy.attack < 0){
                        mewtwo.hp -= Math.abs(mewtwo.defense - enemy.attack)
                    }else{
                        mewtwo.hp -= Math.round(enemy.attack*0.1)
                    }
                    if(mewtwo.hp <= 0){
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
                            break
                        }
                    }
                }
            }
            console.log(saveEnemy)
            saveMewtwoHp += Math.round(saveEnemy.hp*percentageGained)
            mewtwo.hp = saveMewtwoHp
            mewtwo.attack += Math.round(saveEnemy.attack*percentageGained)
            mewtwo.defense += Math.round(saveEnemy.defense*percentageGained)
            mewtwo.speed += Math.round(saveEnemy.speed*percentageGained)

            mewtwoGainedHp += Math.round(saveEnemy.hp*percentageGained)
            mewtwoGainedAttack += Math.round(saveEnemy.attack*percentageGained)
            mewtwoGainedDefense += Math.round(saveEnemy.defense*percentageGained)
            mewtwoGainedSpeed += Math.round(saveEnemy.speed*percentageGained)

            for(const key in mewtwo){
                if(key == 'img'){
                    continue
                }
                document.getElementById('mewtwo' + key).innerHTML = `${key} : `+mewtwo[key]
            }
            console.log('Mewtwo lost but evolved \n(+'+Math.round(saveEnemy.hp*percentageGained)+' hp|+'+Math.round(saveEnemy.attack*percentageGained)+' attack|+'+Math.round(saveEnemy.defense*percentageGained)+' defense|+'+Math.round(saveEnemy.speed*percentageGained)+' speed)')

            tokenNumber--
            if(tokenNumber <= 0){
                break
            }
        }
        for(const key in enemy){
            if(key == 'img'){
                continue
            }
            document.getElementById('enemy' + key).innerHTML = ''
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