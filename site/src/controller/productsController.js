/**
 * Sistema de controlador para administrar las peticiones de los clientes en cuanto a productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el enrutador productsRoutes.
*/

// ************ requires ************
const path = require("path");
const fileDeleter = require("../utils/fileDeleter"); // Factory de borrado de archivos
const { product, category, image, productPurchase } = require("../database/models");

// Validaciones
const { validationResult } = require("express-validator");

// Ruta absoluta en donde se almacenan las imágenes
const IMAGES_PATH = path.join(__dirname, "..", "..", "public", "img", "uploaded");
const imageDeleter = fileDeleter(IMAGES_PATH); // Borrado de imágenes

// Tipos de archivos soportados
const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"];

module.exports = {
    // Envía la vista principal de todos los productos (products.ejs)
    index: (req, res) => {

        category.findAll()
            .then(results => {
                res.render("products/products", 
                { // Envío de resultados a las vistas
                    categories : results
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
                promises.push(product.findByPk(index.id, {
                    include : image
                }));
            });

            // Ejecución de promesas
            Promise.all(promises)
                .then(products => {
                    products.forEach(product => {
                        req.session.cart.forEach(cartProduct => {
                            if (product.id == cartProduct.id) {
                                product.quantity = cartProduct.quantity;
                            }
                        })
                    })
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
        // Añade el producto sólo si este no ha sido añadido anteriormente y la cantidad seleccionada
        if(!req.session.cart.includes(req.body.productId)){
            req.session.cart.push({
                id: req.body.productId,
                quantity: req.body.quantity
            });
        }
        res.redirect("/products/cart");
    },

    /** Remueve un producto del carrito de la sesión */
    removeFromCart: (req, res) => {
        console.log(req.session.cart);
        if(req.session.cart && req.session.cart.length != 0){
            // Filtra el producto por su ID
            req.session.cart = req.session.cart.filter(product => {
                return product.id != req.params.id;
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

        if (req.files.length == 0) {
            // Si no se sube una imagen se crea el error
            errors.errors.push({ 
                msg : "Debes cargar por lo menos 1 imagen",
                param : "image",
                location : "files"
            });
        } else if (req.files.length > 5) {
            // Si se suben más de 5 imágenes se crea el error
            errors.errors.push({ 
                msg : "No puedes cargar más de 5 imágenes",
                param : "image",
                location : "files"
            });
        } else {
            // Si se sube la cantidad correcta de imágenes se recorre el array y se verifica el tipo de archivo que se quiere subir
            req.files.forEach(image => {
                if (!(ALLOWED_MIME_TYPES.includes(image.mimetype))) {
                    errors.errors.push({ 
                        msg : "Formato de archivo no soportado",
                        param : "image",
                        location : "files"
                    });
                }
            })
        }

        // Si no hay errores...
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

        // Si hay errores
        } else {
            
            // Se eliminan las imágenes que se hayan subido
            if(req.files){
                req.files.forEach(image => {
                    imageDeleter.deleteFile(image.filename);
                });
            }

            // Se traen las categorías de la base y se renderiza la vista enviándole las categorías, los valores de los campos y los errores
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
    update: async (req,res) => { 

        let errors = validationResult(req);

        // Un producto no se puede quedar sin imágenes, por lo que
        // se debe cumplir: img totales - borradas + subidas > 0
        let count = await image.count({
            where: {
                productId: req.params.id
            }
        })

        console.log(req.body["delete-images"]);
        if (req.body["delete-images"]) { // Resta de la cantidad de imágenes a borrar
            if (Array.isArray(req.body["delete-images"])) {
                count -= req.body["delete-images"].length;
            } else {
                count--;
            }
        }

        if(req.files){ // Suma de imágenes subidas
            count += req.files.length;
        }

        let imgError = {
            param : "image",
            location : "files"
        }

        if( count < 1){ imgError.msg = "Debe quedar por lo menos una imagen restante";
        // Cantidad máxima de imágenes por producto 5
        } else if (count > 5) imgError.msg = "No puede haber más de 5 imágenes";
        // Si lo anterior está bien se verifica el tipo de archivo que se quiere subir
        else if(req.files.length) {
            for(let i = 0; i < req.files.length; i++){
                if (!(ALLOWED_MIME_TYPES.includes(req.files[i].mimetype))) {
                    imgError.msg = "Formato de archivo/s no soportado"
                    break; // Corte del ciclo
                }
            }
        }

        if(imgError.msg) errors.errors.push(imgError);

        // Si no hay errores...
        if (errors.isEmpty()) {

            // Promesas para las operaciones en BD
            let promises = []; 

            // Promesas para el borrado de imágenes seleccionadas
            if(req.body["delete-images"]){
                if (Array.isArray(req.body["delete-images"])) {
                    req.body["delete-images"].forEach(element => {
                        promises.push(image.destroy({ where : { url : String(element) } }));
                    });
                } else {
                    promises.push(image.destroy({ where : { url : String(req.body["delete-images"]) } }));
                }
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

            // Se eliminan las imágenes que se subieron
            if(req.files){
                req.files.forEach(image => {
                    imageDeleter.deleteFile(image.filename);
                });
            }

            // Se buscan todas las imágenes en la base
            let productImages = image.findAll({where: { productId: req.params.id }});

            // Se buscan las categorías en la base
            let categories = category.findAll();

            // Se ejecutan ambas promesas de forma asincronico 
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
                return productPurchase.destroy({ where : { productId : id } })
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