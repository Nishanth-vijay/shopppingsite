const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));
console.log(productId);

const producturl = "http://localhost:3000/product";
const cartUrl =    "http://localhost:3000/cart";

let productcategory;
if (productId) {
    getdata()
    // console.log("iffffffffffffound");
}
async function getdata() {
    let res = await fetch(producturl);
    let data = await res.json();
    data.forEach(element => {
        // console.log("iffffffffffffound");
        if (parseInt(element.id) === productId) {
            productinfo(element)
            console.log("found");

        }
    });
}


function productinfo(element) {
    // let productdiv = document.getElementById("productpage")
    let productdiv = document.getElementById("productpage")

    let maindiv = document.createElement("div")
    maindiv.id = "maindiv"
    let imgdiv = document.createElement("div")
    let cartdiv = document.createElement("div")
    let gotocartdiv = document.createElement("div")
    let desdiv = document.createElement("div")
    let titlediv = document.createElement("div")
    desdiv.id = "desdiv"
    cartdiv.id = "cartdiv"

    imgdiv.innerHTML = `<img src=${element.image} alt=${element.title}>`

    titlediv.innerHTML = `<h1>${element.title}</h1>`

    desdiv.innerHTML = `  <h1>$ ${element.price}</h1>
                            <p>${element.description}</p>
                            <h4>Category: ${element.category}</h4>
                            <h4>Rating-rate: ${element.rating.rate}</h4>
                            <h4>Rating-count : (${element.rating.count})</h4>
                            `

    productcategory = element.category;
    console.log(productcategory);
    similarproduct(productcategory )
   
    gotocartdiv.innerHTML = `<button type = "button">Go to cart</button>`
    
    gotocartdiv.onclick = () => { window.location.href = "cart.html" }
    // desdiv.appendChild(gotocartdiv)
    cartdiv.innerHTML = `<button type="button">Add to cart</button>`;


 cartdiv.onclick = (e) => { 
        e.preventDefault()
        e.stopPropagation(); // Optional: stops bubbling if needed
        cartfunction(element);

    let alertdiv = document.createElement("div")
    alertdiv.id = "alertdiv"
    alertdiv.innerText = "Added to cart"
    document.body.append(alertdiv)

    setTimeout(() => {
        alertdiv.remove()
    }, 2000)
    
}

    desdiv.append(cartdiv,gotocartdiv)
    maindiv.append(titlediv, imgdiv, desdiv)
    productdiv.appendChild(maindiv)


};

async function similarproduct(productcategory) {
    let simheading = document.createElement("div")
    let simdiv = document.getElementById("similar")
    let res = await fetch(producturl);
    let data = await res.json();
    data.forEach(element => {
        if (element.category === productcategory  && element.id != productId) {
            let div = document.createElement("div");

            let btndiv = document.createElement("div");
            div.id = parseInt(element.id);

            const desdiv = document.createElement("h5");
            desdiv.textContent = element.title;
            desdiv.id = parseInt(element.id);

            const imgdiv = document.createElement("img");
            imgdiv.src = element.image;
            imgdiv.alt = element.title;
            imgdiv.id = parseInt(element.id);

            const price = document.createElement("h4");
            price.textContent = `Price: $${element.price}`;
            price.id = parseInt(element.id);

            // Add-to-cart button
            // const button = document.createElement("button");
            // button.textContent = "Add to cart";
            // button.onclick = (event) => {
            //     event.stopPropagation(); // Prevent div click
            //     cartfunction(element);
            
       

            // Assemble product card
            div.append(desdiv, imgdiv, price ,btndiv)

                btndiv.innerHTML = `<button type = "button">Add to cart</button>` 
                btndiv.onclick = (event) => { event.stopPropagation();  event.preventDefault(); cartfunction(element) }
            // div.onclick = () => { cartfunction(element) }
            // div.appendChild(btndiv);
            simdiv.append(div); 
        // simdiv.appendChild(simheading);
        }
        
    });
    
    simdiv.querySelectorAll('img', 'h4', 'h5').forEach(el => {
        el.onclick = () => window.location.href = `product.html?id=${el.id}`;
    });

//         imgdiv.onclick = () => {
// window.location.href = `product.html?id=${element.id}`;
// productinfo(element)

// }
// desdiv.onclick = () => {
// window.location.href = `product.html?id=${element.id}`;
// productinfo(element)

// }

}

async function cartfunction(element) {
    // event.preventDefault();
    let dat = await fetch(cartUrl);
    let len = await dat.json();
    
    let incomingitemid = element.id;

    let itemfound = len.find(  (item) => item.productid === incomingitemid)  ;

    console.log("Item found:", itemfound);

    let modurl = itemfound ? cartUrl+`/${itemfound.id}` : cartUrl;
    
    let    opt = ({
                method: itemfound ? "PUT" : "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": itemfound ? itemfound.id : `${len.length + 1}`,
                    "productid": element.id,
                    "itemcount": itemfound ? itemfound.itemcount + 1 : 1,
                    "title": element.title,
                    "description": element.description,
                    "price": element.price,
                    "category": element.category,
                    "image": element.image,
                    "rating": element.rating
                })

            });



    // len.forEach((item) => {
    //     // console.log(item);

    //     if (item.productid === incomingitemid) {
    //         Status = true;
    //         modurl = cartUrl+`/${item.id}`
    //         opt = ({
    //             method: "PUT",
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({

    //                 "id": item.id,
    //                 "productid": element.id,
    //                 "itemcount": item.itemcount + 1,
    //                 "title": element.title,
    //                 "description": element.description,
    //                 "price": element.price,
    //                 "category": element.category,
    //                 "image": element.image,
    //                 "rating": element.rating

    //             })

    //         })
    //     }
    //     })
   

    // if (!Status) {

    //     modurl = cartUrl;
    //     opt = ({
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({

    //             "id": `${len.length + 1}`,
    //             "productid": element.id,
    //             "itemcount": 1,
    //             "title": element.title,
    //             "description": element.description,
    //             "price": element.price,
    //             "category": element.category,
    //             "image": element.image,
    //             "rating": element.rating
    //         })

    //     })


    // }
    // console.log(modurl);
 

    try {
        let d1 = await fetch(modurl, opt);
        console.log("Status:", d1.status, "Redirected:", d1.redirected, "URL:", d1.url);
        // setTimeout(() => {}, 3000)
    }
    catch (error) {

        console.log(error);
        console.log("product not added to cart")
        alert("product not added to cart due to some error")
        setTimeout(() => {
            window.location.reload();           
        }, 3000)
    }


}





