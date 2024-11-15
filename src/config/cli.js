import { program } from "commander";
import {PORT} from "./config.js"
// Configuración de Commander
program
    .option(
        "-e, --env <string>",
        "Entorno de proyecto",
        value => value.toUpperCase(),
    )
    .option(
        "-p, --port <number>", 
        "Puerto del servidor",
    )
    .option(
        "-db, --database <string>",
        "Base de datos",
        value => value.toUpperCase(),
        "MONGO"
    );
    
    program.parse(process.argv);

export default program.opts();
