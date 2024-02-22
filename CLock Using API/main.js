let clock = "http://worldtimeapi.org/api/timezone/Philippines";

async function getData() {
    let response = await fetch(clock);
    let data = await response.json();
    
    console.log(data);
}
