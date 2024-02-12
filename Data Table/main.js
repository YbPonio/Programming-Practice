let couples = [
    {
        id: 1,
        name: "KimXian",
        year: 2023,
        status: "Fine",
    },
    {
        id: 2,
        name: "JaDine",
        year: 2023,
        status: "Bitter Kaayo",
    },
    {
        id: 3,
        name: "AlDub",
        year: 2022,
        status: "Not Yet Ready",
    },
]

function displayTable() {
    couplesTable.innerHTML = `
    <thead>
    <tr class="tableFirst">
    <th>#</th>
    <th>Names</th>
    <th>Year</th>
    <th>Status</th>
    <th>Action</th>
    </tr>
    </thead>
    `;


    let filteredCouple = couples.filter((item) => {
        let result = item.name.toLowerCase().indexOf(textInput.value.toLowerCase());
        let statusResult = item.status.toLowerCase().indexOf(textInput.value.toLowerCase());
        let yearResult = (item.year == textInput.value);
        if(
            result >= 0 || 
            yearResult == true ||
            statusResult >= 0
        ){
            return true;
        }
    });
    for (let i = 0; i < filteredCouple.length; i++) {
        let couple = filteredCouple[i];
        couplesTable.innerHTML += `
        <tr class="">
            <td>${i + 1}</td>   
            <td>${couple.name}</td>
            <td>${couple.year}</td> 
            <td>${couple.status}</td>
            <td><button onclick="deleteRowTable(${couple.id})">Delete</button></td>
        </tr>
        `;
    }
}

function deleteRowTable(theID){
    let couple = couples.find(item => item.id == theID);
    let deleteCouple = couples.indexOf(couple);
    couples.splice(deleteCouple, 1);
    displayTable();
}

function addItem() {
    couples.push({
        id: couples[couples.length - 1].id++,
        name: nameInput.value,
        year: parseInt(yearInput.value),
        status: statusInput.value,
    });
    console.log(couples);
    displayTable();
}
displayTable();