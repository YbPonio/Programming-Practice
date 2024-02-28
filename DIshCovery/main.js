
async function getData() {
    let response = await fetch("https://ybponio.github.io/api/storage.json");
    let data = await response.json();
    console.log(data);
}
getData()