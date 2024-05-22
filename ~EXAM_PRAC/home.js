let users;

async function getData() {
  let url =
    "http://localhost/Programming-Practice/~EXAM_PRAC/api/crud.php?action=read";

  let response = await fetch(url);
  users = await response.json();
  console.log(users);
  renderUser();
}

function renderUser() {
  let table = document.querySelector("#userDataTable");
  table.innerHTML = "";

  for (user of users) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");

    td1.innerText = user.id;
    td2.innerText = user.username;
    td3.innerText = user.password;
    td4.innerText = user.firstname;
    td5.innerText = user.lastname;
    td6.innerText = user.age;
    td7.innerText = user.gender_type;
    td8.innerHTML = `
    <button onclick="editUser(${user.id})">Edit</button>
    <button class="delete" onclick="deleteUser(${user.id})">Delete</button>`;

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
    tr.append(td8);

    table.append(tr);
  }
}

async function doSubmit() {
  let url =
    "http://localhost/Programming-Practice/~EXAM_PRAC/api/crud.php?action=";

  let payload = {
    id: userForm.id.value,
    username: userForm.username.value,
    password: userForm.password.value,
    firstname: userForm.firstname.value,
    lastname: userForm.lastname.value,
    age: userForm.age.value,
    gender: userForm.gender.value,
  };

  if (userForm.id) {
    let response = await fetch(url + "create", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      let data = await response.json();
      getData();
    } else {
      let data = await response.json();
      alert(data.error);
    }
  }
}

function openModal() {
  userForm.reset();
  userInput.showModal();
}

function editUser(id) {}

async function check() {
  let url =
    "http://localhost/Programming-Practice/~EXAM_PRAC/api/login.php?action=check";

  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ token: localStorage.getItem("token") }),
  });

  if (response.ok) {
    let data = await response.json();
    if (data.success) {
      console.log("You are logged in!");
    }
  } else {
    window.location.href = "./login.html";
  }
}
check();
getData();
