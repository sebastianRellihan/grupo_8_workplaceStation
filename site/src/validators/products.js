const { check } = require('express-validator');
const { category } = require("../database/models");

// Se crea una propiedad por cada formulario que se vaya a validar
module.exports = {
    create: [
        check("name").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isLength({ min:5, max:100 }).withMessage("El nombre debe tener entre 5 y 100 caracteres").bail(),

        check("brief-description").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isLength({ min:5, max:100 }).withMessage("La descripción breve debe tener entre 5 y 100 caracteres").bail(),

        check("price").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isFloat({ min:0, max:9999999.99 }).withMessage("El precio no puede ser negativo ni mayor a 9999999.99").bail(),

        check("discount").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isInt({ min:0, max:100 }).withMessage("El descuento no puede ser negativo ni mayor a 100").bail(),

        check("stock").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isInt({ min:0, max:4294967295 }).withMessage("El stock no puede ser negativo ni mayor a 4294967295"),

        check("category").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .custom(async value => {
                let result = await category.findByPk(value);
                if(result !== null) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            }).withMessage("Debes seleccionar una categoría valida"),

        // check("image")
        //     .notEmpty().withMessage("Debes seleccionar una o más imágenes").bail(),

        check("description").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isLength({ min:20, max:500 }).withMessage("La descripción debe tener entre 20 y 500 caracteres").bail(),

        check("aditional-info").trim()
            .isLength({ max:500 }).withMessage("La información adicional no puede tener más de 500 caracteres").bail()
    ],
    edit: [
        check("name").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isLength({ min:5, max:100 }).withMessage("El nombre debe tener entre 5 y 100 caracteres").bail(),

        check("brief-description").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isLength({ min:5, max:100 }).withMessage("La descripción breve debe tener entre 5 y 100 caracteres").bail(),

        check("price").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isFloat({ min:0, max:9999999.99 }).withMessage("El precio no puede ser negativo ni mayor a 9999999.99").bail(),

        check("discount").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isInt({ min:0, max:100 }).withMessage("El descuento no puede ser negativo ni mayor a 100").bail(),

        check("stock").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isInt({ min:0, max:
                4294967295 }).withMessage("El stock no puede ser negativo ni mayor a 4294967295"),

        check("category").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .custom(async value => {
                let result = await category.findByPk(value);
                if(result !== null) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            }).withMessage("Debes seleccionar una categoría valida"),

        // check("image")

        check("description").trim()
            .notEmpty().withMessage("Campo obligatorio").bail()
            .isLength({ min:20, max:500 }).withMessage("La descripción debe tener entre 20 y 500 caracteres").bail(),

        check("aditional-info").trim()
            .isLength({ max:500 }).withMessage("La información adicional no puede tener más de 500 caracteres").bail()
    ]
}