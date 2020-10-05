const { check } = require("express-validator");
const { shipping } = require("../database/models");

module.exports = [

    check("address").trim()
        .notEmpty().withMessage("Campo obligatório").bail()
        .isLength({ min : 2, max : 255 }).withMessage("Debe tener entre 2 y 255 caracteres"),

    check("shipping", "Valor inválido")
        .notEmpty().withMessage("Campo obligatório").bail()
        .isNumeric().bail()
        .custom(async value => { 
            let result = await shipping.findByPk(value);
            // Comprueba que el valor enviado se corresponda con un método de envío existente
            if(result == null){
                return Promise.reject();
            } else {
                return Promise.resolve();
            }
        }),

    check("comment").optional().trim()
        .isLength({ max : 500 }).withMessage("Máximo 500 caracteres")

];