window.addEventListener("load", () => {
    // Array de elementos contenedores de productos 
    let products = document.querySelectorAll("div.cart-item-info");
    // Elemento donde figura el descuento total
    let totalDiscount = document.getElementById("total-discount");
    // Elemento donde figura el precio total
    let totalPrice = document.getElementById("total-price");
    let totalDiscountAcum = 0; 
    let totalPriceAcum = 0;
    
    // Por cada producto que haya en la vista del carrito...
    products.forEach(product => {

        // ID del producto
        let productId = Number(product.id);
        // Elemento input
        let input = product.lastElementChild.children[0].children[0];
        // Elemento boton submit del form
        let deleteBtn = product.lastElementChild.children[1].children[0];
        // Precio del producto
        let productPrice = Number(product.children[1].children[0].innerText.substring(1));
        // Descuento del producto
        let productDiscount = 0;
        if (product.children[2].children[0].nodeName == "SPAN") {
            productDiscount = Number(product.children[2].children[0].innerText.slice(0, -5));
        }
        
        console.log(productId);
        console.log(input);
        console.log(deleteBtn);
        console.log(productPrice);
        console.log(productDiscount);

        // Imprime la cantidad de productos que hay en localStorage dentro del input
        let newValue = Number(JSON.parse(localStorage.getItem("cart")).filter( cartData => {
            if (cartData.id == productId) {
                return cartData;
            }
        })[0].quantity);

        input.value = newValue;

        // Cuando se cambia la cantidad de productos se actualiza en localStorage
        input.addEventListener("change", () => {

            let existing = JSON.parse(localStorage.getItem("cart"));

            existing.map(cartData => {
                if (cartData.id == productId) {
                    cartData.quantity = input.value;
                }
            });

            localStorage.setItem("cart", JSON.stringify(existing));
        })

        // Cuando se elimina un producto se actualiza localStorage
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();

            let form = document.getElementById(deleteBtn.id).parentElement;

            let deleteBtnProductId = deleteBtn.id.slice(-1);

            let existing = JSON.parse(localStorage.getItem("cart"));

            let modified = existing.filter(cartData => {
                return Number(cartData.id) != deleteBtnProductId;
            });
        
            localStorage.setItem("cart", JSON.stringify(modified));

            form.submit();
        })
    })
})