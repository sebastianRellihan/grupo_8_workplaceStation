window.addEventListener("load", () => {
    
    let quantityInputs = document.querySelectorAll("div.quantity-selector > input");
    let deleteButtons = document.querySelectorAll("div.cart-item-actions > form > button");

    quantityInputs.forEach(input => {
        // Imprime la cantidad de prouctos que hay en localStorage
        let inputProductId = input.id.slice(-1);

        let newValue = Number(JSON.parse(localStorage.getItem("cart")).filter( cartData => {
            if (cartData.id == inputProductId) {
                return cartData;
            }
        })[0].quantity);

        input.value = newValue;

        // Cuando se cambia la cantidad de productos se actualiza en localStorage
        input.addEventListener("change", () => {

            let existing = JSON.parse(localStorage.getItem("cart"));

            existing.map(cartData => {
                if (cartData.id == inputProductId) {
                    cartData.quantity = input.value;
                }
            });

            localStorage.setItem("cart", JSON.stringify(existing));
        })
    });

    // Cuando se elimina un producto se actualiza localStorage
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            let form = document.getElementById(btn.id).parentElement;

            let btnProductId = btn.id.slice(-1);

            let existing = JSON.parse(localStorage.getItem("cart"));

            let modified = existing.filter(cartData => {
                return Number(cartData.id) != btnProductId;
            });
        
            localStorage.setItem("cart", JSON.stringify(modified));

            form.submit();
        })
    })
})