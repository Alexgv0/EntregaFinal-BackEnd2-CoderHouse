import express from "express";
import cookieParser from "cookie-parser";
import { srcPath } from "./utils/utils.js";
import path from "path";
import routes from "./routes/index.js";
import {getFilteredAndSortedProductPaginate} from "./controllers/appController.js"

const app = express();

// Iniciacion de base de datos
//import initMongoDB from "./config/database.js";
//initMongoDB();

// Seteo de Middlewares
app.use(express.json()); // Uso de json
app.use(express.urlencoded({ extended: true })); // Uso de req.body
app.use(cookieParser()); // Uso de cookies
app.use(express.static(path.join(srcPath, "public"))); // Uso de archivos estaticos

// Seteo de Handlebars
import handlebars from "express-handlebars";
import handlebarsRouter from "./routes/handlebars.router.js";
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(srcPath, "views"));

// Inicializacion de passport
import passport from "./config/passportConfig.js";
app.use(passport.initialize());

// Routes
app.use("/api", routes);

app.use("/", handlebarsRouter);

app.get("/", getFilteredAndSortedProductPaginate);

export default app;
