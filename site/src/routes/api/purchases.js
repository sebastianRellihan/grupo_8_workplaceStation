const express = require("express");
const router = express.Router();
const controller = require("../../controller/api/purchaseController");

router.get("/", controller.all);

router.get("/:id", controller.detail);

module.exports = router;