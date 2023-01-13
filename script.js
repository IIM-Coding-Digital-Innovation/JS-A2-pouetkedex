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

let count = 0
let fight_started = 0
let mewValue = []

let mew = document.querySelector('.mew')
let btn_fight = document.querySelector('.fight')
let generate = document.querySelector('.generate')
let btn_show = document.querySelector('.show')
let btn_escape = document.querySelector('.escape')
let enemy_display = document.querySelector('.enemy')

let combat = []
let turn = 0
let turn_start = 0
let evo_token = 0
function fight() {

    generate.addEventListener('click', e => {
        mewValue = []

        let mewObject = new Pokemon(
            'Mew',
            100 + count,
            10 + count,
            15 + count,
            5 + count,
            'url'
            )

        mew.innerHTML = `
        <img src="${mewObject.img}" alt="le mew">
        <div>
            <p>Name : ${mewObject.name}</p>
            <p class="mew_hp">Hp : ${mewObject.hp}</p>
            <p>Attack : ${mewObject.attack}</p>
            <p>Defense : ${mewObject.defense}</p>
            <p>Speed : ${mewObject.speed}</p>
        </div>
        `

        count ++
        mewValue.push(mewObject)

        console.log(mewValue)

        btn_show.classList.remove('hidden')
    })

    btn_show.addEventListener('click', e => {
        generateEnemy()
        generate.classList.add('hidden')
        btn_show.classList.add('hidden')
        btn_fight.classList.remove('hidden')
        btn_escape.classList.remove('hidden')

        enemy_display.innerHTML = ""
        enemy_display.innerHTML += `
            <img src="${enemyList[0].img}" alt="lenemi" class="overlay">
            `
    })

    btn_escape.addEventListener('click', e => {
        generateEnemy()

        enemy_display.innerHTML = ""
        enemy_display.innerHTML += `
            <img src="${enemyList[0].img}" alt="lenemi" class="overlay">
            `
    })

    btn_fight.addEventListener('click', e => {

        if (fight_started === 0) {

            btn_escape.classList.add('hidden')
            let overlay = document.querySelector('.overlay')
            overlay.style.filter = 'brightness(100%)'

            enemy_display.innerHTML +=`
            <div>
                <p>Name : ${enemyList[0].name}</p>
                <p class="enemy_hp">Hp : ${enemyList[0].hp}</p>
                <p>Attack : ${enemyList[0].attack}</p>
                <p>Defense : ${enemyList[0].defense}</p>
                <p>Speed : ${enemyList[0].speed}</p>
            </div>
            `

            fight_started = 1
            combat.push(mewValue[0], enemyList[0])

            console.log(combat)

        } else {
            if (combat[0].hp > 0) {
                if (combat[1].hp > 0) {

                    if (combat[0].speed >= combat[1].speed && turn_start === 0) {
                        turn = 0
                        turn_start = 1
                    }

                    if (turn === 0) {
                        console.log('mew attack')
                        turn = 1

                        if (combat[0].attack <= combat[1].defense) {
                            console.log('condition attack reduite')
                            combat[1].hp -= Math.round(combat[0].attack / 10)
                            let enemy_hp = document.querySelector('.enemy_hp')
                            enemy_hp.innerHTML = `Hp : ${combat[1].hp}`
                        } else {
                            combat[1].hp -= combat[0].attack - combat[1].defense
                            let enemy_hp = document.querySelector('.enemy_hp')
                            enemy_hp.innerHTML = `Hp : ${combat[1].hp}`
                        }
                    } else {
                        console.log('enemy commence attack')
                        turn = 0

                        if (combat[1].attack <= combat[0].defense) {
                            console.log('condition attack reduite')
                            combat[0].hp -= Math.round(combat[1].attack / 10)
                            let mew_hp = document.querySelector('.mew_hp')
                            mew_hp.innerHTML = `Hp : ${combat[0].hp}`
                        } else {
                            combat[0].hp -= combat[1].attack - combat[0].defense
                            let mew_hp = document.querySelector('.mew_hp')
                            mew_hp.innerHTML = `Hp : ${combat[0].hp}`
                        }
                    }
                }
            }
        }

        if (combat[0].hp <= 0) {
            console.log('Mew est mort')
            let mew_hp = document.querySelector('.mew_hp')
            mew_hp.innerHTML = `Hp : 0`
        }

        if (combat[1].hp <= 0) {
            console.log('Enemy est mort')
            let enemy_hp = document.querySelector('.enemy_hp')
            enemy_hp.innerHTML = `Hp : 0`
            evo_token ++
        }
    })

}

let enemyList = []

function generateEnemy() {
    enemyList = []

    let newEnemy = new Pokemon(
        'Enemy',
        50 + count,
        50 + count,
        5 + count,
        2 + count,
        'https://images.secretlab.co/theme/common/collab_pokemon_catalog_charizard-min.png'
    )

    count ++

    enemyList.push(newEnemy)
    console.log(enemyList)
}

fight()