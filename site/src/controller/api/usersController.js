/**
 * Controlador que provee servicios al enrutador de usuarios encargándose de cerrar el ciclo 
 * solicitud/respuesta enviando datos en formato JSON.
 */
const { user } = require("../../database/models");

module.exports = {
    /** Retorna información de todos los usuarios registrados (salvo información sensible) */
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

    /** Retorna información de un usuario según su id, siempre que este exista en BD */
    detail : (req, res) => {

        user.findByPk(req.params.id)
            .then(result => {
                
                if(result){ // Si la consulta retornó un usuario existente

                    let gender;
                    // Expresa el género segun palabras y no su código
                    switch(result.gender){
                        case 1 :
                            gender = "Masculino";
                            break;
                        case 2 :
                            gender = "Femenino";
                            break;
                        default:
                            gender = "Otro";
                            break;
                    }

                    let response = {
                        meta : {
                            status : 200,
                            statusMsg : "Ok",
                        },
                        data : {
                            id : result.id,
                            firstName : result.firstName,
                            lastName : result.lastName,
                            userName : result.userName,
                            email : result.email,
                            birth : result.birth,
                            gender : gender
                        }
                    }
                    
                    // Se provee la dirección siempre y cuando el usuario la haya registrado
                    if(result.address) response.data.address = result.address;

                    return res.status(200).json(response);

                } else {
                    return res.status(404).json({
                        meta : {
                            status : 404,
                            statusMsg : "User not found"
                        },
                        data : []
                    });
                }

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