window.addEventListener("load", () => {

    let addToCartBtn = document.getElementById("add-to-cart-btn");
    let productDetailQuantity = document.getElementById("add-to-cart-quantity");
    
    // Add to cart - Product detail
    addToCartBtn.addEventListener("click", (e) => {
        if (localStorage.length == 0) {

            localStorage.setItem("cart", JSON.stringify([{
                id: document.URL.slice(-1),
                quantity: productDetailQuantity.value
            }]))  

        } else {
            let existing = JSON.parse(localStorage.getItem("cart"));

            existing.push({
                id: document.URL.slice(-1),
                quantity: productDetailQuantity.value
            });

            localStorage.setItem("cart", JSON.stringify(existing));
        }

    })
    
})