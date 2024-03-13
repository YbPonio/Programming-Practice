let indexNum = 0;

function addItem(data) {
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
    } else if (element == null) {
      cell.innerHTML = `
      <p>${element}</p>`;

      newRow.append(cell);
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

function submitItemDetails() {
  let details = {
    index: indexNum++,
    prodId: generateRandomId(),
    name: nameInput.value || null,
    category: categoryInput.value || null,
    type: typeInput.value || null,
    price: parseFloat(priceInput.value) || null,
    items: parseFloat(itemsInput.value) || null,
    stock: parseFloat(stocksInput.value) || null,
  };

  additemForm.reset();
  addItem(details);

  console.log(details);
}

function generateRandomId() {
  let min = 10000;
  let max = 99999;
  let randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomId;
}
