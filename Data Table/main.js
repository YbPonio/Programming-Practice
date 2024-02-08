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
    {
        id: 4,
        name: "AlDub",
        year: 2022,
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

    let filteredCouple = couples.filter((item)=>{
        let result = item.name.toLowerCase().indexOf(textInput.value.toLowerCase());
        let statusResult = item.status.toLowerCase().indexOf(textInput.value.toLowerCase());
        let yearResult = (item.year == textInput.value);
        if(
            result >= 0 || 
            yearResult == true ||
            statusResult >= 0
        ){
            return true;
        }else{
            return false;
        }
    });
    for (let i = 0; i < filteredCouple.length; i++) {
        let couple = filteredCouple[i];
        couplesTable.innerHTML += `
        <tr class="">
            <td>${couple.id}</td>   
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

// For the prevention of result
// container.addEventListener('submit', (event)=> {
//     event.preventDefault();
// });
displayTable();