/**
 * Middleware de autenticación de usuarios en sessión. En caso de que un usuario se haya
 * logueado, se pone a disposición toda su información de usuario dentro de la variable
 * "locals", la cual es accesible al renderizar las vistas y dentro del servidor.
 */

module.exports = function(req, res, next){
    if(req.session.user){
        res.locals.user = req.session.user;
    }
    next();
}