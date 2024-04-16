let url =
  "http://localhost/Programming-Practice/Api%20App/Login%20App/api/login.php?action=";

async function doSubmit() {
  let credentials = {
    username: inputUser.value,
    password: inputPass.value,
  };

  let options = {
    method: "post",
    body: JSON.stringify(credentials),
  };

  let response = await fetch(url + "login", options);

  if (response.ok) {
    let data = await response.json();
    localStorage.setItem("Token", data);
    checkToken();
  } else {
    console.error("Error: " + data);
  }
}

async function checkToken() {
  // localStorage.removeItem("signUpToken");
  let token = localStorage.getItem("Token");

  let options = {
    method: "post",
    body: JSON.stringify({ token }),
  };

  let response = await fetch(url + "check", options);

  if (response.ok) {
    let data = await response.text();
    // location.href = "../table/table.html";
    console.log("Sign Up Successful");
    displayName.textContent = "Welcome " + data;
    displayUser.classList.remove("hidden");
    mainContainer.classList.add("hidden");
  } else {
    console.log("Sign Up Failed");
    displayUser.classList.add("hidden");
    mainContainer.classList.remove("hidden");
  }
}

function logOut() {
  localStorage.removeItem("Token");
  checkToken();
}
checkToken();

function eyeClick() {
  if (inputPass.type == "password") {
    inputPass.type = "text";
    eyeIcon.className = "fa fa-eye-slash";
  } else {
    inputPass.type = "password";
    eyeIcon.className = "fa fa-eye";
  }
}
