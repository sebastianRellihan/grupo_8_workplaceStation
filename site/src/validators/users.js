const bcrypt = require("bcryptjs");
const { check, body } = require('express-validator');
const { user, category } = require("../database/models");
// Operadores que provee sequelize
const { Op } = require("sequelize");

// Se crea una propiedad por cada formulario que se vaya a validar
module.exports = {

    register: [

        check("name").trim()
            .notEmpty().withMessage("Campo obligatório").bail()
            .isLength({ min : 2, max : 255 }).withMessage("Debe tener entre 2 y 255 caracteres"),
        
        check("last-name").trim()
            .notEmpty().withMessage("Campo obligatório").bail()
            .isLength({ min : 2, max : 255 }).withMessage("Debe tener entre 2 y 255 caracteres"),

        check("email").trim()
            .notEmpty().withMessage("Campo obligatório").bail()
            .isEmail().withMessage("Debe ingregar un mail válido.").bail()
            .isLength({ max : 255 }).withMessage("Debe tener 255 caracteres como máximo").bail()
            .custom(async value => { // Comprueba si ese mail ya está en uso en BD
                let result = await user.findOne({ where : { email : value } });
                // Al ser la función de comprobación asincrónica, la validación tiene que responder con promesas
                // https://stackoverflow.com/questions/53693650/express-validation-custom-async-checking
                if(result !== null){
                    return Promise.reject();
                } else {
                    return Promise.resolve();
                }
            }).withMessage("Ese mail ya está en uso."),

        check("user-name").trim()
            .notEmpty().withMessage("Campo obligatório").bail()
            .isLength({ min : 2, max : 255 }).withMessage("Debe tener entre 2 y 255 caracteres").bail()
            // Expresión regular para checkear que el nombre de usuario no contenga espacios intermedios
            .custom(value => !/\s/.test(value)).withMessage("No puede contener espacios intermedios").bail()
            .custom(async value => {
                let result = await user.findOne({ where : { userName : value } });
                if(result !== null){
                    return Promise.reject();
                } else {
                    return Promise.resolve();
                }
            }).withMessage("El nombre de usuario ya está en uso"),

        check("gender").trim()
            .notEmpty().withMessage("Campo obligatório").bail()
            .isNumeric().withMessage("Debe seleccionar una opción válida").bail()
            .custom(value => { // Comprueba que el código de género sea válido
                return value >= 1 && value <= 3;
            }).withMessage("Debe seleccionar un género válido"),

        check("birth").trim()
            .notEmpty().withMessage("Campo obligatório").bail()
            .isDate({ format : "YYYY-MM-DD" }).withMessage("Debe ingresar una fecha válida"),

        check("password")
            .notEmpty().withMessage("Campo obligatório").bail()
            .isLength({ min : 8, max : 20 }).withMessage("Debe contener entre 8 y 20 caracteres").bail()
            .custom(value => {
                // Chequeo de caracteres por medio de expresiones regulares
                // https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions
                let upper = new RegExp("[A-Z]");
                let lower = new RegExp("[a-z]");
                let number = new RegExp("[0-9]");
                return upper.test(value) && lower.test(value) && number.test(value);

            }).withMessage("Debe contener al menos una minúscula, una mayúscula y un número"),
        
        check("password-check")
            .notEmpty().withMessage("Campo obligatório").bail()
            .custom((value, { req }) => {
                return value == req.body.password;
            }).withMessage("Ambas contraseñas deben coincidir"),

        check("address").trim()
            .notEmpty().withMessage("Campo obligatório").bail()
            .isLength({ min : 2, max : 255 }).withMessage("Debe tener entre 2 y 255 caracteres"),
            
    ],

    edit: [
        
    ],
    login: [
        
        check('user-input')
        .notEmpty().withMessage('Debes completar el campo de email o nombre de usuario').bail(),
        
        check('password')
        .notEmpty().withMessage('Debes completar el campo de contraseña').bail()
    ]
}