/**
 * Función que utiliza el patrón factory method para crear y retornar DAOs (objetos de acceso a datos)
 * preparados para operar en las tablas que se idiquen al construirlos.
 * 
 * Su uso está dirigido a dar soporte a los controladores, ya que en éstos debe implementarse la lógica
 * de procesamiento de las rutas y delegar el acceso a datos a otros objetos.
 */

const fs = require("fs");
const path = require("path");

/**
 * Genera un modelo de datos específico para cada tabla si se declara su nombre.
 * Para obtener el DAO, debe capturarse la variable devuelta al ejecutar la función model(tablename),
 * teniendo en cuenta que "model" es el nombre que se le asignó a la variable en la que se requiere el módulo.
 * @param {string} tableName El nombre de la tabla sobre la que se desée operar.
 * @returns {object} Un Objeto de Acceso a Datos (DAO), que es capaz de realizar operaciones de
 *                   ABM (alta, baja, modificación) en la base de datos.
 */
let model = function(tableName){
    return {

        filePath: path.join(__dirname, "..", "data", tableName + ".json"),
        
        /** 
         * DE USO INTERNO. Retorna todos los registros de la base de datos.
         * @returns {Array} Un array con objetos representando todos las entradas en la
         *                  base de datos ó un array vacío en caso de que no hayan datos.
         */
        readFile: function(){
            let fileContent = fs.readFileSync(this.filePath, {encoding: 'utf-8'});
            if (fileContent) {
                return JSON.parse(fileContent);
            } else {
                return [];
            }
        },

        /**
         * DE USO INTERNO. Parsea a formato JSON y almacena el contenido en la base de datos.
         * @param {object} content El contenido a almacenar en cualquier formato.
         */
        writeFile: function(content){
            fs.writeFileSync(this.filePath, JSON.stringify(content, null, 4));
        },

        /**
         * Borra los archivos especificados en la ruta especificada de manera sincrónica.
         * @param {string} deletePath La ruta absoluta en la que se encuentran los archivos a borrar.
         * @param  {...string} files Un string, array de strings en la que cada uno contiene el nombre 
         *                           más la extensión del/los archivo/s a borrar.
         */
        deleteFile: function(deletePath, files){

            if(Array.isArray(files)){
                files.forEach(file => {
                    fs.unlinkSync(deletePath + file);
                });
            } else {
                fs.unlinkSync(deletePath + files);
            }

        },

        /**
         * Analiza la base de datos en busqueda de un ID disponible.
         * @returns {number} Un ID que puede servir como clave primaria para almacenar un
         *                   registro en la base de datos sin que haya conflictos.
         */
        getValidID: function(){
            let rows = this.readFile();
            let idArray = [];
            let id = 1;     
            // Obtiene un array con todos los ID disponibles
            rows.forEach(row => {
                idArray.push(row.id);
            });
            // Ordena el array
            idArray = idArray.sort((a,b) => {
                return a - b;
            });
            // Determina cual es el menor id disponible
            for(let i = 0; id < idArray.length; i++){
                if(idArray[i] == id){
                    id++;
                } else{
                    break; // Rompe el ciclo en caso de que se haya determinado el id
                }
            }
            // Corrige en caso de que se haya llegado al fin del array de IDs
            if(id == idArray.length){
                id++;
            }
            return id;
        },

        /**
         * Retorna todos los registros de la base de datos.
         * @returns {Array} Un array de objetos representando las entradas en la base de datos
         *                  ó un array vacío en caso de que no haya coincidencias.
         */
        getAll: function(){
            return this.readFile();
        },

        /**
         * Retorna la primera coincidencia de una consulta a la base de datos.
         * @param {string} field El nombre del campo sobre el que se quiere realizar la consulta.
         * @param {*} value El valor a comparar.
         * @returns {object} Un objeto que contiene las mismas características que el registro, ó
         *                   null en caso de qe no haya coincidencias.
         */
        getByField: function(field, value){
            let rows = this.readFile();
            return rows.find(row => {
                return row[field] == value;
            });
        },

        /**
         * Retorna todas las coincidencias de una consulta a la base de datos.
         * @param {string} field El nombre del campo sobre el que se quiere realizar la consulta.
         * @param {*} value El valor a comparar.
         * @returns {Array} Un array de objetos representando todos los registros que coincidan con
         *                  la búsqueda, ó un array vacío en caso de que no haya coincidencias.
         */
        getAllByField: function(field, value){
            let rows = this.readFile();
            return rows.filter(row => {
                return row[field] == value;
            });
        },

        /**
         * Crea un nuevo registro en la base de datos.
         * @param {object} row Un objeto cuyos atributos representen un registro en la base de datos.
         */
        create: function(row){
            let rows = this.readFile();
            // Asigna un id válido al nuevo elemento
            row.id = this.getValidID();
            rows.push(row);
            this.writeFile(rows);
        },

        /**
         * Modifica un registro en la base de datos.
         * @param {object} row Un objeto cuyos atributos representen los campos en un registro de la
         *                 base de datos. Su ID debe coincidir con uno ya existente. ya que lo que se
         *                 desea realizar es una modificación.
         */
        update: function(row){
            let rows = this.readFile();
            // Se recorre la base y se busca el producto que coincida por el id
            // Si lo encuentra lo modifica por el objeto que llega por parametro. En caso contrario no se modifica.
            let updatedRows = rows.map(eachRow => {
                if (eachRow.id == row.id) {
                    return row;
                }
                return eachRow;
            }); 
            this.writeFile(updatedRows);
            return row.id;
        },

        /**
         * Borra un registro de la base de datos según su clave primaria (ó ID).
         * @param {number} id El ID/clave primaria único que está asociada al registro.
         */
        delete: function(id){
            let rows = this.readFile();
            // Filtra el elemento que tenga ese id
            rows = rows.filter(eachRow => {
                return eachRow.id != id;
            });
            this.writeFile(rows);
        }

    } // fin return
}

module.exports = model;