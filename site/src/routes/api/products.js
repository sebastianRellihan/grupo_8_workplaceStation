/**
 * Enrutador para la API de productos, que provee data y metadata relacionada
 * a los productos de la base.
 */

const express = require('express');
const router = express.Router();
const controller = require('../../controller/api/productsController');

router.get('/', controller.all);
router.get("/filter", controller.filter);
router.get("/categories", controller.categories);
router.get('/:id', controller.detail);

module.exports = router;
