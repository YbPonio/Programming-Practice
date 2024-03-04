async function getData() {
  let response = await fetch(
    "https://ybponio.github.io/Programming-Practice/DIshCovery/storage.json"
  );
  let data = await response.json();
  console.log(data);
}

function toAnotherPage() {
  location.href = "recipe-page.html";
}

function closeBtn() {
  foodShowMore.classList.toggle("hidden");
  console.log("sdfds");
}

getData();
