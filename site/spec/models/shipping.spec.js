const { shipping } = require("../../src/database/models");

// Descripción y scope del caso de prueba
describe("CRUD básico del modelo shipping", () => {
    // Objeto base sobre el cual testear las operaciones CRUD a BD
    const testShipping = {
        name : "Retiro por sucursal"
    }
    // Objeto "options" para consultas SELECT
    let options = {
        where : {
            name : testShipping.name
        }
    }

    // it = prueba unitario sobre una ó un conjunto de unciones concretas
    it("Create", done => {
        shipping.create(testShipping) // Retorna una promesa
            .then(created => {
                // Determina el caso de éxito de la prueba comparando dos valores
                expect(created.name).toBe(testShipping.name);
                done(); // Avisa a jasmine que el pedido asincrónico (promesa) fue finalizado
            }).catch(error => {
                console.log(error);
                done();
            });
    });

    it("Read", done => {
        shipping.findOne(options)
            .then(result => {
                // Checkea la integridad de los datos creados
                expect(result.name).toBe(testShipping.name);
                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    });

    it("Update", done => {
        const newName = "Envío por correo";
        shipping.update(
            { name : newName },
            options
        )
        .then(() => {
            // Debido a que el registro tiene un nuevo nombre, el valor de
            // la clausula WHERE tiene que cambiar para poder buscar el registro en BD
            options.where.name = newName;
            // Busca por el nuevo nombre y retorna una promesa
            return shipping.findOne(options); 
        })
        .then(result => {
            // Chequea que el cambio sea efectivo
            expect(result.name).toBe(newName);
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        })
    });

    it("Destroy", done => {

        shipping.destroy(options)
        .then(() => {
            // Busca el registro en BD
            return shipping.findOne(options);
        })
        .then(result => {
            // Checkea que efectivamente se haya borrado
            expect(result).toBe(null);
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        })
    });

});