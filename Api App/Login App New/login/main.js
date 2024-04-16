function generateRandomHash() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function eyeBtn() {
  if (password.type == "password") {
    password.type = "text";
    eyeBtnClk.className = "fa fa-eye-slash";
  } else {
    password.type = "password";
    eyeBtnClk.className = "fa fa-eye";
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
