/**
 * Sistema de controlador para administrar el direccionamiento de las rutas /users/ las cuales se corresponden con acciones de
 * usuario (logueo, registro, etc).
 * Debe ser llamado y usado desde usersRoutes.
*/

const path = require("path");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

// Acceso a modelos de usuarios, categorías y tokens
const { user, category, token } = require("../../src/database/models");

// Acceso al objeto que nso permite eliminar archivos de una ruta
const fileDeleter = require("../utils/fileDeleter");

// Operadores que provee sequelize
const { Op } = require("sequelize");

// Ruta absoluta en donde se almacena la imágen de perfil
const IMAGE_PATH = path.join(__dirname, "..", "..", "public", "img", "usersUploaded", "/");

module.exports = {
    /** Muestra la vista del formulario de login (login.ejs) */
    login: (req, res) => {
        res.render("users/login");
    },
    /** Muestra la vista del formulario de registro (register.ejs) */
    register: (req, res) => {
        category.findAll()
            .then(categories => {
                return res.render("users/register", { categories });
            })
            .catch(error => {
                console.log(error);
            })
    },
    /** Muestra la vista de perfil del usuario en sesión */
    show: (req, res) => {
        category.findAll()
        .then(categories => {
            return res.render("users/profile", { categories });
        })
    },
    /** Muestra la vista de edición de del usuario en sesión */
    edit: (req, res) => {
        category.findAll()
        .then(categories => {
            return res.render("users/edit", { categories });
        })
    },
    /** Procesa los datos del formulario de registro y crea una entrada en BD */
    store: (req, res) => {

        // Se almacena en userObj lo que llega por post del form
        let userObj = {
            name: req.body.name,
            lastName: req.body["last-name"],
            userName: req.body["user-name"],
            email: req.body.email,
            password: req.body.password,
            passwordCheck: req.body["password-check"],
            image: req.file.filename,
            address: req.body.address,
            birth: req.body.birth,
            phoneNumber: req.body["phone-number"],
            gender: req.body.gender,
            isAdmin: false
        }
        
        if (userObj.password == userObj.passwordCheck) { // Se corrobora que la pass sea la misma en pass y check
            // Se encripta la pass, se reemplaza y se elimina la que ingresó para corroborar
            let hash = bcrypt.hashSync(userObj.password, 10);
            userObj.password = hash;
            delete userObj.passwordCheck;

            // Se almacena el usuario en la base y se redirige la vista al index
            user.create(userObj)    

            // Se auto-loguea al usuario después de haber creado su cuenta
            req.session.user = userObj;
            res.redirect("/");
        } else {
            // Borro la imagen subida por el usuario
            fileDeleter(IMAGE_PATH).deleteFile(req.file.filename);

            category.findAll()
                .then(categories => {
                    return res.render("users/register", {
                        categories,
                        userInput: req.body,
                        errors : { confirm : { msg : "Ambas contraseñas deben coincidir" } }
                    })
                })
        }
    },
    /** Procesa la autenticación y logueo de usuarios */
    authenticate: (req, res) => {

        // Obtengo el usuario por medio de su email ó nombre de usuario
        user.findOne({
            where: {
                [Op.or]: [
                  { email: req.body["user-input"] },
                  { userName: req.body["user-input"] }
                ]
            }
        })
            .then(userObj => {

                // Si el usuario ingresa la contraseña correcta
                if(bcrypt.compareSync(req.body.password, userObj.password)){   

                    // Si el usuario marcó "recordarme" le envíamos una cookie
                    if(req.body["remember-me"]){
                        
                        // Se genera un token seguro y aleatorio para la cookie
                        const generatedToken = crypto.randomBytes(48).toString("base64");
                        
                        // Se almacena el token en la base de datos con el ID del usuario para vincularlo al mimso a futuro
                        token.create({ userId: userObj.id, token: generatedToken})
                        
                        // Almacena el Token en la cookie por un mes
                        res.cookie("uTwS", generatedToken, {maxAge : 1000 * 60 * 60 * 24 * 30});
                    }
        
                    // Se guarda al usuario en session
                    req.session.user = userObj;
        
                    res.redirect("/");
        
                } else {
                    // Creo un error y se lo envío a la vista
                    res.render("users/login", {
                        userInput: req.body["user-input"],
                        errors : { authenticate : { msg : "Usuario ó contraseña incorrecta" } }
                    });
                }

            })

    },
    /** Procesa el logout de usuario */
    logout: (req, res) => {

        // Se destruyen todas las cookies de la base que le pertenezcan a un mismo usuario 
        token.destroy({
            where: {
                userId: req.session.user.id
            }
        })
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
        user.destroy({
            where: {
                id: req.session.userId
            }
        })
        // Borrado de la imagen de perfil
        fileDeleter(IMAGE_PATH).deleteFile(req.session.user["profile-photo"]);

        // Destrucción de la sesión
        req.session.destroy()

        res.redirect("/");
    },
    // Edita un usuario existente
    update: (req, res) => {
        // Se almacenan los datos del usuario que se encuentra en sesión para acceder a sus propiedades facilmente
        let sessionUser = req.session.user;
        // Se almacena en userObj los datos que llega del form
        let userObj = {
            name: req.body.name,
            lastName: req.body["last-name"],
            userName: req.body["user-name"],
            address: req.body.address,
            birth: req.body.birth,
            phoneNumber: req.body["phone-number"],
            gender: req.body.gender,
            isAdmin: false
        }
        // Se completan los datos restantes que no se encuentran incluídos en ese form
        userObj.email = sessionUser.email;
        userObj.password = sessionUser.password;
        userObj.id = sessionUser.id;
        
        if(req.file){ // Si se sube una nueva foto de perfil...
            // Se elimina la anterior y se reemplaza por la nueva
            fileDeleter(IMAGE_PATH).deleteFile(sessionUser['profile-photo']);
            userObj.image = req.file.filename;
        } else { // Si no se sube una nueva foto se utiliza la que estaba
            userObj.image = sessionUser['profile-photo'];
        }

        // Se reemplazan los datos de la base, y de la sesión, con los nuevos y se redirecciona a la vista del perfil que se encuentra en sesión
        user.update(userObj, {
            where: {
                id: sessionUser.id
            }
        })
            .then(() => {
                req.session.user = userObj;
                res.redirect("/users/profile");
            })
    }
}