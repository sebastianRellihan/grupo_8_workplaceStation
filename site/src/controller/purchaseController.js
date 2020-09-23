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
                promises.push(product.findByPk(index, {
                    include : image
                }));
            });
            // Ejecución de promesas
            Promise.all(promises)
                .then(products => {
                    res.render("products/purchase", { products });
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