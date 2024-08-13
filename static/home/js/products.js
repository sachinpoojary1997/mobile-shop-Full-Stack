fetch("http://localhost:8000/products/").then (function(response){
    return response.json();
}).then(function(response){
    console.log(response);

    const products = response.products;
    console.log(products);
    let placeholder = document.querySelector("#products");
    placeholder.classList.add("row")

    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        const divcol = document.createElement("div");
        divcol.classList.add("col");

        const anchorlink = document.createElement("a");
        anchorlink.href = `/products/${product.id}`;

        const divCard = document.createElement("card");
        divCard.classList.add("card");
        divCard.style.width = "18rem";

        const imgElements = document.createElement("img");
        imgElements.classList.add("card-img-top");
        imgElements.src = `/media/${product.image}`;
        imgElements.alt = product.name;

        const divCardbody = document.createElement("div");
        divCardbody.classList.add("card-body");


        const titleElements = document.createElement("h5");
        titleElements.classList.add("card-title");
        titleElements.innerText = product.name;
        
        const discriptionElements = document.createElement("p");
        discriptionElements.classList.add("card-text");
        discriptionElements.innerText = product.description;

        const buttonElements = document.createElement("a");
        buttonElements.classList.add("btn","btn-primary");
        buttonElements.innerText ="Buy for $" + product.price;
        buttonElements.href = "#";

        //card element body
        divCardbody.appendChild(titleElements);
        divCardbody.appendChild(discriptionElements);
        divCardbody.appendChild(buttonElements);

        divCard.appendChild(imgElements);
        divCard.appendChild(divCardbody);
        anchorlink.appendChild(divCard);
        divcol.appendChild(anchorlink);

        placeholder.appendChild(divcol);

        
      
    }
   
console.log(placeholder);
})