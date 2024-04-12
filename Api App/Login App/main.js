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
  let data = await response.json();

  if (response.ok) {
    localStorage.setItem("signUpToken", data);
    signUp();
  } else {
    console.error("Error: " + data);
  }
}

async function signUp() {
  // localStorage.removeItem("signUpToken");
  let token = localStorage.getItem("signUpToken");

  let options = {
    method: "post",
    body: JSON.stringify({ token }),
  };

  let response = await fetch(url + "check", options);

  if (response.ok) {
    location.href = "../table/table.html";
    console.log("Sign Up Successful");
  } else {
    console.log("Sign Up Failed");
  }
}

function eyeClick() {
  if (inputPass.type == "password") {
    inputPass.type = "text";
    eyeIcon.className = "fa fa-eye-slash";
  } else {
    inputPass.type = "password";
    eyeIcon.className = "fa fa-eye";
  }
}
