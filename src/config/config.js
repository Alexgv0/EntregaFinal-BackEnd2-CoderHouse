import cli from "./cli.js";
import dotenv from "dotenv";

const path = cli.env === "PROD" ? "./.env.prod" : cli.env === "STAGE" ? "./.env.stg" : cli.env === "DEV" ? "./.env.dev" : "./.env";

dotenv.config({ path });

console.log(`Abriendo servidor en entorno ${cli.env || "DEFAULT"} ...`);

export const PORT = cli.port || process.env.PORT || 3000;
export const SECRET_KEY = process.env.SECRET_KEY || 123;
export const saltRounds = 10;

// Para passport-google-oauth20
export const CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE;
export const CLIENT_SECRET_GOOGLE = process.env.CLIENT_SECRET_GOOGLE;
