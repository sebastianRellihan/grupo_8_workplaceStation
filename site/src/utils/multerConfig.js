/**
 * Objeto de configuración para multer. Éste debe ser pasado como parámetro para crear el middleware de
 * subida de archivos en el enrutador de productos: upload = multer(obj).
 */

const multer = require("multer");
const path = require("path");

// Ruta en la que se almacenan las imágenes subidas por el usuario
const STORAGE_PATH = path.join(__dirname, "..", "..", "public", "img", "uploaded");
// Tipos de archivos soportados
const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

module.exports = {
    /*
     * Motor de subida de archivos. Define el directorio en el que se almacenan los
     * archivos y su nombre.
     */
    storage : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, STORAGE_PATH);
        },
        filename: function (req, file, cb) {
            //     nombre del archivo  - fecha de subida  .extensión original
            cb(null, file.fieldname + file.originalname.slice(0,3) + "-" + Date.now() + path.extname(file.originalname));
        }
    }),
    /*
     * Define el filtrado de los archivos. No arroja errores al insertarse archivos
     * que no pasen el filtro, simplemente omite su subida.
     */
    fileFilter : function(req, file, cb){
        if(ALLOWED_MIME_TYPES.includes(file.mimetype)){
            cb(null, true); // Permite la subida
        } else {
            cb(null, false) // Omite la subida
        }
    }
}
