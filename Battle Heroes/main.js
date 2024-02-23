let heroes = [];
let enemies = [];

let selectedHero;
let selectedEnemy;
let heroAction;
let enemyAction;

async function getData() {
    let response = await fetch("http://localhost/Programming-Practice/Battle%20Heroes/battle-config.json");
    let data = await response.json();
    heroes = data.heroes;
    enemies = data.enemies;

    displayAll();
}

function displayAll() {
    heroContainer.innerHTML = "<h1>Heroes</h1>";
    enemyContainer.innerHTML = "<h1>Enemies</h1>";

    for (let hero of heroes) {
        heroContainer.innerHTML += `
        <div class="hero ${hero.status}" onclick="selectHero(${hero.id})">
            <div>
                <h2>${hero.name}</h2>
                <p>HP: ${hero.specs.hp}</p>
                <p>Attack: ${hero.specs.attack}</p>
                <p>Defense: ${hero.specs.defense}</p>
            </div>
            <div class="btnItem ${hero.btnshow}">
                <button onclick="heroAttackAction('heroAttacking')">Attack</button>
                <button onclick="heroAttackAction('heroDefending')">Defend</button>
            </div>
        </div>
        `;
    }

    for (let enemy of enemies) {
        enemyContainer.innerHTML += `
        <div class="enemy ${enemy.status}" onclick="selectEnemy(${enemy.id})">
            <div>
                <h2>${enemy.name}</h2>
                <p>HP: ${enemy.specs.hp}</p>
                <p>Attack: ${enemy.specs.attack}</p>
            </div>
            <div class="btnItem ${enemy.btnshow}">
            <button onclick="enemtAttackAction('enemyAttacking')">Attack</button>
            <button onclick="enemtAttackAction('enemyDefending')">Defend</button>
            </div>
        </div>
        `;
    }
}

function selectHero(id) {
    for(hero of heroes) {
        if (hero.id == id) {
            hero.status = "selected";
            hero.btnshow = "showBtn";

            selectedHero = hero;
        } else {
            hero.status = "";
            hero.btnshow = "";
        }
    }
    console.log(selectedHero);

    displayAll();
}
function selectEnemy(id) {
    for(enemy of enemies) {
        if (enemy.id == id) {
            enemy.status = "selected";
            enemy.btnshow = "showBtn";

            selectedEnemy = enemy;
        } else {
            enemy.status = "";
            enemy.btnshow = "";
        }
    }
    console.log(selectedEnemy);
    displayAll();
}

function attack() {
    if(!selectedHero || !selectedEnemy) {
        alert("No Hero/Enemy Selected");
        return;
    } else if (!heroAction || !enemyAction) {
        alert("no action selected");
        return;
    } 

    if(heroAction == "heroAttacking" && enemyAction == "enemyDefending") {
        if (selectedEnemy.specs.hp <= 0) {
            alert("The Enemy is already Dead!");
        } else if(selectedEnemy.specs.hp > 0) {
            selectedEnemy.specs.hp -= selectedHero.specs.hp;
            if(selectedEnemy.specs.hp <= 0){
                selectedEnemy.specs.hp = 0; 
            }
        }
    } else if(heroAction == "heroAttacking" && enemyAction == "enemyAttacking") {
        if(selectedEnemy.specs.hp <= 0 || selectedHero.specs.hp <= 0) {
            alert("One of them is already Dead")
        } else if (selectedHero.specs.hp > 0 && selectedEnemy.specs.hp > 0) {
            selectedEnemy.specs.hp -= selectedHero.specs.hp;
            selectedHero.specs.hp -= selectedEnemy.specs.hp;
            if(selectedHero.specs.hp < 0) {
                selectedHero.specs.hp = 0;
            } else if(selectedEnemy.specs.hp < 0) {
                selectedEnemy.specs.hp = 0;
            }
        }
    } else if(heroAction == "heroDefending" && enemyAction == "enemyAttacking") {
        selectedHero.specs.attack -= selectedEnemy.specs.hp;
    } else {
        alert("Hahaha both of them is Defending!")
    }



    displayAll();
}

function heroAttackAction(action) {
    if(action == 'heroAttacking') {
        heroDisplayContainer.innerHTML = "<h1>Attacking</h1>";
        heroDisplayContainer.innerHTML += `
        <div>
        <h2>${selectedHero.name}</h2>
        <p>HP: ${selectedHero.specs.hp}</p>
        <p>Attack: ${selectedHero.specs.attack}</p>
        <p>Defense: ${selectedHero.specs.defense}</p>
        </div>
        `;
        heroAction = "heroAttacking";
    } 
    else if (action == 'heroDefending') {
        heroDisplayContainer.innerHTML = "<h1>Defending</h1>";
        heroDisplayContainer.innerHTML += `
        <div>
        <h2>${selectedHero.name}</h2>
        <p>HP: ${selectedHero.specs.hp}</p>
        <p>Attack: ${selectedHero.specs.attack}</p>
        <p>Defense: ${selectedHero.specs.defense}</p>
        </div>
        `;
        heroAction = "heroDefending";
    } 
}

function enemtAttackAction(action) {
    if(action == 'enemyAttacking') {
        enemyDisplayContainer.innerHTML = "<h1>Attacking</h1>";
        enemyDisplayContainer.innerHTML += `
        <div>
        <h2>${selectedEnemy.name}</h2>
        <p>HP: ${selectedEnemy.specs.hp}</p>
        <p>Attack: ${selectedEnemy.specs.attack}</p>
        <p>Defense: ${selectedEnemy.specs.defense}</p>
        </div>
        `;
        enemyAction = "enemyAttacking";
    } 
    else if (action == 'enemyDefending') {
        enemyDisplayContainer.innerHTML = "<h1>Defending</h1>";
        enemyDisplayContainer.innerHTML += `
        <div>
        <h2>${selectedEnemy.name}</h2>
        <p>HP: ${selectedEnemy.specs.hp}</p>
        <p>Attack: ${selectedEnemy.specs.attack}</p>
        <p>Defense: ${selectedEnemy.specs.defense}</p>
        </div>
        `;
        enemyAction = "enemyDefending";
    }

}

getData();