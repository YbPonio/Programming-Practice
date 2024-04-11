let input = document.querySelector("input");
let h2 = document.querySelector("h2");

function setItemData() {
  localStorage.setItem("value", input.value || "fsd");
  let itemData = localStorage.getItem("value");

  h2.innerHTML = itemData;
  console.log(itemData);
}

setItemData();
