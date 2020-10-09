/**
 * Sistema de controlador para administrar las peticiones de los clientes en cuanto a productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el enrutador productsRoutes.
*/

// ************ requires ************
const path = require("path");
const fileDeleter = require("../utils/fileDeleter"); // Factory de borrado de archivos
const { product, category, image, sequelize } = require("../database/models");
const { Op } = require("sequelize");

// Validaciones
const { validationResult } = require("express-validator");

// Ruta absoluta en donde se almacenan las imágenes
const IMAGES_PATH = path.join(__dirname, "..", "..", "public", "img", "uploaded");
const imageDeleter = fileDeleter(IMAGES_PATH); // Borrado de imágenes

module.exports = {
    // Envía la vista principal de todos los productos (products.ejs)
    index: (req, res) => {

        let allProducts;

        if(req.query.search){

            let likeParam = `%${req.query.search}%`
            // Búsqueda por nombre del producto
            allProducts = product.findAll({
                include : image,
                where : {
                    name : {
                        [Op.like] : likeParam
                    }
                }
            });
        } else {
            allProducts = product.findAll({
                include : image
            });
        }

        let allCategories = category.findAll();

        Promise.all([allProducts, allCategories])
            .then(results => {
                res.render("products/products", 
                { // Envío de resultados a las vistas
                    products: results[0],
                    categories : results[1]
                });
            })
            .catch(error => {
                // Error 500 "Internal server error"
                console.log(error);
                res.status(500).redirect("/");
            });

    },

    // Envía la vista del detalle de producto (product-detail.ejs)
    detail: (req, res) => {
        // Se busca el producto al cual le corresponda ese id y se lo manda a la vista
        product.findByPk(req.params.id, {
            include : [category, image]
        })
        .then(result => {
            res.render("products/detail", {
                product : result,
                category : result.category
            });
        })
        .catch(error => {
            // Error 500 "Internal server error"
            res.status(500).redirect("/");
        });
        
    },

    // Envía la vista del carrito de productos seleccionados (cart.ejs) 
    cart: (req, res) => {
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
                    res.render("products/cart", { products });
                })
                .catch(error => {
                    // Error 500 "Internal server error"
                    res.status(500).redirect("/");
                });
        } else {
            // Carrito vacío
            res.render("products/cart", { products : []});
        }

    }, 

    /** Añade un producto al carrito de la sesión */
    addToCart: (req, res) => {
        if(!req.session.cart){ // Crea la instancia en caso de que no exista
            req.session.cart = [];
        }
        // Añade el producto sólo si este no ha sido añadido anteriormente
        if(!req.session.cart.includes(req.body.productId)){
            req.session.cart.push(req.body.productId);
        }
        res.redirect("/products/cart");
    },

    /** Remueve un producto del carrito de la sesión */
    removeFromCart: (req, res) => {
        if(req.session.cart && req.session.cart.length != 0){
            // Filtra el producto por su ID
            req.session.cart = req.session.cart.filter(productId => {
                return productId != req.params.id;
            });
        }
        res.redirect("/products/cart");
    },

    // Envía la vista del formulario de carga de productos
    create: (req, res) => {
        category.findAll()
            .then(categories => {
                res.render("products/create", { categories });
            })
            .catch(error => {
                // Error 500 "Internal server error"
                res.status(500).redirect("/");
            });
    },

    // Envía la vista del formulario de carga de productos
    edit: (req, res) => {
        // Se busca el producto al cual le corresponda ese id y se lo manda a la vista
        let findProduct = product.findByPk(req.params.id, {
            include : [category, image]
        })
        let allCategories = category.findAll();

        Promise.all([findProduct, allCategories])
            .then(results => {
                res.render("products/edit", 
                {
                    product : results[0],
                    categories : results[1]
                });
            })
            .catch(error => {
                // Error 500 "Internal server error"
                res.status(500).redirect("/");
            });

    },

    // Almacena un nuevo producto
    store: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
            
            // Se crea el array y se completa con objetos "image"
            let img = [];
            req.files.forEach(image => {
                img.push({ url : image.filename});
            });
    
            // Se crea el objeto product y se añade el arreglo de imágenes
            let newProduct = {
                name : req.body.name,
                description: req.body.description,
                briefDescription : req.body["brief-description"],
                price : Number(req.body.price),
                discount : Number(req.body.discount),
                stock : Number(req.body.stock),
                categoryId : Number(req.body.category),
                images : img,
                aditionalInfo : req.body["aditional-info"]
            }
            
            // Se crea el nuevo registro del producto en la base
            product.create(newProduct, { include : image })
                .then(() => {
                    res.redirect("/products");
                })
                .catch(error => {
                    // Error 500 "Internal server error"
                    res.status(500).redirect("/");
                });

        } else {
            
            if(req.files){
                req.files.forEach(image => {
                    imageDeleter.deleteFile(image.filename);
                });
            }

            category.findAll()
                .then(categories => {
                    res.render("products/create", {
                        categories,
                        userInput: req.body,
                        errors: errors.mapped()
                    });
                })
                .catch(error => {
                    // Error 500 "Internal server error"
                    res.status(500).redirect("/");
                });
        }
        
    },

    // Edita un producto existente
    update: (req,res) => { 

        let errors = validationResult(req);

        if (errors.isEmpty()) {

            // TODO: investigar el uso de transacciones, para asegurar que si alguna de las
            // operaciones en BD falla, se pueda volver al estado original en todas las tablas
            console.log(req.body["delete-images"][0].url);
            let promises = []; // Promesas para las operaciones en BD

            // Promesas para el borrado de imágenes seleccionadas
            if(req.body["delete-images"]){

                req.body["delete-images"].forEach(element => {
                    promises.push(image.destroy({ where : { url : String(element) } }));
                });
            }

            // Promesas para la creación de las nuevas imágenes en BD
            if(req.files){
                req.files.forEach(element => {
                    promises.push(image.create({ url : element.filename, productId: req.params.id}));
                });
            }

            // Actualización del producto
            let updProduct = {
                name : req.body.name,
                description: req.body.description,
                briefDescription : req.body["brief-description"],
                price : Number(req.body.price),
                discount : Number(req.body.discount),
                stock : Number(req.body.stock),
                categoryId : Number(req.body.category),
                aditionalInfo : req.body["aditional-info"]
            }

            // Promesa para la actualización en BD
            promises.push(product.update(updProduct, { where : { id : req.params.id }}));

            Promise.all(promises)
                .then(results => {

                    // Borrado de imágenes en disco
                    imageDeleter.deleteFile(req.body["delete-images"]);

                    res.redirect("/products/" + req.params.id);
                })
                .catch(error => {
                    // Error 500 "Internal server error"
                    res.status(500).redirect("/");
                });
        } else {

            if(req.files){
                req.files.forEach(image => {
                    imageDeleter.deleteFile(image.filename);
                });
            }

            let productImages = image.findAll({where: { productId: req.params.id }});
            
            let categories = category.findAll();

            Promise.all([productImages, categories])
                .then(results => {
                    res.render("products/edit", {
                        product: {
                            id: req.params.id,
                            images: results[0]
                        },
                        categories: results[1],
                        userInput: req.body,
                        errors: errors.mapped()
                    });
                })
                .catch(error => {
                    // Error 500 "Internal server error"
                    res.status(500).redirect("/");
                });
        }        
    },

    // Elimina un producto
    destroy: (req,res) => {
        // Se atrapa el id del producto para borrarlo de la BD
        let id = req.params.id;
        // Borrado de las imágenes
        image.findAll({where : { productId : id }})
            .then(images => {
                // Borrado en disco
                images.forEach(element => {
                    imageDeleter.deleteFile(element.url);
                });
                // Borrado en BD
                return image.destroy({where : { productId : id }});
            })
            .then(() => {
                return product.destroy({ where : { id : id } }); // Borrado del producto
            })
            .then(() => {
                res.redirect("/products");
            })
            .catch(error => {
                // Error 500 "Internal server error"
                res.status(500).redirect("/");
            });
    }
}