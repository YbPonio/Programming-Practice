let products = [];

async function getData() {
  let url =
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/product.php?action=read";

  let response = await fetch(url);
  products = await response.json();

  console.log(products);
}

document.addEventListener("click", function (e) {
  let dropdown = document.querySelector(".profile-dropdown");

  if (e.target.closest("#userBtn")) {
    dropdown.classList.toggle("hide");
  } else {
    dropdown.classList.add("hide");
  }
});

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

      loginStatus.classList.add("hide");
      userBtn.classList.remove("hide");

      console.log("Welcome", data);
    } else {
      console.log("Invalid Token");
    }
  } else {
    loginStatus.classList.remove("hide");
    userBtn.classList.add("hide");

    console.log("Welcome Guest");
  }
}

// let url = "http://localhost/PRACTICE/upload%20img/upload.php";
// let form = document.querySelector("form");

// form.onsubmit = async (e) => {
//   e.preventDefault();

//   let file = document.querySelector("[type=file]").files;
//   let formData = new FormData();

//   for (let i = 0; i < file.length; i++) {
//     formData.append("files[]", file[i]);
//   }

//   let response = await fetch(url, {
//     method: "POST",
//     body: formData,
//   });
//   let data = await response.text();
//   console.log(data);
// };

check();
getData();
