/**
 * Sistema de controlador para administrar las peticiones de los clientes en cuanto a productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el enrutador productsRoutes.
*/
const fs = require("fs");
const path = require("path");

let dataJSON = fs.readFileSync(path.join(__dirname, "..", "data", "products.json"));
let dataObject = JSON.parse(dataJSON);

module.exports = {
    // Envía la vista principal de todos los productos (products.ejs)
    index: (req, res) => {
        res.render("products/products", {products: dataObject});
    },

    // Envía la vista del detalle de producto (product-detail.ejs)
    detail: (req, res) => {
        // Busca el producto al cual le corresponda ese id y se lo manda a la vista
        let product  = dataObject.find(element => {
            return element.id == req.params.id;
        });

        res.render("products/detail", {product : product});
    },

    // Envía la vista del carrito de productos seleccionados (cart.ejs) 
    cart: (req, res) => {
        // La razón por la que se envían todos los productos es para realizar el diseño,
        // una vez se tenga accesso a la sesión HTTP se podrá enviar los productos que hayan
        // sido añadidos al carrito por el usuario
        res.render("products/cart", {products : dataObject});
    }, 

    // Envía la vista del formulario de carga de productos
    create: (req, res) => {
        res.render("products/create");
    }
}