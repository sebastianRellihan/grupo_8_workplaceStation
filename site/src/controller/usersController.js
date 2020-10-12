/**
 * Sistema de controlador para administrar el direccionamiento de las rutas /users/ las cuales se corresponden con acciones de
 * usuario (logueo, registro, etc).
 * Debe ser llamado y usado desde usersRoutes.
*/

const path = require("path");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

// Acceso a modelos de usuarios, categorías y tokens
const { user, category, token, categoryUser } = require("../../src/database/models");

// Acceso al objeto que nso permite eliminar archivos de una ruta
const fileDeleter = require("../utils/fileDeleter");

// Operadores que provee sequelize
const { Op } = require("sequelize");

// Validaciones
const { validationResult } = require("express-validator");
const { ALL } = require("dns");

// Ruta absoluta en donde se almacena la imágen de perfil
const IMAGE_PATH = path.join(__dirname, "..", "..", "public", "img", "usersUploaded", "/");
// Tipos de archivos soportados
const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"];

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
        .catch(error => {
            console.log(error);
        })
    },
    /** Muestra la vista de edición del usuario en sesión */
    edit: (req, res) => {
        let allCategories = category.findAll();
        let categoriesInterests = categoryUser.findAll({
            where: {
                userId: req.session.user.id
            }
        });

        Promise.all([allCategories, categoriesInterests])
            .then(results => {
                console.log(results[1]);

                res.render("users/edit", {
                    categories: results[0],
                    interests: results[1]
                });
            })
            // .then(categories => {
            //     return res.render("users/edit", { categories });
            // })
            .catch(error => {
                console.log(error);
            })
    },
    /** Procesa los datos del formulario de registro y crea una entrada en BD */
    store: (req, res) => {

        let errors = validationResult(req);

        // Validación sobre las imágenes de perfil
        let imgError = { 
            param : "profile-photo",
            location : "file"
        }

        // Comprobaciones sobre la imgen
        if(req.files.length == 0) imgError.msg = "Debe subir una imagen de perfil";
        else if (req.files.length > 1) imgError.msg = "Sólo puede subir una imagen";
        else if(!ALLOWED_MIME_TYPES.includes(req.files[0].mimetype)) imgError.msg = "Formato no soportado";

        if(imgError.msg) errors.errors.push(imgError);

        if (errors.isEmpty()) {
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

            // Se encripta la pass, se reemplaza y se elimina la que ingresó para corroborar
            let hash = bcrypt.hashSync(userObj.password, 10);
            userObj.password = hash;
            delete userObj.passwordCheck;
            
            // Se almacena el usuario en la base
            user.create(userObj)
                .then(created => {
                    let promises = [];
                    // Si el usuario seleccionó intereses se almacenan en la base
                    if(req.body.interests) {
                        req.body.interests.forEach(interest => {
                            promises.push(categoryUser.create({
                                categoryId : Number(interest),
                                userId : created.id
                            }));
                        });
                    }
                    Promise.all(promises);
                })
                // Se redirige la vista al index
                .then(() => {
                    // Se auto-loguea al usuario después de haber creado su cuenta
                    req.session.user = userObj;
                    res.redirect("/");
                })
                .catch(error => {
                    console.log(error);
                })

        } else {
            // Borro la imagen subida por el usuario
            if(req.files){
                fileDeleter(IMAGE_PATH)
                .deleteFile(
                    req.files.map(element => element.filename)
                    );
            }

            category.findAll()
                .then(categories => {
                    return res.render("users/register", {
                        categories,
                        userInput: req.body,
                        errors : errors.mapped()
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    /** Procesa la autenticación y logueo de usuarios */
    authenticate: (req, res) => {
        
        let errors = validationResult(req);
        
        if(errors.isEmpty()) {

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
                .catch(() => {
                    // Creo un error y se lo envío a la vista
                    res.render("users/login", {
                        userInput: req.body["user-input"],
                        errors : { authenticate : { msg : "Usuario ó contraseña incorrecta" } }
                    });
                })
        } else {
            function errorMsg(error) {
                if (error["user-input"] && error.password) {
                    return {
                        both : {
                            msg : "Campo obligatorio"
                        }
                    }
                } else if(error["user-input"]) {
                    return {
                        userInput : {
                            msg : error["user-input"].msg
                        }
                    }
                } else {
                    return {
                        password : {
                            msg : error.password.msg 
                        }
                    }
                }
            }
            console.log(errorMsg(errors.mapped()))
            // Se envía el error a la vista
            res.render("users/login", {
                userInput: req.body["user-input"],
                errors : errorMsg(errors.mapped())
            });
        }

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

        // Se eliminan los datos del usuario que se encuentra en locals
        delete res.locals.user;

        // Borra los intereses del usuario 
        categoryUser.destroy({
            where: {
                user_id: req.session.user.id
            }
        })

        // Borrado de BD
        user.destroy({
            where: {
                id: req.session.user.id
            }
        })
            .then(() => {
                // Borrado de la imagen de perfil
                fileDeleter(IMAGE_PATH).deleteFile(req.session.user.image);
            })
            .then(() => {
                // Destrucción de la sesión
                req.session.destroy()
        
                res.redirect("/");
            })
            .catch(error => {
                console.log(error);
                // Error 500 "Internal server error"
                res.status(500).redirect("/");
            })
    },
    // Edita un usuario existente
    update: (req, res) => {

        let errors = validationResult(req);

        // Validación sobre las imágenes de perfil
        let imgError = { 
            param : "profile-photo",
            location : "file"
        }

        // Comprobaciones sobre la imgen
        if (req.files.length > 1) imgError.msg = "Sólo puede subir una imagen";
        else if(!ALLOWED_MIME_TYPES.includes(req.files[0].mimetype)) imgError.msg = "Formato no soportado";

        if(imgError.msg) errors.errors.push(imgError);

        if(errors.isEmpty()){

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
            
            // Si se sube una nueva foto de perfil...
            if(req.files){
                // Se elimina la anterior y se reemplaza por la nueva
                fileDeleter(IMAGE_PATH).deleteFile(sessionUser.image);
                userObj.image = req.files[0].filename;
            // Si no se sube una nueva foto se utiliza la que estaba
            } else {
                userObj.image = sessionUser.image;
            }
    
            // Array de promesas
            let promises = [];
    
            // Se eliminan los intereses que tenía previamente cargados en la base
            promises.push(categoryUser.destroy({
                where: {
                    userId: userObj.id
                }
            }));
    
            // Si el usuario seleccionó intereses se almacenan en la base
            if(req.body.interests) {
                
                if (req.body.interests.length > 1) {
                    req.body.interests.forEach(interest => {
                        promises.push(categoryUser.create({
                            categoryId : Number(interest),
                            userId : userObj.id
                        }));
                    });
                } else {
                    promises.push(categoryUser.create({
                        categoryId : Number(req.body.interests),
                        userId : userObj.id
                    }));
                }
            }
    
            // Se reemplazan los datos de la base
            promises.push(user.update(userObj, {
                where: {
                    id: sessionUser.id
                }
            }));
    
            Promise.all(promises)
                // Se actualizan los datos de la sesión y se redirecciona a la vista del perfil que se encuentra en sesión
                .then(results => {
                    req.session.user = userObj;
                    res.redirect("/users/profile");
                })
                .catch(error => {
                    console.log(error);
                })

        } else {
            // Borra la imagen subida por el usuario
            if(req.files){
                fileDeleter(IMAGE_PATH)
                    .deleteFile(
                        req.files.map(element => element.filename)
                    );
            }

            category.findAll()
                .then(categories => {
                    return res.render("users/edit", {
                        categories,
                        userInput: req.body,
                        errors : errors.mapped()
                    });
                })
                .catch(error => console.log(error));
        }
    } // fin update
}