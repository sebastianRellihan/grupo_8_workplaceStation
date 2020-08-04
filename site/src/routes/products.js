/**
 * Sistema de ruteo modularizado para las peticiones a vistas de productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el entry point, o entrada principal, a la ejecución del servidor (app.js).
*/
const express = require("express");
const router = express.Router();
const controller = require("../controller/productsController");

router.get("/", controller.index);

router.get("/detail", controller.detail);

router.get("/cart", controller.cart);

module.exports = router;
