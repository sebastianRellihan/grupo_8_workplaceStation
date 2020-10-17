/**
 * Controlador que exporta métodos para ser utilizados en el enrutador de productos, enviando datos en formato JSON.
 */
const { product, category, image } = require("../../database/models");

module.exports = {
    all: (req, res) => {
        product.findAll({
            include : image
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
                        countByCategory: {
                            EstacionesDeTrabajo: categoryCount(1),
                            Escritorios: categoryCount(2),
                            SillasErgonomicas: categoryCount(3),
                            Accesorios: categoryCount(4)
                        }
                    },
                    data: []
                }

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
                            url: image.url
                        })
                    });

                    response.data.push(data);

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
            })
    },

    detail: (req, res) => {

    }
}