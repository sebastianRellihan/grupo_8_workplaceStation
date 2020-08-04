const express = require("express");
const app = express();

// Configuración
app.use(express.static("public")); // Declaración de carpeta estática
app.set("view engine", "ejs"); // Le indica a express el template engine que se va a utilizar

// Rutas
const mainRoutes = require("./routes/main");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

app.use("/", mainRoutes);

app.use("/users", usersRoutes);

app.use("/products", productsRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log("Servidor funcionando en el puerto " + PORT));