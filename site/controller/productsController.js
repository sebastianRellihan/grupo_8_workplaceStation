/**
 * Sistema de controlador para administrar las peticiones de los clientes en cuanto a productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el enrutador productsRoutes.
*/
const path = require("path");

module.exports = {
    index: (req, res) => {
        let fileDir = path.join(__dirname, "../views/products.html");
        res.sendFile(fileDir);
    },
    detail: (req, res) => {
        let fileDir = path.join(__dirname, "../views/product-detail.html");
        res.sendFile(fileDir);
    },
    cart: (req, res) => {
        let fileDir = path.join(__dirname, "../views/cart.html");
        res.sendFile(fileDir);
    }
}