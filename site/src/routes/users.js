/**
 * Enrutador para las peticiones a vistas /users/ que corresponden a acciones de usuario (login, 
 * registro, etc).
 * Debe ser llamado desde la entrada principal a la ejecución del servidor (app.js).
 */

const express = require("express");
const router = express.Router();

const controller = require("../controller/usersController");

const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig('usersUploaded')); // Middleware de subida de archivos

// Vista del formulario de login de usuarios
router.get("/login", controller.login);

// Procesamiento del login de usuarios
router.post("/login", controller.authenticate);

// Vista del formulario de registro de usuarios
router.get("/register", controller.register);

// Procesamiento del formulario de registro 
router.post("/register", upload.single('profile-photo'), controller.store);

// Vista del perfil de un usuario
router.get("/profile", controller.show);

// Procesamiento del form de eliminación de un usuario
router.delete("/profile", controller.destroy);

// Vista del formulario de edición de un usuario
router.get("/edit", controller.edit);

// procesamiento del form de edición de un usuario
// router.put("/profile/edit", usersController.update);

module.exports = router;