let submitbutton = document.getElementById("login");
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
console.log(username, password);

submitbutton.onclick = function() {
    let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
    if (username === "admin" && password === "admin") {
        alert("Login successful!"); 
        window.location.href = "shopping_website.html";
    } else {
        alert("Login failed!");
    }
};

