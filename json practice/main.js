let images = "http://localhost/Programming-Practice/json%20practice/images.json";
let myArrayOfImage = [];

async function getData(){
    let response = await fetch(images);
    myArrayOfImage = await response.json();
    
    displayItem();
}

function displayItem() {
    imageGoesHere.innerHTML = "";
    navContainer.innerHTML = `
    <button onclick="displayImage('all')">All</button>
    `;
    myArrayOfImage.forEach((image) => {
        imageGoesHere.innerHTML +=  `
        <div class="item ${image.class}">
            <img src="${image.url}" alt="${image.caption}">
            <h1>${image.id} ${image.caption}</h1>
        </div>
        `;

        navContainer.innerHTML += `
        <button onclick="displayImage(${image.id})">${image.id}</button>
        `;
    });
}

function displayImage(id) {
    for (const image of myArrayOfImage) {
        if(id == 'all') {
            image.class = "show"
        }
        else if(image.id == id) {
            image.class = "show";
        } else {
            image.class = "hide";
        }
    }
    displayItem()
}