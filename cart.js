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
        <h4>item-count: <div><button type="button" id="decrease-${element.productid}">-</button> <input type="number" name="quantity" id="quantity-${element.productid}" value="${element.itemcount}" min="1" max="20" style="width: 1.1rem; height: 100%;">  <button type="button" id="increase-${element.productid}">+</button></div></h4>
        <h5  id=${element.productid}>Category: ${element.category}</h5>      `

        pricediv.innerHTML = `
        <h3 id=${element.productId}>$ ${element.price}</h4>`

        let delbtndiv = document.createElement("div")
        delbtndiv.innerHTML = `<button>Delete</button> 
        `


        showdiv.querySelectorAll("img,h5,h3").forEach(el => {
            el.onclick = () => {

                console.log(el.id);

                window.location.href = `product.html?id=${el.id}`;
            };
        });


        delbtndiv.onclick = async (e) => {
            e.preventDefault();
            URL1 = URL + `/${parseInt(element.id)}`
            try {
                console.log(URL1);
                let d3 = await fetch(URL1, { method: "DELETE" })

            } catch (error) {
                console.log(error);
            }
            showdiv.innerText = ""
            fetchdetails()
        }

// function increase() {
//     let input = document.getElementById("quantity");
//     let value = parseInt(input.value);
//     input.value = value < input.max ? value + 1 : value;
//      newQty();
// }

// function decrease() {
//     let input = document.getElementById("quantity");
//     let value = parseInt(input.value);
//         input.value = value > input.min ? value - 1 : value;

//     newQty();
// }

let increaseBtn = desdiv.querySelector(`#increase-${element.productid}`);
        increaseBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let qtyInput = document.getElementById(`quantity-${element.productid}`);
            if (parseInt(qtyInput.value) < parseInt(qtyInput.max)) {
                    qtyInput.value = (parseInt(qtyInput.value) + 1);
                    newQty(qtyInput.value);
                }
        });

        let decreaseBtn = desdiv.querySelector(`#decrease-${element.productid}`);
        decreaseBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let qtyInput = document.getElementById(`quantity-${element.productid}`);
            console.log("decrease");
                if (parseInt(qtyInput.value) > parseInt(qtyInput.min)) {
                    qtyInput.value = (parseInt(qtyInput.value) - 1);
                    newQty(qtyInput.value);
                }
        });

        

        // qtyInput.addEventListener("change",() => {
        //     newQty();

//  let increaseBtn = document.getElementById("increase");

//         increaseBtn.onclick = () => {
//                 let qtyInput = document.getElementById("quantity");
//                 if (parseInt(qtyInput.value) < parseInt(qtyInput.max)) {
//                     qtyInput.value = JSON.stringify(parseInt(qtyInput.value) + 1);
//                     newQty();
//                 }
//             };

//         let decreaseBtn = document.getElementById("decrease");
//         decreaseBtn.onclick = () => {
//             let qtyInput = document.getElementById("quantity");
//             console.log("decrease");
//             if (parseInt(qtyInput.value) > parseInt(qtyInput.min)) {
//                 qtyInput.value = JSON.stringify(parseInt(qtyInput.value) - 1);
//                 newQty();
//             }
//         };




        // })
  


        
async function newQty (value ) {
     if (value != element.itemcount) {
                let URL1 = URL + `/${element.id}`;
                try {
                    await fetch(URL1, {
                        method: "PATCH",
                        body: JSON.stringify({ itemcount: value }),
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                        },
                    });
                    totalprice += element.price * element.itemcount;
        cartcount += parseInt(element.itemcount);
                    console.log("Quantity updated");
                } catch (error) {
                    console.log(error);
                }
            }}





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

document.addEventListener("DOMContentLoaded", fetchdetails);