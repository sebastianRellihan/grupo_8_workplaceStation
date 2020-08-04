/**
 * Sistema de controlador para administrar las peticiones de los clientes en cuanto a productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el enrutador productsRoutes.
*/
const path = require("path");

module.exports = {
    /** Envía la vista principal de todos los productos (products.ejs) */
    index: (req, res) => {
        res.render("products/products");
    },
    /** Envía la vista del detalle de producto (product-detail.ejs) */
    detail: (req, res) => {
        res.render("products/detail");
    },
    /** Envía la vista del carrito de productos seleccionados (cart.ejs) */
    cart: (req, res) => {
        res.render("products/cart");
    }
}