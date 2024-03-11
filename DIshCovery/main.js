let recipes = [];
let filter = "";

async function getData() {
  try {
    const response = await fetch(
      "https://ybponio.github.io/Programming-Practice/DIshCovery/storage.json"
    );
    recipes = await response.json();
  } catch (error) {
    console.log(error);
  }
  renderFoods(filter);
}

function renderFoods(filter) {
  let filteredFood = recipes.filter((recipe) => {
    let lowName = recipe.name.toLowerCase();
    let lowDescription = recipe.description.toLowerCase();
    let lowIngredients = recipe.ingredients.map((item) =>
      item.toLowerCase().includes(filter)
    );

    let lowCategories = recipe.categories.map((item) =>
      item.toLowerCase().includes(filter)
    );

    return (
      lowName.includes(filter) ||
      lowDescription.includes(filter) ||
      lowIngredients.includes(true) ||
      lowCategories.includes(true)
    );
  });

  if (filteredFood <= 0) {
    recipeItems.innerHTML = `<h1 class="no-result">No recipe matches your criteria...you can search for "beef", "fish" etc....</h1>`;
  } else {
    recipeItems.innerHTML = "";
    for (recipe of filteredFood) {
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
  }

  let paragraphText = document.querySelectorAll(".paragraphText");
  paragraphText.forEach((paragraph) => {
    let text = paragraph.textContent.trim();
    let words = text.split(" ");
    let truncatedText = words.slice(0, 20).join(" ");
    paragraph.textContent = truncatedText + "...";
  });
}

let searchFood = searchInput.addEventListener("keyup", (e) => {
  if (e.target.value.length > 2) {
    filter = e.target.value.toLowerCase();
    renderFoods(filter);
  } else {
    filter = "";
    renderFoods(filter);
  }
});

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
          <div class="recipe-category">
          <p><span>Categories:</span> ${recipe.categories.join(", ")}</p>
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

function toAnotherPage() {
  location.href = "recipe-page.html";
}

function closeBtn() {
  foodShowMore.classList.toggle("hidden");
}
getData();
