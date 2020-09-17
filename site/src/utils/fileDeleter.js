const path = require("path");
const fs = require("fs");
const { log } = require("console");

/**
 * Retorna un objeto capaz de borrar uno o varios archivos dentro de una ruta, recibiendo
 * el nombre (ó un array de nombres) del/los archivos a borrar.
 * @param {string} filesPath La ruta que contiene los archivos a borrar.
 */
module.exports = function (filesPath) {
    return {
        filesPath : filesPath,
        deleteFile : function (files) {
        
            try{
                if (Array.isArray(files)) {
                    files.forEach(file => {
                        fs.unlinkSync(path.join(this.filesPath, file));
                    });
                } else {
                    fs.unlinkSync(path.join(this.filesPath, files));
                }
            } catch (error){
                let msg ="Error al intentar borrar archivo/s, " +
                         "esto puede deberse a que el/los archivos no existen " +
                         "ó a que están en uso por un proceso de mayor prioridad";
                console.log(msg)
            }

        }
    }
    
}
