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
            let fileContent = fs.readFileSync(this.filePath, 'utf-8');
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
         * Analiza la base de datos en busqueda de un ID disponible.
         * @returns {number} Un ID que puede servir como clave primaria para almacenar un
         *                   registro en la base de datos sin que haya conflictos.
         */
        getValidID: function(){
            let data = this.readFile();
            let idArray = [];
            let id = 1;

            
            // Obtiene un array con todos los ID disponibles
            data.forEach(element => {
                idArray.push(element.id);
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
            let data = this.readFile();

            return data.find(element => {
                return element[field] == value;
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
            let data = this.readFile();

            return data.filter(element => {
                return element[field] == value;
            });
        },

        /**
         * Crea un nuevo registro en la base de datos.
         * @param {object} row Un objeto cuyos atributos representen un registro en la base de datos.
         */
        create: function(row){
            let data = this.readFile();
            // Asigna un id válido al nuevo elemento
            row.id = this.getValidID();

            data.push(row);
            this.writeFile(data);
        },

        /**
         * Modifica un registro en la base de datos.
         * @param {object} row Un objeto cuyos atributos representen los campos en un registro de la
         *                 base de datos. Su ID debe coincidir con uno ya existente. ya que lo que se
         *                 desea realizar es una modificación.
         */
        update: function(row){
            let data = this.readFile();
            let id = row.id;
            index = -1;
            // Obtengo el objeto original
            let old = this.getByField("id", id);
            // Determino su índice en la base de datos
            for(let i = 0; i < data.length; i++){
                if(data[i].id == id){
                    index = i;
                    break;
                }
            }
            // Si hubo coincidencias se reemplaza el elemento y se actualiza la BD
            if(index != -1){
                data.splice(index, 1, row);
                this.writeFile(data);
            }
        },

        /**
         * Borra un registro de la base de datos según su clave primaria (ó ID).
         * @param {number} id El ID/clave primaria único que está asociada al registro.
         */
        delete: function(id){
            let data = this.readFile();
            let index = -1;
            // determino el índice del elemento
            for(let i = 0; i < data.length; i++){
                if(data[i].id == id){
                    index = i;
                    break;
                }
            }
            // Si hubo coincidencias se borra el elemento
            if(index != -1){
                data.splice(index, 1);
                this.writeFile(data);
            }
        }

    } // fin return
}

module.exports = model;