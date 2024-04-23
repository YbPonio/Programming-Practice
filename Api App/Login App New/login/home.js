document.addEventListener("click", function (e) {
  let dropdown = document.querySelector(".profile-dropdown");

  if (e.target.closest("#userBtn")) {
    dropdown.classList.toggle("hide");
  } else {
    dropdown.classList.add("hide");
  }
});

function logout() {
  let token = localStorage.removeItem("token");

  location.href = "../login";
  check();
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
      console.log("Welcome", data);
    } else {
      console.log("Invalid Token");
    }
  } else {
    console.log("Welcome Guest");
  }
}
check();
