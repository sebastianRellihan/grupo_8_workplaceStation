/**
 * Controlador que provee servicios al enrutador de usuarios encargándose de cerrar el ciclo 
 * solicitud/respuesta enviando datos en formato JSON.
 */
const { user } = require("../../database/models");

module.exports = {
    all : (req, res) => {

        user.findAll()
            .then(results => {

                let response = {
                    meta : {
                        status : 200,
                        statusMsg : "Ok",
                        count : results.length
                    },
                    data : []
                }

                results.forEach(element => {
                    response.data.push({
                        id : element.id,
                        name : element.name,
                        email : element.email,
                        detail : `/api/users/${element.id}`
                    });
                });

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
            });

    },

    detail : (req, res) => {

    }
}