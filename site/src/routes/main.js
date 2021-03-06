/**
 * Enrutador para las peticiones a vistas principales ó que no encajan en otras partes del modelo de negocios.
 * Como por ejemplo: index.html, about-us.html, etc..
 * Debe ser llamado desde la entrada principal a la ejecución del servidor (app.js).
 */

const express = require("express");
const router = express.Router();
const controller = require("../controller/mainController");
const adminRoute = require("../middlewares/adminRoute");

router.get("/", controller.index);

router.get("/about-us", controller.aboutUs);

router.get("/dashboard", adminRoute, controller.dashboard);

router.get("/contact", controller.contact);

router.post("/contact", controller.sendMail);

module.exports = router;