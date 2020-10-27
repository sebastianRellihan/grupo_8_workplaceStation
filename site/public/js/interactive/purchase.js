window.addEventListener("load", () => {
    // Elemento formulario
    let form = document.getElementById("purchase-form");
    // Elemento boton submit del formulario
    let purchaseBtn = document.getElementById("purchase-form-submit-btn");
    // Array de elementos contenedores de productos
    let productsList = document.querySelectorAll("div.cart-item-info-product");
    // Elemento donde figura el precio total
    let totalPrice = document.getElementById("total-price");
    // Elemento donde figura el descuento total
    let totalDiscount = document.getElementById("total-discount");

    let totalValueAcum = 0;
    let totalDiscountAcum = 0;
    
    // Actualiza las cantidades y los precios que se ven en pantalla
    productsList.forEach(product => {
        // Elemento donde figura la cantidad de productos en la tabla
        let quantity = product.children[3];
        // Identificador del producto
        let productId = product.id;
        // Elemento donde figura el precio del producto
        let price = product.children[1]; 
        // Valor numerico que figura en price
        let priceValue = Number(price.innerText.substring(1)); 
        // Elemento donde figura el descuento del producto
        let discount = product.children[2];
        // Valor numerico que figura en discount
        let discountValue = Number(discount.innerText.substring(0, discount.innerText.length - 1)); 
        // Elemento donde figura el el total del producto 
        let totalproductPrice = product.children[4]; 
        // Data de local storage
        let localStorageCart = JSON.parse(localStorage.getItem("cart"));  
        // Data del producto en cuestión
        let productCart = localStorageCart.filter(cartData => {
            return Number(cartData.id) == productId;
        })[0];

        // Se actualizan los valores del producto
        quantity.innerHTML = `<span>${Number(productCart.quantity)}</span>`;

        totalproductPrice.innerHTML = `<span>$${productCart.quantity * (priceValue - priceValue * discountValue/100)}</span>`

        // Se suman al acumulador
        totalValueAcum += productCart.quantity * (priceValue - priceValue * discountValue/100);

        totalDiscountAcum += productCart.quantity * (priceValue * discountValue/100);
    })

    // Se reemplazan los datos de los precios y descuentos totales con los valores del acumulador
    totalPrice.innerText = `$${totalValueAcum}`;
    totalDiscount.innerText = `$${totalDiscountAcum}`;

    // Cuando se selecciona el boton para comprar se bloquea la acción de enviar, se introduce un input hidden con el valor del carrito que hay en storage y luego se envía
    purchaseBtn.addEventListener("click", (e) => {
        e.preventDefault()

        form.innerHTML += `<input type="hidden" name="cart" value=${localStorage.cart}`;

        localStorage.clear();

        form.submit();
    })
})