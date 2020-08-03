const express = require("express");
const app = express();

// Imports de routers
const mainRoutes = require("./routes/mainRoutes");
const usersRouter = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");

// Configuración de express/app

app.use(express.static("public")); // Declaración de carpeta estática

// Direccionamiento

app.use("/", mainRoutes);

app.use("/users", usersRouter);

app.use("/products", productsRoutes);

// Puerto en el que se está "escuchando"
const PORT = 3000;
app.listen(PORT, () => console.log("Servidor funcionando en el puerto " + PORT));