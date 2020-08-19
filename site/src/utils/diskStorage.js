/**
 * Objeto "storage" que contiene las configuraciones necesarias para configurar la subida de archivos.
 * Debe pasarse como parámetro al middleware upload = multer({storage})
 */

const multer = require("multer");
const path = require("path");

// Ruta en la que se almacenan las imágenes subidas por el usuario
const STORAGE_PATH = path.join(__dirname, "..", "..", "public", "img", "uploaded");

module.exports = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STORAGE_PATH);
    },
    filename: function (req, file, cb) {
        //     nombre del archivo  - fecha de subida  .extensión original
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
  })