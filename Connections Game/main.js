let container = document.querySelector(".container");
let sendBtn = document.querySelector(".btn");

let category = [
  {
    name: "School Supplies",
    items: ["pencil", "eraser", "lunch box", "note book"],
  },
  {
    name: "animals",
    items: ["chicken", "lion", "fish", "cow"],
  },
  {
    name: "game",
    items: ["chess", "checker", "basketball", "football"],
  },
];

let itemContainer = [];

function selectedBox(e) {
  let target = e.target;
  let boxes = container.querySelectorAll(".box");
  let clickedBox = Array.from(boxes).indexOf(target);

  if (target.matches(".box") && itemContainer.length < 4) {
    if (itemContainer.includes(target.innerText)) {
      itemIndex = itemContainer.indexOf(target.innerText);

      itemContainer.splice(itemIndex, 1);
      boxes[clickedBox].style.background = "";
    } else {
      itemContainer.push(target.innerText);
      boxes[clickedBox].style.background = "blue";
    }
  } else {
    if (itemContainer.includes(target.innerText)) {
      itemIndex = itemContainer.indexOf(target.innerText);

      itemContainer.splice(itemIndex, 1);
      boxes[clickedBox].style.background = "";
    }
  }
}

function renderItems() {
  let allItems = [];
  category.forEach((cat) => allItems.push(...cat.items));
  let shuffledItems = shuffleArray(allItems);

  shuffledItems.forEach((item) => {
    let boxDiv = document.createElement("div");
    boxDiv.className = "box";
    boxDiv.innerText = item;

    container.append(boxDiv);
  });
}

function checkContainer() {
  if (itemContainer.length == 4) {
    let indices = itemContainer.map((item) => findIndexInCategory(item));
    let allSame = indices.every((val, i, arr) => val === arr[0]);

    if (allSame) {
      index = indices[0];

      console.log("You got it right!");
      console.log(`Category: ${category[index].name}`);
    } else {
      console.log("You got it wrong!");
    }
  }
}

function findIndexInCategory(item) {
  for (let i = 0; i < category.length; i++) {
    if (category[i].items.includes(item)) {
      return i;
    }
  }
  return -1;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

container.addEventListener("click", selectedBox);
sendBtn.addEventListener("click", checkContainer);

renderItems();
