window.addEventListener("load", () => {
    
    let quantityInputs = document.querySelectorAll("div.quantity-selector > input");
    let deleteButtons = document.querySelectorAll("div.cart-item-actions > form > button");

    quantityInputs.forEach(input => {
        
        let inputProductId = input.id.slice(-1);

        let newValue = Number(JSON.parse(localStorage.getItem("cart")).filter( cartData => {
            if (cartData.id == inputProductId) {
                return cartData;
            }
        })[0].quantity);

        input.value = newValue;

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