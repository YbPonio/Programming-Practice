const dictionary = [
    "apple", "lemon", "grape", "peach", "melon", "apric", "cherr", "fudge", "candy", "baker", "wheat", "beach", "piano", "guitar", "viola", "cello", "trump", "panda", "zebra", "tiger", "llama", "horse", "donut", "crown", "knife", "plate", "spoon", "fork", "glass", "brick", "radio", "music", "dance", "salsa", "jazze", "swing", "shark", "whale", "dolph", "frost", "snowy", "sleet", "storm", "cloud", "rainy", "sunny", "moist", "juicy", "crisp", "crumb", "cream", "sauce", "dough", "crust", "steak", "salad", "sushi", "burger", "fries", "onion", "tomat", "chees", "bacon", "pasta", "pizza", "wafel", "toast", "cocoa", "mocha", "latte", "cider", "juice", "water"
  ];
  
let state;

function refreshState(past) {
    let pastGrid = document.querySelector('.grid');
    if (pastGrid) {
        past.removeChild(pastGrid)
    }
    state = {
        secret: dictionary[Math.floor(Math.random() * dictionary.length)],
        grid: Array(6).fill().map(() => Array(5).fill('')),
        currentRow: 0,
        currentCol: 0,
      }
}
    
function updateGrid() {
    for(let i = 0; i < state.grid.length; i++) {
        for(let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = "") {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.append(box);
    return box;
}

function drawGrid(container) {
    // container.remove('grid');
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }

    container.append(grid);
}

function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if(key == "Enter") {
            if (state.currentCol == 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                    // alert("Not a real Word!");
                }
            }
        }
        if(key == "Backspace") {
            removeLetter();
        }
        if(isLetter(key)) {
            addLetter(key);
        }

        updateGrid();
    }
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
    return dictionary.includes(word);
}

function revealWord(guess) {
    const row = state.currentRow;
    const animationDduration = 500;

    for(let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter == state.secret[i]) {
                box.classList.add('right');
            } else if (state.secret.includes(letter)) {
                box.classList.add('wrong');
            } else {
                box.classList.add('empty');
            }
        }, (i * animationDduration) / 2)

        box.classList.add('animated');
        box.style.animationDelay = `${(i * animationDduration) / 2}ms`;
    }

    const isWinner = state.secret == guess;
    const isGameOver = state.currentRow == 5;

    setTimeout(() => {
        if (isWinner) {
            alert("You Win!");
            startUp()
        } else if (isGameOver) {
            alert(`You Lose! The correct word was ${state.secret}.`);
        }
    }, 3 * animationDduration);
}

function isLetter(key) {
    return key.length == 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (state.currentCol == 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function removeLetter() {
    if (state.currentCol == 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function startUp() {
    const game = document.querySelector('#game');
    refreshState(game);
    drawGrid(game);

    registerKeyboardEvents();
    console.log(state.secret);
}

startUp();