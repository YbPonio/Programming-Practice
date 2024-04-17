async function login() {
  let payload = {
    username: username.value,
    password: password.value,
  };

  let option = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  let response = await fetch(
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/login.php?action=login",
    option
  );

  if (response.ok) {
    let data = await response.json();
    localStorage.setItem("token", data);
    checkToken();
  } else {
    errorMsg.style.display = "block";
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 3000);
  }
}

async function checkToken() {
  let token = localStorage.getItem("token");

  let option = {
    method: "POST",
    body: JSON.stringify({ token }),
  };

  let response = await fetch(
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/login.php?action=check",
    option
  );

  if (response.ok) {
    location.href =
      "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/login/home.html";
  } else {
    console.log("Invalid Token");
  }
}

async function register() {
  let payload = {
    name: inputName.value,
    username: inputUsername.value,
    password: inputPass.value,
    token: generateRandomHash(),
  };

  let option = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  let response = await fetch(
    "http://localhost/Programming-Practice/Api%20App/Login%20App%20New/api/login.php?action=register",
    option
  );

  if (response.ok) {
    let data = await response.json();
    localStorage.setItem("token", data);
    checkToken();
  } else {
    console.log("Invalid Register");
  }
}

function clickedBtn(action) {
  let formRegister = document.querySelector(".form-register");
  let formLogin = document.querySelector(".form-control");

  if (action == "back") {
    formRegister.classList.add("hidden");
    formLogin.classList.remove("hidden");
  } else {
    formRegister.classList.remove("hidden");
    formLogin.classList.add("hidden");
  }
}

eyeBtnClk1.addEventListener("click", (event) => {
  if (password.type == "password") {
    password.type = "text";
    eyeBtnClk1.className = "fa fa-eye-slash";
  } else {
    password.type = "password";
    eyeBtnClk1.className = "fa fa-eye";
  }
});
eyeBtnClk2.addEventListener("click", (event) => {
  if (inputPass.type == "password") {
    inputPass.type = "text";
    eyeBtnClk2.className = "fa fa-eye-slash";
  } else {
    inputPass.type = "password";
    eyeBtnClk2.className = "fa fa-eye";
  }
});

function generateRandomHash() {
  return (
    Math.random().toString(36).substring(2, 14) +
    Math.random().toString(36).substring(2, 14)
  );
}
