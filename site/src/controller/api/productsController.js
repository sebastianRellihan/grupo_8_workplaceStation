/**
 * Controlador que exporta métodos para ser utilizados en el enrutador de productos, enviando datos en formato JSON.
 */
const { product, category, image } = require("../../database/models");
const { Op } = require("sequelize");

module.exports = {
    all: (req, res) => {

        let categories;

        category.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
            .then(results => {
                categories = results;
                
                return product.findAll({
                    include : image
                })
            })
            .then(products => {
                function categoryCount(category) {
                    return products.filter(product => {
                        return product.categoryId == category;
                    }).length;
                }
                
                let response = {
                    meta: {
                        status: 200,
                        statusMsg: "OK",
                        count: products.length,
                        categories : categories.map(value => {
                            return {
                                id : value.id,
                                name : value.name,
                                productsAmount : categoryCount(value.id)
                            }
                        })
                    },
                    data: []
                }

                let lastProduct;

                products.forEach(product => {
                    let data = {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        briefDescription: product.briefDescription,
                        price: product.price,
                        stock: product.stock,
                        discount: product.discount,
                        images: [],
                        detail: `/api/products/${product.id}`
                    }
                    
                    product.images.forEach(image => {
                        data.images.push({
                            id: image.id,
                            url: "/img/uploaded/" + image.url
                        })
                    });

                    lastProduct = data;

                    response.data.push(data);

                });

                response.meta.lastProduct = {
                    product: lastProduct,
                    location: `/products/${lastProduct.id}`
                }

                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json({
                    meta : {
                        status : 500,
                        statusMsg : "Internal server error"
                    },
                    data : []
                });
            })
    },

    detail: (req, res) => {
        product.findByPk(req.params.id, {
            include : image
        })
            .then(product => {

                let response = {
                    meta: {
                        status: 200,
                        statusMsg: "OK"
                    },
                    data: {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        briefDescription: product.briefDescription, 
                        aditionalInfo: product.aditionalInfo, 
                        price : product.price, 
                        discount : product.discount, 
                        stock : product.stock, 
                        images: product.images
                    }
                }

                res.status(200).json(product)
            })
            .catch(error => {
                res.status(500).json({
                    meta : {
                        status : 500,
                        statusMsg : "Internal server error"
                    },
                    data : []
                });
            });
    },

    /** Endpoint para implementar el sistema de filtrado de productos. */
    filter : (req, res) => {

        let where = {} // Cláusula where
        let order = req.query.order; // Orden de elementos

        // Filtros
        if(req.query.min || req.query.min){ // Precio
            where.price = {};

            if(req.query.min) where.price[Op.gte] = req.query.min;
            if(req.query.max) where.price[Op.lte] = req.query.max;
        }

        if(req.query.discount){ // Descuento
            if(req.query.discount == 0) where.discount = 0;
            else where.discount = { [Op.gt] :  0};
        }

        if(req.query.categories){ // Categorías
            let catArray = req.query.categories.split(",");
            where.categoryId = { [Op.in] :  catArray};
        }

        product.findAll({ 
            where : where,
            order : [
                ["price" , order]
            ],
            include : image
        })
            .then(results => {

                let response = {
                    meta : {
                        status : 200,
                        statusMsg : "Ok",
                        count : results.length
                    },
                    data : []
                }

                results.forEach(result => {
                    response.data.push({
                        id : result.id,
                        image : `/img/uploaded/${result.images[0].url}`,
                        price : result.price,
                        discount : result.discount,
                        name : result.name
                    });
                });

                res.json(response);

            })
            .catch(error => {
                res.status(500).json({
                    meta : {
                        status : 500,
                        statusMsg : "Internal server error"
                    },
                    data : []
                });
            });
    }
}