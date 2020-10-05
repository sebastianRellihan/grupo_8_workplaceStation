/**
 * Controlador para el proceso de la vista y acciones realizadas al terminar una compra.
 */
const { product, shipping, purchase, productPurchase } = require("../database/models");

module.exports = {
    /** Renderiza la vista de confirmación de compra */
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
    },
    /** Procesa la compra actual y realiza todos los cambios asociados en BD */
    process : function(req, res){

        // Obtengo la fecha y hora con el formato DATETIME de MySQL ('YYYY-MM-DD hh:mm:ss')
        // https://dev.mysql.com/doc/refman/8.0/en/datetime.html (doxumentación)
        let now = new Date();

        let currentMonth = now.getMonth() + 1; // getMonth retorna un valor entre 0 - 11
        if(currentMonth < 10){
            // En caso de que el mes sea menor a 10, se completa el strinc con un 0
            currentMonth = "0" + currentMonth.toString();
        }

        let date = `'${now.getFullYear()}-${currentMonth}-${now.getDate()}`;
        date += ` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}'`;

        // Array para el cálculo del precio total
        let promises = [];
        req.session.cart.forEach(productId => {
            promises.push(product.findByPk(productId));
        });

        Promise.all(promises)
            .then(results => {

                let total = results.reduce((acum, element) => {
                    if(element.discount == 0){
                        return acum + Number(element.price);
                    } else { // Aplica el descuento si lo hay
                        let applied = Number(element.price) - Number(element.price) * (Number(element.discount) / 100);
                        return acum + applied; 
                    }
                }, 0); // El 0 es el valor inicial del acumulador

                let newPurchase = { // Nueva compra
                    totalValue : total,
                    shippingAddress : req.body.address,
                    shippingId : req.body.shipping,
                    comment : req.body.comment,
                    userId : req.session.user.id,
                    purchasedAt : date
                }
        
                return purchase.create(newPurchase);
            })
            .then(created => {

                // Array con las promesas para crear los registros en la tabla intermedia
                let associations = [];

                req.session.cart.forEach(element => {
                    // Por defecto, la propiedad "quantity" es uno, ya que todavía no
                    // está implementada la compra de múltiples productos del mismo tipo
                    associations.push(productPurchase.create({
                        productId : element,
                        purchaseId : created.id
                    }));
                });

                return Promise.all(associations); // Creación de asociaciones en la tabla intermedia
            })
            .then(results => {

                let stockDecrease = [];

                // Decrementa los valores del sto de lo producos comprados
                results.forEach(element => {
                    stockDecrease.push(product.decrement("stock", {
                        by : 1,
                        where : {
                            id : element.productId
                        }
                    }));
                });

                return Promise.all(stockDecrease);
            })
            .then(() => {
                res.redirect("/");
            })
            .catch(error => {
                // Error 500 "Internal server error"
                console.log(error);
                res.status(500).redirect("/");
            });

    }
}