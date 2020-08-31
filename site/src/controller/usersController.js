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
    /** Muestra la vista de perfil del usuario en sesiòn */
    show: (req, res) => {
        res.render("users/profile");
    },
    /** Procesa los datos del formulario de regstro y crea una entrada en BD */
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
    },
    /** Procesa la autenticación y logueo de usuarios */
    authenticate: (req, res) => {

        // Obtengo el usuario por medio de su email ó nombre de usuario
        let user = usersModel.getByField("email", req.body["user-input"]);
        if(!user){ // En caso de que se haya ingresado el user name
            user = usersModel.getByField("user-name", req.body["user-input"]);
        }

        if(user && bcrypt.compareSync(req.body.password, user.password)){

            // Inserto la información del usuario en la sesión
            req.session.user = user;
            res.redirect("/");

        } else {
            // Creo un error y se lo envío a la vista
            res.render("users/login", {
                userInput: req.body["user-input"],
                errors : { authenticate : { msg : "Usuario ó contraseña incorrecta" } }
            });
        }

    }
}