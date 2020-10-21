/**
 * Controlador que provee servicios a través de la APi en formato JSON sobre las compras realizadas
 * y los productos asociados.
 */
const { purchase, product, shipping } = require("../../database/models");

module.exports = {
    /** Retorna información de todas las compras y los products asociados */
    all : (req, res) => {
        
    purchase.findAll({ include : 
        [ product, shipping ] 
    })
        .then(results => {

            let response = {
                meta : {
                    status : 200,
                    statusMsg : "Ok",
                    count : results.length,
                    total : 0,
                },
                data : []
            }

            // Datos de cada compra
            results.forEach(element => {
                response.meta.total += Number.parseFloat(element.totalValue);

                // Products asociados a la compra
                let associatedProducts = element.products.map(prod => {
                    return {
                        id : prod.id,
                        name : prod.name,
                        price : prod.price,
                        url : `/api/products/${prod.id}`
                    }
                });

                response.data.push({
                    id : element.id,
                    purchasedAt : element.purchasedAt,
                    shippingAddress : element.shippingAddress,
                    shippingMethod : element.shipping.name,
                    comment : element.comment,
                    url : `/api/purchase/${element.id}`,
                    products : associatedProducts
                });
            });

            return res.json(response);

        })
        .catch(error => {
            return res.status(500).json({
                meta : {
                    status : 500,
                    statusMsg : "Internal server error"
                },
                data : []
            });
        });

    },

    /** Retorna información de una compra realizada y los productos asociados */
    detail : (req, res) => {

        purchase.findByPk(req.params.id, { include : 
            [ product, shipping ] 
        })
            .then(result => {
                
                if(result){
                    // Products asociados a la compra
                    let associatedProducts = result.products.map(prod => {
                        return {
                            id : prod.id,
                            name : prod.name,
                            price : prod.price,
                            url : `/api/products/${prod.id}`
                        }
                    });
                    
                    let response = {
                        meta : {
                            status : 200,
                            statusMsg : "Ok"
                        },
                        data : {
                            id : result.id,
                            purchasedAt : result.purchasedAt,
                            total : result.totalValue,
                            shippingAddress : result.shippingAddress,
                            comment : result.comment,
                            shippingMethod : result.shipping.name,
                            products : associatedProducts
                        }
                    }

                    return res.status(200).json(response);

                } else {
                    return res.status(404).json({
                        meta : {
                            status : 404,
                            statusMsg : "No purchases found"
                        },
                        data : []
                    });
                }

            })
            .catch(error => {
                return res.status(500).json({
                    meta : {
                        status : 500,
                        statusMsg : "Internal server error"
                    },
                    data : []
                });
            });

    }
}