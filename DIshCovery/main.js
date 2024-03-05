let recipes = [];
async function getData() {
  let response = await fetch(
    "https://ybponio.github.io/Programming-Practice/DIshCovery/storage.json"
  );
  let data = await response.json();
  recipes = data;
  // console.log(recipes);
  renderFoods();
}

function renderFoods() {
  /*html */
  for (recipe of recipes) {
    recipeItems.innerHTML = `
      <div class="item">
      <div class="img-holder">
        <img
          src="./img/emerson-vieira-cpkPJ-U9eUM-unsplash.jpg"
          alt=""
        />
      </div>
      <h1>${recipe.name}</h1>
      <p class="paragraphText">${recipe.description}</p>

      <div class="showMoreBtn">
        <button class="cta" onclick="closeBtn()">
          <span class="hover-underline-animation">Get Recipe</span>
        </button>
      </div>
    </div>
      `;
  }
  let paragraphText = document.querySelectorAll(".paragraphText");
  paragraphText.forEach((paragraph) => {
    let text = paragraph.textContent.trim();
    let words = text.split(" ");
    let truncatedText = words.slice(0, 20).join(" ");
    paragraph.textContent = truncatedText + "...";
  });
}

function toAnotherPage() {
  location.href = "recipe-page.html";
}

function closeBtn() {
  foodShowMore.classList.toggle("hidden");
  console.log("sdfds");
}
getData();
