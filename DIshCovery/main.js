async function getData() {
  let response = await fetch(
    "https://ybponio.github.io/Programming-Practice/DIshCovery/storage.json"
  );
  let data = await response.json();
}

function toAnotherPage() {
  window.location.href = "recipe-page.html";
}

getData();
