/**
 * Sistema de ruteo modularizado para las peticiones a vistas de productos.
 * Como por ejemplo: /products, /products/detail, products/cart, etc...
 * Debe ser llamado desde el entry point, o entrada principal, a la ejecución del servidor (app.js).
*/
const express = require("express");
const router = express.Router();

const controller = require("../controller/productsController");
const purchaseController = require("../controller/purchaseController");
// Middleware de control de permisos de admin
const adminRoute = require("../middlewares/adminRoute");
const userRoute = require("../middlewares/userRoute");

const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig('uploaded')); // Middleware de subida de archivos

// Todos los productos
router.get("/", controller.index);

// Carrito de compras
router.get("/cart", controller.cart);

// Adición de productos al carrito de compras
router.post("/cart", controller.addToCart);

// Borrado de productos del carrito
router.delete("/cart/:id", controller.removeFromCart);

// Formulario de creación de producto
router.get("/create", adminRoute, controller.create);

// Procesamiento del formulario de creación 
router.post("/create", adminRoute, upload.any(), controller.store);

// Ruta para acceder a la confirmación de la compra
router.get("/purchase", userRoute, purchaseController.show);

// Detalle de producto 
router.get("/:id", controller.detail);

// Formulario de edición de producto
router.get("/:id/edit", adminRoute, controller.edit);

// Formulario de edición de producto - editar producto
router.put("/:id", adminRoute, upload.any(), controller.update);

// Formulario de edición de producto - eliminar producto
router.delete("/:id", adminRoute, controller.destroy);


module.exports = router;
