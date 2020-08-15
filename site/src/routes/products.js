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

// Carrito de compras
router.get("/cart", controller.cart);

// Formulario de creación de producto
router.get("/create", controller.create);

// Procesamiento del formulario de creación 
router.post("/create", controller.store);

// Detalle de producto 
router.get("/:id", controller.detail);

// Formulario de edición de producto
router.get("/:id/edit", controller.edit);

// Formulario de edición de producto - editar producto
router.put("/:id", controller.update);

// Formulario de edición de producto - eliminar producto
router.delete("/:id", controller.destroy);

module.exports = router;
