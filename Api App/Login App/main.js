function doSubmit() {
  console.log("logging in...");
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
