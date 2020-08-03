/**
 * Controlador para el direccionamiento de las rutas /users/ las cuales se corresponden con acciones de
 * usuario (logueo, registro, etc).
 * Debe ser llamado y usado desde usersRoutes.
 */

const path = require("path");

module.exports = {
    /** Retorna la vista del formulario de login al recibir la petición por el método GET */
    loginGet: (req, res) => {
        let fileDir = path.join(__dirname, "..", "views", "login.html");
        res.sendFile(fileDir);
    },

    /** Retorna la vista del formulario de registro al recibir la petición por el método GET */
    registerGet: (req, res) => {
        let fileDir = path.join(__dirname, "..", "views", "register.html");
        res.sendFile(fileDir);
    }
}