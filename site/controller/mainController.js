/**
 * Controlador para las peticiones a vistas principales ó que no encajan en otras partes del modelo de negocios.
 * Como por ejemplo: index.html, about-us.html, etc..
 * Debe ser llamado desde el enrutador mainRoutes.
 */
const path = require("path");

module.exports = {

    /** Retorna la vista principal (index.html) obtenida por el método GET */
    index: (req, res) => {
        let fileDir = path.join(__dirname, "..", "views", "index.html")
        res.sendFile(fileDir);
    },

    /** Retorna la vista de "sobre nosotros" (about-us.html) obtenida por medio del método GET */
    aboutUs: (req, res) => {
        // TODO: Enviar la vista de "about-us" una vez que esté creada
    }

}