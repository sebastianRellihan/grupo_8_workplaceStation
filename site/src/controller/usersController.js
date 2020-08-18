/**
 * Controlador para el direccionamiento de las rutas /users/ las cuales se corresponden con acciones de
 * usuario (logueo, registro, etc).
 * Debe ser llamado y usado desde usersRoutes.
*/

const dataAccessModel = require("../utils/dataAccessModel");
const categoriesModel = dataAccessModel("categories");

module.exports = {
    /** Envía la vista del formulario de login (login.ejs) */
    login: (req, res) => {
        res.render("users/login");
    },
    /** Envía la vista del formulario de registro (register.ejs) */
    register: (req, res) => {
        res.render("users/register", { categories : categoriesModel.getAll() });
    }
}