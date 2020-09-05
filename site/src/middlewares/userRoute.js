/**
 * Middleware de control de acceso a rutas que son para uso específico de usuarios autenticados.
 */

module.exports = function(req, res, next){
    if(!req.session.user){ // Si no hay un usuario en sesión...
        res.redirect("/users/login");
    } else {
        next();
    }
}