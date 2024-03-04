let recipes = [];
async function getData() {
  let response = await fetch(
    "https://ybponio.github.io/Programming-Practice/DIshCovery/storage.json"
  );
  let data = await response.json();
  recipes = data;
  console.log(recipes);
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
      <p>${recipe.description}</p>

      <div class="showMoreBtn">
        <button class="cta" onclick="closeBtn()">
          <span class="hover-underline-animation">Get Recipe</span>
        </button>
      </div>
    </div>
      `;
  }
}

function toAnotherPage() {
  location.href = "recipe-page.html";
}

function closeBtn() {
  foodShowMore.classList.toggle("hidden");
  console.log("sdfds");
}
renderFoods();
getData();
