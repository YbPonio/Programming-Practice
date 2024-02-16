let coins = 50; 

function buyCoins() {
    if(coins <= 200) {
        coins += 50;
        coinSlot.innerHTML = `Your Coin: $${coins} <button onclick="buyCoins()">Buy Coins</button>`;
    } else {
        alert("Already reach the Maximum Limit!");
    }
} 

function coinInserted() {
    if(coins <= 0) {
        alert('Not Enough Coins!') 
        return;
    }
    coins -= 5;
    coinSlot.innerHTML = `Your Coin: $${coins} <button onclick="buyCoins()">Buy Coins</button>`;
    scene1Container.classList.add('hidden');
    scene2Container.classList.remove('hidden');
}

function pickNumber(event) {
    let target = event.target;
    computeResult(target.innerText);
}

function computeResult(value) {
    let numberPick = parseInt(value);
    console.log(numberPick)
    let resultNumber = Math.floor(Math.random() * 9) + 1;

    if(numberPick == resultNumber) {
        resultContainer.innerHTML = `
        <h1>You Win!</h1>
        <h2>Your Number: ${numberPick}</h2>
        <h2>The winning Number is: ${resultNumber}</h2>
        <button onclick="tryAgain()">Try Again</button>
        `;

        coins += 5 * 3;
        coinSlot.innerHTML = `Your Coin: $${coins} <button onclick="buyCoins()">Buy Coins</button>`;

        scene2Container.classList.add('hidden');
        scene3Container.classList.remove('hidden');
    } else {
        resultContainer.innerHTML = `
        <h1>You Lose!</h1>
        <h2>Your Number: ${numberPick}</h2>
        <h2>The winning Number is: ${resultNumber}</h2>
        <button onclick="tryAgain()">Try Again</button>
        `;
        
        scene2Container.classList.add('hidden');
        scene3Container.classList.remove('hidden');
    }
}

function tryAgain() {
    scene1Container.classList.remove('hidden');
    scene2Container.classList.add('hidden');
    scene3Container.classList.add('hidden');
}