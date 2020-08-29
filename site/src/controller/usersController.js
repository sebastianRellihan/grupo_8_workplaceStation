/**
 * Sistema de controlador para administrar el direccionamiento de las rutas /users/ las cuales se corresponden con acciones de
 * usuario (logueo, registro, etc).
 * Debe ser llamado y usado desde usersRoutes.
*/

const path = require("path");
const bcrypt = require('bcryptjs');
const dataAccessModel = require("../utils/dataAccessModel");

// Acceso a modelo de usuarios
const usersModel = dataAccessModel('users'); 
// Acceso a modelo de categorías
const categoriesModel = dataAccessModel("categories");

// Ruta absoluta en donde se almacena la imágen de perfil
const IMAGE_PATH = path.join(__dirname, "..", "..", "public", "img", "usersUploaded", "/");

module.exports = {
    /** Envía la vista del formulario de login (login.ejs) */
    login: (req, res) => {
        res.render("users/login");
    },
    /** Envía la vista del formulario de registro (register.ejs) */
    register: (req, res) => {
        res.render("users/register", { categories : categoriesModel.getAll() });
    },
    store: (req, res) => {
        let users = req.body;
        users['profile-photo']  = req.file.filename;
        if (users.password == users['password-check']) {
            let hash = bcrypt.hashSync(users.password, 10);
            users.password = hash;
            delete users['password-check'];
            usersModel.create(users);
            res.redirect("/");
        } else {
            // Hacer que se muestre el error bien a futuro
            res.send('La contra no coincide che');
        }
    }
}