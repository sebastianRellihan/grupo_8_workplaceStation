const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const authenticateUser = require("./middlewares/authenticateUser");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors');

// ***************** APP *****************
const app = express();
// ***************** Parseo de variables de entorno *****************
dotenv.config({path : path.join(__dirname, "..", "..", ".env")});

// ***************** Configuración *****************
app.set("view engine", "ejs"); // Le indica a express el template engine que se va a utilizar
app.set("views", path.join(__dirname, '/views')); // Le indicamos a express donde está la carpeta views

// ***************** Middlewares a nivel de aplicación *****************

app.use(morgan("dev")); // Ofrece información adicional de los request/responses
app.use(express.static("public")); // Le indica a express donde se encuentran nuestros recursos estáticos
// Formularios
app.use(express.urlencoded({ extended: false })); // Arma el objeto body
app.use(express.json()) // Reconoce los objetos que vienen por medio del request como objetos JSON
app.use(methodOverride("_method")); // Verifica si existe _method en el query string
// Middlewares de autenticación
app.use(session({
    secret : "Workplace Station",
    resave: false, // No vuelve a guardarla si no hay cambios
    saveUninitialized: true // Guarda sesiones aunque todavía no hayan datos
}));
app.use(cookieParser());
app.use(authenticateUser);
app.use(cors());

// ***************** Rutas *****************
const mainRoutes = require("./routes/main");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

// ***************** Rutas de APIs *****************
const usersRoutesAPI = require("./routes/api/users");
const productsRoutesAPI = require("./routes/api/products");
const purchasesRoutesAPI = require("./routes/api/purchases");

app.use("/", mainRoutes);

app.use("/users", usersRoutes);

app.use("/products", productsRoutes);

app.use("/api/users", usersRoutesAPI);

app.use("/api/products", productsRoutesAPI);

app.use("/api/purchases", purchasesRoutesAPI);

app.use((req, res, next) => {
    res.status(404).render('main/not-found', { path: req.path });
    next();
})

// ***************** Puesta en marcha del servidor *****************
app.listen(process.env.APP_PORT, 
    () => console.log("Servidor funcionando en el puerto " + process.env.APP_PORT));