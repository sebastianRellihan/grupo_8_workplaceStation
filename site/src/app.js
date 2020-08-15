const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

// Configuración
app.set("view engine", "ejs"); // Le indica a express el template engine que se va a utilizar
app.set("views", path.join(__dirname, '/views')); // Le indicamos a express donde está la carpeta views

// Middlewares a nivel de aplicación
app.use(express.static("public")); // Declaración de carpeta estática
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()) 
app.use(methodOverride("_method"));

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