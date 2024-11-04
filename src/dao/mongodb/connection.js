import {connect} from 'mongoose';
import { MONGO_URL, MongoDBConnectionType, MongoDBConfig } from '../../config/database.js';

export class ConnectMongoDB {
    static #instance;
    constructor(){
        connect(MONGO_URL, MongoDBConfig);
    }
  
    static getInstance(){
        try {
            if(this.#instance){
                console.log("Ya esta conectado con Base de Datos MongoDB " + MongoDBConnectionType);
                return this.#instance;
            } else {
                this.#instance = new ConnectMongoDB();
                console.log("Conectando con Base de Datos MongoDB " + MongoDBConnectionType);
                return this.#instance;
            }
        } catch (error) {
            console.log("Error al conectar en la base de datos MongoDB: ", error);
        }
    }
  }