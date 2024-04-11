let url = "http://localhost/Programming-Practice/CrudApp/api/crud.php";
let data = null;

async function getData() {
  let response = await fetch(url);
  data = await response.json();

  renderPersonData();
}

async function renderPersonData() {
  personalDataTable.innerHTML = "";
  for (const item of data) {
    personalDataTable.innerHTML += `
    <tr>
        <td>${item.id}</td>
        <td>${item.name} ${item.lastName}</td>
        <td>${item.occupation}</td>
        <td>${item.date}</td>
        <td>${item.street}, ${item.city}, Region ${item.region}, ${item.zip}, ${item.country}</td>
        <td>${item.gender}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td><button class="Btn" onclick="editData(${item.id})">edit</button
        ><button class="Btn" onclick="deleteData(${item.id})">delete</button></td>
    </tr>
    `;
  }
}

function addNewData() {
  formDialog.showModal();
  personalForm.reset();
  idInput.value = null;
}

async function submitForm() {
  let personalData = {
    id: idInput.value,
    name: {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
    },
    occupation: occupationInput.value,
    date: dateInput.value,
    address: {
      street: streetInput.value,
      city: cityInput.value,
      region: regionInput.value,
      zip: zipCodeInput.value,
      country: countryInput.value,
    },
    gender: personalForm.myGender.value,
    email: emailInput.value,
    phone: phoneInput.value,
  };

  let options = {
    method: "POST",
    body: JSON.stringify(personalData),
  };

  if (personalData.id) {
    let response = await fetch(url + "?action=update", options);
    getData();
  } else {
    console.log("create");
    let response = await fetch(url + "?action=create", options);
    getData();
  }
}

function editData(id) {
  let selectedData = data.find((item) => item.id == id);

  idInput.value = selectedData.id;
  firstNameInput.value = selectedData.name;
  lastNameInput.value = selectedData.lastName;
  occupationInput.value = selectedData.occupation;
  dateInput.value = selectedData.date;
  streetInput.value = selectedData.street;
  cityInput.value = selectedData.city;
  regionInput.value = selectedData.region;
  zipCodeInput.value = selectedData.zip;
  countryInput.value = selectedData.country;
  personalForm.myGender.value = selectedData.gender;
  emailInput.value = selectedData.email;
  phoneInput.value = selectedData.phone;

  console.log(personalForm.myGender.value);
  formDialog.showModal();
  getData();
}

function deleteData(id) {
  let options = {
    method: "POST",
    body: JSON.stringify({ id: id }),
  };

  let response = fetch(url + "?action=delete", options);
  getData();
}

getData();
