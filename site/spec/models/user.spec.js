const { user } = require("../../src/database/models");

describe("CRUD básico para el modelo user", () => {

    let testUser = { // Datos de prueba
        name : "John",
        ["last-name"] : "Doe",
        ["user-name"] : "JohnDoe",
        email : "john@doe.com",
        password : "12345678",
        ["profile-photo"] : "profile-photo-1-1-1598154931386.png",
        address : "Calle Falsa 123",
        birth : "1994-02-22",
        ["phone-number"] : 123456789,
        isAdmin : true 
    }

    let options = { // Opciones de búsqueda
        where : {
            email : "john@doe.com"
        }
    }

    it("Create", done => {
        user.create(testUser)
            .then(result => {
                // Integridad de los datos
                expect(result.name).toBe(testUser.name);
                expect(result["last-name"]).toBe(testUser["last-name"]);
                expect(result["user-name"]).toBe(testUser["user-name"]);
                expect(result.email).toBe(testUser.email);
                expect(result.password).toBe(testUser.password);
                expect(result["profile-photo"]).toBe(testUser["profile-photo"]);
                expect(result.address).toBe(testUser.address);
                expect(result.birth).toBe(testUser.birth);
                expect(result["phone-number"]).toBe(testUser["phone-number"]);
                expect(result.isAdmin).toBe(testUser.isAdmin);

                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    }); // fin create

    it("READ", done => {
        user.findOne(options)
            .then(result => {
                // Coincidencia de los datos
                expect(result.name).toBe(testUser.name);
                expect(result["last-name"]).toBe(testUser["last-name"]);
                expect(result["user-name"]).toBe(testUser["user-name"]);
                expect(result.email).toBe(testUser.email);
                expect(result.password).toBe(testUser.password);
                expect(result["profile-photo"]).toBe(testUser["profile-photo"]);
                expect(result.address).toBe(testUser.address);
                expect(result.birth).toBe(testUser.birth);
                expect(result["phone-number"]).toBe(testUser["phone-number"]);
                expect(result.isAdmin).toBe(testUser.isAdmin);

                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    }); // fin read

    it("Update", done => {
        // Objeto con los nuevos atributos
        const newData = {
            name : "Foo",
            ["last-name"] : "Bar",
            ["user-name"] : "FooBar",
            email : "foo@bar.com",
            password : "87654321",
            ["profile-photo"] : "profile-photo-Jac-1599057279584.png",
            address : "Avenida Siempre Viva 123",
            birth : "2000-01-01",
            ["phone-number"] : 154154154,
            isAdmin : false
        }

        user.update(newData, options)
            .then(() => {
                return user.findOne({
                    where : {
                        email : newData.email
                    }
                })
            })
            .then(result => {
                // Checkeo de la efectividad de los cambios
                expect(result.name).toBe(newData.name);
                expect(result["last-name"]).toBe(newData["last-name"]);
                expect(result["user-name"]).toBe(newData["user-name"]);
                expect(result.email).toBe(newData.email);
                expect(result.password).toBe(newData.password);
                expect(result["profile-photo"]).toBe(newData["profile-photo"]);
                expect(result.address).toBe(newData.address);
                expect(result.birth).toBe(newData.birth);
                expect(result["phone-number"]).toBe(newData["phone-number"]);
                expect(result.isAdmin).toBe(newData.isAdmin);

                // En caso de que los cambios sean efectivos, actualizo el criterio de búsqueda
                if(result != null && result.email != options.where.email){
                    options.where.email = result.email;
                }

                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    }); // fin update

    it("Delete", done => {
        user.destroy(options)
            .then(() => {
                return user.findOne(options);
            })
            .then(result => {
                expect(result).toBe(null);
                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    });

});