let data = {
  index: 4,
  prodId: 1232,
  name: "Mouse",
  category: "School",
  type: "Computer",
  price: 8,
  items: 134,
  stock: 136,
};

function addItem() {
  let newRow = document.createElement("tr");
  let prodItem = null;

  for (item in data) {
    let cell = document.createElement("td");
    let element = data[item];

    let indexZero = "";

    if (item == "index") {
      let indexChr = element.toString().length;
      if (indexChr == 1) indexZero = "00";
      else if (indexChr == 2) indexZero = "0";
      else indexZero = "";
    }

    if (item == "stock") {
      cell = document.createElement("td");
      cell.innerHTML = `<p>${prodItem}/${element}</p>`;

      newRow.append(cell);
    } else if (item == "items") {
      prodItem = element;
    } else {
      cell.innerHTML = `
      <p>${item == "price" ? "$" : ""}${indexZero}${
        item == "price" ? element.toFixed(2) : element
      }</p>`;
      newRow.append(cell);
    }
  }
  newRow.classList.add("item");
  itemContainer.append(newRow);
}
