let couples = [
    {
        name: "KathNiel",
        year: 2023,
        status: "Bitter Somehow",
    },
    {
        name: "KimXian",
        year: 2023,
        status: "Fine",
    },
    {
        name: "JaDine",
        year: 2023,
        status: "Bitter Kaayo",
    },
    {
        name: "AlDub",
        year: 2016,
        status: "Not Yet Ready",
    },
]

function displayTable() {
    couplesTable.innerHTML = `
    <tr class="tableFirst">
    <td>Index</td>
    <td>Names</td>
    <td>Year</td>
    <td>Status</td>
    <td>Action</td>
    </tr>
    `;
    let filteredCouple = couples.filter(filteredItems);
    for (let i = 0; i < filteredCouple.length; i++) {
        let couple = filteredCouple[i];
        couplesTable.innerHTML += `
        <tr class="">
            <td>${i + 1}</td>   
            <td>${couple.name}</td>
            <td>${couple.year}</td> 
            <td>${couple.status}</td>
            <td><button onclick="deleteRowTable(${i})">Delete</button></td>
        </tr>
        `;
    }
}


function deleteRowTable(value){
    couples.splice(value, 1);
    displayTable();
}

function filteredItems(item){
    let result = item.name.toLowerCase().indexOf(textInput.value);
    console.log(result);
    if(result >= 0){
        return true;
    }else{
        return false;
    }
}

container.addEventListener('submit', (event)=> {
    event.preventDefault();
});
displayTable();