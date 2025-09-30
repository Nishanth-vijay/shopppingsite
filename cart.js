let URL = "http://localhost:3000/cart";
producturl = "http://localhost:3000/products"

async function fetchdetails() {
    let dat = await fetch(URL)
    let da = await dat.json()
    console.log(da.length);
    print(da)

}





function print(data) {
    let showdiv = document.getElementById("showdiv")
    let totalprice = 0;
    let cartcount = 0;
    data.forEach(element => {

        let maindiv = document.createElement("div")
        maindiv.id = "maindiv"
        let imgdiv = document.createElement("div")
        imgdiv.id = "imgdiv"
        let desdiv = document.createElement("div")
        let pricediv = document.createElement("div")
        desdiv.id = "desdiv"
        pricediv.id = "pricediv"

        imgdiv.innerHTML = `<img src=${element.image} alt=${element.title} id=${element.productid}>`
        desdiv.innerHTML = ` <h5   id=${element.productid}>${element.title}</h5>
        <h4>item-count: <input type="number" name="quantity" id="quantity" value="${element.itemcount}" min="1" max="20" style="width: 30px; height: 20px;"></h4>
        <h5  id=${element.productid}>Category: ${element.category}</h5>      `

        pricediv.innerHTML = `
        <h3 id=${element.productId}>$ ${element.price}</h4>`

        let delbtndiv = document.createElement("div")
        delbtndiv.innerHTML = `<button>Delete</button> 
        `


        showdiv.querySelectorAll("img,h5,h4,h3").forEach(el => {
            el.onclick = () => {

                console.log(el.id);

                window.location.href = `product.html?id=${el.id}`;
            };
        });


        delbtndiv.onclick = async () => {
            URL1 = producturl + `/${parseInt(element.productid)}`
            try {
                console.log(URL1);
                let d3 = await fetch(URL1, { method: "DELETE" })

            } catch (error) {
                console.log(error);
            }
            showdiv.innerText = ""
            fetchdetails()
        }

        let qtyInput = desdiv.querySelector(`input[type="number"]`);
        qtyInput.addEventListener("change", async () => {
            if (qtyInput.value != element.itemcount) {
                let URL1 = URL + `/${element.id}`;
                try {
                    await fetch(URL1, {
                        method: "PATCH",
                        body: JSON.stringify({ itemcount: qtyInput.value }),
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                        },
                    });
                    console.log("Quantity updated");
                } catch (error) {
                    console.log(error);
                }
            }
        })

        // if(document.getElementById("quantity").value!=element.itemcount){
        //     URL1= URL+`/${element.id}`
        //             try {
        //                 fetch(URL1,{method: "PATCH",
        //                 body: JSON.stringify({
        //                     itemcount: document.getElementById("quantity").value
        //                 }),
        //                 headers: {
        //                     "Content-type": "application/json; charset=UTF-8"
        //                   }
        //                 })
        //             } catch (error) {
        //                 console.log(error);

        //             }
        //         }

        totalprice += element.price * element.itemcount;
        cartcount += parseInt(element.itemcount);

        pricediv.append(delbtndiv)
        maindiv.append(imgdiv, desdiv, pricediv)
        showdiv.appendChild(maindiv)




    });





    let cartinfodiv = document.getElementById("price-count_infodiv")
    cartinfodiv.innerHTML = ` 
<h1>
Subtotal(${cartcount}items): $ ${totalprice}
</h1>

`
};

fetchdetails()