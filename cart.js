let URL = "http://localhost:3000/cart";

async function fetchdetails() {
    let dat = await fetch(URL)
    let da = await dat.json()
    console.log(da.length);
    print(da)
    
}





 function print(data) {
    let showdiv = document.getElementById("showdiv")
    let totalprice =0;
    let cartcount=0;
    data.forEach(element => {   

        let maindiv = document.createElement("div")
        maindiv.id = "maindiv"
        let imgdiv = document.createElement("div")
        imgdiv.id = "imgdiv"
        let desdiv = document.createElement("div")
        let pricediv = document.createElement("div")
       desdiv.id = "desdiv"
       pricediv.id = "pricediv"
        
        imgdiv.innerHTML = `<img src=${element.image}>`
        desdiv.innerHTML = ` <h5>${element.title}</h5>
        <h4>item-count: ${element.itemcount}</h4>
        <h5>Category: ${element.category}</h5>      `
        

        pricediv.innerHTML = `
        <h3>$ ${element.price}</h4>`
        
        let delbtndiv = document.createElement("div")
        delbtndiv.innerHTML = `<button>Delete</button> 
        `
        
        
        delbtndiv.onclick =async () => {
        URL1 = URL+`/${element.id}`    
            try {
                    console.log(URL1);
                    let d3 = await fetch(URL1,{method: "DELETE"})

                } catch (error) {
                    console.log(error);
                }
            showdiv.innerText=""    
             fetchdetails()
            }


        totalprice+=element.price*element.itemcount;
        cartcount+=element.itemcount;

        pricediv.append(delbtndiv)
        maindiv.append(imgdiv, desdiv, pricediv)
        showdiv.appendChild(maindiv)


       
    
    });
   




let cartinfodiv=document.getElementById("price-count_infodiv")
cartinfodiv.innerHTML=` 
<h4>
<hr>Subtotal(${cartcount}items): $ ${totalprice}
</h4>

`
    };

fetchdetails()