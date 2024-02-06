
let products = [
    {
        image: './img/item-1.avif',
        title: 'Cerruti 1881 Mucciano Watch',
        price: 400,
        stock: 20,
    },
    {
        image: './img/item-2.avif',
        title: 'New Port',
        price: 900,
        stock: 63,
    },
    {
        image: './img/item-3.avif',
        title: 'Nmierer',
        price: 700,
        stock: 2,
    },
]

let myPurchaseArray = [];

function displayProducts() {
    shopContainer.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        shopContainer.innerHTML += `
        <div class="item" onclick="displayProductsModal(${i})">
        <img src="${product.image}" alt="${product.image}">
        <div class="product-description">
            <p class="product-name">${product.title}</p>
            <p class="product-price">$${product.price}</p>
        </div>
        </div>
        `;
    }
   
}

function displayProductsModal(value) {
    buyingProductModal.innerHTML = `
    <div class="container">
                <div class="image-holder">
                    <img src="${products[value].image}" alt="">
                </div>
                <form method="dialog" onsubmit="buyingProducts(${value})">
                    <h1>${products[value].title}</h1>
                    <h2>$${products[value].price}</h2>
                    <h2>Stock: ${products[value].stock}</h2>
                    <h2>Quantity:    <input id="productQuantity" type="number" value="1" min="1"></h2>
                    <div class="button-modal">
                        <button type="submit">Buy</button>
                        <button type="button" onclick="buyingProductModal.close()">Cancel</button>
                    </div>
                </form>
            </div>
    `;
    buyingProductModal.showModal();
    displayProducts();
}

function buyingProducts(value) {
    if (products[value].stock >= productQuantity.value) {
        let finalProduct = products[value].stock - productQuantity.value;
        products[value].stock = finalProduct;
    
        let existingPurchaseItem = myPurchaseArray.find(item => item.title == products[value].title);

        if (existingPurchaseItem) {
            existingPurchaseItem.quantity += parseInt(productQuantity.value);
        } else {
            myPurchaseArray.push({
                image: products[value].image,
                title: products[value].title,
                quantity: parseInt(productQuantity.value)
            });
        }

        displayMyPurchase();

        if (products[value].stock <= 0) {
            products.splice(value, 1);
        }
    } else {
        displayError();
    }

    console.log(myPurchaseArray);
    displayProducts();
}

function addingProducts() {
    let newUrl = urlInput.value;
    let newTitle = titleInput.value;
    let newPrice = priceInput.value;
    let newStocks = stocksInput.value;

    products.push(
        {
            image: newUrl,
            title: newTitle,
            price: newPrice,
            stock: newStocks,
        }
    );

    displayProducts();
}

function displayMyPurchase() {
    purchaseItemContainer.innerHTML = '';
    for (let i = 0; i < myPurchaseArray.length; i++) {
        let myItem = myPurchaseArray[i];
        purchaseItemContainer.innerHTML += `
        <div class="item">
        <img src="${myItem.image}" alt="${myItem.image}">
        <div>
            <h4>${myItem.title}</h4>
            <p>Quantity: ${myItem.quantity}</p>
        </div>
    </div>
        `;
    }
}

function displayError(){
    errorModal.showModal();
}


displayMyPurchase();
displayProducts();