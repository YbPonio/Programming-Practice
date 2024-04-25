let products = [];

async function getData() {
  let url =
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/product.php?action=read";

  let response = await fetch(url);
  products = await response.json();

  renderProducts();
}

function renderProducts() {
  let productContainer = document.querySelector(".product-section");
  productContainer.innerHTML = "";
  for (product of products) {
    productContainer.innerHTML += `
      <div class="item">
          <div class="img">
            <img
              src="${product.image}"
              alt="${product.name}"
            />
          </div>
          <div class="details">
            <h3>${product.name}</h3>
            <p>${product.details}</p>
            <div>
              <p class="price">$${product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
    `;
  }
}

function userProfile(user) {
  profilePage.innerHTML = "";
  profilePage.innerHTML += `
  <div class="image-container">
      <div class="image">
        <img src="../img/personal-removebg-preview.png" alt="" />
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
    <div>
      <h3>Phone Number</h3>
      <input type="number" value="${user.number}" />
    </div>
    <div>
      <h3>Date of Birth</h3>
      <input type="date" value="${user.date}" />
    </div>
  </div>

  <div>
    <div>
      <h3>Gender</h3>
      <select id="userGender">
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
      />
    </div>
  </div>

  <div class="btn-option">
    <div>
      <button style="background: #dc143c">Delete Account</button>
      <button>Edit</button>
      <button>Reset Password</button>
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
      let data = await response.json();
      userProfile(data);

      loginStatus.classList.add("hide");
      userBtn.classList.remove("hide");

      console.log("Welcome", data.name);
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

check();
getData();
