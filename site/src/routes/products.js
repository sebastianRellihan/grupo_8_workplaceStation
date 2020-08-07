/**
 * Sistema de ruteo modularizado para las peticiones a vistas de productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el entry point, o entrada principal, a la ejecución del servidor (app.js).
*/
const express = require("express");
const router = express.Router();
const controller = require("../controller/productsController");

// Todos los productos
router.get("/", controller.index);

// Detalle de producto 
router.get("/detail/:id", controller.detail);

// Carrito de compras
router.get("/cart", controller.cart);

// Formulario de creación de producto
router.get("/create", controller.create);

// Procesamiento del formulario de creación 
router.post("/create", controller.store);

// Formulario de edición
router.get("/edit/:id", controller.edit);

module.exports = router;
