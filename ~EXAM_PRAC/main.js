async function login() {
  let url =
    "http://localhost/Programming-Practice/~EXAM_PRAC/api/login.php?action=login";

  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username: loginForm.username.value,
      password: loginForm.password.value,
    }),
  });

  if (response.ok) {
    let data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.data.token);
      check();
    }
  } else {
    throw "HTTP-Error: " + response.status + " " + response.statusText;
  }
}

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
      window.location.href = "./home.html";
    }
  } else {
    throw "HTTP-Error: " + response.status + " " + response.statusText;
  }
}
check();
