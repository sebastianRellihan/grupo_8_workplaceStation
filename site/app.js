const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.static("public")); // Declaración de carpeta estática

app.listen(PORT, () => console.log("Servidor funcionando en el puerto " + PORT));

/* 
    Región de preticiones tipo GET
*/

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});