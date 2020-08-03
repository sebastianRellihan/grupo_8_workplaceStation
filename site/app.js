const express = require("express");
const app = express();

// Imports de routers
const mainRoutes = require("./routes/mainRoutes");

const PORT = 3000;

// Configuración de express/app

app.use(express.static("public")); // Declaración de carpeta estática

app.listen(PORT, () => console.log("Servidor funcionando en el puerto " + PORT));

// Direccionamiento

app.use("/", mainRoutes);

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/views/register.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/products", (req, res) => {
    res.sendFile(__dirname + "/views/products.html");
});

app.get("/cart", (req, res) => {
    res.sendFile(__dirname + "/views/cart.html");
});

app.get("/products/detail", (req, res) => {
    res.sendFile(__dirname + "/views/product-detail.html");
});