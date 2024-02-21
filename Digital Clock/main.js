function setTime() {
    let hour = hours.value || 0 ;
    let minute = minutes.value || 0;
    let second = seconds.value || 0;
    
    clockDisplay.innerHTML = `
        ${hour || '00'}:${minute || '00'}:${second || '00'}
    `;

    let timerCount = setInterval(() => {
        if(hour == 0 && minute == 0 && second == 0){
            clearInterval(timerCount);
            clockDisplay.innerHTML = `
            00:00:00
            `;
            console.log('first')
        }
        else if(hour >= 0 && minute >= 0 && second >= 0) {
            if(second == 0) {
                clockDisplay.innerHTML = `
                ${hour}:${minute--}:${second}
                `;
                second = 59;
            console.log('second')
            }else {
                if(minute == 0 && hour > 0) {
                    clockDisplay.innerHTML = `
                    ${hour--}:${minute}:${second}
                    `;
                    minute = 59;
                    console.log('third')
                }else {
                    clockDisplay.innerHTML = `
                    ${hour}:${minute}:${second--}
                    `;
                }
            }
        }
    }, 1000);
}