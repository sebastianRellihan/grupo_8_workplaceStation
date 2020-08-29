/**
 * Enrutador para las peticiones a vistas /users/ que corresponden a acciones de usuario (login, 
 * registro, etc).
 * Debe ser llamado desde la entrada principal a la ejecución del servidor (app.js).
 */

const express = require("express");
const router = express.Router();
const controller = require("../controller/usersController");

router.get("/login", controller.login);

router.get("/register", controller.register);

// router.post("/register", controller.store);

// router.get("/profile", controller.profile);

// router.delete("/profile", controller.delete);

// router.get("/profile/edit", controller.edit);

// router.put("/profile/edit", usersController.update);

module.exports = router;