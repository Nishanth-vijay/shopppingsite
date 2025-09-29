
let data;
// let schema = ["id", "title", "price", "description", "category", "image"]
let URL = "http://localhost:3000/product";
let url = "http://localhost:3000/cart";



// function getValuw(value) {
//     if (value && value.trim() !== "") {
//         return value;
//     } else {
//         return "";
//     }
// }



async function fun() {
   

    let dat = await fetch(URL)
    let da = await dat.json()

    printdeletedata(da)
    

}


async function printdeletedata(data) {
    let showdiv = document.getElementById("showdiv")
    data.forEach(element => {
        let maindiv = document.createElement("div")
        maindiv.id = "maindiv"
        let imgdiv = document.createElement("div")
        let cartdiv = document.createElement("div")
        let desdiv = document.createElement("div")
        desdiv.id = "desdiv"
         let maindesdiv = document.createElement("div")
        maindesdiv.id = "maindesdiv"   // for button working when press on title , price not on buttons-delete,addcart
        let deldiv = document.createElement("div")

        imgdiv.innerHTML = `<img src=${element.image} alt=${element.title}>`
        desdiv.innerHTML = `
        <h3>${element.title}</h3>
        <h4>Price: ${element.price}</h4>
        `
        // <p>${element.description.split(/\s+/).slice(0, 45).join(" ")}</p>
        
        // <h4>Rating-rate: ${element.rating.rate}</h4>
        // <h4>Rating-count : (${element.rating.count})</h4>
        // <h4>Category: ${element.category}</h4>
imgdiv.onclick = () => {
window.location.href = `product.html?id=${element.id}`;
productinfo(element)

}
desdiv.onclick = () => {
window.location.href = `product.html?id=${element.id}`;
productinfo(element)

}

        deldiv.innerHTML = `<button>Delete</button> <p> </p>`
        deldiv.onclick = () => {
            maindiv.remove()
        }
        
        cartdiv.innerHTML = `<button type = "button">Add to cart</button>`
        cartdiv.onclick = () => { cartfunction(element) }
        maindesdiv.append(desdiv,deldiv, cartdiv)
        maindiv.append(imgdiv, maindesdiv)
        showdiv.appendChild(maindiv)
    });

};





async function cartfunction(element) {
            // event.preventDefault();

             let dat = await fetch(url)
    let len = await dat.json()
    let Status = false;
    // if(!Status){
    //     console.log("New Item Added to Cart");
        
    // }
let modurl
let opt
let incomingitemid = element.id;
len.forEach((item) => {
    if (item.productid === incomingitemid) {
        Status = true;
         modurl = url + `/${item.id}`
      opt = ({
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                 "id": `${item.id}`,
                    "productid": element.id,
                    "itemcount": item.itemcount + 1 ,
                    "title": element.title,
                    "description": element.description,
                    "price": element.price,
                    "category": element.category,
                    "image": element.image,
                    "rating": element.rating

            })

            })
}
 }   )

if(!Status) {

  modurl = url ;
             opt = ({
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    "id": `${len.length + 1}`,
                    "productid": element.id,
                    "itemcount": 1,
                    "title": element.title,
                    "description": element.description,
                    "price": element.price,
                    "category": element.category,
                    "image": element.image,
                    "rating": element.rating
                })

            })


        } 
console.log(modurl, opt);


            try {
                let d1 = await fetch(modurl, opt);
                console.log("Status:", d1.status, "Redirected:", d1.redirected, "URL:", d1.URL2);
                let res = await d1.json();
                console.log("Response:", res);
                setTimeout(() => {

                }, 3000)
            }
            catch (error) {
                console.log(error);
                setTimeout(() => {
                    console.log("Server is not running")
                }, 3000)
            }


        }


        

function productinfo(element){
let productpagediv = document.getElementById("productpage")
let imagediv = document.createElement("div")
imagediv.id = "imagediv"
let desdiv = document.createElement("div")      
desdiv.id = "desdiv"
imagediv.innerHTML = `<img src=${element.image} alt=${element.title}>`
desdiv.innerHTML = `
<h3>${element.title}</h3>
<h4>Price: ${element.price}</h4>
<p>${element.description}</p>
<h4>Category: ${element.category}</h4>
<h4>Rating-rate: ${element.rating.rate}</h4>
<h4>Rating-count : (${element.rating.count})</h4>
`
productpagediv.append(imagediv, desdiv)
// localStorage.setItem("product", JSON.stringify(element))    





}














fun();