let products = [];
let user = [];

async function getData() {
  let url =
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/product.php?action=read";

  let response = await fetch(url);
  products = await response.json();

  renderProducts();
}

function renderProducts() {
  console.log(products);
  let productContainer = document.querySelector(".product-section");
  productContainer.innerHTML = "";
  for (product of products) {
    let price = parseFloat(product.price).toFixed(2);

    productContainer.innerHTML += `
      <div class="item">
          <div class="img">
            <img
              src="../uploads/${product.image}"
              alt="${product.name}"
            />
          </div>
          <div class="details">
            <h3>${product.name}</h3>
            <p>${product.details}</p>
            <div>
              <p class="price">$${price}</p>
            </div>
          </div>
        </div>
    `;
  }
}

function userProfile(user) {
  userImageProfile.src =
    user.image == null ? "../uploads/" + user.image : "../img/personal.png";
  profilePage.innerHTML = "";
  profilePage.innerHTML += `
  <div class="image-container">
      <div class="image">
        <img src="${
          user.image == null
            ? "../uploads/" + user.image
            : "../img/personal.png"
        }" alt="${user.name}" />
      </div>
  </div>
  `;

  profilePage.innerHTML += `
  <div class="details">
        <h1>${user.name} <i class="fa-solid fa-circle-check"></i></h1>
        <h3>${user.email}</h3>
        <h3>@${user.username}</h3>
  </div>
  `;

  profilePage.innerHTML += `
  <div class="profile-details">
  <div>
  <input id="userId" type="number" value="${user.id}" hidden/>
    <div>
      <h3>Phone Number</h3>
      <input type="number" value="${user.number}" disabled/>
    </div>
    <div>
      <h3>Date of Birth</h3>
      <input type="date" value="${user.date}" disabled/>
    </div>
  </div>

  <div>
    <div>
      <h3>Gender</h3>
      <select id="userGender" disabled>
        <option value="Male" ${
          user.gender == "Male" ? "selected" : ""
        }>Male</option>
        <option value="Female" ${
          user.gender == "Female" ? "selected" : ""
        }>Female</option>
      </select>
    </div>
    <div>
      <h3>Address</h3>
      <input
        type="text"
        placeholder="1234 street, city, country"
        value="${user.address}"
        disabled
      />
    </div>
  </div>

  <div class="btn-option">
    <div>
      <button onclick="deleteUser(${
        user.id
      })" style="background: #dc143c">Delete Account</button>
      <button onclick="updateuser(${user.id})">Edit</button>
      <button onclick="passwordReset.showModal()">Reset Password</button>
    </div>
  </div>
</div>
  `;

  console.log(user);
}

async function deleteAccount() {}

function logout() {
  localStorage.removeItem("token");
  location.href = "./home.html";

  check();
}
function login() {
  location.href = "../login";
}

function profilePageOpen() {
  homePage.classList.add("hide");
  profilePage.classList.remove("hide");
}

async function check() {
  let payload = {
    token: localStorage.getItem("token"),
  };

  let option = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  if (payload.token) {
    let response = await fetch(
      "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/login.php?action=check",
      option
    );
    if (response.ok) {
      user = await response.json();
      userProfile(user);

      loginStatus.classList.add("hide");
      userBtn.classList.remove("hide");

      console.log("Welcome", user.name);
    } else {
      console.log("Invalid Token");
    }
  } else {
    loginStatus.classList.remove("hide");
    userBtn.classList.add("hide");

    console.log("Welcome Guest");
  }
}

document.addEventListener("click", function (e) {
  let dropdown = document.querySelector(".profile-dropdown");

  if (e.target.closest("#userBtn")) {
    dropdown.classList.toggle("hide");
  } else {
    dropdown.classList.add("hide");
  }
});

function updateuser(id) {
  console.log(id);

  userId = id;
  nameId.value = user.name;
  usernameId.value = user.username;
  emailId.value = user.email;
  phoneId.value = user.number;
  dateId.value = user.date;
  genderId.value = user.gender;
  addressId.value = user.address;

  userEditModal.showModal();
}

async function editUser() {
  let payload = {
    id: user.id,
    name: nameId.value,
    username: usernameId.value,
    email: emailId.value,
    number: phoneId.value,
    date: dateId.value,
    gender: genderId.value,
    address: addressId.value,
    image: imageInput.files[0].name,
  };
  console.log(payload);

  let option = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  let response = await fetch(
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/login.php?action=update",
    option
  );

  if (response.ok) {
    let data = await response.json();
    console.log(data);
  } else {
    console.log("Error");
  }

  let file = document.querySelector("[type=file]").files;
  let formData = new FormData();

  for (let i = 0; i < file.length; i++) {
    formData.append("files[]", file[i]);
  }

  let imageRes = await fetch(
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/upload.php",
    {
      method: "POST",
      body: formData,
    }
  );
  let result = await imageRes.text();
  check();
}

async function deleteUser(id) {
  let confirmation = confirm("Are you sure you want to delete this user?");

  if (confirmation) {
    let payload = {
      id,
    };

    let options = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    let response = await fetch(
      "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/login.php?action=delete",
      options
    );
    let data = await response.text();
    console.log(data);
    logout();
  } else {
    console.log("User not deleted");
  }
}

async function resetSubmit() {
  let payload = {
    id: user.id,
    email: emailInput.value,
    password: passwordId.value,
    secondPass: passwordInput.value,
  };

  let options = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  let response = await fetch(
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/login.php?action=reset",
    options
  );

  let data = await response.text();
  console.log(data);
}

check();
getData();
