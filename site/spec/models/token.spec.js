const { user, token } = require("../../src/database/models");
const crypto = require("crypto");

describe("CRUD del modelo 'token' y su relación N:1 con el modelo 'user'", () => {

    const testUser = { // Asociación de prueba
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
    
    const testToken = { // atos de prueba
        token : crypto.randomBytes(48).toString("base64")
    }

    const options = { // Options para las búsquedas
        where : {
            token : testToken.token
        }
    }

    // Obtiene un ID de usuario válido para asociarlo al modelo
    beforeAll(async () => {
        await user.create(testUser)
                .then(result => {
                    testToken.userId = result.id;
                    testUser.id = result.id;
                });
    });

    // Borra el recurso de apoyo
    afterAll(async () => {
        await user.destroy({
            where : {
                id : testUser.id
            }
        });
    });

    it("Create", done => {
        token.create(testToken)
            .then(result => {
                // Checkeo de la intergridad de los datos
                expect(result.token).toBe(testToken.token);
                expect(result.userId).toBe(testToken.userId);
                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    });

    it("Read + include de user", done => {
        token.findOne({
            where : {
                token : testToken.token
            },
            include : "user"
        })
            .then(result => {

                // Integridad del registro
                expect(result.token).toBe(testToken.token);
                expect(result.userId).toBe(testToken.userId);

                // Integridad de su relación con users
                expect(result.user.name).toBe(testUser.name);
                expect(result.user["last-name"]).toBe(testUser["last-name"]);
                expect(result.user["user-name"]).toBe(testUser["user-name"]);
                expect(result.user.email).toBe(testUser.email);
                expect(result.user.password).toBe(testUser.password);
                expect(result.user["profile-photo"]).toBe(testUser["profile-photo"]);
                expect(result.user.address).toBe(testUser.address);
                expect(result.user.birth).toBe(testUser.birth);
                expect(result.user["phone-number"]).toBe(testUser["phone-number"]);
                expect(result.user.isAdmin).toBe(testUser.isAdmin);
                expect(result.user.id).toBe(testToken.userId);

                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    });

    it("Update", done => {

        let newData = {
            token : crypto.randomBytes(48).toString("base64")
        }

        token.update(newData, options)
            .then(() => {
                return token.findOne({ where : { token : newData.token } });
            })
            .then(result => {
                // Checkeo la integridad de los datos
                expect(result.token).toBe(newData.token);
                expect(result.userId).toBe(testToken.userId);

                // Actualizo el criterio de búsqueda
                if( result && result.token != options.where.token){
                    options.where.token = result.token;
                }

                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    });

    it("Delete", done => {
        token.destroy(options)
            .then(() => {
                return token.findOne(options);
            })
            .then(result => {
                // Checkeo la efectividad del borrado
                expect(result).toBe(null);
                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    });

});