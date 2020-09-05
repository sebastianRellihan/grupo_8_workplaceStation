/**
 * Sistema de controlador para administrar el direccionamiento de las rutas /users/ las cuales se corresponden con acciones de
 * usuario (logueo, registro, etc).
 * Debe ser llamado y usado desde usersRoutes.
*/

const path = require("path");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const dataAccessModel = require("../utils/dataAccessModel");

// Acceso a modelo de usuarios
const usersModel = dataAccessModel('users'); 
// Acceso a modelo de categorías
const categoriesModel = dataAccessModel("categories");
// Acceso a modelo de tokens
const tokensModel = dataAccessModel("tokens");

// Ruta absoluta en donde se almacena la imágen de perfil
const IMAGE_PATH = path.join(__dirname, "..", "..", "public", "img", "usersUploaded", "/");

module.exports = {
    /** Muestra la vista del formulario de login (login.ejs) */
    login: (req, res) => {
        res.render("users/login");
    },
    /** Muestra la vista del formulario de registro (register.ejs) */
    register: (req, res) => {
        res.render("users/register", { categories: categoriesModel.getAll() });
    },
    /** Muestra la vista de perfil del usuario en sesiòn */
    show: (req, res) => {
        res.render("users/profile", { categories: categoriesModel.getAll() });
    },
    /** Muestra la vista de edición de del usuario en sesiòn */
    edit: (req, res) => {
        res.render("users/edit", { categories: categoriesModel.getAll() });
    },
    /** Procesa los datos del formulario de registro y crea una entrada en BD */
    store: (req, res) => {
        // Se almacena en users lo que llega por post del form
        let users = req.body;
        // Se reemplaza el nombre original de la imagen por el que le otorga la configuración de multer
        users['profile-photo'] = req.file.filename;
        
        if (users.password == users['password-check']) { // Se corrobora que la pass sea la misma en pass y check
            // Se encripta la pass, se reemplaza y se elimina la que ingresó para corroborar
            let hash = bcrypt.hashSync(users.password, 10);
            users.password = hash;
            delete users['password-check'];
            // Se almacena el usuario en la base y se redirige la vista al index
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

        // En caso de que se haya ingresado el user name
        if(!user){
            user = usersModel.getByField("user-name", req.body["user-input"]);
        }

        // Si el usuario existe en nuestra base e ingresa la contraseña correcta
        if(user && bcrypt.compareSync(req.body.password, user.password)){            
            
            // Si el usuario marcó "recordarme" le envíamos una cookie
            if(req.body["remember-me"]){
                
                // Se genera un token seguro y aleatorio para la cookie
                const token = crypto.randomBytes(48).toString("base64");
                
                // Se almacena el token en tokens.json con el ID del usuario para vincularlo al mimso a futuro
                tokensModel.create({ userId: user.id, token: token});
                
                // Almacena el Token en la cookie por un mes
                res.cookie("uTwS", token, {maxAge : 1000 * 60 * 60 * 24 * 30});
            }

            // Se guarda al usuario en session
            req.session.user = user;

            res.redirect("/");

        } else {
            // Creo un error y se lo envío a la vista
            res.render("users/login", {
                userInput: req.body["user-input"],
                errors : { authenticate : { msg : "Usuario ó contraseña incorrecta" } }
            });
        }
    },
    /** Procesa el logout de usuario */
    logout: (req, res) => {

        // Se destruyen todas las cookies de la base que le pertenezcan a un mismo usuario 
        tokensModel.deleteAllByField("userId", req.session.user.id);
        // Se destruye la cookie del navegador
        res.clearCookie("uTwS");
        // Se destruye al usuario en session
        req.session.destroy();

        res.redirect("/");
    },
    /** Borra el perfil de usuario de la base de datos */
    destroy: (req, res) => {
        delete res.locals.user;
        // Borrado de BD
        usersModel.delete(req.session.user.id);
        // Borrado de la imagen de perfil
        usersModel.deleteFile(IMAGE_PATH, req.session.user["profile-photo"]);
        // Destrucción de la sesión
        req.session.destroy();

        res.redirect("/");
    },
    // Edita un usuario existente
    update: (req, res) => {
        // Se almacenan los datos del usuario que se encuentra en sesión para acceder a sus propiedades facilmente
        let sessionUser = req.session.user;
        // Se almacenan los datos que llegan del form
        let user = req.body;
        // Se completan los datos restantes que no se encuentran incluídos en ese form
        user.email = sessionUser.email;
        user.password = sessionUser.password;
        user.interests = sessionUser.interests;
        user.id = sessionUser.id;
        
        if(req.file){ // Si se sube una nueva foto de perfil...
            // Se elimina la anterior y se reemplaza por la nueva
            usersModel.deleteFile(IMAGE_PATH, sessionUser['profile-photo']);
            user['profile-photo'] = req.file.filename;
        } else { // Si no se sube una nueva foto se utiliza la que estaba
            user['profile-photo'] = sessionUser['profile-photo'];
        }

        // Se reemplazan los datos de la base, y de la sesión, con los nuevos y se redirecciona a la vista del perfil que se encuentra en sesión
        usersModel.update(user);
        req.session.user = user;
        res.redirect("/users/profile");
    }
}