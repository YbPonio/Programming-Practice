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
  let searchFood = recipes.filter((recipe) => {
    let searchItem = recipe.name
      .toLowerCase()
      .indexOf(searchInput.value.toLowerCase());

    if (searchItem >= 0) {
      return true;
    }
  });

  /*html */
  recipeItems.innerHTML = "";
  for (recipe of searchFood) {
    recipeItems.innerHTML += `
      <div class="item">
      <div class="img-holder">
        <img
          src="${recipe.url}"
          alt="${recipe.name}"
        />
      </div>
      <h1>${recipe.name}</h1>
      <p class="paragraphText">${recipe.description}</p>

      <div class="showMoreBtn">
        <button class="cta" onclick="closeBtn()">
          <span class="hover-underline-animation" onclick="getRecipe(${recipe.id})">Get Recipe</span>
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

function getRecipe(id) {
  for (recipe of recipes) {
    if (id === recipe.id) {
      foodContainer.innerHTML = `
          <div class="img-box">
          </div> 
          <div class="title-text">
            <h1>${recipe.name}</h1>
          </div>
          <div class="recipe-description">
            ${recipe.description}
          </div>
          <div class="information">
            <div class="ingredients">
              <h3>Ingredients</h3>
              <ul>
              ${recipe.ingredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("")}
              </ul>
            </div>
            <div class="directions">
              <h3>Directions</h3>
              <ol>
              ${recipe.directions
                .map((direction) => `<li>${direction}</li>`)
                .join("")}
              </ol>
            </div>
          </div>
      `;

      let imgBox = document.querySelector(".img-box");
      imgBox.style.backgroundImage = `url(${recipe.url})`;
    }
  }
}

function findDish() {}

function toAnotherPage() {
  location.href = "recipe-page.html";
}

function closeBtn() {
  foodShowMore.classList.toggle("hidden");
}
getData();
