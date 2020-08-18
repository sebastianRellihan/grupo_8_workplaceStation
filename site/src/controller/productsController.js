/**
 * Sistema de controlador para administrar las peticiones de los clientes en cuanto a productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el enrutador productsRoutes.
*/
const fs = require("fs");
const path = require("path");
const dataAccessModel = require('../utils/dataAccessModel');

const productsModel = dataAccessModel('products'); // Acceso a modelo de productos
const categoriesModel = dataAccessModel("categories"); // Acceso a modelo de categorías

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
        res.render("products/create");
    },

    // Envía la vista del formulario de carga de productos
    edit: (req, res) => {
        // Se busca el producto al cual le corresponda ese id y se lo manda a la vista
        let product = productsModel.getByField("id", req.params.id);
        res.render("products/edit", {product : product});
    },

    // Almacena un nuevo producto
    store: (req, res) => {
        // Se crea el array y se completa con las rutas de las imágenes
        let img = [];
        req.files.forEach(image => {
            img.push("/img/uploaded/" + image.filename);
        });
        // Se crea el objeto product
        let product = {
            id: null,
            name:req.body.name,
            briefDescription: req.body.briefDescription,
            price: parseFloat(req.body.price),
            discount:parseFloat(req.body.discount),
            stock: parseFloat(req.body.stock),
            color:req.body.color,
            category:req.body.category,
            images: img,
            description: req.body.description,
            aditionalInfo: req.body.aditionalInfo
        }
        // Se crea el nuevo registro del producto en la base
        productsModel.create(product);
        // Se redirige al usuario al form de creación de producto 
        res.redirect("/products/create");
    },

    // Edita un producto existente
    update: (req,res) => { 
        // Se crea el array y se completa con las rutas de las imágenes
        let img = [];
        req.files.forEach(image => {
            img.push("/img/uploaded/" + image.filename);
        });
        // Se crea el objeto product
        let product = {
            id: null,
            name:req.body.name,
            briefDescription: req.body.briefDescription,
            price: parseFloat(req.body.price),
            discount:parseFloat(req.body.discount),
            stock: parseFloat(req.body.stock),
            color:req.body.color,
            category:req.body.category,
            images: img,
            description: req.body.description,
            aditionalInfo: req.body.aditionalInfo
        }
        product.id = req.params.id;
        productsModel.update(product);
        res.redirect("/products/");
    },

    // Elimina un producto
    destroy: (req,res) => {
        // Se atrapa el id del producto para pasarlo como parametro en el metodo de productsmodel y eliminar el mimso de la base
        let id = req.params.id;
        productsModel.delete(id);
        res.redirect("/products");
    }
}