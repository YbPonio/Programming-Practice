let bombTimer;
let bombStatus = false;

function plantBomb() {
    bombContainer.src = "https://media4.giphy.com/media/3osxYCsLd9qgsgqpwI/giphy.gif?cid=ecf05e470ii25j787dmvfjps29u8142337kda33j7ew7arfp&ep=v1_gifs_related&rid=giphy.gif&ct=g";
    textStatus.innerText = "Bomb has been Planted!";
    bombTimerStatus.innerText = 3;
    bombStatus = true;
    let timeBomb = 2;
    
    let timer = setInterval(() => {
        bombTimerStatus.innerText = `${timeBomb--}`;
    }, 1000);

    bombTimer = setTimeout(() => {
        bombContainer.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2F1dGFqMjJ2djVrYjkybXlwYnFodGVzaWs1dHNucXlhZzBpcHE4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FnatKdwxRxpVC/giphy.gif";
        textStatus.innerText = "Booooooommmmmm!";
        bombTimerStatus.innerText = '';
        bombStatus = false;

        clearInterval(timer);
    }, 3000);

}

function bombDiffused() {
    if(bombStatus){
        clearTimeout(bombTimer);
        bombContainer.src = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjk4NXBrOHBvOTBvcmFycnIxZGR0aDR6OTJmZHlvNXhxZ2JzZm5qZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Mliueouehmpag/giphy.gif";
        textStatus.innerText = "Bomb has been diffused!";
    }
}