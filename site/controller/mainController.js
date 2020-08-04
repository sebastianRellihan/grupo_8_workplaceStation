/**
 * Controlador para las peticiones a vistas principales ó que no encajan en otras partes del modelo de negocios.
 * Como por ejemplo: index.html, about-us.html, etc..
 * Debe ser llamado desde el enrutador mainRoutes.
 */
const path = require("path");

module.exports = {
    /** Envía la vista principal (index.ejs) */
    index: (req, res) => {
        res.render("index/index");
    },
    /** Envía la vista de "quienes somos" (about-us.ejs) */
    aboutUs: (req, res) => {
        // TODO: Enviar la vista de "about-us" una vez que esté creada
    }
}