let horses = document.querySelectorAll('.horse');
let scene1 = document.querySelector('.betting-container');
let scene2 = document.querySelector('.selection-container');
let scene3 = document.querySelector('.race-container');
let gameTimer = document.querySelector('.timer-container');
let resultContainer = document.querySelector('.result-container');
let myCoins = document.querySelector('.my-coins');

let pickCoin;
let pickBet;
let myCoinsStorage = 50;

function start() {
    let finished = false;
    let myInterval = setInterval(() => {
        horses.forEach((horse) => {
            if (!finished) {
                let span = horse.querySelector('span');
                let size = span.style.width || 0;

                size = parseInt(size);

                let width = Math.floor(Math.random() * 20) + 1;
                let result = width + size;

                span.style.width = result + "px";

                if (size >= 1240) {
                    finished = true;
                    resultContainer.classList.remove('hidden');
                    // scene3.classList.add('hidden'); 

                    span.style.backgroundColor = "#C70039";
                    span.style.color = "#fff";

                    if (span.innerText == pickBet) {
                        myCoinsStorage += pickCoin * 2;

                        resultContainer.innerHTML = `
                    <h1>Congratulations!</h1>
                    <img src="./img/confetti-cute.gif" alt="">
                    <p class="youWinText">You win!</p> 
                    <p>Winning Number: ${span.innerText}</p>
                    <p>Your Number: ${pickBet}</p>
                    <div onclick="startAgain()">Try Again</div>
                    `;
                    } else {
                        resultContainer.innerHTML = `
                    <h1>Im Sorry!</h1>
                    <img src="./img/sad-bunny.gif" alt="">
                    <p class="youWinText">You Lose!</p> 
                    <p>Winning Number: ${span.innerText}</p> 
                    <p>Your Number: ${pickBet}</p>
                    <div onclick="startAgain()">Try Again</div>
                    `;
                    }

                    clearInterval(myInterval);
                }
            }

        })

    }, 50)
}

function selectCoin(coin) {
    if (myCoinsStorage > 0) {
        scene1.classList.add("hidden");
        scene2.classList.remove("hidden");

        pickCoin = coin;
        myCoinsStorage -= pickCoin;
    }
    else {
        let alert = document.querySelector('.coin-value');
        alert.classList.add('coin-appear');
        alert.classList.remove('hidden');
    }

}

function selectHorse(horseNumber) {
    scene2.classList.add("hidden");
    scene3.classList.remove("hidden");
    gameTimer.classList.remove('hidden');

    pickBet = horseNumber;
    let gameStart = 2;

    let timer = setInterval(() => {
        gameTimer.innerHTML = `
        <h1>Game Starts</h1>
        <h2>${gameStart == 0 ? "GO!" : gameStart--}</h2>
        `;
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        gameTimer.classList.add('hidden');
        gameTimer.innerHTML = `
        <h1>Game Starts</h1>
        <h2>3</h2>
        `;
        start();
    }, 4000);
}

function startAgain() {
    resultContainer.classList.add('hidden');
    scene1.classList.remove('hidden');
    scene3.classList.add('hidden');


    horses.forEach((horse) => {
        let span = horse.querySelector('span');
        span.style.width = 0;
        span.style.backgroundColor = "";
        span.style.color = "";
    })

    myCoins.innerHTML = `
    <h1>Your Coins: $${myCoinsStorage}</h1>
    `;
}