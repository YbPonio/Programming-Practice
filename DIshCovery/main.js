let recipes;
async function getData() {
  let response = await fetch(
    "https://ybponio.github.io/Programming-Practice/DIshCovery/storage.json"
  );
  let data = await response.json();
<<<<<<< HEAD
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
      <h1>beef ground pork</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Voluptatum corporis dolore ab dicta consequatur necessitatibus
        aperiam, ullam quaerat deserunt veritatis.
      </p>
    
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

=======
}

function toAnotherPage() {
  window.location.href = "recipe-page.html";
}

>>>>>>> 0df503bb175803603cc56514eb04bb8be8e10a69
getData();
