/**
 * Middleware de control de acceso a rutas de la API que son para uso específico de usuarios tipo 
 * "administrador". Un usuario se valida como administrador si su variable req.session.user.isAdmin 
 * existe y es "true".
 */

module.exports = function(req, res, next){
    if(req.session.user && req.session.user.isAdmin){ // Si no hay un usuario en sesión ó este no es admin...
        next();
    } else {
        res.status(403).json({
            meta : {
                status : 403,
                statusMsg : "Forbidden access"
            },
            data : []
        });
    }
}