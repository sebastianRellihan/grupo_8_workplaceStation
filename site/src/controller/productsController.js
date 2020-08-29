/**
 * Sistema de controlador para administrar las peticiones de los clientes en cuanto a productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el enrutador productsRoutes.
*/

const path = require("path");
const dataAccessModel = require('../utils/dataAccessModel');
const productsModel = dataAccessModel('products'); // Acceso a modelo de productos
const categoriesModel = dataAccessModel("categories"); // Acceso a modelo de categorías

// Ruta absoluta en donde se almacenan las imágenes
const IMAGES_PATH = path.join(__dirname, "..", "..", "public", "img", "uploaded", "/");

module.exports = {
    // Envía la vista principal de todos los productos (products.ejs)
    index: (req, res) => {
        res.render("products/products", 
        {
            products: productsModel.getAll(),
            categories : categoriesModel.getAll()
        });
    },

    // Envía la vista del detalle de producto (product-detail.ejs)
    detail: (req, res) => {
        // Se busca el producto al cual le corresponda ese id y se lo manda a la vista
        let product = productsModel.getByField("id", req.params.id);
        let category = categoriesModel.getByField("id", product.category);

        res.render("products/detail", {
            product : product,
            category : category
        });
    },

    // Envía la vista del carrito de productos seleccionados (cart.ejs) 
    cart: (req, res) => {
        // La razón por la que se envían todos los productos es para realizar el diseño,
        // una vez se tenga accesso a la sesión HTTP se podrá enviar los productos que hayan
        // sido añadidos al carrito por el usuario
        res.render("products/cart", {products : productsModel.getAll()});
    }, 

    // Envía la vista del formulario de carga de productos
    create: (req, res) => {
        let categories = categoriesModel.getAll();
        res.render("products/create", {categories : categories});
    },

    // Envía la vista del formulario de carga de productos
    edit: (req, res) => {
        // Se busca el producto al cual le corresponda ese id y se lo manda a la vista
        let product = productsModel.getByField("id", req.params.id);
        let categories = categoriesModel.getAll();
        res.render("products/edit", 
        {
            product : product,
            categories : categories
        });
    },

    // Almacena un nuevo producto
    store: (req, res) => {

        // Se crea el array y se completa con las rutas de las imágenes
        let img = [];
        req.files.forEach(image => {
            img.push(image.filename);
        });

        // Se crea el objeto product y se añade el arreglo de imágenes
        let product = req.body;
        product.images = img; 
        
        // Se crea el nuevo registro del producto en la base
        productsModel.create(product);
        
        res.redirect("/products");
    },

    // Edita un producto existente
    update: (req,res) => { 
        
        // Se obtienen las imágenes anteriores
        let img = productsModel.getByField("id", req.params.id).images;
        
        // Se borran las imágenes que se hayan seleccionado
        if(req.body.deleteImages){
            let deleteImg = req.body.deleteImages;
            // Filtra las imágenes a borrar
            img = img.filter(image => {
                return !deleteImg.includes(image);
            });
            // Borrado de las imágenes del disco
            productsModel.deleteFile(IMAGES_PATH, deleteImg);
        }

        // Añade las imágenes nuevas, si se subieron
        if(req.files){
            req.files.forEach(image => {
                img.push(image.filename);
            });
        }
        
        // Se crea el objeto product con las nuevas características y el mismo ID
        let product = req.body;
        product.images = img;
        product.id = req.params.id;

        productsModel.update(product);
        res.redirect("/products");
    },

    // Elimina un producto
    destroy: (req,res) => {
        // Se atrapa el id del producto para borrarlo de la BD
        let id = req.params.id;
        // Borrado de las imágenes
        let images = productsModel.getByField("id", id).images;
        productsModel.deleteFile(IMAGES_PATH, images);

        productsModel.delete(id);
        res.redirect("/products");
    }
}