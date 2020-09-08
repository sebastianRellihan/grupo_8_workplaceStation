/**
 * Middleware de autenticación de usuarios en sessión. En caso de que un usuario se haya
 * logueado, se pone a disposición toda su información de usuario dentro de la variable
 * "locals", la cual es accesible al renderizar las vistas y dentro del servidor.
*/

const dataAccessModel = require("../utils/dataAccessModel");
// Acceso a modelo de usuarios
const usersModel = dataAccessModel('users'); 
// Acceso a modelo de tokens
const tokensModel = dataAccessModel("tokens");

module.exports = function(req, res, next){

    // Si hay un usuario en sesión
    if(req.session.user){

        // Se le pasa a la vista
        res.locals.user = req.session.user;

    } else if (req.cookies.uTwS) {
        // Se buscan los datos de la token que haya en la base
        let token = tokensModel.getByField("token", req.cookies.uTwS);

        if (token) {
            // Se busca al usuario con el userid de la token
            let user = usersModel.getByField("id", token.userId);

            if (user) {
                // Se almacenan los datos del usuario en session y en locals
                req.session.user = user;
                res.locals.user = user;
            }
        } else {
            res.clearCookie('uTwS');
        }
    }
    next();
}