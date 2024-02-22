let heroes = [];
let enemies = [];
async function getData() {
    let response = await fetch("http://localhost/Programming-Practice/Battle%20Heroes/battle-config.json");
    let data = await response.json();
    heroes = data.heroes;
    enemies = data.enemies;

    console.log(heroes);
    displayAll();
}

function displayAll() {
    heroContainer.innerHTML = "<h1>Heroes</h1>";
    enemyContainer.innerHTML = "<h1>Enemies</h1>";

    for (let hero of heroes) {
        heroContainer.innerHTML += `
        <div class="hero ${hero.status}" onclick="selectHero(${hero.id})">
            <h2>${hero.name}</h2>
            <p>HP: ${hero.specs.hp}</p>
            <p>Attack: ${hero.specs.attack}</p>
            <p>Defense: ${hero.specs.defense}</p>
        </div>
        `;
    }

    for (let enemy of enemies) {
        enemyContainer.innerHTML += `
        <div class="enemy ${enemy.status}" onclick="selectEnemy(${enemy.id})">
            <h2>${enemy.name}</h2>
            <p>HP: ${enemy.specs.hp}</p>
            <p>Attack: ${enemy.specs.attack}</p>
            <p>Defense: ${enemy.specs.defense}</p>
        </div>
        `;
    }
}

function selectHero(id) {
    for(hero of heroes) {
        if (hero.id == id) {
            hero.status = "selected"
        } else {
            hero.status = "";
        }
    }
    displayAll();
}
function selectEnemy(id) {
    for(enemy of enemies) {
        if (enemy.id == id) {
            enemy.status = "selected"
        } else {
            enemy.status = "";
        }
    }
    displayAll();
}
getData();