/**
 * Middleware de autenticación de usuarios en sessión. En caso de que un usuario se haya
 * logueado, se pone a disposición toda su información de usuario dentro de la variable
 * "locals", la cual es accesible al renderizar las vistas y dentro del servidor.
*/

const { user, token } = require("../../src/database/models");

module.exports = function(req, res, next){

        // Si hay un usuario en sesión
        if(req.session.user){
            // Se le pasa a la vista
            res.locals.user = req.session.user;
            next()
        // Si hay una cookie nuestra en el navegador
        } else if (req.cookies.uTwS) {
            // Se buscan los datos de la token que haya en la base
            token.findOne({
                where: {
                    token: req.cookies.uTwS
                }
            })
                .then(foundToken => {
                    // Se busca al usuario con el userid de la token
                    // let userObj = usersModel.getByField("id", token.userId);
                    user.findByPk(foundToken.userId)
                        .then(foundUser => {
    
                            // Se almacenan los datos del usuario en session y en locals
                            req.session.user = foundUser;
                            res.locals.user = foundUser;
    
                            next();
                        })
                        .catch(error => {
                            console.log(error);
                            next();
                        });
                })
                .catch(error => {
                    res.clearCookie('uTwS');
                    console.log(error);
                    next();
                })
    
        } else {
            next();
        }
}