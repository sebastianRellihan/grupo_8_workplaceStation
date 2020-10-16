/**
 * Enrutador para las peticiones a la API de usuarios, que provee data y metadata relacionada
 * a la entidad de usuario.
 */

const express = require("express");
const router = express.Router();
const controller = require("../../controller/api/usersController");

router.get("/", controller.all);
router.get("/:id", controller.detail);

module.exports = router;