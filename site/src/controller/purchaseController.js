/**
 * Controlador para el proceso de la vista y acciones realizadas al terminar una compra.
 */
const { product, image, shipping } = require("../database/models");

module.exports = {
    show : function(req, res) {
        let promises = []; // Array de promesas

        if(req.session.cart && req.session.cart.length != 0){
            // Obtengo promesas para todos los productos lamacenados en el carrito de la sesión
            req.session.cart.forEach(index => {
                promises.push(product.findByPk(index));
            });

            // Promesa para los métodos de envío
            promises.push(shipping.findAll());

            // Ejecución de promesas
            Promise.all(promises)
                .then(results => {
                    // Obtengo el resultado de la última promesa (categorías),
                    // e método .pop() tambien elimina el último resultado del array
                    let shippings = results.pop();

                    res.render("products/purchase", { 
                        products : results,
                        shippings : shippings
                    });
                })
                .catch(error => {
                    // Error 500 "Internal server error"
                    res.status(500).redirect("/");
                });
        } else {
            // Carrito vacío
            res.render("products/cart", { products : []});
        }
    }
}