/**
 * Controlador que exporta métodos para ser utilizados en el enrutador de productos, enviando datos en formato JSON.
 */
const { product, category, image } = require("../../database/models");

module.exports = {
    all: (req, res) => {

        let categories;

        category.findAll()
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
            })
    }
}