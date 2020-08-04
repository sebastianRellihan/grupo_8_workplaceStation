/**
 * Controlador para el direccionamiento de las rutas /users/ las cuales se corresponden con acciones de
 * usuario (logueo, registro, etc).
 * Debe ser llamado y usado desde usersRoutes.
*/

module.exports = {
    /** Envía la vista del formulario de login (login.ejs) */
    loginGet: (req, res) => {
        res.render("users/login");
    },
    /** Envía la vista del formulario de registro (register.ejs) */
    registerGet: (req, res) => {
        res.render("users/register");
    }
}