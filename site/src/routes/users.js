/**
 * Enrutador para las peticiones a vistas /users/ que corresponden a acciones de usuario (login, 
 * registro, etc).
 * Debe ser llamado desde la entrada principal a la ejecución del servidor (app.js).
 */

const express = require("express");
const router = express.Router();

const controller = require("../controller/usersController");
const validator = require("../validators/users");
// Middlewares de control de autenticación
const guestRoute = require("../middlewares/guestRoute");
const userRoute = require("../middlewares/userRoute");

const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig('usersUploaded')); // Middleware de subida de archivos

// Vista del formulario de login de usuarios
router.get("/login", guestRoute, controller.login);

// Procesamiento del login de usuarios
router.post("/login", guestRoute, validator.login, controller.authenticate);

// Procesamiento del logout de usuario
router.post("/logout", userRoute, controller.logout);

// Vista del formulario de registro de usuarios
router.get("/register", guestRoute, controller.register);

// Procesamiento del formulario de registro 
router.post("/register", guestRoute, upload.single('profile-photo'), validator.register, controller.store);

// Vista del perfil de un usuario
router.get("/profile", userRoute, controller.show);

// Procesamiento del form de eliminación de un usuario
router.delete("/profile", userRoute, controller.destroy);

// Vista del formulario de edición de un usuario
router.get("/edit", userRoute, controller.edit);

// procesamiento del form de edición de un usuario
router.put("/edit", userRoute, upload.single('profile-photo'), validator.edit, controller.update);

module.exports = router;