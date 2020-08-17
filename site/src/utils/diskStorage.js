/**
 * Objeto "storage" que contiene las confiuraciones necesarias para configurar la subida de archivos.
 * Debe pasarse como parámetro al middleware uplouad = multer({storage})
 */

const multer = require("multer");
const path = require("path");

// Ruta en la que se almacenan las imágenes subidos por el usuario
const STORAGE_PATH = path.join(__dirname, "..", "..", "public", "img", "uploaded");

module.exports = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STORAGE_PATH);
    },
    filename: function (req, file, cb) {
        //     nombre del archivo  - fecha de subida  .extensión original
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
    }
  })