// Configuracion de MongoDB
export const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/ProyectoFinal-BackEnd1-CoderHouse";
export const MongoDBConnectionType = process.env.MONGO_URL ? "Atlas" : "Local";
export const MongoDBConfig = {

};
