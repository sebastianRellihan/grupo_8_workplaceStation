/**
 * Enrutador para las peticiones a vistas /users/ que corresponden a acciones de usuario (login, 
 * registro, etc).
 * Debe ser llamado desde la entrada principal a la ejecución del servidor (app.js).
 */

const express = require("express");
const router = express.Router();
const controller = require("../controller/usersController");

router.get("/login", controller.loginGet);

router.get("/register", controller.registerGet);

module.exports = router;