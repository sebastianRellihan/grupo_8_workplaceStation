/**
 * Middleware de control de acceso a rutas que son para uso específico de usuarios tipo
 * "invitado" (que no hayn iniciado sesión).
 */

module.exports = function(req, res, next){
    if(req.session.user){ // En caso de que haya un usuario en sesión...
        res.redirect("/");
    } else {
        next();
    }
}