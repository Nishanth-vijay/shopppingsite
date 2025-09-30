let URL = "http://localhost:3000/cart";
let producturl = "http://localhost:3000/products";

async function fetchdetails() {
    let dat = await fetch(URL);
    let data = await dat.json();
    print(data);
}

function print(data) {
    let showdiv = document.getElementById("showdiv");
    showdiv.innerHTML = ""; // Clear previous content

    let totalprice = 0;
    let cartcount = 0;

    data.forEach(element => {
        // Create main container
        let maindiv = document.createElement("div");
        maindiv.classList.add("maindiv");

        // Image div
        let imgdiv = document.createElement("div");
        imgdiv.classList.add("imgdiv");
        imgdiv.innerHTML = `<img src="${element.image}" alt="${element.title}" id="img-${element.productid}">`;

        // Description div
        let desdiv = document.createElement("div");
        desdiv.classList.add("desdiv");
        desdiv.innerHTML = `
            <h5 id="title-${element.productid}">${element.title}</h5>
            <h4>
                Item-count: 
                <button type="button" id="decrease-${element.productid}">-</button>
                <input type="number" id="quantity-${element.productid}" value="${element.itemcount}" min="1" max="20" style="width:30px;text-align:center;">
                <button type="button" id="increase-${element.productid}">+</button>
            </h4>
            <h5>Category: ${element.category}</h5>
        `;

        // Price div
        let pricediv = document.createElement("div");
        pricediv.classList.add("pricediv");
        pricediv.innerHTML = `<h3>$${element.price}</h3>`;

        // Delete button
        let delbtndiv = document.createElement("div");
        delbtndiv.innerHTML = `<button type="button">Delete</button>`;
        delbtndiv.querySelector("button").addEventListener("click", async () => {
            try {
                await fetch(`${producturl}/${element.productid}`, { method: "DELETE" });
            } catch (error) {
                console.log(error);
            }
            fetchdetails(); // Re-render after deletion
        });

        pricediv.append(delbtndiv);
        maindiv.append(imgdiv, desdiv, pricediv);
        showdiv.appendChild(maindiv);

        // Subtotal calculation
        totalprice += element.price * element.itemcount;
        cartcount += element.itemcount;

        // Quantity buttons
        let qtyInput = desdiv.querySelector(`#quantity-${element.productid}`);
        let increaseBtn = desdiv.querySelector(`#increase-${element.productid}`);
        let decreaseBtn = desdiv.querySelector(`#decrease-${element.productid}`);

        increaseBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let currentValue = parseInt(qtyInput.value);
            if (currentValue < parseInt(qtyInput.max)) {
                qtyInput.value = currentValue + 1;
                updateQuantity(element.productid, qtyInput.value, data);
            }
        });

        decreaseBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > parseInt(qtyInput.min)) {
                qtyInput.value = currentValue - 1;
                updateQuantity(element.productid, qtyInput.value, data);
            }
        });

        // Clickable product link
        imgdiv.querySelector("img").addEventListener("click", () => {
            window.location.href = `product.html?id=${element.productid}`;
        });
        desdiv.querySelector(`#title-${element.productid}`).addEventListener("click", () => {
            window.location.href = `product.html?id=${element.productid}`;
        });
    });

    // Update subtotal display
    updateSubtotal(data);
}

async function updateQuantity(productid, newValue, data) {
    try {
        await fetch(`${URL}/${productid}`, {
            method: "PATCH",
            body: JSON.stringify({ itemcount: parseInt(newValue) }),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });

        // Update the data object locally
        let item = data.find(el => el.productid === productid);
        if (item) item.itemcount = parseInt(newValue);

        updateSubtotal(data);
    } catch (error) {
        console.log(error);
    }
}

function updateSubtotal(data) {
    let cartinfodiv = document.getElementById("price-count_infodiv");
    let totalprice = data.reduce((sum, el) => sum + el.price * el.itemcount, 0);
    let cartcount = data.reduce((sum, el) => sum + el.itemcount, 0);
    cartinfodiv.innerHTML = `<h1>Subtotal(${cartcount} items): $${totalprice}</h1>`;
}

// Initial fetch
fetchdetails();
