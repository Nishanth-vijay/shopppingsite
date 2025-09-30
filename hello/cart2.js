let URL = "http://localhost:3000/cart";
let producturl = "http://localhost:3000/products";

async function fetchdetails() {
    let response = await fetch(URL);
    let data = await response.json();
    renderCart(data);
}

function renderCart(data) {
    const showdiv = document.getElementById("showdiv");
    showdiv.innerHTML = ""; // Clear previous content

    data.forEach(element => {
        // ----- Create main container -----
        const maindiv = document.createElement("div");
        maindiv.classList.add("maindiv");

        // ----- Image div -----
        const imgdiv = document.createElement("div");
        imgdiv.classList.add("imgdiv");
        const img = document.createElement("img");
        img.src = element.image;
        img.alt = element.title;
        img.id = `img-${element.productid}`;
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            window.location.href = `product.html?id=${element.productid}`;
        });
        imgdiv.appendChild(img);

        // ----- Description div -----
        const desdiv = document.createElement("div");
        desdiv.classList.add("desdiv");

        const title = document.createElement("h5");
        title.textContent = element.title;
        title.style.cursor = "pointer";
        title.addEventListener("click", () => {
            window.location.href = `product.html?id=${element.productid}`;
        });

        const category = document.createElement("h5");
        category.textContent = `Category: ${element.category}`;

        // Quantity container
        const qtyContainer = document.createElement("h4");
        qtyContainer.textContent = "Item-count: ";

        const decreaseBtn = document.createElement("button");
        decreaseBtn.type = "button";
        decreaseBtn.textContent = "-";

        const qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.min = 1;
        qtyInput.max = 20;
        qtyInput.value = element.itemcount;
        qtyInput.style.width = "30px";
        qtyInput.style.textAlign = "center";

        const increaseBtn = document.createElement("button");
        increaseBtn.type = "button";
        increaseBtn.textContent = "+";

        // Append buttons/input to qtyContainer
        qtyContainer.appendChild(decreaseBtn);
        qtyContainer.appendChild(qtyInput);
        qtyContainer.appendChild(increaseBtn);

        // Append to description div
        desdiv.appendChild(title);
        desdiv.appendChild(qtyContainer);
        desdiv.appendChild(category);

        // ----- Price div -----
        const pricediv = document.createElement("div");
        pricediv.classList.add("pricediv");

        const priceTag = document.createElement("h3");
        priceTag.textContent = `$${element.price}`;
        pricediv.appendChild(priceTag);

        // Delete button
        const delBtnDiv = document.createElement("div");
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", async () => {
            try {
                await fetch(`${producturl}/${element.productid}`, { method: "DELETE" });
                fetchdetails(); // Re-render cart after deletion
            } catch (error) {
                console.log(error);
            }
        });
        delBtnDiv.appendChild(delBtn);
        pricediv.appendChild(delBtnDiv);

        // ----- Append everything to main div -----
        maindiv.appendChild(imgdiv);
        maindiv.appendChild(desdiv);
        maindiv.appendChild(pricediv);
        showdiv.appendChild(maindiv);

        // ----- Quantity button handlers -----
        increaseBtn.addEventListener("click", () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue < parseInt(qtyInput.max)) {
                qtyInput.value = currentValue + 1;
                updateQuantity(element.productid, qtyInput.value, data);
            }
        });

        decreaseBtn.addEventListener("click", () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > parseInt(qtyInput.min)) {
                qtyInput.value = currentValue - 1;
                updateQuantity(element.productid, qtyInput.value, data);
            }
        });
    });

    // Update subtotal after rendering all items
    updateSubtotal(data);
}

async function updateQuantity(productid, newValue, data) {
    try {
        await fetch(`${URL}/${productid}`, {
            method: "PATCH",
            body: JSON.stringify({ itemcount: parseInt(newValue) }),
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        });

        // Update local data and subtotal
        const item = data.find(el => el.productid === productid);
        if (item) item.itemcount = parseInt(newValue);
        updateSubtotal(data);
    } catch (error) {
        console.log(error);
    }
}

function updateSubtotal(data) {
    const cartinfodiv = document.getElementById("price-count_infodiv");
    const totalprice = data.reduce((sum, el) => sum + el.price * el.itemcount, 0);
    const cartcount = data.reduce((sum, el) => sum + el.itemcount, 0);
    cartinfodiv.innerHTML = `<h1>Subtotal(${cartcount} items): $${totalprice}</h1>`;
}

// Fetch cart data on page load
fetchdetails();
