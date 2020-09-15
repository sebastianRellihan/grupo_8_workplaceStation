/**
 * Función que utiliza el patrón factory method para crear y retornar un objeto de configuración para multer. 
 * Recibe como parámetro el nombre de la carpeta, que debe encontrarse dentro de public/img, en donde se guardarán las imágenes.
 * Ésta debe ser pasada como parámetro para crear el middleware de
 * subida de archivos en el enrutador de productos: upload = multer(obj).
*/

const multer = require("multer");
const path = require("path");

// Tipos de archivos soportados
const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"];

/**
 * Retorna una instancia de un objeto de configuración de multer para subir archivos
 * de imágenes dentro de subcarpetas de /public/img.
 * @param {string} destinationFolder El nombre de la carpeta dentro de la carpeta
 *                 /public/img en donde se deséen almacenar los archivos.
 */
module.exports = function(destinationFolder) {
    return {
        /*
        * Motor de subida de archivos. Define el directorio en el que se almacenan los
        * archivos y su nombre.
        */
        storage : multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, "..", "..", "public", "img", destinationFolder));
            },
            filename: function (req, file, cb) {
                //     nombre del archivo - 3 letras del nombre original  -  fecha de subida - .extensión original
                cb(null, file.fieldname + "-" + file.originalname.slice(0,3) + "-" + Date.now() + path.extname(file.originalname));
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
};